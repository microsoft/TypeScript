// @target: esnext
// @lib: es2023
// @strict: true
// @declaration: true
// @noErrorTruncation: false

type T1 = { p1: "a" } | { p1: "b"; p2?: unknown };
type T2 = { p3: string };
type T3 = { readonly p4: string; readonly p5: unknown };
type T4<N1 extends string, N2> = { readonly p4: N1; readonly p5: N2 };
type T5<N> = { p6: string; p7: boolean; p8: number; p9: string };
type T6<N> = N extends { f1: string } ? T5<N> : { p6: string; p7: boolean };
type T7<N1 extends readonly T3[]> = T2 & {
    [N2 in N1[number] as N2["p4"] & string]?: T6<N2["p5"]>;
};
type T8<N1 extends readonly T3[], N2 extends boolean> = T7<N1> &
    (N2 extends true ? { [x1: string]: unknown } : {});
type T9<N1 extends readonly T3[]> = {
    readonly [N2 in N1[number] as N2["p4"]]: unknown;
};
type T10<N1, N2, N3 extends Record<string, unknown>, N4 extends Record<string, T1>> = {
    p11: string;
    f1: string;
    p12?: (x1: N2) => N3;
    p13?: N4;
    p14?: (x1: N3, x2: N1) => readonly string[];
} & { [x1: string]: unknown };

interface I1<
    N1 extends readonly T3[] = readonly [],
    N2 = {},
    N3 extends boolean = false,
    N4 extends boolean = false,
    N5 extends readonly T3[] = readonly [],
> {
    readonly p15?: N3;
    readonly p16?: N4;
    readonly p17?: N5;
    f1<
        const N6 extends string,
        const N7 extends Record<string, unknown> = {},
        const N8 extends Record<string, T1> = {},
    >(
        x1: N6,
        x2: T10<T8<[...N1, ...N5], N4>, T9<N1>, N7, N8>,
    ): I1<
        [...N1, T4<N6, T10<T8<[...N1, ...N5], N4>, T9<N1>, N7, N8>>],
        N2,
        N3,
        N4,
        N5
    >;
}

declare const x1: I1;
const x2 = x1
    .f1("s1", { p11: "1", f1: "f", p14: () => [] })
    .f1("s2", { p11: "2", f1: "f", p14: () => [] })
    .f1("s3", { p11: "3", f1: "f", p13: { p6: { p1: "a" } }, p14: () => [] })
    .f1("s4", { p11: "4", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s5", { p11: "5", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s6", { p11: "6", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s7", { p11: "7", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s8", { p11: "8", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s9", { p11: "9", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s10", { p11: "10", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s11", { p11: "11", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s12", { p11: "12", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s13", { p11: "13", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s14", { p11: "14", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s15", { p11: "15", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s16", { p11: "16", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s17", { p11: "17", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s18", { p11: "18", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s19", { p11: "19", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] })
    .f1("s20", { p11: "20", f1: "f", p14: (x1, x2) => [String(x2.s3?.p6 ?? "")] });

x2.f1("s21", {
    p11: "21",
    f1: "f",
    p12: x1 => ({ p18: x1.s3, p19: x1.s20 }),
    p14: (x1, x2) => {
        const x3: string | undefined = x2.s3?.p6;
        const x4: number | undefined = x2.s3?.p8;
        const x5: boolean | undefined = x2.s20?.p7;
        const x6: unknown = x1.p18;
        const x7: number = x2.s3!.p6;
        x2.s0;
        x1.p0;
        return [x3 ?? ""];
    },
    p20: { p21: true },
});

type T11<N = string> = { p22: N };
interface I2<N> { p22: N; }
type T12<N> = T11<T11<T11<T11<T11<T11<N>>>>>>;

declare function f2<N>(x1: T11<N>): N;
declare function f3<N>(x1: I2<N>): N;
declare function f4<N>(x1: T12<N>): N;
declare const x3: T11;
declare const x4: T11<number>;
declare const x5: I2<number>;
declare const x6: T12<number>;

export const x7 = f2(x3);
export const x8 = f2(x4);
export const x9 = f3(x5);
export const x10 = f4(x6);

declare function f5<N>(x1: { p23: T11<N>; p24: T11<N>; p25: (x1: T11<N>) => void }): N;
export const x11 = f5({ p23: x4, p24: x4, p25: (x1: T11<number | string>) => {} });

export function f6<N>(x1: T11<N>) {
    return f2(x1);
}

declare function f7<N>(x1: T11<N> | N): N;
export const x12 = f7(x4);

declare function f8<N>(x1: T11<N>, x2: T11<NoInfer<N>>): N;
export const x13 = f8(x4, { p22: 1 });
f8(x4, { p22: "x" });

interface I3<N> { p22: N; p26?: I3<N>; }
declare function f9<N>(x1: I3<N>): N;
declare const x14: I3<number>;
export const x15 = f9(x14);

const x16: string = x8;
const x17: string = x9;
const x18: string = x10;
const x19: string = x12;

type T13<N1, N2> = [N1];
type T14<N1, N2> = [N1];
declare function f10<N1, N2>(x1: T13<N1, N2>): N2;
declare function f11<N1, N2>(x1: T13<N1, N2> & number): N2;
declare const x20: T13<string, boolean>;
declare const x21: T14<string, boolean>;
declare const x22: T13<string, boolean> & number;

export const x23 = f10(x20);
export const x24 = f10(x21);
export const x25 = f11(x22);

const x26: boolean = x23;
const x27: boolean = x24;
const x28: boolean = x25;
