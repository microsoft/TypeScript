var x: any = { p: 0 };

declare class Foo { }
interface Bar { }

declare function isFoo(x: any): x is Foo;
declare function isBar(x: any): x is Bar;

if (x instanceof Object) {
    x.p; // Error, type narrowed by instanceof type guard
}
else {
    x.p; // No error, type any unaffected by instanceof type guard
}

if (typeof x === "string") {
    x.p; // Error, type any narrowed by primitive type check
}
else {
    x.p; // No error, type unaffected in this branch
}

if (typeof x === "number") {
    x.p; // Error, type any narrowed by primitive type check
}
else {
    x.p; // No error, type unaffected in this branch
}

if (typeof x === "boolean") {
    x.p; // Error, type any narrowed by primitive type check
}
else {
    x.p; // No error, type unaffected in this branch
}

if (typeof x === "object") {
    x.p; // No error, type any only affected by primitive type check
}
else {
    x.p; // No error, type unaffected in this branch
}

if (isFoo(x)) {
    x.p; // Error, type narrowed by user-defined type guard
}
else {
    x.p; // No error, type unaffected in this branch
}

if (isBar(x)) {
    x.p; // Error, type narrowed by user-defined type guard
}
else {
    x.p; // No error, type unaffected in this branch
}