import {
    Node,
    Symbol,
    SymbolId,
} from "./types";

let nextSymbolId = 1;
let nextNodeId = 1;

/** @internal */
export function getNodeId(node: Node): number {
    if (!node.id) {
        node.id = nextNodeId;
        nextNodeId++;
    }
    return node.id;
}

/** @internal */
export function getSymbolId(symbol: Symbol): SymbolId {
    if (!symbol.id) {
        symbol.id = nextSymbolId;
        nextSymbolId++;
    }

    return symbol.id;
}

/** @internal */
export const enum CheckMode {
    Normal = 0,                                     // Normal type checking
    Contextual = 1 << 0,                            // Explicitly assigned contextual type, therefore not cacheable
    Inferential = 1 << 1,                           // Inferential typing
    SkipContextSensitive = 1 << 2,                  // Skip context sensitive function expressions
    SkipGenericFunctions = 1 << 3,                  // Skip single signature generic functions
    IsForSignatureHelp = 1 << 4,                    // Call resolution for purposes of signature help
    IsForStringLiteralArgumentCompletions = 1 << 5, // Do not infer from the argument currently being typed
    RestBindingElement = 1 << 6,                    // Checking a type that is going to be used to determine the type of a rest binding element
                                                    //   e.g. in `const { a, ...rest } = foo`, when checking the type of `foo` to determine the type of `rest`,
                                                    //   we need to preserve generic types instead of substituting them for constraints
}

/** @internal */
export const enum SignatureCheckMode {
    None              = 0,
    BivariantCallback = 1 << 0,
    StrictCallback    = 1 << 1,
    IgnoreReturnTypes = 1 << 2,
    StrictArity       = 1 << 3,
    Callback          = BivariantCallback | StrictCallback,
}

/** @internal */
export const enum TypeFacts {
    None = 0,
    TypeofEQString = 1 << 0,      // typeof x === "string"
    TypeofEQNumber = 1 << 1,      // typeof x === "number"
    TypeofEQBigInt = 1 << 2,      // typeof x === "bigint"
    TypeofEQBoolean = 1 << 3,     // typeof x === "boolean"
    TypeofEQSymbol = 1 << 4,      // typeof x === "symbol"
    TypeofEQObject = 1 << 5,      // typeof x === "object"
    TypeofEQFunction = 1 << 6,    // typeof x === "function"
    TypeofEQHostObject = 1 << 7,  // typeof x === "xxx"
    TypeofNEString = 1 << 8,      // typeof x !== "string"
    TypeofNENumber = 1 << 9,      // typeof x !== "number"
    TypeofNEBigInt = 1 << 10,     // typeof x !== "bigint"
    TypeofNEBoolean = 1 << 11,    // typeof x !== "boolean"
    TypeofNESymbol = 1 << 12,     // typeof x !== "symbol"
    TypeofNEObject = 1 << 13,     // typeof x !== "object"
    TypeofNEFunction = 1 << 14,   // typeof x !== "function"
    TypeofNEHostObject = 1 << 15, // typeof x !== "xxx"
    EQUndefined = 1 << 16,        // x === undefined
    EQNull = 1 << 17,             // x === null
    EQUndefinedOrNull = 1 << 18,  // x === undefined / x === null
    NEUndefined = 1 << 19,        // x !== undefined
    NENull = 1 << 20,             // x !== null
    NEUndefinedOrNull = 1 << 21,  // x != undefined / x != null
    Truthy = 1 << 22,             // x
    Falsy = 1 << 23,              // !x
    IsUndefined = 1 << 24,        // Contains undefined or intersection with undefined
    IsNull = 1 << 25,             // Contains null or intersection with null
    IsUndefinedOrNull = IsUndefined | IsNull,
    All = (1 << 27) - 1,
    // The following members encode facts about particular kinds of types for use in the getTypeFacts function.
    // The presence of a particular fact means that the given test is true for some (and possibly all) values
    // of that kind of type.
    BaseStringStrictFacts = TypeofEQString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
    BaseStringFacts = BaseStringStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    StringStrictFacts = BaseStringStrictFacts | Truthy | Falsy,
    StringFacts = BaseStringFacts | Truthy,
    EmptyStringStrictFacts = BaseStringStrictFacts | Falsy,
    EmptyStringFacts = BaseStringFacts,
    NonEmptyStringStrictFacts = BaseStringStrictFacts | Truthy,
    NonEmptyStringFacts = BaseStringFacts | Truthy,
    BaseNumberStrictFacts = TypeofEQNumber | TypeofNEString | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
    BaseNumberFacts = BaseNumberStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    NumberStrictFacts = BaseNumberStrictFacts | Truthy | Falsy,
    NumberFacts = BaseNumberFacts | Truthy,
    ZeroNumberStrictFacts = BaseNumberStrictFacts | Falsy,
    ZeroNumberFacts = BaseNumberFacts,
    NonZeroNumberStrictFacts = BaseNumberStrictFacts | Truthy,
    NonZeroNumberFacts = BaseNumberFacts | Truthy,
    BaseBigIntStrictFacts = TypeofEQBigInt | TypeofNEString | TypeofNENumber | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
    BaseBigIntFacts = BaseBigIntStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    BigIntStrictFacts = BaseBigIntStrictFacts | Truthy | Falsy,
    BigIntFacts = BaseBigIntFacts | Truthy,
    ZeroBigIntStrictFacts = BaseBigIntStrictFacts | Falsy,
    ZeroBigIntFacts = BaseBigIntFacts,
    NonZeroBigIntStrictFacts = BaseBigIntStrictFacts | Truthy,
    NonZeroBigIntFacts = BaseBigIntFacts | Truthy,
    BaseBooleanStrictFacts = TypeofEQBoolean | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
    BaseBooleanFacts = BaseBooleanStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    BooleanStrictFacts = BaseBooleanStrictFacts | Truthy | Falsy,
    BooleanFacts = BaseBooleanFacts | Truthy,
    FalseStrictFacts = BaseBooleanStrictFacts | Falsy,
    FalseFacts = BaseBooleanFacts,
    TrueStrictFacts = BaseBooleanStrictFacts | Truthy,
    TrueFacts = BaseBooleanFacts | Truthy,
    SymbolStrictFacts = TypeofEQSymbol | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
    SymbolFacts = SymbolStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    ObjectStrictFacts = TypeofEQObject | TypeofEQHostObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEFunction | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
    ObjectFacts = ObjectStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    FunctionStrictFacts = TypeofEQFunction | TypeofEQHostObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
    FunctionFacts = FunctionStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
    VoidFacts = TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | EQUndefined | EQUndefinedOrNull | NENull | Falsy,
    UndefinedFacts = TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | EQUndefined | EQUndefinedOrNull | NENull | Falsy | IsUndefined,
    NullFacts = TypeofEQObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEFunction | TypeofNEHostObject | EQNull | EQUndefinedOrNull | NEUndefined | Falsy | IsNull,
    EmptyObjectStrictFacts = All & ~(EQUndefined | EQNull | EQUndefinedOrNull | IsUndefinedOrNull),
    EmptyObjectFacts = All & ~IsUndefinedOrNull,
    UnknownFacts = All & ~IsUndefinedOrNull,
    AllTypeofNE = TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | NEUndefined,
    // Masks
    OrFactsMask = TypeofEQFunction | TypeofNEObject,
    AndFactsMask = All & ~OrFactsMask,
}
