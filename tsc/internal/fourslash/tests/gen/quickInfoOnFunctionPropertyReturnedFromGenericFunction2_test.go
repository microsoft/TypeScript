package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnFunctionPropertyReturnedFromGenericFunction2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function createProps<T>(t: T) {
  const getProps = function() {}
  const createVariants = function() {}

  getProps.createVariants = createVariants;
  return getProps;
}

createProps({})./**/createVariants();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(property) getProps<{}>.createVariants: () => void", "")
}
