// @strict: false

declare const o1: undefined | (() => number);
o1?.();

declare const o2: undefined | { b: () => number };
o2?.b();

declare const o3: { b: (() => { c: string }) | undefined };
o3.b?.().c;
