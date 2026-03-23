package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports_exportLeadingComment_notDuplicated(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name    string
		content string
	}{
		{
			name: "singleComment",
			content: `// a
export { a } from "a";
console.log(a);`,
		},
		{
			name: "multipleComments",
			content: `// a
// a
export { a } from "a";
console.log(a);`,
		},
		{
			name: "secondExport",
			content: `export { a } from "a";
// b
export { b } from "b";
console.log(a, b);`,
		},
		{
			name: "secondExportWithBlankLine",
			content: `export { a } from "a";

// b
export { b } from "b";
console.log(a, b);`,
		},
		{
			name: "commentWithBlankLine",
			content: `// a

export { a } from "a";
console.log(a);`,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, tc.content)
			defer done()
			f.VerifyOrganizeImports(t, tc.content, lsproto.CodeActionKindSourceSortImports, nil)
		})
	}
}
