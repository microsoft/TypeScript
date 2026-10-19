// @strict: true
// @noEmit: true

type Attributes = { name?: string } & { [path: `$${string}.${string}$`]: unknown };
declare function scope(options: Attributes | { method: readonly [string, ...unknown[]] }): void;
const options = { method: ["list", { id: 1 }] };
scope(options);
