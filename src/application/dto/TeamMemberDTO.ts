import type { TeamMemberRole } from "@domain/entities/TeamMember";

/** Output contract returned by use cases. Never expose domain entities directly. */
export interface TeamMemberDTO {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  active: boolean;
}

/** Input contract for creating a team member. */
export interface CreateTeamMemberDTO {
  name: string;
  email: string;
  role?: TeamMemberRole;
}
