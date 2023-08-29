//// [tests/cases/compiler/typeParameterLeak.ts] ////

//// [typeParameterLeak.ts]
// Repro from #35655

interface Box<T> { data: T }
type BoxTypes = Box<{ x: string }> | Box<{ y: string }>;

type BoxFactoryFactory<TBox> = TBox extends Box<infer T> ? {
  (arg: T): BoxFactory<TBox> | undefined
} : never;

interface BoxFactory<A> {
  getBox(): A,
}

declare const f: BoxFactoryFactory<BoxTypes>;
const b = f({ x: "", y: "" })?.getBox();
if (b) {
  const x = b.data;
}


//// [typeParameterLeak.js]
"use strict";
// Repro from #35655
var _a;
var b = (_a = f({ x: "", y: "" })) === null || _a === void 0 ? void 0 : _a.getBox();
if (b) {
    var x = b.data;
}
