package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReferenceScanningUnicodeBoundaries(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const padding = 0;
function example() {
    const /*declaration*/obj = {};
    /*before*/obj¬;
    ☺/*after*/obj;
    　/*whitespace*/obj　;
    const éobj = {}, objé = {}, 𐐀obj = {}, obj𐐀 = {}, obj́ = {};
    éobj; objé; 𐐀obj; obj𐐀; obj́;
    /*last*/obj;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "declaration", "before", "after", "whitespace", "last")
	f.VerifyBaselineRename(t, nil /*preferences*/, "declaration")
}

func TestOrganizeImportsUnicodeReferenceBoundaries(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		name string
		use  string
		used bool
	}{
		{name: "following nonidentifier", use: "obj¬;", used: true},
		{name: "preceding nonidentifier", use: "¬obj;", used: true},
		{name: "preceding three-byte nonidentifier", use: "☺obj;", used: true},
		{name: "supplementary nonidentifier", use: "obj😀;", used: true},
		{name: "unicode whitespace", use: "\u3000obj\u3000;", used: true},
		{name: "unicode identifiers", use: "const éobj = {}, objé = {}, 𐐀obj = {}, obj𐐀 = {}, obj́ = {};"},
	} {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			const importText = "import { obj } from './obj';\n"
			content := "// @Filename: /obj.ts\nexport const obj = {};\n" +
				"// @Filename: /main.ts\n/*main*/" + importText + tt.use
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, "main")
			expected := tt.use
			if tt.used {
				expected = importText + expected
			}
			f.VerifyOrganizeImports(t, expected, lsproto.CodeActionKindSourceOrganizeImportsTs, nil)
		})
	}
}
