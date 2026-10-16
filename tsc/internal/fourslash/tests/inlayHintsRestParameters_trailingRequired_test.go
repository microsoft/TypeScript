package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestInlayHintsRestParameters_trailingRequired(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function test(...rest: [first: number, ...middle: string[], last: string]) {}
test(10, 'a', 'b', 'c')
test(10, 'a', 'c')
test(10, 'c')

function head(...rest: [...init: string[], last: number]) {}
head('a', 'b', 1)
head(1)

function mixed(a: boolean, ...rest: [x: number, ...ys: string[], z: string]) {}
mixed(true, 1, 'a', 'b', 'c')

function noTrailing(...rest: [first: number, ...middle: string[]]) {}
noTrailing(1, 'a', 'b')`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll}})
}
