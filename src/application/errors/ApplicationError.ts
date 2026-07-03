/** Base class for application-level errors (e.g. validation, conflicts). */
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EmailAlreadyInUseError extends ApplicationError {
  constructor(email: string) {
    super(`A team member with email "${email}" already exists.`);
  }
}
