// @target: esnext
// @strict: false

// The `in` operator is allowed in an array literal that appears in the head of
// a `for` statement: the for head's [~In] parameter does not reach into
// array literals (ElementList : AssignmentExpression[+In]).

const o = { a: 1 };
const k = "a";

for (let i = 0, has = [k in o]; i < 1; i++) {
    console.log(has);
}

for (let i = 0, has = [k in o, "b" in o, !(k in o)]; i < 1; i++) {
    console.log(has);
}

let x: any;
for ([x = "x" in {}] of [[]]) {
    console.log(x);
}

// The initializer of a `for` statement still ends at `in`, so that `for-in`
// statements keep parsing as before.
for (const key in o) {
    console.log(key);
}
