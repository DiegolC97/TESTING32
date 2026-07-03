import { DomainError } from "../errors/DomainError";

/**
 * Value Object: a validated email address.
 * Invariants are protected at construction time.
 */
export class Email {
  private static readonly PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private readonly value: string;

  constructor(value: string) {
    const normalized = value?.trim().toLowerCase();
    if (!normalized || !Email.PATTERN.test(normalized)) {
      throw new DomainError(`Invalid email address: "${value}".`);
    }
    this.value = normalized;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return other instanceof Email && other.value === this.value;
  }
}
