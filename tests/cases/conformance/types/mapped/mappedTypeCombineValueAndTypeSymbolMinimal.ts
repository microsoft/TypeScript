// @strict: true
// @noEmit: true

// @filename: assert.d.ts
declare namespace assert {
  class AssertionError extends Error {}
  const strict: Omit<typeof assert, never>;
}

export = assert.strict;

// @filename: index.ts
import { AssertionError } from "./assert";
new AssertionError("assert");
