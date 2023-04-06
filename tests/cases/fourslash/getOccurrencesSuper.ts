/// <reference path='fourslash.ts' />

////class SuperType {
////    superMethod() {
////    }
////
////    static superStaticMethod() {
////        return 10;
////    }
////}
////
////class SubType extends SuperType {
////    public  prop1 = [|s/**/uper|].superMethod;
////    private prop2 = [|super|].superMethod;
////
////    constructor() {
////        [|super|]();
////    }
////
////    public method1() {
////        return [|super|].superMethod();
////    }
////
////    private method2() {
////        return [|super|].superMethod();
////    }
////
////    public method3() {
////        var x = () => [|super|].superMethod();
////
////        // Bad but still gets highlighted
////        function f() {
////            [|super|].superMethod();
////        }
////    }
////
////    // Bad but still gets highlighted.
////    public static statProp1 = super.superStaticMethod;
////
////    public static staticMethod1() {
////        return super.superStaticMethod();
////    }
////
////    private static staticMethod2() {
////        return super.superStaticMethod();
////    }
////
////    // Are not actually 'super' keywords.
////    super = 10;
////    static super = 20;
////}

verify.baselineDocumentHighlights();
