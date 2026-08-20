package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperAutoImportAfterSynthesizedSupplementalPrefix(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The mapper produces these virtual files for app.astro:
	//
	//   canonical:    export {};
	//   supplemental: /* generated */
	//                 const value = help;
	//
	// Only the original `const value = help;` text is mapped. The auto-import insertion skips the
	// synthesized prefix and maps back through the supplemental file to the start of app.astro.
	f, done := newContentMapperFourslash(t, `// @Filename: /dep.ts
export const helper = 1;

// @Filename: /app.astro
const value = help/**/;
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{"helper"}},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "helper",
		Source:      "./dep",
		Description: "Add import from \"./dep\"",
		NewFileContent: new(`import { helper } from "./dep";

const value = help;
`),
	})
}

func TestContentMapperDropsUnmappedFoldingRanges(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The mapper replaces app.fold with this fully synthesized virtual TypeScript and returns an empty
	// span map:
	//
	//   import "a";
	//   import "b";
	//   /*
	//    * generated
	//    */
	//   export {};
	//
	// The import group and multiline comment both produce virtual folding candidates, but neither can be
	// mapped into the original `host markup` document. The LSP folding request must return no ranges. In
	// particular, the rejected candidates must not be appended as nil entries and later dereferenced while
	// sorting the response.
	f, done := newContentMapperFourslash(t, `// @Filename: /app.fold
host markup
`, contentmappertest.UnmappedFoldingMapper, ".fold")
	defer done()

	f.GoToFile(t, "/app.fold")
	f.VerifyFoldingRangeLines(t, nil)
}

func TestContentMapperSupplementalFoldingRanges(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The canonical output has no fold; the supplemental output prefixes a comment to the original code:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  function outer() {
	//                      const value = 1;
	//                  }
	//
	//   original:      [------------- function -------------)
	//   supplemental:  /* generated */[------------- function -------------)
	//                                 `-- verbatim, FeatureFoldingRanges --'
	//
	// Folding must therefore visit the supplemental projection and map its function body to lines 0-2.
	f, done := newContentMapperFourslash(t, `// @Filename: /app.astro
function outer() {
    const value = 1;
}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/app.astro")
	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{{StartLine: 0, EndLine: 2}})
}

func TestContentMapperDisabledSupplementalFoldingRanges(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The virtual outputs have the same shape as TestContentMapperSupplementalFoldingRanges:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  function outer() {
	//                      const value = 1;
	//                  }
	//
	//   original:      [------------- function -------------)
	//   supplemental:  /* generated */[------------- function -------------)
	//                                 `---- verbatim, FeatureNone --------'
	//
	// The function is mapped but explicitly disabled for folding, so it must produce no range.
	f, done := newContentMapperFourslash(t, `// @Filename: /folding-disabled.astro
function outer() {
    const value = 1;
}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/folding-disabled.astro")
	f.VerifyFoldingRangeLines(t, nil)
}

func TestContentMapperDeduplicatesProjectedFoldingRanges(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Both virtual files contain the original function and map it verbatim with folding enabled:
	//
	//   canonical:     function outer() { ... }
	//   supplemental:  /* generated */
	//                  function outer() { ... }
	//
	//   original:      [------------- function -------------)
	//   canonical:     [------------- function -------------)
	//                  `-- verbatim, FeatureFoldingRanges --'
	//   supplemental:  /* generated */[------------- function -------------)
	//                                 `-- verbatim, FeatureFoldingRanges --'
	//
	// Both projections map to the same original fold, which must be returned only once.
	f, done := newContentMapperFourslash(t, `// @Filename: /folding-duplicate.astro
function outer() {
    const value = 1;
}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/folding-duplicate.astro")
	f.VerifyFoldingRangeLines(t, []fourslash.FoldingRangeLineExpected{{StartLine: 0, EndLine: 2}})
}
