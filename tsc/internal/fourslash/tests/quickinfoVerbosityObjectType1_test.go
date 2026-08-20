package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityObjectType1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Str = string | {};
type FooType = Str | number;
type Sym = symbol | (() => void);
type BarType = Sym | boolean;
type Obj = { foo: FooType, bar: BarType, str: Str };
const obj1/*o1*/: Obj = { foo: 1, bar: true, str: "3"};
const obj2/*o2*/: { foo: FooType, bar: BarType, str: Str } = { foo: 1, bar: true, str: "3"};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"o1": {0, 1, 2, 3}, "o2": {0, 1, 2}})
}
