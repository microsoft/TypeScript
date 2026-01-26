package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingNestedScopes(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/        module      My.App      {
/*2*/export      var appModule =      angular.module("app", [
/*3*/            ]).config([() =>            {
/*4*/                        configureStates
/*5*/($stateProvider);
/*6*/}]).run(My.App.setup);
/*7*/      }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `module My.App {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    export var appModule = angular.module("app", [`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    ]).config([() => {`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `        configureStates`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `            ($stateProvider);`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    }]).run(My.App.setup);`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `}`)
}
