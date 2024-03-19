//// [tests/cases/compiler/declarationEmitArrowFunctionNoRenaming.ts] ////

//// [declarationEmitArrowFunctionNoRenaming.ts]
export type Brand<
  Base,
  Branding,
  ReservedName extends string = "__type__"
> = Base & { [K in ReservedName]: Branding } & { __witness__: Base };

export type BoundedInteger<
  LowerBound extends number,
  UpperBound extends number
> = Brand<number, "BoundedInteger">;

export const toBoundedInteger =
  <LowerBound extends number, UpperBound extends number>(bounds: {
    lowerBound: LowerBound;
    upperBound: UpperBound;
  }) =>
  (
    n: number
  ): BoundedInteger<LowerBound, UpperBound> =>
  // Implementation doesn't matter here
    ({} as any)


//// [declarationEmitArrowFunctionNoRenaming.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoundedInteger = void 0;
var toBoundedInteger = function (bounds) {
    return function (n) {
        // Implementation doesn't matter here
        return ({});
    };
};
exports.toBoundedInteger = toBoundedInteger;


//// [declarationEmitArrowFunctionNoRenaming.d.ts]
export type Brand<Base, Branding, ReservedName extends string = "__type__"> = Base & {
    [K in ReservedName]: Branding;
} & {
    __witness__: Base;
};
export type BoundedInteger<LowerBound extends number, UpperBound extends number> = Brand<number, "BoundedInteger">;
export declare const toBoundedInteger: <LowerBound extends number, UpperBound extends number>(bounds: {
    lowerBound: LowerBound;
    upperBound: UpperBound;
}) => (n: number) => BoundedInteger<LowerBound, UpperBound>;
