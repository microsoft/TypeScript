//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInference.ts] ////

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
var b1 = { value: su === null || su === void 0 ? void 0 : su.length };
var v1 = unbox(b1);
var b2 = { value: su === null || su === void 0 ? void 0 : su.length };
var v2 = unbox(b2);
var b3 = { value: su === null || su === void 0 ? void 0 : su.length };
var v3 = unbox(b3);
var b4 = { value: fnu === null || fnu === void 0 ? void 0 : fnu() };
var v4 = unbox(b4);
var b5 = { value: su === null || su === void 0 ? void 0 : su["length"] };
var v5 = unbox(b5);
var b6 = { value: osu === null || osu === void 0 ? void 0 : osu.prop.length };
var v6 = unbox(b6);
var b7 = { value: osu === null || osu === void 0 ? void 0 : osu.prop["length"] };
var v7 = unbox(b7);
var b8 = { value: ofnu === null || ofnu === void 0 ? void 0 : ofnu.prop() };
var v8 = unbox(b8);
