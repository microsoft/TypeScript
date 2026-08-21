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

func TestContentMapperSupplementalCodeLens(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The function exists only in the supplemental projection; its declaration and call map verbatim:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  function outer() {}
	//                  outer();
	//
	//   original:      [------ declaration + call ------)
	//   supplemental:  /* generated */[------ declaration + call ------)
	//                                 `-- verbatim, FeatureAll (includes CodeLens) --'
	//
	// The lens must be produced from the supplemental AST and resolve to one reference.
	f, done := newContentMapperFourslash(t, `// @Filename: /codelens-supplemental.astro
function outer() {}
outer();
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{CodeLens: lsutil.CodeLensUserPreferences{
		ReferencesCodeLensEnabled:            core.TSTrue,
		ReferencesCodeLensShowOnAllFunctions: core.TSTrue,
	}})
}

func TestContentMapperDisabledSupplementalCodeLens(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Both projections contain the function, but only the canonical mapping enables CodeLens:
	//
	//   original:      [------ declaration + call ------)
	//   canonical:     [------ declaration + call ------)
	//                  `-- verbatim, FeatureAll (includes CodeLens) --'
	//   supplemental:  /* generated */[------ declaration + call ------)
	//                                 `---- verbatim, FeatureNone -----'
	//
	// Exactly one canonical lens should remain and resolve normally.
	f, done := newContentMapperFourslash(t, `// @Filename: /codelens-disabled.astro
function outer() {}
outer();
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{CodeLens: lsutil.CodeLensUserPreferences{
		ReferencesCodeLensEnabled:            core.TSTrue,
		ReferencesCodeLensShowOnAllFunctions: core.TSTrue,
	}})
}

func TestContentMapperDeduplicatesProjectedCodeLens(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Canonical and supplemental projections both map the same function and call with CodeLens enabled:
	//
	//   original:      [------ declaration + call ------)
	//   canonical:     [------ declaration + call ------)
	//                  `-- verbatim, FeatureAll (includes CodeLens) --'
	//   supplemental:  /* generated */[------ declaration + call ------)
	//                                 `-- verbatim, FeatureAll (includes CodeLens) --'
	//
	// The equivalent original lenses must deduplicate to one resolved result.
	f, done := newContentMapperFourslash(t, `// @Filename: /codelens-duplicate.astro
function outer() {}
outer();
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{CodeLens: lsutil.CodeLensUserPreferences{
		ReferencesCodeLensEnabled:            core.TSTrue,
		ReferencesCodeLensShowOnAllFunctions: core.TSTrue,
	}})
}

func TestContentMapperSupplementalImplementationCodeLens(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The interface and its implementation exist only in the supplemental projection:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  interface Service { run(): void }
	//                  class Impl implements Service { run() {} }
	//
	//   original:      [---------- interface + class ----------)
	//   supplemental:  /* generated */[---------- interface + class ----------)
	//                                 `---- verbatim, FeatureAll (includes CodeLens) ----'
	//
	// The interface lens must resolve from the supplemental AST to one implementation.
	f, done := newContentMapperFourslash(t, `// @Filename: /codelens-implementation.astro
interface Service { run(): void }
class Impl implements Service { run() {} }
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{CodeLens: lsutil.CodeLensUserPreferences{
		ImplementationsCodeLensEnabled: core.TSTrue,
	}})
}

func TestContentMapperFormatsSupplementalVerbatimRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Full-document formatting intersects the original file with the supplemental verbatim mapping:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  function outer(){
	//                  const value={a:1};
	//                  }
	//
	//   original:      [------------- function -------------)
	//   supplemental:  /* generated */[------------- function -------------)
	//                                 `-- verbatim, FeatureAll (includes Formatting) --'
	//
	// Only the mapped function range is formatted; the generated prefix is outside the request range.
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting.astro
function outer(){
const value={a:1};
}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/formatting.astro")
	f.FormatDocument(t, "/formatting.astro")
	f.VerifyCurrentFileContent(t, `function outer() {
    const value = { a: 1 };
}
`)
}

func TestContentMapperSkipsFormattingDisabledVerbatimRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The virtual output has the same shape, but its only mapping is disabled for formatting:
	//
	//   canonical:     export {};
	//   supplemental:  /* generated */
	//                  function outer(){
	//                  const value={a:1};
	//                  }
	//
	//   original:      [------------- function -------------)
	//   supplemental:  /* generated */[------------- function -------------)
	//                                 `---- verbatim, FeatureNone --------'
	//
	// Full-document formatting therefore returns no edits.
	const content = `function outer(){
const value={a:1};
}
`
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting-disabled.astro
`+content, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/formatting-disabled.astro")
	f.FormatDocument(t, "/formatting-disabled.astro")
	f.VerifyCurrentFileContent(t, content)
}

func TestContentMapperFormatsEachSupplementalVerbatimRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The supplemental projection splits the original around synthesized generated code:
	//
	//   original:      [--- first ---)[--- second ---)
	//   supplemental:  /* generated */[--- first ---)const generated={x:1};[--- second ---)
	//                                 `- verbatim, Formatting -'             `- verbatim, Formatting -'
	//
	// Each verbatim intersection is formatted independently. Edits outside either virtual intersection,
	// including edits to the synthesized generated declaration, are discarded.
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting-split.astro
function first(){return 1;}
function second(){return 2;}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/formatting-split.astro")
	f.FormatDocument(t, "/formatting-split.astro")
	f.VerifyCurrentFileContent(t, `function first() { return 1; }
function second() { return 2; }
`)
}

func TestContentMapperFormatsOnlyFirstOverlappingProjection(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The canonical and supplemental projections overlap on `second`, but place it in different
	// syntactic contexts. Formatting both copies would produce conflicting edits for the overlap:
	//
	//   original:      [---- first ----)[---- second ----)[---- third ----)
	//
	//   canonical:     [---- first ----)[---- second ----)
	//                  `----- verbatim, Formatting ------'
	//
	//   supplemental:  if (true) {
	//                              [---- second ----)[---- third ----)
	//                              `----- verbatim, Formatting ------'
	//                  }
	//
	// Sorting by original start assigns each character to the earliest applicable mapping:
	//
	//   owner:         [------------ canonical ------------)[ supplemental )
	//
	// Thus `second` uses the top-level canonical formatting, while the uncovered `third` suffix uses
	// the supplemental formatting and gains indentation from its surrounding `if` block.
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting-overlap.astro
function first(){return 1;}
function second(){return 2;}
function third(){return 3;}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/formatting-overlap.astro")
	f.FormatDocument(t, "/formatting-overlap.astro")
	f.VerifyCurrentFileContent(t, `function first() { return 1; }
function second() { return 2; }
    function third() { return 3; }
`)
}

func TestContentMapperFormatsSupplementalOriginalSelection(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The entire original file maps verbatim after a synthesized prefix:
	//
	//   original:      [--- first ---)[--- second ---)
	//   supplemental:  /* generated */[--- first ---)[--- second ---)
	//                                 `---- verbatim, Formatting ----'
	//
	// The original request selects only `second`; formatter edits expanded outside that virtual
	// intersection are rejected, leaving `first` unchanged.
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting-selection.astro
function first(){return 1;}
/*start*/function second(){return 2;}/*end*/
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()

	f.GoToFile(t, "/formatting-selection.astro")
	f.FormatSelection(t, "start", "end")
	f.VerifyCurrentFileContent(t, `function first(){return 1;}
function second() { return 2; }
`)
}
