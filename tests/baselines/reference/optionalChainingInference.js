//// [optionalChainingInference.ts]
// https://github.com/microsoft/TypeScript/issues/34579
declare function unbox<T>(box: { value: T | undefined }): T;
declare const su: string | undefined;
declare const fnu: (() => number) | undefined;
declare const osu: { prop: string } | undefined;
declare const ofnu: { prop: () => number } | undefined;

const b1 = { value: su?.length };
const v1: number = unbox(b1);

const b2 = { value: su?.length as number | undefined };
const v2: number = unbox(b2);

const b3: { value: number | undefined } = { value: su?.length };
const v3: number = unbox(b3);

const b4 = { value: fnu?.() };
const v4: number = unbox(b4);

const b5 = { value: su?.["length"] };
const v5: number = unbox(b5);

const b6 = { value: osu?.prop.length };
const v6: number = unbox(b6);

const b7 = { value: osu?.prop["length"] };
const v7: number = unbox(b7);

const b8 = { value: ofnu?.prop() };
const v8: number = unbox(b8);



//// [optionalChainingInference.js]
var _a, _b, _c, _d, _e, _f, _g, _h;
var b1 = { value: (_a = su) === null || _a === void 0 ? void 0 : _a.length };
var v1 = unbox(b1);
var b2 = { value: (_b = su) === null || _b === void 0 ? void 0 : _b.length };
var v2 = unbox(b2);
var b3 = { value: (_c = su) === null || _c === void 0 ? void 0 : _c.length };
var v3 = unbox(b3);
var b4 = { value: (_d = fnu) === null || _d === void 0 ? void 0 : _d() };
var v4 = unbox(b4);
var b5 = { value: (_e = su) === null || _e === void 0 ? void 0 : _e["length"] };
var v5 = unbox(b5);
var b6 = { value: (_f = osu) === null || _f === void 0 ? void 0 : _f.prop.length };
var v6 = unbox(b6);
var b7 = { value: (_g = osu) === null || _g === void 0 ? void 0 : _g.prop["length"] };
var v7 = unbox(b7);
var b8 = { value: (_h = ofnu) === null || _h === void 0 ? void 0 : _h.prop() };
var v8 = unbox(b8);
