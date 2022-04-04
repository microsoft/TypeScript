type A = {
    get foo() { return 0 }
};

type B = {
    set foo(v: any) { }
};

interface X {
    get foo() { return 0 }
}

interface Y {
    set foo(v: any) { }
}

