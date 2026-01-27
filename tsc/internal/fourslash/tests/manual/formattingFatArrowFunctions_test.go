package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingFatArrowFunctions(t *testing.T) {
	t.Skip("Flaky test: sometimes timing out")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// valid
    (         )           =>    1  ;/*1*/
    (        arg )           =>    2  ;/*2*/
        arg       =>    2  ;/*3*/
        arg=>2  ;/*3a*/
      (        arg     = 1 )           =>    3  ;/*4*/
    (        arg    ?        )           =>    4  ;/*5*/
    (        arg    :    number )           =>    5  ;/*6*/
      (        arg    :    number     = 0 )           =>    6  ;/*7*/
    (        arg        ?                  :    number )           =>    7  ;/*8*/
    (                 ...     arg    :    number   [      ]    )           =>    8  ;/*9*/
      (        arg1   ,    arg2 )           =>    12  ;/*10*/
    (        arg1     = 1   ,    arg2     =3 )           =>    13  ;/*11*/
      (        arg1    ?          ,    arg2    ?        )           =>    14  ;/*12*/
    (        arg1    :    number   ,    arg2    :    number )           =>    15  ;/*13*/
    (        arg1    :    number     = 0   ,    arg2    :    number     = 1 )           =>    16  ;/*14*/
      (        arg1    ?           :    number   ,    arg2    ?           :    number )           =>    17  ;/*15*/
    (        arg1   ,             ...     arg2    :    number   [      ]    )           =>    18  ;/*16*/
      (        arg1   ,    arg2    ?           :    number )           =>    19  ;/*17*/

// in paren
    (            (         )           =>    21 )      ;/*18*/
    (            (        arg )           =>    22 )      ;/*19*/
    (            (        arg     = 1 )           =>    23 )      ;/*20*/
    (            (        arg    ?        )           =>    24 )      ;/*21*/
    (            (        arg    :    number )           =>    25 )      ;/*22*/
    (            (        arg    :    number     = 0 )           =>    26 )      ;/*23*/
    (            (        arg    ?           :    number )           =>    27 )      ;/*24*/
    (            (                 ...     arg    :    number   [      ]    )           =>    28 )      ;/*25*/

// in multiple paren
    (            (            (            (            (        arg )           =>    { return 32  ;    } )     )     )     )      ;/*26*/

// in ternary exression
      false        ?            (         )           =>    41     :    null  ;/*27*/
   false        ?            (        arg )           =>    42     :    null  ;/*28*/
    false        ?            (        arg     = 1 )           =>    43     :    null  ;/*29*/
      false        ?            (        arg    ?        )           =>    44     :    null  ;/*30*/
    false        ?            (        arg    :    number )           =>    45     :    null  ;/*31*/
   false        ?            (        arg    ?           :    number )           =>    46     :    null  ;/*32*/
      false        ?            (        arg    ?           :    number     = 0 )           =>    47     :    null  ;/*33*/
   false        ?            (                 ...     arg    :    number   [      ]    )           =>    48     :    null  ;/*34*/

// in ternary exression within paren
   false        ?            (            (         )           =>    51 )         :    null  ;/*35*/
    false        ?            (            (        arg )           =>    52 )         :    null  ;/*36*/
    false        ?            (            (        arg     = 1 )           =>    53 )         :    null  ;/*37*/
      false        ?            (            (        arg    ?        )           =>    54 )         :    null  ;/*38*/
    false        ?            (            (        arg    :    number )           =>    55 )         :    null  ;/*39*/
      false        ?            (            (        arg    ?           :    number )           =>    56 )         :    null  ;/*40*/
    false        ?            (            (        arg    ?           :    number     = 0 )           =>    57 )         :    null  ;/*41*/
   false        ?            (            (                 ...     arg    :    number   [      ]    )           =>    58 )         :    null  ;/*42*/

// ternary exression's else clause
   false        ?        null     :        (         )           =>    61  ;/*43*/
        false        ?        null     :        (        arg )           =>    62  ;/*44*/
   false        ?        null     :        (        arg     = 1 )           =>    63  ;/*45*/
      false        ?        null     :        (        arg    ?        )           =>    64  ;/*46*/
   false        ?        null     :        (        arg    :    number )           =>    65  ;/*47*/
    false        ?        null     :        (        arg    ?           :    number )           =>    66  ;/*48*/
        false        ?        null     :        (        arg    ?           :    number     = 0 )           =>    67  ;/*49*/
    false        ?        null     :        (                 ...     arg    :    number   [      ]    )           =>    68  ;/*50*/


// nested ternary expressions
    ((        a    ?        )           =>    { return a  ;    })     ?            (        b    ?         )           =>    { return b  ;    }     :        (        c    ?         )           =>    { return c  ;    }  ;/*51*/

//multiple levels
    ((        a    ?        )           =>    { return a  ;    })     ?            (        b )          =>       (        c )          =>   81     :        (        c )          =>       (        d )          =>   82  ;/*52*/


// In Expressions
    (            (        arg )           =>    90 )     instanceof Function  ;/*53*/
      (            (        arg     = 1 )           =>    91 )     instanceof Function  ;/*54*/
        (            (        arg    ?         )           =>    92 )     instanceof Function  ;/*55*/
      (            (        arg    :    number )           =>    93 )     instanceof Function  ;/*56*/
    (            (        arg    :    number     = 1 )           =>    94 )     instanceof Function  ;/*57*/
        (            (        arg    ?           :    number )           =>    95 )     instanceof Function  ;/*58*/
      (            (                 ...     arg    :    number   [      ]    )           =>    96 )     instanceof Function  ;/*59*/

''    +        ((        arg )           =>    100)  ;/*60*/
        (            (        arg )           =>    0 )        +    ''    +        ((        arg )           =>    101)  ;/*61*/
          (            (        arg     = 1 )           =>    0 )        +    ''    +        ((        arg     = 2 )           =>    102)  ;/*62*/
    (            (        arg    ?        )           =>    0 )        +    ''    +        ((        arg    ?        )           =>    103)  ;/*63*/
      (            (        arg    :   number )           =>    0 )        +    ''    +        ((        arg    :   number )           =>    104)  ;/*64*/
        (            (        arg    :   number     = 1 )           =>    0 )        +    ''    +        ((        arg    :   number     = 2 )           =>    105)  ;/*65*/
    (            (        arg    ?           :   number     )           =>    0 )        +    ''    +        ((        arg    ?           :   number     )           =>    106)  ;/*66*/
      (            (                 ...     arg    :   number   [      ]    )           =>    0 )        +    ''    +        ((                 ...     arg    :   number   [      ]    )           =>    107)  ;/*67*/
    (            (        arg1   ,    arg2    ?        )           =>    0 )        +    ''    +        ((        arg1   ,   arg2    ?        )           =>    108)  ;/*68*/
      (            (        arg1   ,             ...     arg2    :   number   [      ]    )           =>    0 )        +    ''    +        ((        arg1   ,             ...     arg2    :   number   [      ]    )           =>    108)  ;/*69*/


// Function Parameters
/*70*/function foo    (                 ...     arg    :    any   [      ]    )     { }

/*71*/foo    (
/*72*/        (        a )           =>    110   ,
/*73*/        (            (        a )           =>    111 )       ,
/*74*/        (        a )           =>    {
        return /*75*/112  ;
/*76*/    }   ,
/*77*/        (        a    ?         )           =>    113   ,
/*78*/        (        a   ,    b    ?         )           =>    114   ,
/*79*/        (        a    :    number )           =>    115   ,
/*80*/        (        a    :    number     = 0 )           =>    116   ,
/*81*/        (        a     = 0 )           =>    117   ,
/*82*/        (        a               :    number     = 0 )           =>    118   ,
/*83*/        (        a    ?    ,   b   ?          :    number      )           =>    118   ,
/*84*/        (                 ...     a    :    number   [      ]    )           =>    119   ,
/*85*/        (        a   ,    b                = 0   ,             ...     c    :    number   [      ]    )           =>    120   ,
/*86*/        (        a )           =>        (        b )           =>        (        c )           =>    121   ,
/*87*/        false       ?            (        a )           =>    0     :        (        b )           =>    122
 /*88*/)      ;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `() => 1;`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `(arg) => 2;`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `arg => 2;`)
	f.GoToMarker(t, "3a")
	f.VerifyCurrentLineContent(t, `arg => 2;`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `(arg = 1) => 3;`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `(arg?) => 4;`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `(arg: number) => 5;`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `(arg: number = 0) => 6;`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `(arg?: number) => 7;`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `(...arg: number[]) => 8;`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `(arg1, arg2) => 12;`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `(arg1 = 1, arg2 = 3) => 13;`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `(arg1?, arg2?) => 14;`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `(arg1: number, arg2: number) => 15;`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `(arg1: number = 0, arg2: number = 1) => 16;`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `(arg1?: number, arg2?: number) => 17;`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `(arg1, ...arg2: number[]) => 18;`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `(arg1, arg2?: number) => 19;`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `(() => 21);`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `((arg) => 22);`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `((arg = 1) => 23);`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `((arg?) => 24);`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `((arg: number) => 25);`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `((arg: number = 0) => 26);`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `((arg?: number) => 27);`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `((...arg: number[]) => 28);`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `(((((arg) => { return 32; }))));`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `false ? () => 41 : null;`)
	f.GoToMarker(t, "28")
	f.VerifyCurrentLineContent(t, `false ? (arg) => 42 : null;`)
	f.GoToMarker(t, "29")
	f.VerifyCurrentLineContent(t, `false ? (arg = 1) => 43 : null;`)
	f.GoToMarker(t, "30")
	f.VerifyCurrentLineContent(t, `false ? (arg?) => 44 : null;`)
	f.GoToMarker(t, "31")
	f.VerifyCurrentLineContent(t, `false ? (arg: number) => 45 : null;`)
	f.GoToMarker(t, "32")
	f.VerifyCurrentLineContent(t, `false ? (arg?: number) => 46 : null;`)
	f.GoToMarker(t, "33")
	f.VerifyCurrentLineContent(t, `false ? (arg?: number = 0) => 47 : null;`)
	f.GoToMarker(t, "34")
	f.VerifyCurrentLineContent(t, `false ? (...arg: number[]) => 48 : null;`)
	f.GoToMarker(t, "35")
	f.VerifyCurrentLineContent(t, `false ? (() => 51) : null;`)
	f.GoToMarker(t, "36")
	f.VerifyCurrentLineContent(t, `false ? ((arg) => 52) : null;`)
	f.GoToMarker(t, "37")
	f.VerifyCurrentLineContent(t, `false ? ((arg = 1) => 53) : null;`)
	f.GoToMarker(t, "38")
	f.VerifyCurrentLineContent(t, `false ? ((arg?) => 54) : null;`)
	f.GoToMarker(t, "39")
	f.VerifyCurrentLineContent(t, `false ? ((arg: number) => 55) : null;`)
	f.GoToMarker(t, "40")
	f.VerifyCurrentLineContent(t, `false ? ((arg?: number) => 56) : null;`)
	f.GoToMarker(t, "41")
	f.VerifyCurrentLineContent(t, `false ? ((arg?: number = 0) => 57) : null;`)
	f.GoToMarker(t, "42")
	f.VerifyCurrentLineContent(t, `false ? ((...arg: number[]) => 58) : null;`)
	f.GoToMarker(t, "43")
	f.VerifyCurrentLineContent(t, `false ? null : () => 61;`)
	f.GoToMarker(t, "44")
	f.VerifyCurrentLineContent(t, `false ? null : (arg) => 62;`)
	f.GoToMarker(t, "45")
	f.VerifyCurrentLineContent(t, `false ? null : (arg = 1) => 63;`)
	f.GoToMarker(t, "46")
	f.VerifyCurrentLineContent(t, `false ? null : (arg?) => 64;`)
	f.GoToMarker(t, "47")
	f.VerifyCurrentLineContent(t, `false ? null : (arg: number) => 65;`)
	f.GoToMarker(t, "48")
	f.VerifyCurrentLineContent(t, `false ? null : (arg?: number) => 66;`)
	f.GoToMarker(t, "49")
	f.VerifyCurrentLineContent(t, `false ? null : (arg?: number = 0) => 67;`)
	f.GoToMarker(t, "50")
	f.VerifyCurrentLineContent(t, `false ? null : (...arg: number[]) => 68;`)
	f.GoToMarker(t, "51")
	f.VerifyCurrentLineContent(t, `((a?) => { return a; }) ? (b?) => { return b; } : (c?) => { return c; };`)
	f.GoToMarker(t, "52")
	f.VerifyCurrentLineContent(t, `((a?) => { return a; }) ? (b) => (c) => 81 : (c) => (d) => 82;`)
	f.GoToMarker(t, "53")
	f.VerifyCurrentLineContent(t, `((arg) => 90) instanceof Function;`)
	f.GoToMarker(t, "54")
	f.VerifyCurrentLineContent(t, `((arg = 1) => 91) instanceof Function;`)
	f.GoToMarker(t, "55")
	f.VerifyCurrentLineContent(t, `((arg?) => 92) instanceof Function;`)
	f.GoToMarker(t, "56")
	f.VerifyCurrentLineContent(t, `((arg: number) => 93) instanceof Function;`)
	f.GoToMarker(t, "57")
	f.VerifyCurrentLineContent(t, `((arg: number = 1) => 94) instanceof Function;`)
	f.GoToMarker(t, "58")
	f.VerifyCurrentLineContent(t, `((arg?: number) => 95) instanceof Function;`)
	f.GoToMarker(t, "59")
	f.VerifyCurrentLineContent(t, `((...arg: number[]) => 96) instanceof Function;`)
	f.GoToMarker(t, "60")
	f.VerifyCurrentLineContent(t, `'' + ((arg) => 100);`)
	f.GoToMarker(t, "61")
	f.VerifyCurrentLineContent(t, `((arg) => 0) + '' + ((arg) => 101);`)
	f.GoToMarker(t, "62")
	f.VerifyCurrentLineContent(t, `((arg = 1) => 0) + '' + ((arg = 2) => 102);`)
	f.GoToMarker(t, "63")
	f.VerifyCurrentLineContent(t, `((arg?) => 0) + '' + ((arg?) => 103);`)
	f.GoToMarker(t, "64")
	f.VerifyCurrentLineContent(t, `((arg: number) => 0) + '' + ((arg: number) => 104);`)
	f.GoToMarker(t, "65")
	f.VerifyCurrentLineContent(t, `((arg: number = 1) => 0) + '' + ((arg: number = 2) => 105);`)
	f.GoToMarker(t, "66")
	f.VerifyCurrentLineContent(t, `((arg?: number) => 0) + '' + ((arg?: number) => 106);`)
	f.GoToMarker(t, "67")
	f.VerifyCurrentLineContent(t, `((...arg: number[]) => 0) + '' + ((...arg: number[]) => 107);`)
	f.GoToMarker(t, "68")
	f.VerifyCurrentLineContent(t, `((arg1, arg2?) => 0) + '' + ((arg1, arg2?) => 108);`)
	f.GoToMarker(t, "69")
	f.VerifyCurrentLineContent(t, `((arg1, ...arg2: number[]) => 0) + '' + ((arg1, ...arg2: number[]) => 108);`)
	f.GoToMarker(t, "70")
	f.VerifyCurrentLineContent(t, `function foo(...arg: any[]) { }`)
	f.GoToMarker(t, "71")
	f.VerifyCurrentLineContent(t, `foo(`)
	f.GoToMarker(t, "72")
	f.VerifyCurrentLineContent(t, `    (a) => 110,`)
	f.GoToMarker(t, "73")
	f.VerifyCurrentLineContent(t, `    ((a) => 111),`)
	f.GoToMarker(t, "74")
	f.VerifyCurrentLineContent(t, `    (a) => {`)
	f.GoToMarker(t, "75")
	f.VerifyCurrentLineContent(t, `        return 112;`)
	f.GoToMarker(t, "76")
	f.VerifyCurrentLineContent(t, `    },`)
	f.GoToMarker(t, "77")
	f.VerifyCurrentLineContent(t, `    (a?) => 113,`)
	f.GoToMarker(t, "78")
	f.VerifyCurrentLineContent(t, `    (a, b?) => 114,`)
	f.GoToMarker(t, "79")
	f.VerifyCurrentLineContent(t, `    (a: number) => 115,`)
	f.GoToMarker(t, "80")
	f.VerifyCurrentLineContent(t, `    (a: number = 0) => 116,`)
	f.GoToMarker(t, "81")
	f.VerifyCurrentLineContent(t, `    (a = 0) => 117,`)
	f.GoToMarker(t, "82")
	f.VerifyCurrentLineContent(t, `    (a: number = 0) => 118,`)
	f.GoToMarker(t, "83")
	f.VerifyCurrentLineContent(t, `    (a?, b?: number) => 118,`)
	f.GoToMarker(t, "84")
	f.VerifyCurrentLineContent(t, `    (...a: number[]) => 119,`)
	f.GoToMarker(t, "85")
	f.VerifyCurrentLineContent(t, `    (a, b = 0, ...c: number[]) => 120,`)
	f.GoToMarker(t, "86")
	f.VerifyCurrentLineContent(t, `    (a) => (b) => (c) => 121,`)
	f.GoToMarker(t, "87")
	f.VerifyCurrentLineContent(t, `    false ? (a) => 0 : (b) => 122`)
}
