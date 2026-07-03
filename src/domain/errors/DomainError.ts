/**
 * Base class for all domain-level errors.
 * Application/interface layers translate these into their own responses.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class TeamMemberNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Team member not found: ${id}`);
  }
}
