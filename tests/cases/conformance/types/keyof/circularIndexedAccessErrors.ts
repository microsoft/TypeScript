// @declaration: true

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