/// <reference path='fourslash.ts' />

/////*1*/        @    decorator1    
/////*2*/            @        decorator2
/////*3*/    @decorator3
/////*4*/        @    decorator4    @            decorator5
/////*5*/class C {
/////*6*/            @    decorator6    
/////*7*/                @        decorator7
/////*8*/        @decorator8
/////*9*/    method1() { }
////
/////*10*/        @    decorator9    @            decorator10 @decorator11            method2() { }
////
////    method3(
/////*11*/                @    decorator12    
/////*12*/                    @        decorator13
/////*13*/            @decorator14
/////*14*/        x) { }
////
////    method4(
/////*15*/            @    decorator15    @            decorator16 @decorator17             x) { }
////
/////*16*/            @    decorator18    
/////*17*/                @        decorator19
/////*18*/        @decorator20    
/////*19*/    ["computed1"]() { }
////
/////*20*/        @    decorator21    @            decorator22 @decorator23            ["computed2"]() { }
////
/////*21*/            @    decorator24    
/////*22*/                @        decorator25
/////*23*/        @decorator26
/////*24*/    get accessor1() { }
////
/////*25*/        @    decorator27    @            decorator28 @decorator29            get accessor2() { }
////
/////*26*/            @    decorator30    
/////*27*/                @        decorator31
/////*28*/        @decorator32
/////*29*/    property1;
////
/////*30*/        @    decorator33    @            decorator34 @decorator35            property2;
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("@decorator1");
goTo.marker("2");
verify.currentLineContentIs("@decorator2");
goTo.marker("3");
verify.currentLineContentIs("@decorator3");
goTo.marker("4");
verify.currentLineContentIs("@decorator4 @decorator5");
goTo.marker("5");
verify.currentLineContentIs("class C {");
goTo.marker("6");
verify.currentLineContentIs("    @decorator6");
goTo.marker("7");
verify.currentLineContentIs("    @decorator7");
goTo.marker("8");
verify.currentLineContentIs("    @decorator8");
goTo.marker("9");
verify.currentLineContentIs("    method1() { }");
goTo.marker("10");
verify.currentLineContentIs("    @decorator9 @decorator10 @decorator11 method2() { }");
goTo.marker("11");
verify.currentLineContentIs("        @decorator12");
goTo.marker("12");
verify.currentLineContentIs("        @decorator13");
goTo.marker("13");
verify.currentLineContentIs("        @decorator14");
goTo.marker("14");
verify.currentLineContentIs("        x) { }");
goTo.marker("15");
verify.currentLineContentIs("        @decorator15 @decorator16 @decorator17 x) { }");
goTo.marker("16");
verify.currentLineContentIs("    @decorator18");
goTo.marker("17");
verify.currentLineContentIs("    @decorator19");
goTo.marker("18");
verify.currentLineContentIs("    @decorator20");
goTo.marker("19");
verify.currentLineContentIs("    [\"computed1\"]() { }");
goTo.marker("20");
verify.currentLineContentIs("    @decorator21 @decorator22 @decorator23 [\"computed2\"]() { }");
goTo.marker("21");
verify.currentLineContentIs("    @decorator24");
goTo.marker("22");
verify.currentLineContentIs("    @decorator25");
goTo.marker("23");
verify.currentLineContentIs("    @decorator26");
goTo.marker("24");
verify.currentLineContentIs("    get accessor1() { }");
goTo.marker("25");
verify.currentLineContentIs("    @decorator27 @decorator28 @decorator29 get accessor2() { }");
goTo.marker("26");
verify.currentLineContentIs("    @decorator30");
goTo.marker("27");
verify.currentLineContentIs("    @decorator31");
goTo.marker("28");
verify.currentLineContentIs("    @decorator32");
goTo.marker("29");
verify.currentLineContentIs("    property1;");
goTo.marker("30");
verify.currentLineContentIs("    @decorator33 @decorator34 @decorator35 property2;");