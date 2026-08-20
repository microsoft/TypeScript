package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationItemsExportEqualsExpression2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export const foo = {
  foo: {},
};

export = {
  foo: {},
};

export = {
  foo: {},
};

type Type = typeof foo;

export = {
  foo: {},
} as Type;

export = {
  foo: {},
} satisfies Type;

export = (class {
  prop = 42;
});

export = (class Cls {
  prop = 42;
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
