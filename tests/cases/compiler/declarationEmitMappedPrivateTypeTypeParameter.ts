// @declaration: true
// @filename: /Helpers.ts
export type StringKeyOf<TObj> = Extract<string, keyof TObj>;

// @filename: /FromFactor.ts
export type RowToColumns<TColumns> = {
    [TName in StringKeyOf<TColumns>]: any;
}