// @strict: true

declare var tuple: [boolean, number, ...string[]];

const [a, b, c, ...rest] = tuple;
