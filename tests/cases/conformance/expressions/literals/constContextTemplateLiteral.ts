type Person = { id: number }

declare function key(): `person-${number}`
/* This only happens if index type is a template literal type */
const persons: Record<`person-${Person["id"]}`, { a: any }> = {
    [`person-${1}`]: { b: "something" }, // ok, error
    // [`person-${1}` as const]: { b: "something" }, // ok, error
    // [key()]: { b: "something" }, // still no error, it's not a literal
}
