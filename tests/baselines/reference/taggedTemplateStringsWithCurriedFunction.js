//// [tests/cases/compiler/taggedTemplateStringsWithCurriedFunction.ts] ////

//// [taggedTemplateStringsWithCurriedFunction.ts]
// Originated from #38558

const f = _ => (..._) => "";

f({ ...{ x: 0 } })``;
f({ ...{ x: 0 } })`x`;
f({ ...{ x: 0 } })`x${f}x`;
f({ ...{ x: 0 }, y: (() => 1)() })``;
f({ x: (() => 1)(), ...{ y: 1 } })``;


//// [taggedTemplateStringsWithCurriedFunction.js]
// Originated from #38558
const f = _ => (..._) => "";
f(Object.assign({ x: 0 })) ``;
f(Object.assign({ x: 0 })) `x`;
f(Object.assign({ x: 0 })) `x${f}x`;
f(Object.assign({ x: 0 }, { y: (() => 1)() })) ``;
f(Object.assign({ x: (() => 1)() }, { y: 1 })) ``;
