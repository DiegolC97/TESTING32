import type { CreateTeamMember } from "@application/use-cases/CreateTeamMember";
import type { ListTeamMembers } from "@application/use-cases/ListTeamMembers";
import { parseCreateTeamMemberDTO, ValidationError } from "./validation";

export interface HttpResult {
  status: number;
  body: unknown;
}

/**
 * Thin controller: validate input → call use case → serialize output.
 * It maps application/domain errors to HTTP status codes.
 * It contains ZERO business logic and never touches infrastructure directly.
 */
export class TeamMemberController {
  constructor(
    private readonly createTeamMember: CreateTeamMember,
    private readonly listTeamMembers: ListTeamMembers,
  ) {}

  async list(): Promise<HttpResult> {
    const members = await this.listTeamMembers.execute();
    return { status: 200, body: members };
  }

  async create(rawBody: unknown): Promise<HttpResult> {
    try {
      const dto = parseCreateTeamMemberDTO(rawBody);
      const created = await this.createTeamMember.execute(dto);
      return { status: 201, body: created };
    } catch (error) {
      return this.toErrorResult(error);
    }
  }

  private toErrorResult(error: unknown): HttpResult {
    const message = error instanceof Error ? error.message : "Unknown error.";

    if (error instanceof ValidationError) {
      return { status: 400, body: { error: message } };
    }
    // EmailAlreadyInUseError / uniqueness conflicts.
    if (message.includes("already exists")) {
      return { status: 409, body: { error: message } };
    }
    // Domain invariant violations map to 422.
    if (message.includes("Invalid") || message.includes("cannot")) {
      return { status: 422, body: { error: message } };
    }
    return { status: 500, body: { error: "Internal server error." } };
  }
}
