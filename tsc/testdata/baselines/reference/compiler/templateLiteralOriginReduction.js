//// [tests/cases/compiler/templateLiteralOriginReduction.ts] ////

//// [templateLiteralOriginReduction.ts]
type Pattern = `${string}Downcast`;
type Choice = "dataDowncast" | "editingDowncast" | Pattern;
type OtherChoice = "otherDowncast" | Pattern;
type MappedChoice = "DATADOWNCAST" | "EDITINGDOWNCAST" | Uppercase<Pattern>;
type UppercaseChoice = "DATA" | "EDITING" | Uppercase<string>;
type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends
    (<Value>() => Value extends Right ? 1 : 2) ? true : false;
const identity: Equal<Choice, Pattern> = true;
const mergedIdentity: Equal<Choice | OtherChoice | Pattern, Pattern> = true;
const mappedIdentity: Equal<MappedChoice, Uppercase<Pattern>> = true;
const intersectionIdentity: Equal<Choice & {}, Pattern> = true;
const uppercaseIdentity: Equal<UppercaseChoice, Uppercase<string>> = true;
export function choose(value: Choice) { return value; }
export function merge(value: Choice | OtherChoice | Pattern) { return value; }
export function withExtra(value: "downcast" | Choice) { return value; }
export function mapped(value: MappedChoice) { return value; }
export function uppercase(value: UppercaseChoice) { return value; }
const invalid: Choice = "downcast";
const invalidUppercase: UppercaseChoice = "lowercase";

declare const values: Record<Choice, number>;
export const known = values.dataDowncast;
export const arbitrary = values.otherDowncast;
declare const plain: Record<Pattern, number>;
export const plainLiteral = plain.dataDowncast;

type Generic<Value extends string> = Value | Pattern;
declare const generic: Generic<"dataDowncast">;
const genericIdentity: Equal<typeof generic, Pattern> = true;
export const genericValue = generic;

declare const upper: Record<UppercaseChoice, number>;
export const uppercaseKnown = upper.DATA;
export const uppercaseOther = upper.OTHER;

//// [templateLiteralOriginReduction.js]
const identity = true;
const mergedIdentity = true;
const mappedIdentity = true;
const intersectionIdentity = true;
const uppercaseIdentity = true;
export function choose(value) { return value; }
export function merge(value) { return value; }
export function withExtra(value) { return value; }
export function mapped(value) { return value; }
export function uppercase(value) { return value; }
const invalid = "downcast";
const invalidUppercase = "lowercase";
export const known = values.dataDowncast;
export const arbitrary = values.otherDowncast;
export const plainLiteral = plain.dataDowncast;
const genericIdentity = true;
export const genericValue = generic;
export const uppercaseKnown = upper.DATA;
export const uppercaseOther = upper.OTHER;


//// [templateLiteralOriginReduction.d.ts]
type Pattern = `${string}Downcast`;
type Choice = "dataDowncast" | "editingDowncast" | Pattern;
type OtherChoice = "otherDowncast" | Pattern;
type MappedChoice = "DATADOWNCAST" | "EDITINGDOWNCAST" | Uppercase<Pattern>;
type UppercaseChoice = "DATA" | "EDITING" | Uppercase<string>;
export declare function choose(value: Choice): Choice;
export declare function merge(value: Choice | OtherChoice | Pattern): `${string}Downcast`;
export declare function withExtra(value: "downcast" | Choice): "downcast" | `${string}Downcast`;
export declare function mapped(value: MappedChoice): MappedChoice;
export declare function uppercase(value: UppercaseChoice): UppercaseChoice;
export declare const known: number;
export declare const arbitrary: number | undefined;
export declare const plainLiteral: number | undefined;
type Generic<Value extends string> = Value | Pattern;
export declare const genericValue: Generic<"dataDowncast">;
export declare const uppercaseKnown: number;
export declare const uppercaseOther: number | undefined;
export {};
