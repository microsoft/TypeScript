/// <reference path="fourslash.ts" />

////// valid
////    (         )           =>    1  ;/*1*/
////    (        arg )           =>    2  ;/*2*/
////        arg       =>    2  ;/*3*/
////        arg=>2  ;/*3a*/
////      (        arg     = 1 )           =>    3  ;/*4*/
////    (        arg    ?        )           =>    4  ;/*5*/
////    (        arg    :    number )           =>    5  ;/*6*/
////      (        arg    :    number     = 0 )           =>    6  ;/*7*/
////    (        arg        ?                  :    number )           =>    7  ;/*8*/
////    (                 ...     arg    :    number   [      ]    )           =>    8  ;/*9*/
////      (        arg1   ,    arg2 )           =>    12  ;/*10*/
////    (        arg1     = 1   ,    arg2     =3 )           =>    13  ;/*11*/
////      (        arg1    ?          ,    arg2    ?        )           =>    14  ;/*12*/
////    (        arg1    :    number   ,    arg2    :    number )           =>    15  ;/*13*/
////    (        arg1    :    number     = 0   ,    arg2    :    number     = 1 )           =>    16  ;/*14*/
////      (        arg1    ?           :    number   ,    arg2    ?           :    number )           =>    17  ;/*15*/
////    (        arg1   ,             ...     arg2    :    number   [      ]    )           =>    18  ;/*16*/
////      (        arg1   ,    arg2    ?           :    number )           =>    19  ;/*17*/
////
////// in paren
////    (            (         )           =>    21 )      ;/*18*/
////    (            (        arg )           =>    22 )      ;/*19*/
////    (            (        arg     = 1 )           =>    23 )      ;/*20*/
////    (            (        arg    ?        )           =>    24 )      ;/*21*/
////    (            (        arg    :    number )           =>    25 )      ;/*22*/
////    (            (        arg    :    number     = 0 )           =>    26 )      ;/*23*/
////    (            (        arg    ?           :    number )           =>    27 )      ;/*24*/
////    (            (                 ...     arg    :    number   [      ]    )           =>    28 )      ;/*25*/
////
////// in multiple paren
////    (            (            (            (            (        arg )           =>    { return 32  ;    } )     )     )     )      ;/*26*/
////
////// in ternary exression
////      false        ?            (         )           =>    41     :    null  ;/*27*/
////   false        ?            (        arg )           =>    42     :    null  ;/*28*/
////    false        ?            (        arg     = 1 )           =>    43     :    null  ;/*29*/
////      false        ?            (        arg    ?        )           =>    44     :    null  ;/*30*/
////    false        ?            (        arg    :    number )           =>    45     :    null  ;/*31*/
////   false        ?            (        arg    ?           :    number )           =>    46     :    null  ;/*32*/
////      false        ?            (        arg    ?           :    number     = 0 )           =>    47     :    null  ;/*33*/
////   false        ?            (                 ...     arg    :    number   [      ]    )           =>    48     :    null  ;/*34*/
////
////// in ternary exression within paren
////   false        ?            (            (         )           =>    51 )         :    null  ;/*35*/
////    false        ?            (            (        arg )           =>    52 )         :    null  ;/*36*/
////    false        ?            (            (        arg     = 1 )           =>    53 )         :    null  ;/*37*/
////      false        ?            (            (        arg    ?        )           =>    54 )         :    null  ;/*38*/
////    false        ?            (            (        arg    :    number )           =>    55 )         :    null  ;/*39*/
////      false        ?            (            (        arg    ?           :    number )           =>    56 )         :    null  ;/*40*/
////    false        ?            (            (        arg    ?           :    number     = 0 )           =>    57 )         :    null  ;/*41*/
////   false        ?            (            (                 ...     arg    :    number   [      ]    )           =>    58 )         :    null  ;/*42*/
////
////// ternary exression's else clause
////   false        ?        null     :        (         )           =>    61  ;/*43*/
////        false        ?        null     :        (        arg )           =>    62  ;/*44*/
////   false        ?        null     :        (        arg     = 1 )           =>    63  ;/*45*/
////      false        ?        null     :        (        arg    ?        )           =>    64  ;/*46*/
////   false        ?        null     :        (        arg    :    number )           =>    65  ;/*47*/
////    false        ?        null     :        (        arg    ?           :    number )           =>    66  ;/*48*/
////        false        ?        null     :        (        arg    ?           :    number     = 0 )           =>    67  ;/*49*/
////    false        ?        null     :        (                 ...     arg    :    number   [      ]    )           =>    68  ;/*50*/
////
////
////// nested ternary expressions
////    ((        a    ?        )           =>    { return a  ;    })     ?            (        b    ?         )           =>    { return b  ;    }     :        (        c    ?         )           =>    { return c  ;    }  ;/*51*/
////
//////multiple levels
////    ((        a    ?        )           =>    { return a  ;    })     ?            (        b )          =>       (        c )          =>   81     :        (        c )          =>       (        d )          =>   82  ;/*52*/
////
////
////// In Expressions
////    (            (        arg )           =>    90 )     instanceof Function  ;/*53*/
////      (            (        arg     = 1 )           =>    91 )     instanceof Function  ;/*54*/
////        (            (        arg    ?         )           =>    92 )     instanceof Function  ;/*55*/
////      (            (        arg    :    number )           =>    93 )     instanceof Function  ;/*56*/
////    (            (        arg    :    number     = 1 )           =>    94 )     instanceof Function  ;/*57*/
////        (            (        arg    ?           :    number )           =>    95 )     instanceof Function  ;/*58*/
////      (            (                 ...     arg    :    number   [      ]    )           =>    96 )     instanceof Function  ;/*59*/
////
////''    +        ((        arg )           =>    100)  ;/*60*/
////        (            (        arg )           =>    0 )        +    ''    +        ((        arg )           =>    101)  ;/*61*/
////          (            (        arg     = 1 )           =>    0 )        +    ''    +        ((        arg     = 2 )           =>    102)  ;/*62*/
////    (            (        arg    ?        )           =>    0 )        +    ''    +        ((        arg    ?        )           =>    103)  ;/*63*/
////      (            (        arg    :   number )           =>    0 )        +    ''    +        ((        arg    :   number )           =>    104)  ;/*64*/
////        (            (        arg    :   number     = 1 )           =>    0 )        +    ''    +        ((        arg    :   number     = 2 )           =>    105)  ;/*65*/
////    (            (        arg    ?           :   number     )           =>    0 )        +    ''    +        ((        arg    ?           :   number     )           =>    106)  ;/*66*/
////      (            (                 ...     arg    :   number   [      ]    )           =>    0 )        +    ''    +        ((                 ...     arg    :   number   [      ]    )           =>    107)  ;/*67*/
////    (            (        arg1   ,    arg2    ?        )           =>    0 )        +    ''    +        ((        arg1   ,   arg2    ?        )           =>    108)  ;/*68*/
////      (            (        arg1   ,             ...     arg2    :   number   [      ]    )           =>    0 )        +    ''    +        ((        arg1   ,             ...     arg2    :   number   [      ]    )           =>    108)  ;/*69*/
////
////
////// Function Parameters
/////*70*/function foo    (                 ...     arg    :    any   [      ]    )     { }
////
/////*71*/foo    (
/////*72*/        (        a )           =>    110   ,
/////*73*/        (            (        a )           =>    111 )       ,
/////*74*/        (        a )           =>    {
////        return /*75*/112  ;
/////*76*/    }   ,
/////*77*/        (        a    ?         )           =>    113   ,
/////*78*/        (        a   ,    b    ?         )           =>    114   ,
/////*79*/        (        a    :    number )           =>    115   ,
/////*80*/        (        a    :    number     = 0 )           =>    116   ,
/////*81*/        (        a     = 0 )           =>    117   ,
/////*82*/        (        a               :    number     = 0 )           =>    118   ,
/////*83*/        (        a    ?    ,   b   ?          :    number      )           =>    118   ,
/////*84*/        (                 ...     a    :    number   [      ]    )           =>    119   ,
/////*85*/        (        a   ,    b                = 0   ,             ...     c    :    number   [      ]    )           =>    120   ,
/////*86*/        (        a )           =>        (        b )           =>        (        c )           =>    121   ,
/////*87*/        false       ?            (        a )           =>    0     :        (        b )           =>    122
//// /*88*/)      ;
format.document();
goTo.marker("1");
verify.currentLineContentIs("() => 1;");
goTo.marker("2");
verify.currentLineContentIs("(arg) => 2;");
goTo.marker("3");
verify.currentLineContentIs("arg => 2;");
goTo.marker("3a");
verify.currentLineContentIs("arg => 2;");
goTo.marker("4");
verify.currentLineContentIs("(arg = 1) => 3;");
goTo.marker("5");
verify.currentLineContentIs("(arg?) => 4;");
goTo.marker("6");
verify.currentLineContentIs("(arg: number) => 5;");
goTo.marker("7");
verify.currentLineContentIs("(arg: number = 0) => 6;");
goTo.marker("8");
verify.currentLineContentIs("(arg?: number) => 7;");
goTo.marker("9");
verify.currentLineContentIs("(...arg: number[]) => 8;");
goTo.marker("10");
verify.currentLineContentIs("(arg1, arg2) => 12;");
goTo.marker("11");
verify.currentLineContentIs("(arg1 = 1, arg2 = 3) => 13;");
goTo.marker("12");
verify.currentLineContentIs("(arg1?, arg2?) => 14;");
goTo.marker("13");
verify.currentLineContentIs("(arg1: number, arg2: number) => 15;");
goTo.marker("14");
verify.currentLineContentIs("(arg1: number = 0, arg2: number = 1) => 16;");
goTo.marker("15");
verify.currentLineContentIs("(arg1?: number, arg2?: number) => 17;");
goTo.marker("16");
verify.currentLineContentIs("(arg1, ...arg2: number[]) => 18;");
goTo.marker("17");
verify.currentLineContentIs("(arg1, arg2?: number) => 19;");
goTo.marker("18");
verify.currentLineContentIs("(() => 21);");
goTo.marker("19");
verify.currentLineContentIs("((arg) => 22);");
goTo.marker("20");
verify.currentLineContentIs("((arg = 1) => 23);");
goTo.marker("21");
verify.currentLineContentIs("((arg?) => 24);");
goTo.marker("22");
verify.currentLineContentIs("((arg: number) => 25);");
goTo.marker("23");
verify.currentLineContentIs("((arg: number = 0) => 26);");
goTo.marker("24");
verify.currentLineContentIs("((arg?: number) => 27);");
goTo.marker("25");
verify.currentLineContentIs("((...arg: number[]) => 28);");
goTo.marker("26");
verify.currentLineContentIs("(((((arg) => { return 32; }))));");
goTo.marker("27");
verify.currentLineContentIs("false ? () => 41 : null;");
goTo.marker("28");
verify.currentLineContentIs("false ? (arg) => 42 : null;");
goTo.marker("29");
verify.currentLineContentIs("false ? (arg = 1) => 43 : null;");
goTo.marker("30");
verify.currentLineContentIs("false ? (arg?) => 44 : null;");
goTo.marker("31");
verify.currentLineContentIs("false ? (arg: number) => 45 : null;");
goTo.marker("32");
verify.currentLineContentIs("false ? (arg?: number) => 46 : null;");
goTo.marker("33");
verify.currentLineContentIs("false ? (arg?: number = 0) => 47 : null;");
goTo.marker("34");
verify.currentLineContentIs("false ? (...arg: number[]) => 48 : null;");
goTo.marker("35");
verify.currentLineContentIs("false ? (() => 51) : null;");
goTo.marker("36");
verify.currentLineContentIs("false ? ((arg) => 52) : null;");
goTo.marker("37");
verify.currentLineContentIs("false ? ((arg = 1) => 53) : null;");
goTo.marker("38");
verify.currentLineContentIs("false ? ((arg?) => 54) : null;");
goTo.marker("39");
verify.currentLineContentIs("false ? ((arg: number) => 55) : null;");
goTo.marker("40");
verify.currentLineContentIs("false ? ((arg?: number) => 56) : null;");
goTo.marker("41");
verify.currentLineContentIs("false ? ((arg?: number = 0) => 57) : null;");
goTo.marker("42");
verify.currentLineContentIs("false ? ((...arg: number[]) => 58) : null;");
goTo.marker("43");
verify.currentLineContentIs("false ? null : () => 61;");
goTo.marker("44");
verify.currentLineContentIs("false ? null : (arg) => 62;");
goTo.marker("45");
verify.currentLineContentIs("false ? null : (arg = 1) => 63;");
goTo.marker("46");
verify.currentLineContentIs("false ? null : (arg?) => 64;");
goTo.marker("47");
verify.currentLineContentIs("false ? null : (arg: number) => 65;");
goTo.marker("48");
verify.currentLineContentIs("false ? null : (arg?: number) => 66;");
goTo.marker("49");
verify.currentLineContentIs("false ? null : (arg?: number = 0) => 67;");
goTo.marker("50");
verify.currentLineContentIs("false ? null : (...arg: number[]) => 68;");
goTo.marker("51");
verify.currentLineContentIs("((a?) => { return a; }) ? (b?) => { return b; } : (c?) => { return c; };");
goTo.marker("52");
verify.currentLineContentIs("((a?) => { return a; }) ? (b) => (c) => 81 : (c) => (d) => 82;");
goTo.marker("53");
verify.currentLineContentIs("((arg) => 90) instanceof Function;");
goTo.marker("54");
verify.currentLineContentIs("((arg = 1) => 91) instanceof Function;");
goTo.marker("55");
verify.currentLineContentIs("((arg?) => 92) instanceof Function;");
goTo.marker("56");
verify.currentLineContentIs("((arg: number) => 93) instanceof Function;");
goTo.marker("57");
verify.currentLineContentIs("((arg: number = 1) => 94) instanceof Function;");
goTo.marker("58");
verify.currentLineContentIs("((arg?: number) => 95) instanceof Function;");
goTo.marker("59");
verify.currentLineContentIs("((...arg: number[]) => 96) instanceof Function;");
goTo.marker("60");
verify.currentLineContentIs("'' + ((arg) => 100);");

