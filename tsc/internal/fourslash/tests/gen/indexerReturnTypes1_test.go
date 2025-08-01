package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIndexerReturnTypes1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Numeric {
    [x: number]: Date;
}
}
interface Stringy {
    [x: string]: RegExp;
}
}
interface NumericPlus {
    [x: number]: Date;
    foo(): Date;
}
}
interface StringyPlus {
    [x: string]: RegExp;
    foo(): RegExp;
}
}
interface NumericG<T> {
    [x: number]: T;
}
}
interface StringyG<T> {
    [x: string]: T;
}
}
interface Ty<T> {
    [x: number]: Ty<T>;
}
interface Ty2<T> {
    [x: number]: { [x: number]: T };
}


}
var numeric: Numeric;
var stringy: Stringy;
var numericPlus: NumericPlus;
var stringPlus: StringyPlus;
var numericG: NumericG<Date>;
var stringyG: StringyG<Date>;
var ty: Ty<Date>;
var ty2: Ty2<Date>;

var /*1*/r1 = numeric[1];
var /*2*/r2 = numeric['1'];
var /*3*/r3 = stringy[1];
var /*4*/r4 = stringy['1'];
var /*5*/r5 = numericPlus[1];
var /*6*/r6 = numericPlus['1'];
var /*7*/r7 = stringPlus[1];
var /*8*/r8 = stringPlus['1'];
var /*9*/r9 = numericG[1];
var /*10*/r10 = numericG['1'];
var /*11*/r11 = stringyG[1];
var /*12*/r12 = stringyG['1'];
var /*13*/r13 = ty[1];
var /*14*/r14 = ty['1'];
var /*15*/r15 = ty2[1];
var /*16*/r16 = ty2['1'];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r1: Date", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: Date", "")
	f.VerifyQuickInfoAt(t, "3", "var r3: RegExp", "")
	f.VerifyQuickInfoAt(t, "4", "var r4: RegExp", "")
	f.VerifyQuickInfoAt(t, "5", "var r5: Date", "")
	f.VerifyQuickInfoAt(t, "6", "var r6: Date", "")
	f.VerifyQuickInfoAt(t, "7", "var r7: RegExp", "")
	f.VerifyQuickInfoAt(t, "8", "var r8: RegExp", "")
	f.VerifyQuickInfoAt(t, "9", "var r9: Date", "")
	f.VerifyQuickInfoAt(t, "10", "var r10: Date", "")
	f.VerifyQuickInfoAt(t, "11", "var r11: Date", "")
	f.VerifyQuickInfoAt(t, "12", "var r12: Date", "")
	f.VerifyQuickInfoAt(t, "13", "var r13: Ty<Date>", "")
	f.VerifyQuickInfoAt(t, "14", "var r14: Ty<Date>", "")
	f.VerifyQuickInfoAt(t, "15", "var r15: {\n    [x: number]: Date;\n}", "")
	f.VerifyQuickInfoAt(t, "16", "var r16: {\n    [x: number]: Date;\n}", "")
}
