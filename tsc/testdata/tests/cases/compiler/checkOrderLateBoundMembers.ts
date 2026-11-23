// @strict: true
// @noEmit: true
// @checkOrder: default, reverse, isolated, typesfirst

// Resolving the name in a computed property name looks it up in the members
// of the enclosing interface. That must not late-bind those same members,
// or the accessors would not merge with the property when asked first.
const foo = "foo"
interface I {
    get [foo](): number;
    foo: number;
    set [foo](value: number);
}
