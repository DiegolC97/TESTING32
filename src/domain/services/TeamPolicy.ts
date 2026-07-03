import { TeamMember } from "../entities/TeamMember";
import { DomainError } from "../errors/DomainError";

/**
 * Domain Service: logic that spans multiple entities and doesn't
 * naturally belong to a single one.
 */
export class TeamPolicy {
  /** A team must always have exactly one owner. */
  static assertUniqueOwner(existing: TeamMember[], candidate: TeamMember): void {
    if (candidate.role !== "owner") {
      return;
    }
    const hasOwner = existing.some(
      (m) => m.role === "owner" && !m.id.equals(candidate.id),
    );
    if (hasOwner) {
      throw new DomainError("A team can only have one owner.");
    }
  }

  static countActive(members: TeamMember[]): number {
    return members.filter((m) => m.isActive).length;
  }
}
