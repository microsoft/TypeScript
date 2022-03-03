/// <reference path="fourslash.ts"/>

////class Foo {
////    private   xxx1 = 1;
////    protected xxx2 = 2;
////    public    xxx3 = 3;
////    private   static xxx4 = 4;
////    protected static xxx5 = 5;
////    public    static xxx6 = 6;
////    foo() {
////        const { /*1*/ } = this;
////        const { /*2*/ } = Foo;
////    }
////}
////
////const { /*3*/ } = new Foo();
////const { /*4*/ } = Foo;

verify.completions({ marker: "1", unsorted: ["xxx1", "xxx2", "xxx3", "foo"] });
verify.completions({ marker: "2", unsorted: ["prototype", "xxx4", "xxx5", "xxx6"] });
verify.completions({ marker: "3", unsorted: ["xxx3", "foo"] });
verify.completions({ marker: "4", unsorted: ["prototype", "xxx6"] });
