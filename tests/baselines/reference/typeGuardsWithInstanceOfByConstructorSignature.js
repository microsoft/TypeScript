//// [tests/cases/conformance/expressions/typeGuards/typeGuardsWithInstanceOfByConstructorSignature.ts] ////

//// [typeGuardsWithInstanceOfByConstructorSignature.ts]
interface AConstructor {
    new (): A;
}
interface A {
    foo: string;
}
declare var A: AConstructor;

declare var obj1: A | string;
if (obj1 instanceof A) { // narrowed to A.
    obj1.foo;
    obj1.bar;
}

declare var obj2: any;
if (obj2 instanceof A) {
    obj2.foo;
    obj2.bar;
}

// a construct signature with generics
interface BConstructor {
    new <T>(): B<T>;
}
interface B<T> {
    foo: T;
}
declare var B: BConstructor;

declare var obj3: B<number> | string;
if (obj3 instanceof B) { // narrowed to B<number>.
    obj3.foo = 1;
    obj3.foo = "str";
    obj3.bar = "str";
}

declare var obj4: any;
if (obj4 instanceof B) {
    obj4.foo = "str";
    obj4.foo = 1;
    obj4.bar = "str";
}

// has multiple construct signature
interface CConstructor {
    new (value: string): C1;
    new (value: number): C2;
}
interface C1 {
    foo: string;
    c: string;
    bar1: number;
}
interface C2 {
    foo: string;
    c: string;
    bar2: number;
}
declare var C: CConstructor;

declare var obj5: C1 | A;
if (obj5 instanceof C) { // narrowed to C1.
    obj5.foo;
    obj5.c;
    obj5.bar1;
    obj5.bar2;
}

declare var obj6: any;
if (obj6 instanceof C) {
    obj6.foo;
    obj6.bar1;
    obj6.bar2;
}

// with object type literal
interface D {
    foo: string;
}
declare var D: { new (): D; };

declare var obj7: D | string;
if (obj7 instanceof D) { // narrowed to D.
    obj7.foo;
    obj7.bar;
}

declare var obj8: any;
if (obj8 instanceof D) {
    obj8.foo;
    obj8.bar;
}

// a construct signature that returns a union type
interface EConstructor {
    new (): E1 | E2;
}
interface E1 {
    foo: string;
    bar1: number;
}
interface E2 {
    foo: string;
    bar2: number;
}
declare var E: EConstructor;

declare var obj9: E1 | A;
if (obj9 instanceof E) { // narrowed to E1
    obj9.foo;
    obj9.bar1;
    obj9.bar2;
}

declare var obj10: any;
if (obj10 instanceof E) {
    obj10.foo;
    obj10.bar1;
    obj10.bar2;
}

// a construct signature that returns any
interface FConstructor {
    new (): any;
}
interface F {
    foo: string;
    bar: number;
}
declare var F: FConstructor;

declare var obj11: F | string;
if (obj11 instanceof F) { // can't type narrowing, construct signature returns any.
    obj11.foo;
    obj11.bar;
}

declare var obj12: any;
if (obj12 instanceof F) {
    obj12.foo;
    obj12.bar;
}

// a type with a prototype, it overrides the construct signature
interface GConstructor {
    prototype: G1; // high priority
    new (): G2;    // low priority
}
interface G1 {
    foo1: number;
}
interface G2 {
    foo2: boolean;
}
declare var G: GConstructor;

declare var obj13: G1 | G2;
if (obj13 instanceof G) { // narrowed to G1. G1 is return type of prototype property.
    obj13.foo1;
    obj13.foo2;
}

declare var obj14: any;
if (obj14 instanceof G) {
    obj14.foo1;
    obj14.foo2;
}

// a type with a prototype that has any type
interface HConstructor {
    prototype: any; // high priority, but any type is ignored. interface has implicit `prototype: any`.
    new (): H;      // low priority
}
interface H {
    foo: number;
}
declare var H: HConstructor;

declare var obj15: H | string;
if (obj15 instanceof H) { // narrowed to H.
    obj15.foo;
    obj15.bar;
}

declare var obj16: any;
if (obj16 instanceof H) {
    obj16.foo1;
    obj16.foo2;
}

declare var obj17: any;
if (obj17 instanceof Object) { // can't narrow type from 'any' to 'Object'
    obj17.foo1;
    obj17.foo2;
}

declare var obj18: any;
if (obj18 instanceof Function) { // can't narrow type from 'any' to 'Function'
    obj18.foo1;
    obj18.foo2;
}


//// [typeGuardsWithInstanceOfByConstructorSignature.js]
if (obj1 instanceof A) { // narrowed to A.
    obj1.foo;
    obj1.bar;
}
if (obj2 instanceof A) {
    obj2.foo;
    obj2.bar;
}
if (obj3 instanceof B) { // narrowed to B<number>.
    obj3.foo = 1;
    obj3.foo = "str";
    obj3.bar = "str";
}
if (obj4 instanceof B) {
    obj4.foo = "str";
    obj4.foo = 1;
    obj4.bar = "str";
}
if (obj5 instanceof C) { // narrowed to C1.
    obj5.foo;
    obj5.c;
    obj5.bar1;
    obj5.bar2;
}
if (obj6 instanceof C) {
    obj6.foo;
    obj6.bar1;
    obj6.bar2;
}
if (obj7 instanceof D) { // narrowed to D.
    obj7.foo;
    obj7.bar;
}
if (obj8 instanceof D) {
    obj8.foo;
    obj8.bar;
}
if (obj9 instanceof E) { // narrowed to E1
    obj9.foo;
    obj9.bar1;
    obj9.bar2;
}
if (obj10 instanceof E) {
    obj10.foo;
    obj10.bar1;
    obj10.bar2;
}
if (obj11 instanceof F) { // can't type narrowing, construct signature returns any.
    obj11.foo;
    obj11.bar;
}
if (obj12 instanceof F) {
    obj12.foo;
    obj12.bar;
}
if (obj13 instanceof G) { // narrowed to G1. G1 is return type of prototype property.
    obj13.foo1;
    obj13.foo2;
}
if (obj14 instanceof G) {
    obj14.foo1;
    obj14.foo2;
}
if (obj15 instanceof H) { // narrowed to H.
    obj15.foo;
    obj15.bar;
}
if (obj16 instanceof H) {
    obj16.foo1;
    obj16.foo2;
}
if (obj17 instanceof Object) { // can't narrow type from 'any' to 'Object'
    obj17.foo1;
    obj17.foo2;
}
if (obj18 instanceof Function) { // can't narrow type from 'any' to 'Function'
    obj18.foo1;
    obj18.foo2;
}
