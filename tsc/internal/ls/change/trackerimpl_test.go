package change

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
)

func TestTextEditsConflictAtSameInsertionPointAcrossProjections(t *testing.T) {
	t.Parallel()

	position := lsproto.Position{Line: 1, Character: 2}
	a := &lsproto.TextEdit{Range: lsproto.Range{Start: position, End: position}, NewText: "a"}
	b := &lsproto.TextEdit{Range: lsproto.Range{Start: position, End: position}, NewText: "b"}

	if !textEditsConflict(a, b, true) {
		t.Fatal("different insertions at the same position across projections should conflict")
	}
	if textEditsConflict(a, b, false) {
		t.Fatal("insertions at the same position within one projection should retain their existing ordering")
	}
}
