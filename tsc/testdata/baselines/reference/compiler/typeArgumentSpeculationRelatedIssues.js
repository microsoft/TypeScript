//// [tests/cases/compiler/typeArgumentSpeculationRelatedIssues.ts] ////

//// [issue37760.ts]
// https://github.com/microsoft/TypeScript/issues/37760
export {};
function alignof<T>(): number {
    return 1;
}

// A right shift already parsed correctly.
function foo<T>(): number {
    return 1 >> alignof<T[]>();
}

// A left shift must not become two type-argument openers.
function bar<T>(): number {
    return 1 << alignof<T[]>();
}

function baz<T>(): number {
    // @ts-ignore
    return 1 << alignof<T[]>();
}

//// [issue43720.ts]
// https://github.com/microsoft/TypeScript/issues/43720
export {};
declare const res: any;
for (let i = 0; i < (<any[]>(<any>res).Data).length; i++) { }

// The original report's extracted-condition workaround remains equivalent.
let ln = (<any[]>(<any>res).Data).length;
for (let i = 0; i < ln; i++) { }

//// [issue61975.ts]
// https://github.com/microsoft/TypeScript/issues/61975
export {};
class Pantries<A> {
    constructor(precise: A) {
        this.precise = precise;
    }
    precise: A;
}

function sparrow(): boolean {
    const sobbed: boolean = true;
    return "abc" < (sobbed ? new Pantries<string>("a") : new Pantries<string>("b")).precise;
}

function sparrow1(): string {
    const sobbed: boolean = true;
    return (sobbed ? new Pantries<string>("a") : new Pantries<string>("b")).precise;
}

function sparrow2(): boolean {
    const sobbed: boolean = true;
    return "abc" < (sobbed ? (new Pantries<string>("a")) : new Pantries<string>("b")).precise;
}


//// [issue37760.js]
function alignof() {
    return 1;
}
// A right shift already parsed correctly.
function foo() {
    return 1 >> alignof();
}
// A left shift must not become two type-argument openers.
function bar() {
    return 1 << alignof();
}
function baz() {
    // @ts-ignore
    return 1 << alignof();
}
export {};
//// [issue43720.js]
for (let i = 0; i < res.Data.length; i++) { }
// The original report's extracted-condition workaround remains equivalent.
let ln = res.Data.length;
for (let i = 0; i < ln; i++) { }
export {};
//// [issue61975.js]
class Pantries {
    constructor(precise) {
        this.precise = precise;
    }
    precise;
}
function sparrow() {
    const sobbed = true;
    return "abc" < (sobbed ? new Pantries("a") : new Pantries("b")).precise;
}
function sparrow1() {
    const sobbed = true;
    return (sobbed ? new Pantries("a") : new Pantries("b")).precise;
}
function sparrow2() {
    const sobbed = true;
    return "abc" < (sobbed ? (new Pantries("a")) : new Pantries("b")).precise;
}
export {};
