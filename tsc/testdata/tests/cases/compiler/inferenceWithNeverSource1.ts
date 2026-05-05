// @strict: true

// https://github.com/microsoft/typescript-go/issues/3688
type Paths<T> = unknown extends T ? string : string;

declare function f<
    R extends { p: any },
    const T extends string = string,
>(opts: {
    from?: (T & Paths<R["p"]>) | Paths<R["p"]>;
    via: string extends T ? "wide" : "narrow";
}): void;

f({ from: "x", via: "narrow" });
f({ from: "x" as "x", via: "narrow" });
f({ from: "x" as never, via: "narrow" });
