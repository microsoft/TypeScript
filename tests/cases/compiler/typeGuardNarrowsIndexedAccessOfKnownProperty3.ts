// @strict: true

type Foo = (number | undefined)[] | undefined;

const foo: Foo = [1, 2, 3];
const index = 1;

if (foo !== undefined && foo[index] !== undefined && foo[index] >= 0) {
    foo[index] // number
}
