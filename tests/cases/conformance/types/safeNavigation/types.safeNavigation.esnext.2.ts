// @target: esnext
// @lib: esnext
// @noEmit: true
// @module: commonjs
// @strictNullChecks: true
declare const x1: (() => number) | undefined | null;
declare const x2: { y: (() => number) | undefined | null; };
declare const x3: { y: (() => number) | undefined | null; } | undefined | null;
declare const x4: { y: { z: (() => number) | undefined | null; } };
declare const x5: { y: { z: (() => number) | undefined | null; } | undefined | null } | undefined | null;
declare const x6: { y: number } | undefined | null;
declare const x7: { y: any };
declare const x8: { y: { z: number } | undefined | null } | undefined | null;
declare const y: "y";
declare const z: "z";

const a1 = x1?.();
const a2 = (x1)?.();

const a3 = x2.y?.();
const a4 = x2[y]?.();
const a5 = (x2.y)?.();
const a6 = (x2[y])?.();
const a7 = x3?.y?.();
const a8 = x3?.[y]?.();

const a9 = x4.y.z?.();
const a10 = x4.y[z]?.();
const a11 = (x4.y.z)?.();
const a12 = (x4.y[z])?.();
const a13 = x5?.y?.z?.();
const a14 = x5?.y?.z;
const a15 = x5?.[y]?.[z];

const a16 = x6?.y = 1;
const a17 = x6?.y += 1;
const a17a = x6?.y *= 1;
const a18 = x6?.y++;
const a19 = ++x6?.y;
