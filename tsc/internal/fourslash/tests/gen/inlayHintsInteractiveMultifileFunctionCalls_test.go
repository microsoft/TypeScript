package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveMultifileFunctionCalls(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Target: esnext
// @module: node18
// @Filename: aaa.mts
import { helperB } from "./bbb.mjs";
helperB("hello, world!");
// @Filename: bbb.mts
import { helperC } from "./ccc.mjs";
export function helperB(bParam: string) {
    helperC(bParam);
}
// @Filename: ccc.mts
export function helperC(cParam: string) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "./aaa.mts")
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll})
}
