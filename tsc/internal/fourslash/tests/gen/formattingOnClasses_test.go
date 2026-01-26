package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnClasses(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/         class                    a                  {
/*2*/                                                        constructor       (       n   :                 number    )             ;
/*3*/                                                        constructor       (       s   :                 string    )             ;
/*4*/                                                        constructor       (       ns   :                 any    )                            {

/*5*/                                                        }

/*6*/                                                            public                 pgF       (           )                            {                  }

/*7*/                                                            public                 pv   ;
/*8*/                                                            public                 get              d       (           )                            {
/*9*/                                                                                                                return              30   ;
/*10*/                                                        }
/*11*/                                                            public                 set              d       (       number        )                            {
/*12*/                                                        }

/*13*/                                                            public                 static                    get              p2       (           )                            {
/*14*/                                                                                                                return                  {                  x   :                 30   ,                  y   :                 40              }   ;
/*15*/                                                        }

/*16*/                                                                         private                static                    d2       (           )                            {
/*17*/                                                        }
/*18*/                                                                         private                static                    get              p3       (           )                            {
/*19*/                                                                                                                return              "string"   ;
/*20*/                                                        }
/*21*/                                                                         private                pv3   ;

/*22*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/*23*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/*24*/                                                                         private                foo       (       ns   :                 any    )                            {
/*25*/                                                                                                                return              ns.toString       (           )             ;
/*26*/                                                        }
/*27*/}

/*28*/         class                    b              extends              a                  {
/*29*/}

/*30*/         class   m1b      {

/*31*/}

/*32*/                                                interface   m1ib                               {

/*33*/  }
/*34*/         class                    c              extends              m1b                  {
/*35*/}

/*36*/         class                    ib2              implements              m1ib                  {
/*37*/}

/*38*/    declare                            class                    aAmbient                  {
/*39*/                                                        constructor                     (       n   :                 number    )             ;
/*40*/                                                        constructor                     (       s   :                 string    )             ;
/*41*/                                                            public                 pgF       (           )             :                 void   ;
/*42*/                                                            public                 pv   ;
/*43*/                                                            public                 d                 :                 number   ;
/*44*/                                                        static                    p2                 :                     {                  x   :                 number   ;              y   :                 number   ;              }   ;
/*45*/                                                        static                    d2       (           )             ;
/*46*/                                                        static                    p3   ;
/*47*/                                                                         private                pv3   ;
/*48*/                                                                         private                foo       (       s    )             ;
/*49*/}

/*50*/         class                    d                  {
/*51*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/*52*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/*53*/                                                                         private                foo       (       ns   :                 any    )                            {
/*54*/                                                                                                                return              ns.toString       (           )             ;
/*55*/                                                        }
/*56*/}

/*57*/         class                    e                  {
/*58*/                                                                         private                foo       (       s   :                 string    )             :                 string   ;
/*59*/                                                                         private                foo       (       n   :                 number    )             :                 string   ;
/*60*/                                                                         private                foo       (       ns   :                 any    )                            {
/*61*/                                                                                                                return              ns.toString       (           )             ;
/*62*/                                                        }
/*63*/                                                                         protected              bar        (            )  {                 }
/*64*/                                                                         protected     static   bar2       (            )  {                 }
/*65*/                                                                         private                pv4  :    number =
/*66*/                                                                         {};
/*END*/}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `class a {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    constructor(n: number);`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    constructor(s: string);`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    constructor(ns: any) {`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    public pgF() { }`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    public pv;`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    public get d() {`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `        return 30;`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `    public set d(number) {`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `    public static get p2() {`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `        return { x: 30, y: 40 };`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `    private static d2() {`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `    private static get p3() {`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `        return "string";`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `    private pv3;`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `    private foo(n: number): string;`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `    private foo(s: string): string;`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `    private foo(ns: any) {`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `        return ns.toString();`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "28")
	f.VerifyCurrentLineContent(t, `class b extends a {`)
	f.GoToMarker(t, "29")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "30")
	f.VerifyCurrentLineContent(t, `class m1b {`)
	f.GoToMarker(t, "31")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "32")
	f.VerifyCurrentLineContent(t, `interface m1ib {`)
	f.GoToMarker(t, "33")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "34")
	f.VerifyCurrentLineContent(t, `class c extends m1b {`)
	f.GoToMarker(t, "35")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "36")
	f.VerifyCurrentLineContent(t, `class ib2 implements m1ib {`)
	f.GoToMarker(t, "37")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "38")
	f.VerifyCurrentLineContent(t, `declare class aAmbient {`)
	f.GoToMarker(t, "39")
	f.VerifyCurrentLineContent(t, `    constructor(n: number);`)
	f.GoToMarker(t, "40")
	f.VerifyCurrentLineContent(t, `    constructor(s: string);`)
	f.GoToMarker(t, "41")
	f.VerifyCurrentLineContent(t, `    public pgF(): void;`)
	f.GoToMarker(t, "42")
	f.VerifyCurrentLineContent(t, `    public pv;`)
	f.GoToMarker(t, "43")
	f.VerifyCurrentLineContent(t, `    public d: number;`)
	f.GoToMarker(t, "44")
	f.VerifyCurrentLineContent(t, `    static p2: { x: number; y: number; };`)
	f.GoToMarker(t, "45")
	f.VerifyCurrentLineContent(t, `    static d2();`)
	f.GoToMarker(t, "46")
	f.VerifyCurrentLineContent(t, `    static p3;`)
	f.GoToMarker(t, "47")
	f.VerifyCurrentLineContent(t, `    private pv3;`)
	f.GoToMarker(t, "48")
	f.VerifyCurrentLineContent(t, `    private foo(s);`)
	f.GoToMarker(t, "49")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "50")
	f.VerifyCurrentLineContent(t, `class d {`)
	f.GoToMarker(t, "51")
	f.VerifyCurrentLineContent(t, `    private foo(n: number): string;`)
	f.GoToMarker(t, "52")
	f.VerifyCurrentLineContent(t, `    private foo(s: string): string;`)
	f.GoToMarker(t, "53")
	f.VerifyCurrentLineContent(t, `    private foo(ns: any) {`)
	f.GoToMarker(t, "54")
	f.VerifyCurrentLineContent(t, `        return ns.toString();`)
	f.GoToMarker(t, "55")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "56")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "57")
	f.VerifyCurrentLineContent(t, `class e {`)
	f.GoToMarker(t, "58")
	f.VerifyCurrentLineContent(t, `    private foo(s: string): string;`)
	f.GoToMarker(t, "59")
	f.VerifyCurrentLineContent(t, `    private foo(n: number): string;`)
	f.GoToMarker(t, "60")
	f.VerifyCurrentLineContent(t, `    private foo(ns: any) {`)
	f.GoToMarker(t, "61")
	f.VerifyCurrentLineContent(t, `        return ns.toString();`)
	f.GoToMarker(t, "62")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "63")
	f.VerifyCurrentLineContent(t, `    protected bar() { }`)
	f.GoToMarker(t, "64")
	f.VerifyCurrentLineContent(t, `    protected static bar2() { }`)
	f.GoToMarker(t, "65")
	f.VerifyCurrentLineContent(t, `    private pv4: number =`)
	f.GoToMarker(t, "66")
	f.VerifyCurrentLineContent(t, `        {};`)
	f.GoToMarker(t, "END")
	f.VerifyCurrentLineContent(t, `}`)
}
