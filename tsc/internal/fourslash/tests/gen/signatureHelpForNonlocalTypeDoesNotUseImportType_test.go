package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpForNonlocalTypeDoesNotUseImportType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: exporter.ts
export interface Thing {}
export const Foo: () => Thing = null as any;
// @Filename: usage.ts
import {Foo} from "./exporter"
function f(p = Foo()): void {}
f(/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(p?: Thing): void"})
}
