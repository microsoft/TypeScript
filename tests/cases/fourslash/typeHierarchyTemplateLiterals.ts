/// <reference path='fourslash.ts'/>

// Test type hierarchy with template literal types

// @Filename: /templateLiterals.ts
////// Basic template literal types
////type /*greeting*/Greeting = `Hello, ${string}!`;
////type /*worldGreeting*/WorldGreeting = `Hello, World!`;
////
////// Template literal with unions
////type /*color*/Color = 'red' | 'blue' | 'green';
////type /*colorMessage*/ColorMessage = `The color is ${Color}`;
////
////// Uppercase/Lowercase intrinsic types
////type /*uppercaseColor*/UppercaseColor = Uppercase<Color>;
////type /*lowercaseColor*/LowercaseColor = Lowercase<Color>;
////type /*capitalizeColor*/CapitalizeColor = Capitalize<Color>;
////
////// Template literal with multiple placeholders
////type /*coordinate*/Coordinate = `(${number}, ${number})`;
////type /*point3d*/Point3D = `(${number}, ${number}, ${number})`;
////
////// Event name patterns
////type /*eventName*/EventName = 'click' | 'focus' | 'blur';
////type /*handlerName*/HandlerName = `on${Capitalize<EventName>}`;
////
////// CSS property patterns
////type /*cssUnit*/CSSUnit = 'px' | 'em' | 'rem' | '%';
////type /*cssValue*/CSSValue = `${number}${CSSUnit}`;
////
////// Template literal inference pattern
////type /*extractString*/ExtractString<T> = T extends `prefix-${infer U}-suffix` ? U : never;
////type /*extracted*/Extracted = ExtractString<'prefix-hello-suffix'>;
////
////// Recursive template literal (for paths)
////type /*pathSegment*/PathSegment = string;
////type /*path*/Path = `/${PathSegment}` | `/${PathSegment}${Path}`;
////
////// Template with object keys
////interface /*person*/Person {
////    firstName: string;
////    lastName: string;
////    age: number;
////}
////
////type /*getter*/Getter<T> = {
////    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
////};
////
////type /*personGetter*/PersonGetter = Getter<Person>;
////
////// Template literal narrowing
////type /*httpMethod*/HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
////type /*apiRoute*/APIRoute<M extends HTTPMethod> = `${M} /api/${string}`;
////type /*getRoute*/GetRoute = APIRoute<'GET'>;
////type /*postRoute*/PostRoute = APIRoute<'POST'>;

// Test 1: Basic template literal type
goTo.marker("greeting");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Template literal with union type placeholder
goTo.marker("colorMessage");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Uppercase intrinsic type
goTo.marker("uppercaseColor");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Capitalize intrinsic type
goTo.marker("capitalizeColor");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Template with number placeholder
goTo.marker("coordinate");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Event handler name pattern
goTo.marker("handlerName");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: CSS value pattern
goTo.marker("cssValue");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Template literal with infer
goTo.marker("extractString");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Applied extraction
goTo.marker("extracted");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Mapped type with template literal key remapping
goTo.marker("personGetter");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Generic template literal with constraint
goTo.marker("getRoute");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
