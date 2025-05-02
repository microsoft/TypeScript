//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbolsErrors.ts] ////

//// [uniqueSymbolsErrors.ts]
// declarations
declare const invalidUniqueType: unique number;
declare const {}: unique symbol;
declare let invalidLetType: unique symbol;
declare var invalidVarType: unique symbol;

// function arguments and return types
declare function invalidArgType(arg: unique symbol): void;
declare function invalidRestArgType(...arg: (unique symbol)[]): void;
declare function invalidReturnType(): unique symbol;
declare function invalidThisType(this: unique symbol): void;
declare function invalidTypePredicate(n: any): n is unique symbol;
declare function invalidTypeParameterConstraint<T extends unique symbol>(): void;
declare function invalidTypeParameterDefault<T = unique symbol>(): void;

// classes
class InvalidClass {
    constructor(invalidConstructorArgType: unique symbol) {}

    readonly invalidReadonlyPropertyType: unique symbol;
    invalidPropertyType: unique symbol;
    invalidArgType(arg: unique symbol): void { return; }
    invalidRestArgType(...args: (unique symbol)[]): void { return; }
    invalidReturnType(): unique symbol { return; }
    invalidThisType(this: unique symbol): void { return; }
    invalidTypePredicate(n: any): n is unique symbol { return; }
    invalidTypeParameterConstraint<T extends unique symbol>(): void { return; }
    invalidTypeParameterDefault<T = unique symbol>(): void { return; }
    get invalidGetter(): unique symbol { return; }
    set invalidSetter(arg: unique symbol) { return; }

    static invalidStaticPropertyType: unique symbol;
    static invalidStaticArgType(arg: unique symbol): void { return; }
    static invalidStaticRestArgType(...args: (unique symbol)[]): void { return; }
    static invalidStaticReturnType(): unique symbol { return; }
    static invalidStaticThisType(this: unique symbol): void { return; }
    static invalidStaticTypePredicate(n: any): n is unique symbol { return; }
    static invalidStaticTypeParameterConstraint<T extends unique symbol>(): void { return; }
    static invalidStaticTypeParameterDefault<T = unique symbol>(): void { return; }
    static get invalidStaticGetter(): unique symbol { return; }
    static set invalidStaticSetter(arg: unique symbol) { return; }
}

// interfaces
interface InvalidInterface {
    invalidPropertyType: unique symbol;
    invalidArgType(arg: unique symbol): void;
    invalidRestArgType(...args: (unique symbol)[]): void;
    invalidReturnType(): unique symbol;
    invalidThisType(this: unique symbol);
    invalidTypePredicate(n: any): n is unique symbol
    invalidTypeParameterConstraint<T extends unique symbol>(): void;
    invalidTypeParameterDefault<T = unique symbol>(): void;
}

// type literals
type InvalidTypeLiteral = {
    invalidPropertyType: unique symbol;
    invalidArgType(arg: unique symbol): void;
    invalidRestArgType(...args: (unique symbol)[]): void;
    invalidReturnType(): unique symbol;
    invalidThisType(this: unique symbol);
    invalidTypePredicate(n: any): n is unique symbol
    invalidTypeParameterConstraint<T extends unique symbol>(): void;
    invalidTypeParameterDefault<T = unique symbol>(): void;
};

// type alias
type InvalidAlias = unique symbol;
type InvalidAliasTypeParameterConstraint<T extends unique symbol> = never;
type InvalidAliasTypeParameterDefault<T extends unique symbol> = never;

// type references
declare const invalidTypeArgument: Promise<unique symbol>;
declare const invalidArrayType: (unique symbol)[];
declare const invalidTupleType: [unique symbol];

// mapped types
declare const invalidMappedType: { [P in string]: unique symbol };

// unions/intersection
declare const invalidUnion: unique symbol | unique symbol;
declare const invalidIntersection: unique symbol | unique symbol;

// initializer assignability
// https://github.com/Microsoft/TypeScript/issues/21584
const shouldNotBeAssignable: string = Symbol();

//// [uniqueSymbolsErrors.js]
// classes
class InvalidClass {
    constructor(invalidConstructorArgType) { }
    invalidArgType(arg) { return; }
    invalidRestArgType(...args) { return; }
    invalidReturnType() { return; }
    invalidThisType() { return; }
    invalidTypePredicate(n) { return; }
    invalidTypeParameterConstraint() { return; }
    invalidTypeParameterDefault() { return; }
    get invalidGetter() { return; }
    set invalidSetter(arg) { return; }
    static invalidStaticArgType(arg) { return; }
    static invalidStaticRestArgType(...args) { return; }
    static invalidStaticReturnType() { return; }
    static invalidStaticThisType() { return; }
    static invalidStaticTypePredicate(n) { return; }
    static invalidStaticTypeParameterConstraint() { return; }
    static invalidStaticTypeParameterDefault() { return; }
    static get invalidStaticGetter() { return; }
    static set invalidStaticSetter(arg) { return; }
}
// initializer assignability
// https://github.com/Microsoft/TypeScript/issues/21584
const shouldNotBeAssignable = Symbol();
