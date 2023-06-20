// @strict: true
// @noEmit: true

type Arg = {
    mode: "numeric",
    data: number,
} | {
    mode: "alphabetic",
    data: string,
} | {
    data: string | Uint8Array;
}

declare function foo(arg: Arg): void;
foo({ mode: "numeric", data: new Uint8Array([30]) }); // Should error