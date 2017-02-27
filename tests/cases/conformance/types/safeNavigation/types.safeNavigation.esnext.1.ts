// @target: esnext
// @lib: esnext
// @noEmit: true
// @module: commonjs
// @strictNullChecks: false
// @experimentalNullPropagation: true
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

x1?.();
(x1)?.();

x2.y?.();
x2[y]?.();
(x2.y)?.();
(x2[y])?.();
x3?.y?.();
x3?.[y]?.();

x4.y.z?.();
x4.y[z]?.();
(x4.y.z)?.();
(x4.y[z])?.();
x5?.y?.z?.();
x5?.y?.z;
x5?.[y]?.[z];

x6?.y = 1;
x6?.y += 1;
x6?.y *= 1;
x6?.y++;
++x6?.y;
