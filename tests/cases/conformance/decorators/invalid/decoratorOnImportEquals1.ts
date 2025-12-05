declare function dec<T>(target: T): T;

namespace M1 {
    export var X: number;
}

namespace M2 {
    @dec
    import X = M1.X;
}