interface AConstructor {
    new (): A;
}
interface A {
    foo: string;
}
declare var A: AConstructor;

var obj1: A | string;
if (obj1 instanceof A) { // narrowed to A.
    obj1.foo;
    obj1.bar;
}

var obj2: any;
if (obj2 instanceof A) { // can't type narrowing from any.
    obj2.foo;
    obj2.bar;
}

// with generics
interface BConstructor {
    new <T>(): B<T>;
}
interface B<T> {
    foo: T;
}
declare var B: BConstructor;

var obj3: B<string> | A;
if (obj3 instanceof B) { // narrowed to B<string>.
    obj3.foo = "str";
    obj3.foo = 1;
    obj3.bar = "str";
}

var obj4: any;
if (obj4 instanceof B) { // can't type narrowing from any.
    obj4.foo = "str";
    obj4.foo = 1;
    obj4.bar = "str";
}

// has multiple constructor signature
interface CConstructor {
    new (value: string): C1;
    new (value: number): C2;
}
interface C1 {
    foo: string;
    bar1: number;
}
interface C2 {
    foo: string;
    bar2: number;
}
declare var C: CConstructor;

var obj5: C1 | A;
if (obj5 instanceof C) { // narrowed to C1.
    obj5.foo;
    obj5.bar1;
    obj5.bar2;
}

var obj6: any;
if (obj6 instanceof C) { // can't type narrowing from any.
    obj6.foo;
    obj6.bar1;
    obj6.bar2;
}

// with object type literal
interface D {
    foo: string;
}
declare var D: { new (): D; };

var obj7: D | string;
if (obj7 instanceof D) { // narrowed to D.
    obj7.foo;
    obj7.bar;
}

var obj8: any;
if (obj8 instanceof D) { // can't type narrowing from any.
    obj8.foo;
    obj8.bar;
}
