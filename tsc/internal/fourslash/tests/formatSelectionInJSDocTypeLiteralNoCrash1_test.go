package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatSelectionInJSDocTypeLiteralNoCrash1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "// @allowJs: true\n" +
		"// @filename: index.js\n" +
		"/**\n" +
		" *\n" +
		" *\n" +
		" * @typedef {Object} Fixture\n" +
		" * @property {typeof build} build\n" +
		"/*begin*/ * @property {(url: string) => string} resolveUrl\n" +
		" * @property {() => Promise<void>} clean\n" +
		"/*end*/ * @property {(streaming?: boolean) => Promise<App>} loadTestAdapterApp\n" +
		" */\n" +
		"\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatSelection(t, "begin", "end")
	f.VerifyCurrentFileContent(t, "/**\n"+
		" *\n"+
		" *\n"+
		" * @typedef {Object} Fixture\n"+
		" * @property {typeof build} build\n"+
		" * @property {(url: string) => string} resolveUrl\n"+
		" * @property {() => Promise<void>} clean\n"+
		" * @property {(streaming?: boolean) => Promise<App>} loadTestAdapterApp\n"+
		" */\n"+
		"\n")
}
