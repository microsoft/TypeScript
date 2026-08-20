// @strict: true
// @noEmit: true
// @target: esnext

function action(f: Function) {}

// Narrowings are not preserved for exported mutable variables

export let x1: string | number;
x1 = "abc";
action(() => { x1 /* string | number */ });

export { x2 };
let x2: string | number;
x2 = "abc";
action(() => { x2 /* string | number */ });

export { x3 as foo };
let x3: string | number;
x3 = "abc";
action(() => { x3 /* string | number */ });

let x4: string | number;
x4 = "abc";
action(() => { x4 /* string */ });
export default x4;

let x5: string | number;
x5 = "abc";
action(() => { x5 /* string */ });
