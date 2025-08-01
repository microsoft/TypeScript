package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSelfReferencedExternalModule2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: app.ts
export import A = require('./app2');
export var I = 1;
A./*1*/Y;
A.B.A.B./*2*/I;
// @Filename: app2.ts
export import B = require('./app');
export var Y = 1;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var A.Y: number", "")
	f.VerifyQuickInfoAt(t, "2", "var I: number", "")
}
