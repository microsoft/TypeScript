package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperDuplicateMappings(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /value.dup
[|val/*query*/ue|]
`, contentmappertest.DuplicateMapper, ".dup")
	defer done()

	f.VerifyQuickInfoAt(t, "query", "const value: 1", "")
	f.VerifyBaselineGoToDefinition(t, false, "query")
	f.VerifyBaselineFindAllReferences(t, "query")
	f.VerifyRename(t, "query", "renamed", map[string]string{
		"/value.dup": "renamed\n",
	})
}

func TestContentMapperDisabledFeatures(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /disabled.dup
val/*query*/ue
`, contentmappertest.DuplicateMapper, ".dup")
	defer done()

	f.GoToMarker(t, "query")
	f.VerifyNotQuickInfoExists(t)
	f.VerifyBaselineGoToDefinition(t, false, "query")
	f.VerifyBaselineFindAllReferences(t, "query")
}

func TestContentMapperConflictingDuplicateRenameMappings(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// original: value
	//           [---) [0,5)
	//
	// virtual:  export const value = 1;
	//                        [---) [13,18) -> [0,5), rename text "renamed"
	//           const object = { value };
	//                            [---) [41,46) -> [0,5), rename text "renamed: value"
	//           value;
	//           [---) [50,55) -> [0,5), rename text "renamed"
	//
	// The shorthand projection disagrees with the others, so no edit is safe for the shared original span.
	f, done := newContentMapperFourslash(t, `// @Filename: /rename-conflict.dup
val/*query*/ue
`, contentmappertest.DuplicateMapper, ".dup")
	defer done()

	f.GoToMarker(t, "query")
	result := f.RenameAtCaret(t, "renamed")
	if result.WorkspaceEdit != nil {
		t.Fatalf("expected conflicting projections to abort rename, got %#v", result.WorkspaceEdit)
	}
}
