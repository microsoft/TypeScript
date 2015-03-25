declare function dec<T>(target: T): T;

module M1 {
    export var X: number;
}

module M2 {
    @dec
    import X = M1.X;
}