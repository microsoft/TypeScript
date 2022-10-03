/// <reference path='fourslash.ts'/>

////function /*1*/outerFoo() {
////    function /*2*/foo(param: string, optionalParam?: string, paramWithInitializer = "hello", ...restParam: string[]) {
////    }
////    function /*3*/foowithoverload(a: string): string;
////    function /*4*/foowithoverload(a: number): number;
////    function /*5*/foowithoverload(a: any): any {
////        return a;
////    }
////    function /*6*/foowith3overload(a: string): string;
////    function /*7*/foowith3overload(a: number): number;
////    function /*8*/foowith3overload(a: boolean): boolean;
////    function /*9*/foowith3overload(a: any): any {
////        return a;
////    }
////    /*10*/foo("hello");
////    /*11*/foowithoverload("hello");
////    /*12*/foowithoverload(10);
////    /*13*/foowith3overload("hello");
////    /*14*/foowith3overload(10);
////    /*15*/foowith3overload(true);
////}
/////*16*/outerFoo();

verify.baselineQuickInfo();