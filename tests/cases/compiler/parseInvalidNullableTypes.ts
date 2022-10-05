// @strict: true

function f1(a: string): a is string? {
    return true;
}

function f2(a: string): a is ?string {
    return true;
}

function f3(a: string?) {}
function f4(a: number?) {}

function f5(a: ?string) {}
function f6(a: ?number) {}

function f7(a: string): string? {
    return true;
}

function f8(a: string): ?string {
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
