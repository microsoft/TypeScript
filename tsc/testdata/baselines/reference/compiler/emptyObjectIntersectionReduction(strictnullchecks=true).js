//// [tests/cases/compiler/emptyObjectIntersectionReduction.ts] ////

//// [emptyObjectIntersectionReduction.ts]
export function stringRight(value: string & {}) { return value; }
export function stringLeft(value: {} & string) { return value; }
export function numberRight(value: number & {}) { return value; }
export function numberLeft(value: {} & number) { return value; }
export function bigintRight(value: bigint & {}) { return value; }
export function bigintLeft(value: {} & bigint) { return value; }
export function templateRight(value: `prefix${string}` & {}) { return value; }
export function templateLeft(value: {} & `prefix${string}`) { return value; }

export function stringUnion(value: "literal" | (string & {})) { return value; }
export function numberUnion(value: 1 | (number & {})) { return value; }
export function bigintUnion(value: 1n | (bigint & {})) { return value; }
export function templateUnion(value: "prefixValue" | (`prefix${string}` & {})) { return value; }
export function explicitExclusions(value: string & not null & not undefined) { return value; }

type Choice = "a" | "b" | string;
type OtherChoice = "c" | string;
type NumericChoice = 1 | 2 | number;
type BigIntChoice = 1n | 2n | bigint;
type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends
	(<Value>() => Value extends Right ? 1 : 2) ? true : false;
const stringIdentity: Equal<Choice, string> = true;
const numberIdentity: Equal<NumericChoice, number> = true;
const bigintIdentity: Equal<BigIntChoice, bigint> = true;
const mergedIdentity: Equal<Choice | OtherChoice | string, string> = true;
const mixedIdentity: Equal<Choice | number, string | number> = true;
const intersectionIdentity: Equal<Choice & {}, string> = true;
export function mergedChoices(value: Choice | OtherChoice | string) { return value; }
export function mixedChoices(value: Choice | number) { return value; }

type GenericChoice<Value> = "a" | "b" | string;
export function genericChoice<Value>(value: GenericChoice<Value>) { return value; }
export const instantiatedChoice = genericChoice<number>("other");
type ChoiceMap = { [key in Choice]: number };
declare const choiceMap: ChoiceMap;
export const numericIndex = choiceMap[0];
export const stringIndex = choiceMap["other"];

//// [emptyObjectIntersectionReduction.js]
export function stringRight(value) { return value; }
export function stringLeft(value) { return value; }
export function numberRight(value) { return value; }
export function numberLeft(value) { return value; }
export function bigintRight(value) { return value; }
export function bigintLeft(value) { return value; }
export function templateRight(value) { return value; }
export function templateLeft(value) { return value; }
export function stringUnion(value) { return value; }
export function numberUnion(value) { return value; }
export function bigintUnion(value) { return value; }
export function templateUnion(value) { return value; }
export function explicitExclusions(value) { return value; }
const stringIdentity = true;
const numberIdentity = true;
const bigintIdentity = true;
const mergedIdentity = true;
const mixedIdentity = true;
const intersectionIdentity = true;
export function mergedChoices(value) { return value; }
export function mixedChoices(value) { return value; }
export function genericChoice(value) { return value; }
export const instantiatedChoice = genericChoice("other");
export const numericIndex = choiceMap[0];
export const stringIndex = choiceMap["other"];


//// [emptyObjectIntersectionReduction.d.ts]
export declare function stringRight(value: string & {}): string;
export declare function stringLeft(value: {} & string): string;
export declare function numberRight(value: number & {}): number;
export declare function numberLeft(value: {} & number): number;
export declare function bigintRight(value: bigint & {}): bigint;
export declare function bigintLeft(value: {} & bigint): bigint;
export declare function templateRight(value: `prefix${string}` & {}): `prefix${string}`;
export declare function templateLeft(value: {} & `prefix${string}`): `prefix${string}`;
export declare function stringUnion(value: "literal" | (string & {})): string;
export declare function numberUnion(value: 1 | (number & {})): number;
export declare function bigintUnion(value: 1n | (bigint & {})): bigint;
export declare function templateUnion(value: "prefixValue" | (`prefix${string}` & {})): `prefix${string}`;
export declare function explicitExclusions(value: string & not null & not undefined): string;
type Choice = "a" | "b" | string;
type OtherChoice = "c" | string;
export declare function mergedChoices(value: Choice | OtherChoice | string): string;
export declare function mixedChoices(value: Choice | number): string | number;
type GenericChoice<Value> = "a" | "b" | string;
export declare function genericChoice<Value>(value: GenericChoice<Value>): string;
export declare const instantiatedChoice: string;
export declare const numericIndex: number;
export declare const stringIndex: number;
export {};
