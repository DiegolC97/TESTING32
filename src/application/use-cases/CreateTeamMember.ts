import { TeamMember } from "@domain/entities/TeamMember";
import { Email } from "@domain/value-objects/Email";
import { TeamPolicy } from "@domain/services/TeamPolicy";
import type { TeamMemberRepository } from "@domain/repositories/TeamMemberRepository";
import type {
  CreateTeamMemberDTO,
  TeamMemberDTO,
} from "../dto/TeamMemberDTO";
import { TeamMemberMapper } from "../mappers/TeamMemberMapper";
import { EmailAlreadyInUseError } from "../errors/ApplicationError";

/**
 * Use Case: create a new team member.
 * Receives its dependencies (the repository interface) via constructor.
 * Knows WHAT to do, delegates HOW to domain + infrastructure.
 */
export class CreateTeamMember {
  constructor(private readonly repository: TeamMemberRepository) {}

  async execute(dto: CreateTeamMemberDTO): Promise<TeamMemberDTO> {
    const email = new Email(dto.email);

    const existingByEmail = await this.repository.findByEmail(email);
    if (existingByEmail) {
      throw new EmailAlreadyInUseError(email.toString());
    }

    const member = TeamMember.create({
      id: this.repository.nextId(),
      name: dto.name,
      email,
      role: dto.role,
    });

    const all = await this.repository.findAll();
    TeamPolicy.assertUniqueOwner(all, member);

    await this.repository.save(member);

    return TeamMemberMapper.toDTO(member);
  }
}
