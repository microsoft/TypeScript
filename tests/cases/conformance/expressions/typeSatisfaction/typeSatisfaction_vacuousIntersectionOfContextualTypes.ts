const a: "baz" = "foo" satisfies "foo" | "bar";
const b: { xyz: "baz" } = { xyz: "foo" } satisfies { xyz: "foo" | "bar" };
