function foo() {
    return 42;
}

export class A {
    readonly b = () => foo();
    readonly c = function() { return foo(); };
}

export const b = () => foo();
export const c = function() { return foo(); };