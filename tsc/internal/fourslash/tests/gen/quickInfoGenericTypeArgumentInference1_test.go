package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoGenericTypeArgumentInference1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module Underscore {
    export interface Iterator<T, U> {
        (value: T, index: any, list: any): U;
    }

    export interface Static {
        all<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): T;
        identity<T>(value: T): T;
    }
}

declare var _: Underscore.Static;
var /*1*/r = _./*11*/all([true, 1, null, 'yes'], x => !x);
var /*2*/r2 = _./*21*/all([true], _.identity);
var /*3*/r3 = _./*31*/all([], _.identity);
var /*4*/r4 = _./*41*/all([<any>true], _.identity);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var r: string | number | boolean", "")
	f.VerifyQuickInfoAt(t, "11", "(method) Underscore.Static.all<string | number | boolean>(list: (string | number | boolean)[], iterator?: Underscore.Iterator<string | number | boolean, boolean>, context?: any): string | number | boolean", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: boolean", "")
	f.VerifyQuickInfoAt(t, "21", "(method) Underscore.Static.all<boolean>(list: boolean[], iterator?: Underscore.Iterator<boolean, boolean>, context?: any): boolean", "")
	f.VerifyQuickInfoAt(t, "3", "var r3: any", "")
	f.VerifyQuickInfoAt(t, "31", "(method) Underscore.Static.all<any>(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any", "")
	f.VerifyQuickInfoAt(t, "4", "var r4: any", "")
	f.VerifyQuickInfoAt(t, "41", "(method) Underscore.Static.all<any>(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any", "")
	f.VerifyNoErrors(t)
}
