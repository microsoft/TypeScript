type Person = { id: number }
const persons: Record<string, { a: any }> = {
    [`person-${1}`]: { b: "something" }, // ok, error
}
