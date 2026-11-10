//// [tests/cases/compiler/erasableEnumConstants.ts] ////

//// [values.ts]
export const text = "hello";
export const count = 2;
// Explicit numeric keys are ordinary properties, not reverse mappings.
export const Source: enum = { A: "source", B: 1, 1: "numeric" };
//// [consumer.ts]
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


//// [values.js]
export const text = "hello";
export const count = 2;
// Explicit numeric keys are ordinary properties, not reverse mappings.
export const Source = { A: "source", B: 1, 1: "numeric" };
//// [consumer.js]
import { text, count, Source } from "./values";
const Local = { Value: "local" };
// Parentheses are transparent for constant values and member references.
export const E = {
    __proto__: null,
    Text: ((text)),
    Count: (count) + 1,
    ImportedMember: (Source.A),
    ImportedIndex: Source[("B")],
    NumericIndex: Source[(1)],
    LocalMember: Local.Value,
    LocalIndex: Local["Value"],
};
export let value = E.Text;
export let member = E.ImportedMember;


//// [values.d.ts]
export declare const text = "hello";
export declare const count = 2;
export declare const Source: enum = { A: "source", B: 1, 1: "numeric" };
//// [consumer.d.ts]
export declare const E: enum = {
    __proto__: null,
    Text: "hello",
    Count: 3,
    ImportedMember: "source",
    ImportedIndex: 1,
    NumericIndex: "numeric",
    LocalMember: "local",
    LocalIndex: "local"
};
export declare let value: E;
export declare let member: E.ImportedMember;
