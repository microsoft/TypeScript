package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOutliningSpansForImportTagJSDoc(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @checkJs: true	
// @Filename: /a.js
[|/**
 * @import {b} from "./b.js";
 * @import {c} from "./c.js";
 */|]

 [|/**
 * @import {d} from "./d.js";
 */|]

`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
