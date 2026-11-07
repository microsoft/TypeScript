// @strict: true
// @module: node16
// @noEmit: true

// The types of DefinitelyTyped's json-logic-js (MIT license). Measuring the
// variances of the RulesLogic circularity again from its canonical entry
// re-enters measurements whose own circularities may still be discarded, so
// what is cached while it is re-entered must be logged, or a discarded
// measurement leaves results behind and `apply` rejects its argument.

// @filename: json-logic-js.d.ts
export as namespace jsonFactory;

// Disable auto-export
export {};

type RenameToIn<T> = {
    [K in keyof T as K extends `in${Uppercase<string>}${Lowercase<string>}` ? `in` : K]: T[K];
};

/**
 * This is a utility type used below for the "if" operation.
 * Original: https://stackoverflow.com/a/68373774/765987
 */
type MAXIMUM_ALLOWED_BOUNDARY = 80;
type Mapped<
    Tuple extends unknown[],
    Result extends unknown[] = [],
    Count extends readonly number[] = [],
> = Count["length"] extends MAXIMUM_ALLOWED_BOUNDARY ? Result
    : Tuple extends [] ? []
    : Result extends [] ? Mapped<Tuple, Tuple, [...Count, 1]>
    : Mapped<Tuple, Result | [...Result, ...Tuple], [...Count, 1]>;
/**
 * Used for the "if" operation, which takes an array of odd length
 * and a minimum of three (3) elements.
 */
type AnyArrayOfOddLengthMin3 = [any, ...Mapped<[any, any]>];

export type ReservedOperations =
    | "var"
    | "missing"
    | "missing_some"
    | "if"
    | "=="
    | "==="
    | "!="
    | "!=="
    | "!"
    | "!!"
    | "or"
    | "and"
    | ">"
    | ">="
    | "<"
    | "<="
    | "max"
    | "min"
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "map"
    | "filter"
    | "reduce"
    | "all"
    | "none"
    | "some"
    | "merge"
    | "in"
    | "cat"
    | "substr"
    | "log";

/**
 * This can be an object with any key except the reserved keys.
 * TODO: Find a way to limit this type to exactly one (1) key, since
 * json-logic-js enforces it. See:
 * https://github.com/jwadhams/json-logic-js/blob/2.0.2/logic.js#L180
 */
export type AdditionalOperation = Partial<Record<ReservedOperations, never>> & { [k: string]: any };

export interface AllReservedOperationsInterface<AddOps extends AdditionalOperation = never> {
    var: RulesLogic<AddOps> | [RulesLogic<AddOps>] | [RulesLogic<AddOps>, any] | [RulesLogic<AddOps>, any];
    missing: RulesLogic<AddOps> | any[];
    missing_some: [RulesLogic<AddOps>, RulesLogic<AddOps> | any[]];
    if: AnyArrayOfOddLengthMin3;
    "==": [any, any];
    "===": [any, any];
    "!=": [any, any];
    "!==": [any, any];
    "!": any;
    "!!": any;
    or: Array<RulesLogic<AddOps>>;
    and: Array<RulesLogic<AddOps>>;
    ">": [RulesLogic<AddOps>, RulesLogic<AddOps>];
    ">=": [RulesLogic<AddOps>, RulesLogic<AddOps>];
    "<": [RulesLogic<AddOps>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>, RulesLogic<AddOps>];
    "<=": [RulesLogic<AddOps>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>, RulesLogic<AddOps>];
    max: Array<RulesLogic<AddOps>>;
    min: Array<RulesLogic<AddOps>>;
    "+": Array<RulesLogic<AddOps>> | RulesLogic<AddOps>;
    "-": Array<RulesLogic<AddOps>> | RulesLogic<AddOps>;
    "*": Array<RulesLogic<AddOps>> | RulesLogic<AddOps>;
    "/": Array<RulesLogic<AddOps>> | RulesLogic<AddOps>;
    "%": [RulesLogic<AddOps>, RulesLogic<AddOps>];
    map: [RulesLogic<AddOps>, RulesLogic<AddOps>];
    filter: [RulesLogic<AddOps>, RulesLogic<AddOps>];
    reduce: [RulesLogic<AddOps>, RulesLogic<AddOps>, RulesLogic<AddOps>];
    all: [Array<RulesLogic<AddOps>>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>];
    none: [Array<RulesLogic<AddOps>>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>];
    some: [Array<RulesLogic<AddOps>>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>];
    merge: Array<Array<RulesLogic<AddOps>> | RulesLogic<AddOps>>;
    inArray: [RulesLogic<AddOps>, Array<RulesLogic<AddOps>>];
    inString: [RulesLogic<AddOps>, RulesLogic<AddOps>];
    cat: Array<RulesLogic<AddOps>>;
    substr: [RulesLogic<AddOps>, RulesLogic<AddOps>] | [RulesLogic<AddOps>, RulesLogic<AddOps>, RulesLogic<AddOps>];
    log: RulesLogic<AddOps>;
}

