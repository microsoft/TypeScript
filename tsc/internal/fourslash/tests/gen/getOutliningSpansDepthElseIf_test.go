package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyOutliningSpans(t)
}
