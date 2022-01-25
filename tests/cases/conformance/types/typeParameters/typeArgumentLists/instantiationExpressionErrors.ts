// @strict: true
// @declaration: true

declare let f: any;

// Type arguments only permitted at end of member expression

const a1 = f<number>;
const a2 = f.g<number>;
const a3 = f<number>.g;
const a4 = f<number>.g<number>;

// Type arguments must follow ?. token

const b1 = f?.<number>;
const b2 = f?.<number>();
const b3 = f<number>?.();

// Parsed as function call, even though this differs from JavaScript

const x1 = f<true>
(true);

// Parsed as relational expression

const x2 = f<true>
true;

// Parsed as instantiation expression

const x3 = f<true>;
true;
