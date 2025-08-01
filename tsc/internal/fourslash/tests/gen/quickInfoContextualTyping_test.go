package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoContextualTyping(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// DEFAULT INTERFACES
interface IFoo {
    n: number;
    s: string;
    f(i: number, s: string): string;
    a: number[];
}
interface IBar {
    foo: IFoo;
}
// CONTEXT: Class property declaration
class C1T5 {
    /*1*/foo: (i: number, s: string) => number = function(/*2*/i) {
        return /*3*/i;
    }
}
// CONTEXT: Module property declaration
module C2T5 {
    export var /*4*/foo: (i: number, s: string) => number = function(/*5*/i) {
        return /*6*/i;
    }
}
// CONTEXT: Variable declaration
var /*7*/c3t1: (s: string) => string = (function(/*8*/s) { return /*9*/s });
var /*10*/c3t2 = <IFoo>({
    n: 1
})
var /*11*/c3t3: number[] = [];
var /*12*/c3t4: () => IFoo = function() { return <IFoo>({}) };
var /*13*/c3t5: (n: number) => IFoo = function(/*14*/n) { return <IFoo>({}) };
var /*15*/c3t6: (n: number, s: string) => IFoo = function(/*16*/n, /*17*/s) { return <IFoo>({}) };
var /*18*/c3t7: {
    (n: number): number;
    (s1: string): number;
};
var /*20*/c3t8: (n: number, s: string) => number = function(/*21*/n) { return n; };
var /*22*/c3t9: number[][] = [[],[]];
var /*23*/c3t10: IFoo[] = [<IFoo>({}),<IFoo>({})];
var /*24*/c3t11: {(n: number, s: string): string;}[] = [function(/*25*/n, /*26*/s) { return s; }];
var /*27*/c3t12: IBar = {
    /*28*/foo: <IFoo>({})
}
var /*29*/c3t13 = <IFoo>({
    /*30*/f: function(/*31*/i, /*32*/s) { return s; }
})
var /*33*/c3t14 = <IFoo>({
    /*34*/a: []
})
// CONTEXT: Class property assignment
class C4T5 {
    /*35*/foo: (i: number, s: string) => string;
    constructor() {
        this.foo = function(/*36*/i, /*37*/s) {
            return s;
        }
    }
}
// CONTEXT: Module property assignment
module C5T5 {
    export var /*38*/foo: (i: number, s: string) => string;
    foo = function(/*39*/i, /*40*/s) {
        return s;
    }
}
// CONTEXT: Variable assignment
var /*41*/c6t5: (n: number) => IFoo;
c6t5 = <(n: number) => IFoo>function(/*42*/n) { return <IFoo>({}) };
// CONTEXT: Array index assignment
var /*43*/c7t2: IFoo[];
/*44*/c7t2[0] = <IFoo>({n: 1});
// CONTEXT: Object property assignment
interface IPlaceHolder {
    t1: (s: string) => string;
    t2: IFoo;
    t3: number[];
    t4: () => IFoo;
    t5: (n: number) => IFoo;
    t6: (n: number, s: string) => IFoo;
    t7: {
            (n: number, s: string): number;
            //(s1: string, s2: string): number;
        };
    t8: (n: number, s: string) => number;
    t9: number[][];
    t10: IFoo[];
    t11: {(n: number, s: string): string;}[];
    t12: IBar;
    t13: IFoo;
    t14: IFoo;
    }
var objc8: {
    t1: (s: string) => string;
    t2: IFoo;
    t3: number[];
    t4: () => IFoo;
    t5: (n: number) => IFoo;
    t6: (n: number, s: string) => IFoo;
    t7: {
            (n: number, s: string): number;
            //(s1: string, s2: string): number;
        };
    t8: (n: number, s: string) => number;
    t9: number[][];
    t10: IFoo[];
    t11: {(n: number, s: string): string;}[];
    t12: IBar;
    t13: IFoo;
    t14: IFoo;
} = <IPlaceHolder>({});
objc8./*45*/t1 = (function(/*46*/s) { return s });
objc8./*47*/t2 = <IFoo>({
    n: 1
});
objc8./*48*/t3 = [];
objc8./*49*/t4 = function() { return <IFoo>({}) };
objc8./*50*/t5 = function(/*51*/n) { return <IFoo>({}) };
objc8./*52*/t6 = function(/*53*/n, /*54*/s) { return <IFoo>({}) };
objc8./*55*/t7 = function(n: number) { return n };
objc8./*56*/t8 = function(/*57*/n) { return n; };
objc8./*58*/t9 = [[],[]];
objc8./*59*/t10 = [<IFoo>({}),<IFoo>({})];
objc8./*60*/t11 = [function (/*61*/n, /*62*/s) { return s; }];
objc8./*63*/t12 = {
    /*64*/foo: <IFoo>({})
}
objc8./*65*/t13 = <IFoo>({
    /*66*/f: function(/*67*/i, /*68*/s) { return s; }
})
objc8./*69*/t14 = <IFoo>({
    /*70*/a: []
})
// CONTEXT: Function call
function c9t5(f: (n: number) => IFoo) {};
c9t5(function(/*71*/n) {
    return <IFoo>({});
});
// CONTEXT: Return statement
var /*72*/c10t5: () => (n: number) => IFoo = function() { return function(/*73*/n) { return <IFoo>({}) } };
// CONTEXT: Newing a class
class C11t5 { constructor(f: (n: number) => IFoo) { } };
var i = new C11t5(function(/*74*/n) { return <IFoo>({}) });
// CONTEXT: Type annotated expression
var /*75*/c12t1 = <(s: string) => string> (function (/*76*/s) { return s });
var /*77*/c12t2 = <IFoo> ({
    n: 1
});
var /*78*/c12t3 = <number[]> [];
var /*79*/c12t4 = <() => IFoo> function() { return <IFoo>({}) };
var /*80*/c12t5 = <(n: number) => IFoo> function(/*81*/n) { return <IFoo>({}) };
var /*82*/c12t6 = <(n: number, s: string) => IFoo> function(/*83*/n, /*84*/s) { return <IFoo>({}) };
var /*85*/c12t7 = <{
    (n: number, s: string): number;
    //(s1: string, s2: string): number;
}> function(n:number) { return n };
var /*86*/c12t8 = <(n: number, s: string) => number> function (/*87*/n) { return n; };
var /*88*/c12t9 = <number[][]> [[],[]];
var /*89*/c12t10 = <IFoo[]> [<IFoo>({}),<IFoo>({})];
var /*90*/c12t11 = <{ (n: number, s: string): string; }[]>[function (/*91*/n, /*92*/s) { return s; }];
var /*93*/c12t12 = <IBar> {
    /*94*/foo: <IFoo>({})
}
var /*95*/c12t13 = <IFoo> ({
    /*96*/f: function(/*97*/i, /*98*/s) { return s; }
})
var /*99*/c12t14 = <IFoo> ({
    /*100*/a: []
})
// CONTEXT: Contextual typing declarations
// contextually typing function declarations
function EF1(a: number, b:number):number;
function /*101*/EF1(/*102*/a,/*103*/b) { return a+b; }
var efv = EF1(1,2);
// contextually typing from ambient class declarations
declare class Point
{
      constructor(x: number, y: number);
      x: number;
      y: number;
      add(dx: number, dy: number): Point;
      static origin: Point;
}
Point./*110*/origin = new /*111*/Point(0, 0);
Point.prototype./*112*/add = function (/*113*/dx, /*114*/dy) {
    return new Point(this.x + dx, this.y + dy);
};
Point.prototype = {
    x: 0,
    y: 0,
    /*115*/add: function (/*116*/dx, /*117*/dy) {
        return new Point(this.x + dx, this.y + dy);
    }
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) C1T5.foo: (i: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "4", "var C2T5.foo: (i: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "6", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "7", "var c3t1: (s: string) => string", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "9", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "10", "var c3t2: IFoo", "")
	f.VerifyQuickInfoAt(t, "11", "var c3t3: number[]", "")
	f.VerifyQuickInfoAt(t, "12", "var c3t4: () => IFoo", "")
	f.VerifyQuickInfoAt(t, "13", "var c3t5: (n: number) => IFoo", "")
	f.VerifyQuickInfoAt(t, "14", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "15", "var c3t6: (n: number, s: string) => IFoo", "")
	f.VerifyQuickInfoAt(t, "16", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "17", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "18", "var c3t7: {\n    (n: number): number;\n    (s1: string): number;\n}", "")
	f.VerifyQuickInfoAt(t, "20", "var c3t8: (n: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "21", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "22", "var c3t9: number[][]", "")
	f.VerifyQuickInfoAt(t, "23", "var c3t10: IFoo[]", "")
	f.VerifyQuickInfoAt(t, "24", "var c3t11: ((n: number, s: string) => string)[]", "")
	f.VerifyQuickInfoAt(t, "25", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "26", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "27", "var c3t12: IBar", "")
	f.VerifyQuickInfoAt(t, "28", "(property) IBar.foo: IFoo", "")
	f.VerifyQuickInfoAt(t, "29", "var c3t13: IFoo", "")
	f.VerifyQuickInfoAt(t, "30", "(method) IFoo.f(i: number, s: string): string", "")
	f.VerifyQuickInfoAt(t, "31", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "32", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "33", "var c3t14: IFoo", "")
	f.VerifyQuickInfoAt(t, "34", "(property) IFoo.a: number[]", "")
	f.VerifyQuickInfoAt(t, "35", "(property) C4T5.foo: (i: number, s: string) => string", "")
	f.VerifyQuickInfoAt(t, "36", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "37", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "38", "var C5T5.foo: (i: number, s: string) => string", "")
	f.VerifyQuickInfoAt(t, "39", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "40", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "41", "var c6t5: (n: number) => IFoo", "")
	f.VerifyQuickInfoAt(t, "42", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "43", "var c7t2: IFoo[]", "")
	f.VerifyQuickInfoAt(t, "44", "var c7t2: IFoo[]", "")
	f.VerifyQuickInfoAt(t, "45", "(property) t1: (s: string) => string", "")
	f.VerifyQuickInfoAt(t, "46", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "47", "(property) t2: IFoo", "")
	f.VerifyQuickInfoAt(t, "48", "(property) t3: number[]", "")
	f.VerifyQuickInfoAt(t, "49", "(property) t4: () => IFoo", "")
	f.VerifyQuickInfoAt(t, "50", "(property) t5: (n: number) => IFoo", "")
	f.VerifyQuickInfoAt(t, "51", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "52", "(property) t6: (n: number, s: string) => IFoo", "")
	f.VerifyQuickInfoAt(t, "53", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "54", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "55", "(property) t7: (n: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "56", "(property) t8: (n: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "57", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "58", "(property) t9: number[][]", "")
	f.VerifyQuickInfoAt(t, "59", "(property) t10: IFoo[]", "")
	f.VerifyQuickInfoAt(t, "60", "(property) t11: ((n: number, s: string) => string)[]", "")
	f.VerifyQuickInfoAt(t, "61", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "62", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "63", "(property) t12: IBar", "")
	f.VerifyQuickInfoAt(t, "64", "(property) IBar.foo: IFoo", "")
	f.VerifyQuickInfoAt(t, "65", "(property) t13: IFoo", "")
	f.VerifyQuickInfoAt(t, "66", "(method) IFoo.f(i: number, s: string): string", "")
	f.VerifyQuickInfoAt(t, "67", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "68", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "69", "(property) t14: IFoo", "")
	f.VerifyQuickInfoAt(t, "70", "(property) IFoo.a: number[]", "")
	f.VerifyQuickInfoAt(t, "71", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "72", "var c10t5: () => (n: number) => IFoo", "")
	f.VerifyQuickInfoAt(t, "73", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "74", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "75", "var c12t1: (s: string) => string", "")
	f.VerifyQuickInfoAt(t, "76", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "77", "var c12t2: IFoo", "")
	f.VerifyQuickInfoAt(t, "78", "var c12t3: number[]", "")
	f.VerifyQuickInfoAt(t, "79", "var c12t4: () => IFoo", "")
	f.VerifyQuickInfoAt(t, "80", "var c12t5: (n: number) => IFoo", "")
	f.VerifyQuickInfoAt(t, "81", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "82", "var c12t6: (n: number, s: string) => IFoo", "")
	f.VerifyQuickInfoAt(t, "83", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "84", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "85", "var c12t7: (n: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "86", "var c12t8: (n: number, s: string) => number", "")
	f.VerifyQuickInfoAt(t, "87", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "88", "var c12t9: number[][]", "")
	f.VerifyQuickInfoAt(t, "89", "var c12t10: IFoo[]", "")
	f.VerifyQuickInfoAt(t, "90", "var c12t11: ((n: number, s: string) => string)[]", "")
	f.VerifyQuickInfoAt(t, "91", "(parameter) n: number", "")
	f.VerifyQuickInfoAt(t, "92", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "93", "var c12t12: IBar", "")
	f.VerifyQuickInfoAt(t, "94", "(property) IBar.foo: IFoo", "")
	f.VerifyQuickInfoAt(t, "95", "var c12t13: IFoo", "")
	f.VerifyQuickInfoAt(t, "96", "(method) IFoo.f(i: number, s: string): string", "")
	f.VerifyQuickInfoAt(t, "97", "(parameter) i: number", "")
	f.VerifyQuickInfoAt(t, "98", "(parameter) s: string", "")
	f.VerifyQuickInfoAt(t, "99", "var c12t14: IFoo", "")
	f.VerifyQuickInfoAt(t, "100", "(property) IFoo.a: number[]", "")
	f.VerifyQuickInfoAt(t, "101", "function EF1(a: number, b: number): number", "")
	f.VerifyQuickInfoAt(t, "102", "(parameter) a: any", "")
	f.VerifyQuickInfoAt(t, "103", "(parameter) b: any", "")
	f.VerifyQuickInfoAt(t, "110", "(property) Point.origin: Point", "")
	f.VerifyQuickInfoAt(t, "111", "constructor Point(x: number, y: number): Point", "")
	f.VerifyQuickInfoAt(t, "112", "(method) Point.add(dx: number, dy: number): Point", "")
	f.VerifyQuickInfoAt(t, "113", "(parameter) dx: number", "")
	f.VerifyQuickInfoAt(t, "114", "(parameter) dy: number", "")
	f.VerifyQuickInfoAt(t, "115", "(method) Point.add(dx: number, dy: number): Point", "")
	f.VerifyQuickInfoAt(t, "116", "(parameter) dx: number", "")
	f.VerifyQuickInfoAt(t, "117", "(parameter) dy: number", "")
}
