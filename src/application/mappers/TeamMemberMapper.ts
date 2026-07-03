import { TeamMember } from "@domain/entities/TeamMember";
import type { TeamMemberDTO } from "../dto/TeamMemberDTO";

/** Maps between domain entities and DTOs. */
export class TeamMemberMapper {
  static toDTO(member: TeamMember): TeamMemberDTO {
    return {
      id: member.id.toString(),
      name: member.name,
      email: member.email.toString(),
      role: member.role,
      active: member.isActive,
    };
  }

  static toDTOList(members: TeamMember[]): TeamMemberDTO[] {
    return members.map(TeamMemberMapper.toDTO);
  }
}
