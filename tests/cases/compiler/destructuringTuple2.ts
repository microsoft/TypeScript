declare const f: <T>(cb: () => T) => T;
const [a, b, c] = f(() => [1, "hi", true]);
