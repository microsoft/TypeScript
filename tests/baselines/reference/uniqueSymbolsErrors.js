//// [uniqueSymbolsErrors.ts]
// declarations
declare const {}: symbol();
declare let invalidLetType: symbol();
declare var invalidVarType: symbol();

// function arguments and return types
declare function invalidArgType(arg: symbol()): void;
declare function invalidRestArgType(...arg: symbol()[]): void;
declare function invalidReturnType(): symbol();
declare function invalidThisType(this: symbol()): void;
declare function invalidTypePredicate(n: any): n is symbol();
declare function invalidTypeParameterConstraint<T extends symbol()>(): void;
declare function invalidTypeParameterDefault<T = symbol()>(): void;

// classes
class InvalidClass {
    constructor(invalidConstructorArgType: symbol()) {}

    readonly invalidReadonlyPropertyType: symbol();
    invalidPropertyType: symbol();
    invalidArgType(arg: symbol()): void { return; }
    invalidRestArgType(...args: symbol()[]): void { return; }
    invalidReturnType(): symbol() { return; }
    invalidThisType(this: symbol()): void { return; }
    invalidTypePredicate(n: any): n is symbol() { return; }
    invalidTypeParameterConstraint<T extends symbol()>(): void { return; }
    invalidTypeParameterDefault<T = symbol()>(): void { return; }
    get invalidGetter(): symbol() { return; }
    set invalidSetter(arg: symbol()) { return; }

    static invalidStaticPropertyType: symbol();
    static invalidStaticArgType(arg: symbol()): void { return; }
    static invalidStaticRestArgType(...args: symbol()[]): void { return; }
    static invalidStaticReturnType(): symbol() { return; }
    static invalidStaticThisType(this: symbol()): void { return; }
    static invalidStaticTypePredicate(n: any): n is symbol() { return; }
    static invalidStaticTypeParameterConstraint<T extends symbol()>(): void { return; }
    static invalidStaticTypeParameterDefault<T = symbol()>(): void { return; }
    static get invalidStaticGetter(): symbol() { return; }
    static set invalidStaticSetter(arg: symbol()) { return; }
}

// interfaces
interface InvalidInterface {
    invalidPropertyType: symbol();
    invalidArgType(arg: symbol()): void;
    invalidRestArgType(...args: symbol()[]): void;
    invalidReturnType(): symbol();
    invalidThisType(this: symbol());
    invalidTypePredicate(n: any): n is symbol()
    invalidTypeParameterConstraint<T extends symbol()>(): void;
    invalidTypeParameterDefault<T = symbol()>(): void;
}

// type literals
type InvalidTypeLiteral = {
    invalidPropertyType: symbol();
    invalidArgType(arg: symbol()): void;
    invalidRestArgType(...args: symbol()[]): void;
    invalidReturnType(): symbol();
    invalidThisType(this: symbol());
    invalidTypePredicate(n: any): n is symbol()
    invalidTypeParameterConstraint<T extends symbol()>(): void;
    invalidTypeParameterDefault<T = symbol()>(): void;
};

// type alias
type InvalidAlias = symbol();
type InvalidAliasTypeParameterConstraint<T extends symbol()> = never;
type InvalidAliasTypeParameterDefault<T extends symbol()> = never;

// type references
declare const invalidTypeArgument: Promise<symbol()>;
declare const invalidArrayType: symbol()[];
declare const invalidTupleType: [symbol()];

// mapped types
declare const invalidMappedType: { [P in string]: symbol() };

// unions/intersection
declare const invalidUnion: symbol() | symbol();
declare const invalidIntersection: symbol() | symbol();




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
