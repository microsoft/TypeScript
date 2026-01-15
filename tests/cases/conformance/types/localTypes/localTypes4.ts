// @allowUnreachableCode: true

function f1() {
    // Type parameters are in scope in parameters and return types
    function f<T>(x: T): T {
        return undefined;
    }
}

function f2() {
    // Local types are not in scope in parameters and return types
    function f(x: T): T {
        interface T { }
        return undefined;
    }
}

function f3() {
    // Type parameters and top-level local types are in same declaration space
    function f<T>() {
        interface T { }
        return undefined;
    }
}

function f4() {
    // Local types are block scoped
    interface T { x: number }
    let v: T;
    v.x = 10;
    if (true) {
        interface T { x: string }
        let v: T;
        v.x = "hello";
    }
    else {
        v.x = 20;
    }
}
