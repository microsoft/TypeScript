package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInheritDoc2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noEmit: true
// @allowJs: true
// @Filename: quickInfoInheritDoc2.ts
class Base<T> {
    /**
     * Base.prop
     */
    prop: T | undefined;
}

class SubClass<T> extends Base<T> {
    /**
     * @inheritdoc
     * SubClass.prop
     */
    /*1*/prop: T | undefined;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
