import { TeamMemberId } from "../value-objects/TeamMemberId";
import { Email } from "../value-objects/Email";
import { DomainError } from "../errors/DomainError";

export type TeamMemberRole = "owner" | "admin" | "member";

/**
 * Entity: has identity (TeamMemberId) and a lifecycle.
 * Protects its own invariants — construction and mutation always
 * leave the object in a valid state.
 */
export class TeamMember {
  private constructor(
    public readonly id: TeamMemberId,
    private _name: string,
    private _email: Email,
    private _role: TeamMemberRole,
    private _active: boolean,
  ) {}

  static create(props: {
    id: TeamMemberId;
    name: string;
    email: Email;
    role?: TeamMemberRole;
  }): TeamMember {
    const name = props.name?.trim();
    if (!name) {
      throw new DomainError("Team member name cannot be empty.");
    }
    return new TeamMember(
      props.id,
      name,
      props.email,
      props.role ?? "member",
      true,
    );
  }

  /** Rehydrate an entity from persisted state (used by repositories). */
  static rehydrate(props: {
    id: TeamMemberId;
    name: string;
    email: Email;
    role: TeamMemberRole;
    active: boolean;
  }): TeamMember {
    return new TeamMember(
      props.id,
      props.name,
      props.email,
      props.role,
      props.active,
    );
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get role(): TeamMemberRole {
    return this._role;
  }

  get isActive(): boolean {
    return this._active;
  }

  rename(name: string): void {
    const trimmed = name?.trim();
    if (!trimmed) {
      throw new DomainError("Team member name cannot be empty.");
    }
    this._name = trimmed;
  }

  promoteTo(role: TeamMemberRole): void {
    if (!this._active) {
      throw new DomainError("Cannot change role of a deactivated member.");
    }
    this._role = role;
  }

  deactivate(): void {
    if (this._role === "owner") {
      throw new DomainError("The team owner cannot be deactivated.");
    }
    this._active = false;
  }
}
