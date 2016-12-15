//// [circularIndexedAccessErrors.ts]

type T1 = {
    x: T1["x"];  // Error
};

type T2<K extends "x" | "y"> = {
    x: T2<K>[K];  // Error
    y: number;
}

declare let x2: T2<"x">;
let x2x = x2.x;

interface T3<T extends T3<T>> {
    x: T["x"];  // Error
}

interface T4<T extends T4<T>> {
    x: T4<T>["x"];  // Error
}

class C1 {
    x: C1["x"];  // Error
}

class C2 {
    x: this["y"];  // Error
    y: this["z"];  // Error
    z: this["x"];  // Error
}

//// [circularIndexedAccessErrors.js]
var x2x = x2.x;
var C1 = (function () {
    function C1() {
    }
    return C1;
}());
var C2 = (function () {
    function C2() {
    }
    return C2;
}());


//// [circularIndexedAccessErrors.d.ts]
declare type T1 = {
    x: T1["x"];
};
declare type T2<K extends "x" | "y"> = {
    x: T2<K>[K];
    y: number;
};
declare let x2: T2<"x">;
declare let x2x: any;
interface T3<T extends T3<T>> {
    x: T["x"];
}
interface T4<T extends T4<T>> {
    x: T4<T>["x"];
}
declare class C1 {
    x: C1["x"];
}
declare class C2 {
    x: this["y"];
    y: this["z"];
    z: this["x"];
}