export type JsonLogicVar<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "var"
>;
export type JsonLogicMissing<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "missing"
>;
export type JsonLogicMissingSome<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "missing_some"
>;
export type JsonLogicIf = Pick<AllReservedOperationsInterface, "if">;
export type JsonLogicEqual = Pick<AllReservedOperationsInterface, "==">;
export type JsonLogicStrictEqual = Pick<AllReservedOperationsInterface, "===">;
export type JsonLogicNotEqual = Pick<AllReservedOperationsInterface, "!=">;
export type JsonLogicStrictNotEqual = Pick<AllReservedOperationsInterface, "!==">;
export type JsonLogicNegation = Pick<AllReservedOperationsInterface, "!">;
export type JsonLogicDoubleNegation = Pick<AllReservedOperationsInterface, "!!">;
export type JsonLogicOr<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "or"
>;
export type JsonLogicAnd<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "and"
>;
export type JsonLogicGreaterThan<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    ">"
>;
export type JsonLogicGreaterThanOrEqual<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    ">="
>;
export type JsonLogicLessThan<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "<"
>;
export type JsonLogicLessThanOrEqual<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "<="
>;
export type JsonLogicMax<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "max"
>;
export type JsonLogicMin<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "min"
>;
export type JsonLogicSum<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "+"
>;
export type JsonLogicDifference<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "-"
>;
export type JsonLogicProduct<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "*"
>;
export type JsonLogicQuotient<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "/"
>;
export type JsonLogicRemainder<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "%"
>;
export type JsonLogicMap<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "map"
>;
export type JsonLogicFilter<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "filter"
>;
export type JsonLogicReduce<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "reduce"
>;
export type JsonLogicAll<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "all"
>;
export type JsonLogicNone<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "none"
>;
export type JsonLogicSome<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "some"
>;
export type JsonLogicMerge<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "merge"
>;
export type JsonLogicInArray<AddOps extends AdditionalOperation = never> = RenameToIn<
    Pick<AllReservedOperationsInterface<AddOps>, "inArray">
>;
export type JsonLogicInString<AddOps extends AdditionalOperation = never> = RenameToIn<
    Pick<AllReservedOperationsInterface<AddOps>, "inString">
>;
export type JsonLogicCat<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "cat"
>;
export type JsonLogicSubstr<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "substr"
>;
export type JsonLogicLog<AddOps extends AdditionalOperation = never> = Pick<
    AllReservedOperationsInterface<AddOps>,
    "log"
>;

export type RulesLogic<AddOps extends AdditionalOperation = never> =
    | boolean
    | string
    | number
    | null
    // Accessing Data - https://jsonlogic.com/operations.html#accessing-data
    | JsonLogicVar<AddOps>
    | JsonLogicMissing<AddOps>
    | JsonLogicMissingSome<AddOps>
    // Logic and Boolean Operations - https://jsonlogic.com/operations.html#logic-and-boolean-operations
    | JsonLogicIf
    | JsonLogicEqual
    | JsonLogicStrictEqual
    | JsonLogicNotEqual
    | JsonLogicStrictNotEqual
    | JsonLogicNegation
    | JsonLogicDoubleNegation
    | JsonLogicOr<AddOps>
    | JsonLogicAnd<AddOps>
    // Numeric Operations - https://jsonlogic.com/operations.html#numeric-operations
    | JsonLogicGreaterThan<AddOps>
    | JsonLogicGreaterThanOrEqual<AddOps>
    | JsonLogicLessThan<AddOps>
    | JsonLogicLessThanOrEqual<AddOps>
    | JsonLogicMax<AddOps>
    | JsonLogicMin<AddOps>
    | JsonLogicSum<AddOps>
    | JsonLogicDifference<AddOps>
    | JsonLogicProduct<AddOps>
    | JsonLogicQuotient<AddOps>
    | JsonLogicRemainder<AddOps>
    // Array Operations - https://jsonlogic.com/operations.html#array-operations
    | JsonLogicMap<AddOps>
    | JsonLogicFilter<AddOps>
    | JsonLogicReduce<AddOps>
    | JsonLogicAll<AddOps>
    | JsonLogicNone<AddOps>
    | JsonLogicSome<AddOps>
    | JsonLogicMerge<AddOps>
    | JsonLogicInArray<AddOps>
    // String Operations - https://jsonlogic.com/operations.html#string-operations
    | JsonLogicInString<AddOps>
    | JsonLogicCat<AddOps>
    | JsonLogicSubstr<AddOps>
    // Miscellaneous - https://jsonlogic.com/operations.html#miscellaneous
    | JsonLogicLog<AddOps>
    // Adding Operations (https://jsonlogic.com/add_operation.html)
    | AddOps;

export function add_operation(name: string, code: (...args: any[]) => any): void;
export function apply(logic: RulesLogic<AdditionalOperation>, data?: unknown): any;
export function rm_operation(name: string): void;

// These functions are undocumented, but are exported by the real package
// so they're typed here for completeness.
export function is_logic(logic: any): logic is RulesLogic;
export function truthy(value: any): boolean;
export function get_operator(logic: Record<string, any>): string;
export function get_values(logic: Record<string, any>): any;
export function uses_data(logic: Record<string, any>): any[];
export function rule_like(rule: any, pattern: any): boolean;

// @filename: main.ts
import * as jsonLogic from "./json-logic-js";

type StartsWithAndEndsWith =
    | { startsWith: [JsonLogicWithAdditionalOperations, JsonLogicWithAdditionalOperations] }
    | { endsWith: [JsonLogicWithAdditionalOperations, JsonLogicWithAdditionalOperations] };
type JsonLogicWithAdditionalOperations = jsonLogic.RulesLogic<StartsWithAndEndsWith>;
const jsonExtendedLogic: JsonLogicWithAdditionalOperations = {
    and: [{ startsWith: ["Springfield", "Spring"] }, { endsWith: ["Springfield", "field"] }],
};
jsonLogic.apply(jsonExtendedLogic);
