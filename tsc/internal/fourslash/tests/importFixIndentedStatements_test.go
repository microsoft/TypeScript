package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// An added import has to line up with the imports already in the file. The formatter indents a new
// top-level statement to column zero, since that is where a top-level statement canonically belongs, so
// the surrounding indentation has to be reapplied when the file does something else. Statements are only
// indented like this in hand-written TypeScript by accident, but it is the normal shape of the virtual
// file a content mapper produces for an indented `<script>` block.
//
// The two tests below cover the two sides of the insertion point: the indentation can sit before it or
// after it, and it has to end up on both lines either way.

// The new import sorts first, so it is inserted directly after the existing import's indentation.
func TestImportFixBeforeIndentedImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslashWithOptions(t, `// @Filename: /aaa.ts
export const helper = 1;

// @Filename: /dep.ts
export const existing = 2;

// @Filename: /main.ts
// header
  import { existing } from "./dep";
  const value = help/**/;
`, &fourslash.FourslashOptions{})
	defer done()

	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "helper",
		Source:      "./aaa",
		Description: `Add import from "./aaa"`,
		NewFileContent: new(`// header
  import { helper } from "./aaa";
  import { existing } from "./dep";
  const value = help;
`),
	})
}

// The new import sorts last, so it is inserted at the start of the line following the existing import.
func TestImportFixAfterIndentedImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslashWithOptions(t, `// @Filename: /aaa.ts
export const existing = 2;

// @Filename: /zzz.ts
export const helper = 1;

// @Filename: /main.ts
// header
  import { existing } from "./aaa";
  const value = help/**/;
`, &fourslash.FourslashOptions{})
	defer done()

	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "helper",
		Source:      "./zzz",
		Description: `Add import from "./zzz"`,
		NewFileContent: new(`// header
  import { existing } from "./aaa";
  import { helper } from "./zzz";
  const value = help;
`),
	})
}

// The scanner treats a lone carriage return as a line terminator, so a file that uses CR endings has real
// lines and real indentation, and an inserted import has to respect them.
func TestImportFixBeforeIndentedImportWithCarriageReturns(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslashWithOptions(t, `// @Filename: /aaa.ts
export const helper = 1;

// @Filename: /dep.ts
export const existing = 2;

// @Filename: /main.ts
`+"// header\r  import { existing } from \"./dep\";\r  const value = help/**/;\r",
		&fourslash.FourslashOptions{})
	defer done()

	// The inserted line is separated with the tracker's newline rather than the file's, which is a
	// pre-existing behavior unrelated to indentation; what matters here is that both imports stay indented.
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:           "helper",
		Source:         "./aaa",
		Description:    `Add import from "./aaa"`,
		NewFileContent: new("// header\r  import { helper } from \"./aaa\";\n  import { existing } from \"./dep\";\r  const value = help;\r"),
	})
}
