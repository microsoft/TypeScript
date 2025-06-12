//// [tests/cases/compiler/overridingPrivateStaticMembers.ts] ////

//// [overridingPrivateStaticMembers.ts]
class Base2 {
    private static y: { foo: string };
}
 
class Derived2 extends Base2 {
    private static y: { foo: string; bar: string; };
}

//// [overridingPrivateStaticMembers.js]
class Base2 {
}
class Derived2 extends Base2 {
}
