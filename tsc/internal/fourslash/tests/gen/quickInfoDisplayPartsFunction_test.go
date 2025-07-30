package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsFunction(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*1*/foo(param: string, optionalParam?: string, paramWithInitializer = "hello", ...restParam: string[]) {
}
function /*2*/foowithoverload(a: string): string;
function /*3*/foowithoverload(a: number): number;
function /*4*/foowithoverload(a: any): any {
    return a;
}
function /*5*/foowith3overload(a: string): string;
function /*6*/foowith3overload(a: number): number;
function /*7*/foowith3overload(a: boolean): boolean;
function /*8*/foowith3overload(a: any): any {
    return a;
}
/*9*/foo("hello");
/*10*/foowithoverload("hello");
/*11*/foowithoverload(10);
/*12*/foowith3overload("hello");
/*13*/foowith3overload(10);
/*14*/foowith3overload(true);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
