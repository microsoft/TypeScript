function f<T, K extends keyof T>() {
    var t: T;
    var k: K;
    var v = {
        [t]: 0,
        [k]: 1
    };
}
