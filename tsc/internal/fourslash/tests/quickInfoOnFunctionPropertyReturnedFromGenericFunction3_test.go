package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoOnFunctionPropertyReturnedFromGenericFunction3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function createProps<T>(t: T) {
  const getProps = () => {}
  const createVariants = () => {}

  getProps.createVariants = createVariants;
  return getProps;
}

createProps({})./**/createVariants();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "(property) getProps<{}>.createVariants: () => void", "")
}
