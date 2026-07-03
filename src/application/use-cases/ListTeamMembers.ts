import type { TeamMemberRepository } from "@domain/repositories/TeamMemberRepository";
import type { TeamMemberDTO } from "../dto/TeamMemberDTO";
import { TeamMemberMapper } from "../mappers/TeamMemberMapper";

/**
 * Use Case: list all team members.
 */
export class ListTeamMembers {
  constructor(private readonly repository: TeamMemberRepository) {}

  async execute(): Promise<TeamMemberDTO[]> {
    const members = await this.repository.findAll();
    return TeamMemberMapper.toDTOList(members);
  }
}
