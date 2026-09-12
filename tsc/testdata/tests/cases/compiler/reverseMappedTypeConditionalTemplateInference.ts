// @strict: true
// @noEmit: true

// Repro from https://github.com/Dokploy/dokploy/blob/853ca33659853093ee6a91af3719abdc4e1bae72/packages/server/src/db/schema/network.ts#L128

declare function createSchema<
    Columns,
    Refinements = { [K in keyof Columns]?: unknown },
>(
    columns: Columns,
    refinements: {
        [K in keyof Refinements]: K extends keyof Columns ? Refinements[K] : never;
    },
): Refinements;

const schema = createSchema(
    { value: 0 },
    { value: "refined" },
);

const refined: string = schema.value;
