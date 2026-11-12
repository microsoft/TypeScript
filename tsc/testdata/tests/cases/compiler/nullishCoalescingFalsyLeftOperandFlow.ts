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
function f8(a: "" | undefined) { let b: 0 | 1 = 0; if ((a ?? (b = 1, ""))?.[b = 1]) {} else { const one: 1 = b; } }
function f9(a: ((x: 1) => boolean) | undefined, d: (x: 1) => boolean) { let b: 0 | 1 = 0; if ((a ?? (b = 1, d))?.(b = 1)) {} else { const one: 1 = b; } }
function f10(u: { tag: ""; empty: 1 } | { tag: "ok" }) { if ((u.tag) ?? (false || true)) {} else { u.empty; } }
function f11(u: { tag: ""; empty: 1 } | { tag: "ok" }) { if (u.tag! ?? (false || true)) {} else { u.empty; } }
