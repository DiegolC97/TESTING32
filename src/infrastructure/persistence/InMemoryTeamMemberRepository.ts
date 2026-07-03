import { randomUUID } from "node:crypto";
import { TeamMember } from "@domain/entities/TeamMember";
import { TeamMemberId } from "@domain/value-objects/TeamMemberId";
import { Email } from "@domain/value-objects/Email";
import type { TeamMemberRepository } from "@domain/repositories/TeamMemberRepository";

/**
 * Infrastructure: an in-memory implementation of the domain repository
 * interface. Swap this for a real DB adapter without touching any other layer.
 *
 * Persisted state is stored as plain rows and mapped to domain entities
 * on read, so ORM/DB types never leak into the inner layers.
 */
interface TeamMemberRow {
  id: string;
  name: string;
  email: string;
  role: TeamMember["role"];
  active: boolean;
}

export class InMemoryTeamMemberRepository implements TeamMemberRepository {
  private readonly rows = new Map<string, TeamMemberRow>();

  async save(member: TeamMember): Promise<void> {
    this.rows.set(member.id.toString(), {
      id: member.id.toString(),
      name: member.name,
      email: member.email.toString(),
      role: member.role,
      active: member.isActive,
    });
  }

  async findById(id: TeamMemberId): Promise<TeamMember | null> {
    const row = this.rows.get(id.toString());
    return row ? this.toEntity(row) : null;
  }

  async findByEmail(email: Email): Promise<TeamMember | null> {
    for (const row of this.rows.values()) {
      if (row.email === email.toString()) {
        return this.toEntity(row);
      }
    }
    return null;
  }

  async findAll(): Promise<TeamMember[]> {
    return Array.from(this.rows.values()).map((row) => this.toEntity(row));
  }

  nextId(): TeamMemberId {
    return new TeamMemberId(randomUUID());
  }

  private toEntity(row: TeamMemberRow): TeamMember {
    return TeamMember.rehydrate({
      id: new TeamMemberId(row.id),
      name: row.name,
      email: new Email(row.email),
      role: row.role,
      active: row.active,
    });
  }
}