goTo.marker("61");
verify.currentLineContentIs("((arg) => 0) + '' + ((arg) => 101);");
goTo.marker("62");
verify.currentLineContentIs("((arg = 1) => 0) + '' + ((arg = 2) => 102);");
goTo.marker("63");
verify.currentLineContentIs("((arg?) => 0) + '' + ((arg?) => 103);");
goTo.marker("64");
verify.currentLineContentIs("((arg: number) => 0) + '' + ((arg: number) => 104);");
goTo.marker("65");
verify.currentLineContentIs("((arg: number = 1) => 0) + '' + ((arg: number = 2) => 105);");
goTo.marker("66");
verify.currentLineContentIs("((arg?: number) => 0) + '' + ((arg?: number) => 106);");
goTo.marker("67");
verify.currentLineContentIs("((...arg: number[]) => 0) + '' + ((...arg: number[]) => 107);");
goTo.marker("68");
verify.currentLineContentIs("((arg1, arg2?) => 0) + '' + ((arg1, arg2?) => 108);");
goTo.marker("69");
verify.currentLineContentIs("((arg1, ...arg2: number[]) => 0) + '' + ((arg1, ...arg2: number[]) => 108);");
goTo.marker("70");
verify.currentLineContentIs("function foo(...arg: any[]) { }");
goTo.marker("71");
verify.currentLineContentIs("foo(");
goTo.marker("72");
verify.currentLineContentIs("    (a) => 110,");
goTo.marker("73");
verify.currentLineContentIs("    ((a) => 111),");
goTo.marker("74");
verify.currentLineContentIs("    (a) => {");
goTo.marker("75");
verify.currentLineContentIs("        return 112;");
goTo.marker("76");
verify.currentLineContentIs("    },");
goTo.marker("77");
verify.currentLineContentIs("    (a?) => 113,");
goTo.marker("78");
verify.currentLineContentIs("    (a, b?) => 114,");
goTo.marker("79");
verify.currentLineContentIs("    (a: number) => 115,");
goTo.marker("80");
verify.currentLineContentIs("    (a: number = 0) => 116,");
goTo.marker("81");
verify.currentLineContentIs("    (a = 0) => 117,");
goTo.marker("82");
verify.currentLineContentIs("    (a: number = 0) => 118,");
goTo.marker("83");
verify.currentLineContentIs("    (a?, b?: number) => 118,");
goTo.marker("84");
verify.currentLineContentIs("    (...a: number[]) => 119,");
goTo.marker("85");
verify.currentLineContentIs("    (a, b = 0, ...c: number[]) => 120,");
goTo.marker("86");
verify.currentLineContentIs("    (a) => (b) => (c) => 121,");
goTo.marker("87");
verify.currentLineContentIs("    false ? (a) => 0 : (b) => 122");
