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

verify.completions({ marker: "1", exact: completion.sorted(["xxx1", "xxx2", "xxx3", "foo"]) });
verify.completions({ marker: "2", exact: completion.sorted(["prototype", "xxx4", "xxx5", "xxx6"]) });
verify.completions({ marker: "3", exact: completion.sorted(["xxx3", "foo"]) });
verify.completions({ marker: "4", exact: completion.sorted(["prototype", "xxx6"]) });
