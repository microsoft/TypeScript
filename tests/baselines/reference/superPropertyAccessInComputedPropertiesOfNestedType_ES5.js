//// [tests/cases/compiler/superPropertyAccessInComputedPropertiesOfNestedType_ES5.ts] ////

//// [superPropertyAccessInComputedPropertiesOfNestedType_ES5.ts]
class A {
    foo() { return 1; }
}

class B extends A {
    foo() { return 2; }
    bar() {
        return class {
            [super.foo()]() {
                return 100;
            }
        }
    }
}

//// [superPropertyAccessInComputedPropertiesOfNestedType_ES5.js]
class A {
    foo() { return 1; }
}
class B extends A {
    foo() { return 2; }
    bar() {
        return class {
            [super.foo()]() {
                return 100;
            }
        };
    }
}
