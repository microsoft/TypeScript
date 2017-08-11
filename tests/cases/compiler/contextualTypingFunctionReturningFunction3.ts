declare function f(n: number): void;
declare function f(cb: () => (n: number) => number): void;

f(() => {
    if (1)
        return n => n;
    else
        return n => n + 1;
});
