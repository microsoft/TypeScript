/// <reference path='fourslash.ts'/>

// Test type hierarchy with enums and const enums

// @Filename: /enums.ts
////// Basic numeric enum
////enum /*direction*/Direction {
////    North,
////    South,
////    East,
////    West,
////}
////
////// Enum with explicit values
////enum /*httpStatus*/HttpStatus {
////    OK = 200,
////    Created = 201,
////    BadRequest = 400,
////    NotFound = 404,
////    InternalError = 500,
////}
////
////// String enum
////enum /*color*/Color {
////    Red = 'RED',
////    Green = 'GREEN',
////    Blue = 'BLUE',
////}
////
////// Mixed enum (numeric + string)
////enum /*mixedEnum*/MixedEnum {
////    No = 0,
////    Yes = 'YES',
////}
////
////// Const enum (inlined at compile time)
////const enum /*logLevel*/LogLevel {
////    Debug = 0,
////    Info = 1,
////    Warning = 2,
////    Error = 3,
////}
////
////// Enum member types
////type /*dirNorth*/DirectionNorth = Direction.North;
////type /*dirSouth*/DirectionSouth = Direction.South;
////
////// Enum as union type
////type /*anyDirection*/AnyDirection = Direction;
////
////// Type using enum
////interface /*compass*/Compass {
////    current: Direction;
////    history: Direction[];
////}
////
////// Enum in generic constraint
////interface /*enumHandler*/EnumHandler<E extends string | number> {
////    handle(value: E): void;
////}
////
////// Type that depends on enum
////type /*colorValue*/ColorValue = `#${string}` | Color;
////
////// Computed enum members
////enum /*computedEnum*/ComputedEnum {
////    A = 1,
////    B = A * 2,
////    C = A + B,
////    D = 1 << 4,
////}
////
////// Enum merging (declaration merging)
////enum /*mergeable*/MergeableEnum {
////    First = 1,
////}
////
////enum MergeableEnum {
////    Second = 2,
////}
////
////// Reverse mapping access
////type /*directionKey*/DirectionKey = keyof typeof Direction;
////type /*directionValue*/DirectionValue = typeof Direction[DirectionKey];
////
////// Function returning enum
////function /*getDirection*/getDirection(angle: number): Direction {
////    if (angle < 90) return Direction.North;
////    if (angle < 180) return Direction.East;
////    if (angle < 270) return Direction.South;
////    return Direction.West;
////}
////
////type /*getDirectionReturn*/GetDirectionReturn = ReturnType<typeof getDirection>;
////
////// Enum-like object pattern (as const)
////const /*statusCodes*/StatusCodes = {
////    OK: 200,
////    NotFound: 404,
////    Error: 500,
////} as const;
////
////type /*statusCode*/StatusCode = typeof StatusCodes[keyof typeof StatusCodes];

// Test 1: Basic numeric enum
goTo.marker("direction");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Enum with explicit values
goTo.marker("httpStatus");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: String enum
goTo.marker("color");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Const enum
goTo.marker("logLevel");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Enum member as type
goTo.marker("dirNorth");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Enum as union type
goTo.marker("anyDirection");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Interface using enum
goTo.marker("compass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Union with enum
goTo.marker("colorValue");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Computed enum
goTo.marker("computedEnum");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Merged enum
goTo.marker("mergeable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: keyof typeof enum
goTo.marker("directionKey");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Function returning enum
goTo.marker("getDirectionReturn");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Const object pattern (enum-like)
goTo.marker("statusCode");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
