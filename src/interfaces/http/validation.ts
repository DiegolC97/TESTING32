import type { CreateTeamMemberDTO } from "@application/dto/TeamMemberDTO";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Schema/shape validation only — NOT business rules.
 * Business validation is enforced in the domain layer.
 */
export function parseCreateTeamMemberDTO(input: unknown): CreateTeamMemberDTO {
  if (typeof input !== "object" || input === null) {
    throw new ValidationError("Request body must be a JSON object.");
  }

  const body = input as Record<string, unknown>;

  if (typeof body.name !== "string") {
    throw new ValidationError("Field 'name' is required and must be a string.");
  }
  if (typeof body.email !== "string") {
    throw new ValidationError("Field 'email' is required and must be a string.");
  }

  const allowedRoles = ["owner", "admin", "member"] as const;
  let role: CreateTeamMemberDTO["role"];
  if (body.role !== undefined) {
    if (
      typeof body.role !== "string" ||
      !allowedRoles.includes(body.role as (typeof allowedRoles)[number])
    ) {
      throw new ValidationError(
        `Field 'role' must be one of: ${allowedRoles.join(", ")}.`,
      );
    }
    role = body.role as CreateTeamMemberDTO["role"];
  }

  return { name: body.name, email: body.email, role };
}
