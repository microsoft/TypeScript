/// <reference path='fourslash.ts' />

/////*1*/         class                    a                  {
/////*2*/                                                        constructor       (       n   :                 number    )             ;
/////*3*/                                                        constructor       (       s   :                 string    )             ;
/////*4*/                                                        constructor       (       ns   :                 any    )                            {
////
/////*5*/                                                        }
////
/////*6*/                                                            public                 pgF       (           )                            {                  }
////
/////*7*/                                                            public                 pv   ;
/////*8*/                                                            public                 get              d       (           )                            {
/////*9*/                                                                                                                return              30   ;
/////*10*/                                                        }
/////*11*/                                                            public                 set              d       (       number        )                            {
/////*12*/                                                        }
////
/////*13*/                                                            public                 static                    get              p2       (           )                            {
/////*14*/                                                                                                                return                  {                  x   :                 30   ,                  y   :                 40              }   ;
/////*15*/                                                        }
////
/////*16*/                                                                         private                static                    d2       (           )                            {
/////*17*/                                                        }
/////*18*/                                                                         private                static                    get              p3       (           )                            {
/////*19*/                                                                                                                return              "string"   ;
/////*20*/                                                        }
/////*21*/                                                                         private                pv3   ;
////
/////*22*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/////*23*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/////*24*/                                                                         private                foo       (       ns   :                 any    )                            {
/////*25*/                                                                                                                return              ns.toString       (           )             ;
/////*26*/                                                        }
/////*27*/}
////
/////*28*/         class                    b              extends              a                  {
/////*29*/}
////
/////*30*/         class   m1b      {
////
/////*31*/}
////
/////*32*/                                                interface   m1ib                               {
////
/////*33*/  }
/////*34*/         class                    c              extends              m1b                  {
/////*35*/}
////
/////*36*/         class                    ib2              implements              m1ib                  {
/////*37*/}
////
/////*38*/    declare                            class                    aAmbient                  {
/////*39*/                                                        constructor                     (       n   :                 number    )             ;
/////*40*/                                                        constructor                     (       s   :                 string    )             ;
/////*41*/                                                            public                 pgF       (           )             :                 void   ;
/////*42*/                                                            public                 pv   ;
/////*43*/                                                            public                 d                 :                 number   ;
/////*44*/                                                        static                    p2                 :                     {                  x   :                 number   ;              y   :                 number   ;              }   ;
/////*45*/                                                        static                    d2       (           )             ;
/////*46*/                                                        static                    p3   ;
/////*47*/                                                                         private                pv3   ;
/////*48*/                                                                         private                foo       (       s    )             ;
/////*49*/}
////
/////*50*/         class                    d                  {
/////*51*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/////*52*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/////*53*/                                                                         private                foo       (       ns   :                 any    )                            {
/////*54*/                                                                                                                return              ns.toString       (           )             ;
/////*55*/                                                        }
/////*56*/}
////
/////*57*/         class                    e                  {
/////*58*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/////*59*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/////*60*/                                                                         private                foo       (       ns   :                 any    )                            {
/////*61*/                                                                                                                return              ns.toString       (           )             ;
/////*62*/                                                        }
/////*63*/                                                                         protected              bar        (            )  {                 }
/////*64*/                                                                         protected     static   bar2       (            )  {                 }
/////*65*/}
format.document();
goTo.marker("1");
verify.currentLineContentIs("class a {");
goTo.marker("2");
verify.currentLineContentIs("    constructor(n: number);");
goTo.marker("3");
verify.currentLineContentIs("    constructor(s: string);");
goTo.marker("4");
verify.currentLineContentIs("    constructor(ns: any) {");
goTo.marker("5");
verify.currentLineContentIs("    }");
goTo.marker("6");
verify.currentLineContentIs("    public pgF() { }");
goTo.marker("7");
verify.currentLineContentIs("    public pv;");
goTo.marker("8");
verify.currentLineContentIs("    public get d() {");
goTo.marker("9");
verify.currentLineContentIs("        return 30;");
goTo.marker("10");
verify.currentLineContentIs("    }");
goTo.marker("11");
verify.currentLineContentIs("    public set d(number) {");
goTo.marker("12");
verify.currentLineContentIs("    }");
goTo.marker("13");
verify.currentLineContentIs("    public static get p2() {");
goTo.marker("14");
verify.currentLineContentIs("        return { x: 30, y: 40 };");
goTo.marker("15");
verify.currentLineContentIs("    }");
goTo.marker("16");
verify.currentLineContentIs("    private static d2() {");
goTo.marker("17");
verify.currentLineContentIs("    }");
goTo.marker("18");
verify.currentLineContentIs("    private static get p3() {");
goTo.marker("19");
verify.currentLineContentIs('        return "string";');
goTo.marker("20");
verify.currentLineContentIs("    }");
goTo.marker("21");
verify.currentLineContentIs("    private pv3;");
goTo.marker("22");
verify.currentLineContentIs("    private foo(n: number): string;");
goTo.marker("23");
verify.currentLineContentIs("    private foo(s: string): string;");
goTo.marker("24");
verify.currentLineContentIs("    private foo(ns: any) {");
goTo.marker("25");
verify.currentLineContentIs("        return ns.toString();");
goTo.marker("26");
verify.currentLineContentIs("    }");
goTo.marker("27");
verify.currentLineContentIs("}");
goTo.marker("28");
verify.currentLineContentIs("class b extends a {");
goTo.marker("29");
verify.currentLineContentIs("}");
goTo.marker("30");
verify.currentLineContentIs("class m1b {");
goTo.marker("31");
verify.currentLineContentIs("}");
goTo.marker("32");
verify.currentLineContentIs("interface m1ib {");
goTo.marker("33");
verify.currentLineContentIs("}");
goTo.marker("34");
verify.currentLineContentIs("class c extends m1b {");
goTo.marker("35");
verify.currentLineContentIs("}");
goTo.marker("36");
verify.currentLineContentIs("class ib2 implements m1ib {");
goTo.marker("37");
verify.currentLineContentIs("}");
goTo.marker("38");
verify.currentLineContentIs("declare class aAmbient {");
goTo.marker("39");
verify.currentLineContentIs("    constructor(n: number);");
goTo.marker("40");
verify.currentLineContentIs("    constructor(s: string);");
goTo.marker("41");
verify.currentLineContentIs("    public pgF(): void;");
goTo.marker("42");
verify.currentLineContentIs("    public pv;");
goTo.marker("43");
verify.currentLineContentIs("    public d: number;");
goTo.marker("44");
verify.currentLineContentIs("    static p2: { x: number; y: number; };");
goTo.marker("45");
verify.currentLineContentIs("    static d2();");
goTo.marker("46");
verify.currentLineContentIs("    static p3;");
goTo.marker("47");
verify.currentLineContentIs("    private pv3;");
goTo.marker("48");
verify.currentLineContentIs("    private foo(s);");
goTo.marker("49");
verify.currentLineContentIs("}");
goTo.marker("50");
verify.currentLineContentIs("class d {");
goTo.marker("51");
verify.currentLineContentIs("    private foo(n: number): string;");
goTo.marker("52");
verify.currentLineContentIs("    private foo(s: string): string;");
goTo.marker("53");
verify.currentLineContentIs("    private foo(ns: any) {");
goTo.marker("54");
verify.currentLineContentIs("        return ns.toString();");
goTo.marker("55");
verify.currentLineContentIs("    }");
goTo.marker("56");
verify.currentLineContentIs("}");
goTo.marker("57");
verify.currentLineContentIs("class e {");
goTo.marker("58");
verify.currentLineContentIs("    private foo(s: string): string;");
goTo.marker("59");
verify.currentLineContentIs("    private foo(n: number): string;");
goTo.marker("60");
verify.currentLineContentIs("    private foo(ns: any) {");
goTo.marker("61");
verify.currentLineContentIs("        return ns.toString();");
goTo.marker("62");
verify.currentLineContentIs("    }");
goTo.marker("63");
verify.currentLineContentIs("    protected bar() { }");
goTo.marker("64");
verify.currentLineContentIs("    protected static bar2() { }");
goTo.marker("65");
verify.currentLineContentIs("}");