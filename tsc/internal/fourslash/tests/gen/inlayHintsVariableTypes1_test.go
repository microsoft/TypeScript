package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsVariableTypes1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {}
namespace N { export class Foo {} }
interface Foo {}
const a = "a";
const b = 1;
const c = true;
const d = {} as Foo;
const e = <Foo>{};
const f = {} as const;
const g = (({} as const));
const h = new C();
const i = new N.C();
const j = ((((new C()))));
const k = { a: 1, b: 1 };
const l = ((({ a: 1, b: 1 })));
 const m = () => 123;
 const n;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayVariableTypeHints: true}})
}
