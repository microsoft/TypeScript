package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationBarPropertyDeclarations(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A {
    public A1 = class {
        public x = 1;
        private y() {}
        protected z() {}
    }

    public A2 = {
        x: 1,
        y() {},
        z() {}
    }

    public A3 = function () {}
    public A4 = () => {}
    public A5 = 1;
    public A6 = "A6";

    public ["A7"] = class {
        public x = 1;
        private y() {}
        protected z() {}
    }

    public [1] = {
        x: 1,
        y() {},
        z() {}
    }

    public [1 + 1] = 1;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
