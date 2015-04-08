/// <reference path="../fourslash.ts"/>

//////curly braces
////module Foo [|{
////    class Bar [|{
////        private f() [|{
////        }|]
////
////        private f2() [|{
////            if (true) [|{ }|] [|{ }|];
////        }|]
////    }|]
////}|]
////
//////parenthesis
////class FooBar {
////    private f[|()|] {
////        return [|([|(1 + 1)|])|];
////    }
////
////    private f2[|()|] {
////        if [|(true)|] { }
////    }
////}
////
//////square brackets
////class Baz {
////    private f() {
////        var a: any[|[]|] = [|[[|[1, 2]|], [|[3, 4]|], 5]|];
////    }
////}
////
////// angular brackets
////class TemplateTest [|<T1, T2 extends Array>|] {
////    public foo(a, b) {
////        return [|<any>|] a;
////    }
////}

test.ranges().forEach((range) => {
    verify.matchingBracePositionInCurrentFile(range.start, range.end - 1);
    verify.matchingBracePositionInCurrentFile(range.end - 1, range.start);
});