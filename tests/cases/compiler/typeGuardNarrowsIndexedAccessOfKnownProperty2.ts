// @strict: true

const foo: { key?: number } = {};
const key = 'key' as const;

if (foo[key]) {
    foo[key]; // number
    foo.key;  // number
}
