// @strict: true
// @strictNullChecks: true, false
// @target: esnext
// @declaration: true

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