// @strict: true
// @noEmit: true
// @exactOptionalPropertyTypes: true, false

// https://github.com/microsoft/TypeScript/issues/61678

export type U1 = { type: "A"; value: 123 } | { type: "B"; value: string };

const directAssignment1: U1 = Math.random() ? { type: "A" as const } : { type: "B" as const, value: "test" }; // error

const indirect1 = Math.random() ? { type: "A" as const } : { type: "B" as const, value: "test" };
const indirectAssignment1: U1 = indirect1; // error

export type U2 = { type: "A"; value: number } | { type: "B"; value: string };

const directAssignment2: U2 = Math.random() ? { type: "A" as const } : { type: "B" as const, value: "test" }; // error

const indirect2 = Math.random() ? { type: "A" as const } : { type: "B" as const, value: "test" };
const indirectAssignment2: U2 = indirect1; // error