// @strict: true
// @target: esnext
// @declaration: true
// @noUncheckedIndexedAccess: true

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