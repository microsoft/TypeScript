package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpCallExpressionJs(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @checkJs: true
// @allowJs: true
// @Filename: main.js
function allOptional() { arguments; }
allOptional(/*1*/);
allOptional(1, 2, 3);
function someOptional(x, y) { arguments; }
someOptional(/*2*/);
someOptional(1, 2, 3);
someOptional(); // no error here; x and y are optional in JS`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "allOptional(...args: any[]): void", ParameterCount: 1, ParameterName: "args", ParameterSpan: "...args: any[]", IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "someOptional(x: any, y: any, ...args: any[]): void", ParameterCount: 3, ParameterName: "x", ParameterSpan: "x: any", IsVariadic: true, IsVariadicSet: true})
}
