function foo() {
    return 42;
}

export const a = foo();
const b = foo();

export const c = 42;
const d = 42;

export const e = "42";
const f = "42";

export const g = foo() === 0? "42": "43";
const h = foo() === 0? "42": "43";