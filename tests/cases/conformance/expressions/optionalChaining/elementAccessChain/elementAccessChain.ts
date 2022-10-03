// @strict: true

declare const o1: undefined | { b: string };
o1?.["b"];

declare const o2: undefined | { b: { c: string } };
o2?.["b"].c;
o2?.b["c"];

declare const o3: { b: undefined | { c: string } };
o3["b"]?.c;
o3.b?.["c"];

declare const o4: { b?: { c: { d?: { e: string } } } };
o4.b?.["c"].d?.e;
o4.b?.["c"].d?.["e"];

declare const o5: { b?(): { c: { d?: { e: string } } } };
o5.b?.()["c"].d?.e;
o5.b?.()["c"].d?.["e"];
o5["b"]?.()["c"].d?.e;
o5["b"]?.()["c"].d?.["e"];

// GH#33744
declare const o6: <T>() => undefined | ({ x: number });
o6<number>()?.["x"];

// GH#36031
o2?.["b"]!.c;
o2?.["b"]!["c"];
o2?.["b"]!.c!;
o2?.["b"]!["c"]!;