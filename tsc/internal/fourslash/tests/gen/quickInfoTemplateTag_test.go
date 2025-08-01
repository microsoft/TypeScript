package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTemplateTag(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /foo.js
/**
 * Doc
 * @template {new (...args: any[]) => any} T
 * @param {T} cls
 */
function /**/myMixin(cls) {
    return class extends cls {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "function myMixin<T extends new (...args: any[]) => any>(cls: T): {\n    new (...args: any[]): (Anonymous class);\n    prototype: myMixin<any>.(Anonymous class);\n} & T", "function myMixin<T extends new (...args: any[]) => any>(cls: T): {\n    new (...args: any[]): (Anonymous class);\n    prototype: myMixin<any>.(Anonymous class);\n} & T")
}
