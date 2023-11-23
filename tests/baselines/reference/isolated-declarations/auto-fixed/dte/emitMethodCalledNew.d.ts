//// [tests/cases/compiler/emitMethodCalledNew.ts] ////

//// [emitMethodCalledNew.ts]
// https://github.com/microsoft/TypeScript/issues/55075

export const a = {
  new(x: number): number { return x + 1 }
}
export const b = {
  "new"(x: number): number { return x + 1 }
}
export const c = {
  ["new"](x: number): number { return x + 1 }
}


/// [Declarations] ////



//// [emitMethodCalledNew.d.ts]
export declare const a: {
    new(x: number): number;
};
export declare const b: {
    new(x: number): number;
};
export declare const c: {
    new(x: number): number;
};
//# sourceMappingURL=emitMethodCalledNew.d.ts.map