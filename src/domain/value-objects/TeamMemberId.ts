import { DomainError } from "../errors/DomainError";

/**
 * Value Object: immutable identity for a TeamMember.
 * Equality is by value, not reference.
 */
export class TeamMemberId {
  private readonly value: string;

  constructor(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new DomainError("TeamMemberId cannot be empty.");
    }
    this.value = trimmed;
  }

  toString(): string {
    return this.value;
  }

  equals(other: TeamMemberId): boolean {
    return other instanceof TeamMemberId && other.value === this.value;
  }
}
