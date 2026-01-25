/// <reference path='fourslash.ts'/>

// Test type hierarchy with primitive types, tuples, and utility type patterns
// This test focuses on types that don't require lib.d.ts

// @Filename: /primitiveTypes.ts
////// Primitive types hierarchy
////type /*stringType*/StringType = string;
////type /*numberType*/NumberType = number;
////type /*booleanType*/BooleanType = boolean;
////
////// Special types
////type /*nullType*/NullType = null;
////type /*undefinedType*/UndefinedType = undefined;
////type /*voidType*/VoidType = void;
////type /*neverType*/NeverType = never;
////type /*unknownType*/UnknownType = unknown;
////type /*anyType*/AnyType = any;
////
////// Object types
////type /*objectType*/ObjectType = object;
////
////// Array types
////type /*stringArray*/StringArray = string[];
////type /*numberArray*/NumberArray = number[];
////type /*readonlyArray*/ReadonlyStringArray = readonly string[];
////
////// Tuple types
////type /*pair*/Pair = [string, number];
////type /*triple*/Triple = [string, number, boolean];
////type /*namedTuple*/NamedTuple = [name: string, age: number];
////type /*restTuple*/RestTuple = [string, ...number[]];
////type /*optionalTuple*/OptionalTuple = [string, number?];
////
////// Union and intersection of primitives
////type /*primitiveUnion*/PrimitiveUnion = string | number | boolean;
////type /*extracted*/ExtractedString = PrimitiveUnion extends string ? string : never;
////type /*narrowed*/Narrowed<T> = T extends string ? T : never;
////type /*narrowedResult*/NarrowedResult = Narrowed<PrimitiveUnion>;
////
////// Nullable patterns
////type /*nullableString*/NullableString = string | null | undefined;
////
////// Custom utility type patterns (no lib dependency)
////type /*myPartial*/MyPartial<T> = { [K in keyof T]?: T[K] };
////type /*myRequired*/MyRequired<T> = { [K in keyof T]-?: T[K] };
////type /*myReadonly*/MyReadonly<T> = { readonly [K in keyof T]: T[K] };
////type /*myPick*/MyPick<T, K extends keyof T> = { [P in K]: T[P] };
////
////// Interface for testing utility patterns
////interface /*fullUser*/FullUser {
////    id: string;
////    name: string;
////    email: string;
////    password: string;
////}
////
////type /*pickedUser*/PickedUser = MyPick<FullUser, 'id' | 'name'>;
////type /*partialUser*/PartialUser = MyPartial<FullUser>;
////type /*readonlyUser*/ReadonlyUser = MyReadonly<FullUser>;
////
////// Function types
////type /*simpleFunc*/SimpleFunc = () => void;
////type /*funcWithParams*/FuncWithParams = (a: string, b: number) => boolean;
////type /*asyncFunc*/AsyncFunc = () => { then(resolve: (value: string) => void): void };
////
////// Custom Parameters/ReturnType patterns
////type /*myReturnType*/MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;
////type /*myParameters*/MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
////
////type /*funcReturn*/FuncReturn = MyReturnType<FuncWithParams>;
////type /*funcParams*/FuncParams = MyParameters<FuncWithParams>;
////
////// Class for testing typeof and InstanceType patterns
////class /*example*/Example {
////    constructor(public name: string, public value: number) {}
////    method(): void {}
////}
////
////type /*typeofExample*/TypeofExample = typeof Example;
////
////// Literal types
////type /*literalString*/LiteralString = 'hello';
////type /*literalNumber*/LiteralNumber = 42;
////type /*literalBoolean*/LiteralBoolean = true;
////type /*literalUnion*/LiteralUnion = 'a' | 'b' | 'c';
////
////// Template literal (simple)
////type /*greetingLiteral*/GreetingLiteral = `Hello ${string}`;
////
////// Recursive type
////type /*jsonValue*/JsonValue =
////    | string
////    | number
////    | boolean
////    | null
////    | JsonValue[]
////    | { [key: string]: JsonValue };
////
////// Conditional types with primitives
////type /*isString*/IsString<T> = T extends string ? true : false;
////type /*isStringResult*/IsStringResult = IsString<'hello'>;
////type /*isNotStringResult*/IsNotStringResult = IsString<42>;

// Test 1: String primitive alias
goTo.marker("stringType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Never type
goTo.marker("neverType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Unknown type
goTo.marker("unknownType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Array type
goTo.marker("stringArray");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: ReadonlyArray type
goTo.marker("readonlyArray");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Tuple type
goTo.marker("pair");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Named tuple
goTo.marker("namedTuple");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Rest tuple
goTo.marker("restTuple");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Optional tuple element
goTo.marker("optionalTuple");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Primitive union
goTo.marker("primitiveUnion");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Custom Partial utility
goTo.marker("myPartial");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Custom Pick utility
goTo.marker("myPick");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Applied Pick
goTo.marker("pickedUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: Applied Partial
goTo.marker("partialUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: Function type
goTo.marker("funcWithParams");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: Custom ReturnType
goTo.marker("myReturnType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 17: Applied ReturnType
goTo.marker("funcReturn");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 18: Applied Parameters
goTo.marker("funcParams");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 19: Literal string type
goTo.marker("literalString");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 20: Literal union
goTo.marker("literalUnion");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 21: Recursive JSON type
goTo.marker("jsonValue");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 22: Conditional type
goTo.marker("isString");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
