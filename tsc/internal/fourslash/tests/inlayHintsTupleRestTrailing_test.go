package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestInlayHintsTupleRestTrailing(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function fn(prefix: boolean, ...args: [first: number, ...middle: string[], last: string]): void;
fn(true, 1, "a", "b", "end");
fn(true, 1, "end");
declare function onlyTrailing(...args: [...head: number[], tail: string]): void;
onlyTrailing(1, 2, "end");
onlyTrailing("end");
declare function noTrailing(...args: [first: number, ...rest: string[]]): void;
noTrailing(1, "a", "b");
declare function skip({ x }: { x: number }, next: number): void;
skip({ x: 1 }, 2);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll}})
}
