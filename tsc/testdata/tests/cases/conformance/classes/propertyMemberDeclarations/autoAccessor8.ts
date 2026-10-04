// @target: esnext
// @declaration: true

class C1 {
    accessor a: any;
    static accessor b: any;
}

declare class C2 {
    accessor a: any;
    static accessor b: any;
}

function f() {
    class C3 {
        accessor a: any;
        static accessor b: any;
    }
    return C3;
}
