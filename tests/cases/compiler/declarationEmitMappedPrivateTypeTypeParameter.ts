// @module: commonjs
// @target: es2015
// @declaration: true
// @filename: /Helpers.ts
export type StringKeyOf<TObj> = Extract<string, keyof TObj>;

// @filename: /FromFactor.ts
export type RowToColumns<TColumns> = {
    [TName in StringKeyOf<TColumns>]: any;
}