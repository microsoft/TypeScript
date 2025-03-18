//// [tests/cases/compiler/potentiallyUncalledDecorators.ts] ////

//// [potentiallyUncalledDecorators.ts]
// Angular-style Input/Output API:
declare function Input(bindingPropertyName?: string): any;
class FooComponent {
    @Input foo: string;
}

// Glimmer-style tracked API:
declare const tracked: PropertyDecorator & { (...watchedProperties: string[]): any; }

class Person {
    @tracked person; any;
}

class MultiplyByTwo {
    args: any;
    @tracked('args')
    get multiplied() {
        return this.args.number * 2;
    }
}

// Other fun stuff.

interface OmniDecorator extends MethodDecorator, ClassDecorator, PropertyDecorator {
}

declare function noArgs(): OmniDecorator;
declare function allRest(...args: any[]): OmniDecorator;
declare function oneOptional(x?: any): OmniDecorator;
declare function twoOptional(x?: any, y?: any): OmniDecorator;
declare function threeOptional(x?: any, y?: any, z?: any): OmniDecorator;
declare function oneOptionalWithRest(x?: any, ...args: any[]): OmniDecorator;
declare const anyDec: any;

@noArgs
class A {
    @noArgs foo: any;
    @noArgs bar() { }
}

@allRest
class B {
    @allRest foo: any;
    @allRest bar() { }
}

@oneOptional
class C {
    @oneOptional foo: any;
    @oneOptional bar() { }
}

@twoOptional
class D {
    @twoOptional foo: any;
    @twoOptional bar() { }
}

@threeOptional
class E {
    @threeOptional foo: any;
    @threeOptional bar() { }
}

@oneOptionalWithRest
class F {
    @oneOptionalWithRest foo: any;
    @oneOptionalWithRest bar() { }
}

@anyDec
class G {
    @anyDec foo: any;
    @anyDec bar() { }
}

export { };


//// [potentiallyUncalledDecorators.js]
class FooComponent {
    @Input
    foo;
}
class Person {
    @tracked
    person;
    any;
}
class MultiplyByTwo {
    args;
    @tracked('args')
    get multiplied() {
        return this.args.number * 2;
    }
}
@noArgs
class A {
    @noArgs
    foo;
    @noArgs
    bar() { }
}
@allRest
class B {
    @allRest
    foo;
    @allRest
    bar() { }
}
@oneOptional
class C {
    @oneOptional
    foo;
    @oneOptional
    bar() { }
}
@twoOptional
class D {
    @twoOptional
    foo;
    @twoOptional
    bar() { }
}
@threeOptional
class E {
    @threeOptional
    foo;
    @threeOptional
    bar() { }
}
@oneOptionalWithRest
class F {
    @oneOptionalWithRest
    foo;
    @oneOptionalWithRest
    bar() { }
}
@anyDec
class G {
    @anyDec
    foo;
    @anyDec
    bar() { }
}
export {};
