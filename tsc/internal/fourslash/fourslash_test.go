package fourslash

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
)

func newMarkerTest(t *testing.T) *FourslashTest {
	data := ParseTestData(t, `const /*first*/x = /*second*/1; /*third*/`, "markers.ts")
	return &FourslashTest{
		testData:       &data,
		activeFilename: data.Markers[0].FileName(),
	}
}

func TestGoToEachMarker(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		name     string
		selected []string
		want     []string
	}{
		{name: "all", want: []string{"first", "second", "third"}},
		{name: "empty", selected: []string{}, want: []string{"first", "second", "third"}},
		{name: "subset", selected: []string{"second"}, want: []string{"second"}},
		{name: "ordered duplicates", selected: []string{"third", "first", "third"}, want: []string{"third", "first", "third"}},
	} {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			f := newMarkerTest(t)
			var visited []string
			f.GoToEachMarker(t, tt.selected, func(marker *Marker, index int) {
				if index != len(visited) {
					t.Errorf("callback index = %d, want %d", index, len(visited))
				}
				if f.currentCaretPosition != marker.LSPos() || f.lastKnownMarkerName != marker.GetName() || f.selectionEnd != nil {
					t.Error("callback did not observe navigation to its marker")
				}
				visited = append(visited, *marker.Name)
				f.selectionEnd = new(lsproto.Position{})
			})
			if !slices.Equal(visited, tt.want) {
				t.Fatalf("visited %v, want %v", visited, tt.want)
			}
		})
	}
}
