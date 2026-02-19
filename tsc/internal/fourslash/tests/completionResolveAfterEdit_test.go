package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionResolveAfterEdit(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: /index.ts
interface Point {
	x: number;
	y: number;
}
declare const p: Point;
/*a*/

// @filename: /foo.ts
/*b*/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Step 1: Get completions at the marker.
	f.GoToMarker(t, "a")
	completions := f.GetCompletions(t, nil /*userPreferences*/)
	if completions == nil || len(completions.Items) == 0 {
		t.Fatal("Expected completions but got none")
	}
	firstItem := completions.Items[0]

	// Step 2: Make a file change (insert a comment after marker).
	f.GoToMarker(t, "b")
	f.Insert(t, "1")

	// Step 3: Resolve the first completion item from the original list.
	resolved := f.ResolveCompletionItem(t, firstItem)
	if resolved == nil {
		t.Fatal("Expected resolved completion item but got nil")
	}
}
