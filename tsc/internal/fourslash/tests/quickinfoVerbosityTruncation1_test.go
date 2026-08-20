package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickinfoVerbosityTruncation1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Str = string | {};
type FooType = Str | number;
type Sym = symbol | (() => void);
type BarType = Sym | boolean;
interface LotsOfProps {
    someLongPropertyName1: Str;
    someLongPropertyName2: FooType;
    someLongPropertyName3: Sym;
    someLongPropertyName4: BarType;
    someLongPropertyName5: Str;
    someLongPropertyName6: FooType;
    someLongPropertyName7: Sym;
    someLongPropertyName8: BarType;
    someLongMethodName1(a: FooType, b: BarType): Sym;
    someLongPropertyName9: Str;
    someLongPropertyName10: FooType;
    someLongPropertyName11: Sym;
    someLongPropertyName12: BarType;
    someLongPropertyName13: Str;
    someLongPropertyName14: FooType;
    someLongPropertyName15: Sym;
    someLongPropertyName16: BarType;
    someLongMethodName2(a: FooType, b: BarType): Sym;
}
const obj1/*o1*/: LotsOfProps = undefined as any as LotsOfProps;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"o1": {0, 1}})
}
