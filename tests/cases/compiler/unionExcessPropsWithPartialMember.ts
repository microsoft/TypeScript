// @strict: true
interface A {
    unused?: string;
    x: string;
}

interface B {
    x: string;
    y: string;
}

declare var ab: A | B;
declare var a: A;

ab = {...a, y: (null as any as string | undefined)}; // Should be allowed, since `y` is missing on `A`
