// @strict: true
// @target: esnext
// @module: esnext
// @isolatedModules: true
// @declaration: true
// @filename: values.ts
export const text = "hello";
export const count = 2;
// Numeric strings are string keys; indexing follows ordinary object rules.
export const Source: enum = { A: "source", B: 1, "1": "numeric" };
// @filename: consumer.ts
import { text, count, Source } from "./values";
const Local: enum = { Value: "local" };
// Parentheses are transparent for constant values and member references.
export const E: enum = {
    __proto__: null,
    Text: ((text)),
    Count: (count) + 1,
    ImportedMember: (Source.A),
    ImportedIndex: Source[("B")],
    NumericIndex: Source[(1)],
    LocalMember: Local.Value,
    LocalIndex: Local["Value"],
};
export let value: E = E.Text;
export let member: E.ImportedMember = E.ImportedMember;
