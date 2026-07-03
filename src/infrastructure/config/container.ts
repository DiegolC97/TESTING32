import type { TeamMemberRepository } from "@domain/repositories/TeamMemberRepository";
import { CreateTeamMember } from "@application/use-cases/CreateTeamMember";
import { ListTeamMembers } from "@application/use-cases/ListTeamMembers";
import { InMemoryTeamMemberRepository } from "../persistence/InMemoryTeamMemberRepository";

/**
 * Composition Root — the ONLY place where concrete implementations are
 * wired to abstractions. Environment configuration is read here (and only
 * here), keeping the inner layers free of process.env.
 *
 * A single module-scoped repository instance keeps in-memory data alive
 * across requests during local development.
 */
function buildRepository(): TeamMemberRepository {
  const source = process.env.DATA_SOURCE ?? "in-memory";
  switch (source) {
    case "in-memory":
    default:
      return new InMemoryTeamMemberRepository();
  }
}

const repository = buildRepository();

export const container = {
  createTeamMember: new CreateTeamMember(repository),
  listTeamMembers: new ListTeamMembers(repository),
};

export type Container = typeof container;
