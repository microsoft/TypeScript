//// [tests/cases/compiler/parseInvalidNonNullableTypes.ts] ////

//// [parseInvalidNonNullableTypes.ts]
function f1(a: string): a is string! {
    return true;
}

function f2(a: string): a is !string {
    return true;
}

function f3(a: string!) {}
function f4(a: number!) {}

function f5(a: !string) {}
function f6(a: !number) {}

function f7(): string! {}
function f8(): !string {}

const a = 1 as any!;
const b: number! = 1;

const c = 1 as !any;
const d: !number = 1;


//// [parseInvalidNonNullableTypes.js]
function f1(a) { }
!{
    return: true,
};
function f2(a) {
    return true;
}
function f3(a, ) { }
function f4(a, ) { }
function f5(a) { }
function f6(a) { }
function f7() { }
!{};
function f8() { }
const a = 1;
!;
const b;
!;
1;
const c = 1;
const d = 1;
