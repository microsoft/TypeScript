package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationItemsExportDefaultExpression2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export const foo = {
  foo: {},
};

export default {
  foo: {},
};

export default {
  foo: {},
};

type Type = typeof foo;

export default {
  foo: {},
} as Type;

export default {
  foo: {},
} satisfies Type;

export default (class {
  prop = 42;
});

export default (class Cls {
  prop = 42;
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
