// @strict: true

declare const o1: undefined | ((...args: any[]) => number);
o1?.();
o1?.(1);
o1?.(...[1, 2]);
o1?.(1, ...[2, 3], 4);

declare const o2: undefined | { b: (...args: any[]) => number };
o2?.b();
o2?.b(1);
o2?.b(...[1, 2]);
o2?.b(1, ...[2, 3], 4);
o2?.["b"]();
o2?.["b"](1);
o2?.["b"](...[1, 2]);
o2?.["b"](1, ...[2, 3], 4);

declare const o3: { b: ((...args: any[]) => { c: string }) | undefined };
o3.b?.().c;
o3.b?.(1).c;
o3.b?.(...[1, 2]).c;
o3.b?.(1, ...[2, 3], 4).c;
o3.b?.()["c"];
o3.b?.(1)["c"];
o3.b?.(...[1, 2])["c"];
o3.b?.(1, ...[2, 3], 4)["c"];
o3["b"]?.().c;
o3["b"]?.(1).c;
o3["b"]?.(...[1, 2]).c;
o3["b"]?.(1, ...[2, 3], 4).c;

declare const o4: undefined | (<T>(f: (a: T) => T) => T);
declare function incr(x: number): number;
const v: number | undefined = o4?.(incr);

// GH#33744
declare const o5: <T>() => undefined | (() => void);
o5<number>()?.();

// GH#36031
o2?.b()!.toString;
o2?.b()!.toString!;