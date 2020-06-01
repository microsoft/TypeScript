//// [optionalChainingStatementExpression.ts]
type MaybeClosable = {
  close?: () => {};
};
type PerhapsMaybe = {
  maybe?: MaybeClosable;
}
type PossiblyPerhapsMaybe = {
  possibly?: PerhapsMaybe;
}

declare const maybe: MaybeClosable;
maybe.close?.()
const a = maybe.close?.()

declare const perhaps: PerhapsMaybe;
perhaps.maybe?.close?.();
const b = perhaps.maybe?.close?.();

declare const poss: PossiblyPerhapsMaybe;
function closeIfYouWant() {
  poss.possibly?.maybe?.close?.();
  return poss.possibly?.maybe?.close?.();
}


//// [optionalChainingStatementExpression.js]
"use strict";
var _a, _b, _c, _d, _e, _f;
(_a = maybe.close) !== null && _a !== void 0 && _a.call(maybe);
var a = (_b = maybe.close) === null || _b === void 0 ? void 0 : _b.call(maybe);
(_d = (_c = perhaps.maybe) !== null && _c !== void 0 && _c.close) !== null && _d !== void 0 && _d.call(_c);
var b = (_f = (_e = perhaps.maybe) === null || _e === void 0 ? void 0 : _e.close) === null || _f === void 0 ? void 0 : _f.call(_e);
function closeIfYouWant() {
    var _a, _b, _c, _d, _e, _f;
    (_c = (_b = (_a = poss.possibly) !== null && _a !== void 0 && _a.maybe) !== null && _b !== void 0 && _b.close) !== null && _c !== void 0 && _c.call(_b);
    return (_f = (_e = (_d = poss.possibly) === null || _d === void 0 ? void 0 : _d.maybe) === null || _e === void 0 ? void 0 : _e.close) === null || _f === void 0 ? void 0 : _f.call(_e);
}
