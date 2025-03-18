//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideProperty7.ts] ////

//// [accessorsOverrideProperty7.ts]
abstract class A {
    abstract p = 'yep'
}
class B extends A {
    get p() { return 'oh no' } // error
}


//// [accessorsOverrideProperty7.js]
class A {
    p = 'yep';
}
class B extends A {
    get p() { return 'oh no'; }
}
