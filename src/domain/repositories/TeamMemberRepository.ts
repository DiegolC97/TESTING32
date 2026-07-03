import { TeamMember } from "../entities/TeamMember";
import { TeamMemberId } from "../value-objects/TeamMemberId";
import { Email } from "../value-objects/Email";

/**
 * Repository Interface — describes WHAT persistence is needed, not HOW.
 * Implementations live in the infrastructure layer.
 */
export interface TeamMemberRepository {
  save(member: TeamMember): Promise<void>;
  findById(id: TeamMemberId): Promise<TeamMember | null>;
  findByEmail(email: Email): Promise<TeamMember | null>;
  findAll(): Promise<TeamMember[]>;
  nextId(): TeamMemberId;
}
