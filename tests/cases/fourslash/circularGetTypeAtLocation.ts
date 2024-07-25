/// <reference path='fourslash.ts' />

// Issue #48313

// @strict: true
// @target: esnext
// @Filename: /file.tsx
//// export function working(baseVersion?: string): number[] {
////     const toRelease: number[] = [];
////     const baseRelease: number[] = [];
////     return baseRelease.map((_, index) => {
////         const toPart = toRelease[index] ?? 0;
////         [|toPart|]; // this is the "working" log
////         return 0;
////     });
//// }
//// 
//// export function broken(baseVersion?: string): number[] {
////     const toRelease: number[] = [];
////     const baseRelease: number[] = [];
////     return baseRelease.map((_, index) => {
////         const toPart = toRelease[index] ?? 0;
////         [|toPart|]; // this is the "broken" log
////         return toPart + (baseVersion === undefined ? 0 : 1);
////     });
//// }

const [r_ok, r_bad] = test.ranges();
verify.typeAtLocation(r_ok, "number");
verify.typeAtLocation(r_bad, "number");
