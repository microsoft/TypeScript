
function foo(x: { a: string }): number {
    return undefined;
}

foo(true);

function functionWithOverloads(x: { x: number }): void;
function functionWithOverloads(x: { x: number, y: string }): number {
    return undefined;
}

functionWithOverloads({ x: "hello" });

functionWithOverloads({ y: 10 });

functionWithOverloads({ x: "hello", y: 10 });

functionWithOverloads({ y: "hello" });