// @strict: true
// @declaration: true

// Repro from #46624

type Kind = "one" | "two" | "three";

declare function getInterfaceFromString<T extends Kind>(options?: { type?: T } & { type?: Kind }): T;

const result = getInterfaceFromString({ type: 'two' });
