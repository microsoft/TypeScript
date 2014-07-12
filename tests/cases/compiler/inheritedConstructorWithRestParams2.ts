class IBaseBase<T, U> {
    constructor(x: U) { }
}

interface IBase<T, U> extends IBaseBase<T, U> { }

class BaseBase2 {
    constructor(x: number) { }
}

declare class BaseBase<T, U> extends BaseBase2 implements IBase<T, U> {
    constructor(x: T, ...y: U[]);
    constructor(x1: T, x2: T, ...y: U[]);
    constructor(x1: T, x2: U, y: T);
}

class Base extends BaseBase<string, number> {
}

class Derived extends Base { }

// Ok
new Derived("", "");
new Derived("", 3);
new Derived("", 3, 3);
new Derived("", 3, 3, 3);
new Derived("", 3, "");
new Derived("", "", 3);
new Derived("", "", 3, 3);

// Errors
new Derived(3);
new Derived("", 3, "", 3);
new Derived("", 3, "", "");