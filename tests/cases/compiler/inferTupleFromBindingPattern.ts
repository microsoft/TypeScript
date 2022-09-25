declare function f<T>(cb: () => T): T;
const [e1, e2, e3] = f(() => [1, "hi", true]);
