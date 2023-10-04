function foo() {
    return 42;
}

export class A {
    readonly b = (): number => foo();
    readonly c = function(): number { return foo(); };
}

export const b = (): number => foo();
export const c = function(): number { return foo(); };