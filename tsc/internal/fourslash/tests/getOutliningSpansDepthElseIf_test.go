package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOutliningSpansDepthElseIf(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else if (1)[| {
    1;
}|] else[| {
    1;
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
