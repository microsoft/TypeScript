// @strict: true

let x: string | boolean | number;
let obj: any;

x = "";
x = x.length;
x; // number

x = true;
(x = "", obj).foo = (x = x.length);
x; // number

// https://github.com/microsoft/TypeScript/issues/35484
type D = { done: true, value: 1 } | { done: false, value: 2 };
declare function fn(): D;
let o: D;
if ((o = fn()).done) {
    const y: 1 = o.value;
}

// https://github.com/microsoft/TypeScript/issues/47731
declare let a: object | any[] | undefined

if (a === undefined) {
    a = []
} else if (!Array.isArray(a)) {
    throw new Error()
}
[...a] // any[]

interface Parent {
    parent: string;
}
interface Child extends Parent {
    child: string;
}

declare let p: Parent;
declare let c: Child;
declare let y: Parent | Child | undefined;

y = p;
y;  // Parent

y = c;
y;  // Child

y = undefined as any as Parent | Child;
y;  // Parent | Child

y = undefined as any as Parent | undefined;
y;  // Parent | undefined

y = undefined as any as Child | undefined;
y;  // Child | undefined
