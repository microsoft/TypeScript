package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForRequire(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: AA/BB.ts
export class a{}
//@Filename: quickInfoForRequire_input.ts
import a = require("./AA/B/*1*/B");
import b = require(` + "`" + `./AA/B/*2*/B` + "`" + `);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "module a", "")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "module a", "")
}
