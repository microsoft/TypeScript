// @strict: true

function f1(a: string): a is ?string {
    return true;
}

function f2(a: string?) {}
function f3(a: number?) {}

function f4(a: ?string) {}
function f5(a: ?number) {}

function f6(a: string): ?string {
    return true;
}

const a = 1 as any?;
const b: number? = 1;

const c = 1 as ?any;
const d: ?number = 1;

let e: unknown?;
let f: never?;
let g: void?;
let h: undefined?;
