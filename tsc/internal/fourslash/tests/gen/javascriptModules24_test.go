package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJavascriptModules24(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: mod.ts
function foo() { return 42; }
namespace foo {
  export function bar (a: string) { return a; }
}
export = foo;
// @Filename: app.ts
import * as foo from "./mod"
foo/*1*/();
foo.bar(/*2*/"test");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyErrorExistsBeforeMarker(t, "1")
	f.VerifyQuickInfoIs(t, "(alias) function foo(): number\n(alias) namespace foo\nimport foo", "")
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{})
}
