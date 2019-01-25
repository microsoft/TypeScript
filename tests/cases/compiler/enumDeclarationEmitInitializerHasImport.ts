// @declaration: true
// @filename: provider.ts
export enum Enum {
    Value1,
    Value2,
}
// @filename: consumer.ts
import provider = require('./provider');

export const value = provider.Enum.Value1;