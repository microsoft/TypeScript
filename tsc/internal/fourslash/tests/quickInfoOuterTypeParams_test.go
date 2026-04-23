package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOuterTypeParams(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
function namedSchemaError<Tag extends string>(tag: Tag) {
  class NamedSchemaError extends Error {
		public static isInstance(input: unknown) {
			return input instanceof NamedSchemaError
    }
  }
  return NamedSchemaError;
}

function t() {
    const schemaError = namedSchemaError("MyError");
    const isInstance = schemaError.isInst/*1*/ance({});
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
