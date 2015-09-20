
// Union or intersection ambiguity
function test(x: string | new() => void) { }

let a: string | new () => void;
let b: string | (new () => void);
let c: string | new () => void /* not part of error */
let d: string | new () => void | number;
let e: string | <T>(...) => void | void;

// Missing identifier or keyword
let f: TypeModule1.

module TypeModule2 {
}

let g: x.void;
let h = (a: ) => {
}
Foo<a, , b>();
