// @strict: true
// @allowUnreachableCode: false
// @noEmit: true
// @noTypesAndSymbols: true

declare function c(x?: undefined): boolean;

function f1() { while (c() ?? (c() || true)) {} c(); }
function f2() { while (true ?? (c() || true)) {} c(); }
function f3() { while (null ?? (c() || true)) {} c(); }
function f4() { while ((c() ? 1 : 2) ?? (c() || true)) {} c(); }
function f5() { while ((c() || null)! ?? (c() || true)) {} c(); }
function f6(a: "" | object | undefined, b: boolean) { if (a ?? b) {} else { const s: "" | undefined = a; const u: undefined = a; } ((a ?? b) || b) ?? c(a); }
function f7(a: "" | boolean | undefined, b: boolean) { if (a ??= b) {} else { a === ""; } }
