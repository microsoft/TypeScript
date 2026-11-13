package fourslash

import (
	"os"
	"os/exec"
	"slices"
	"strings"
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

func TestGoToEachMarkerMissing(t *testing.T) {
	t.Parallel()
	const helperEnv = "FOURSLASH_MISSING_MARKER_HELPER"
	if os.Getenv(helperEnv) == "1" {
		f := newMarkerTest(t)
		f.GoToEachMarker(t, []string{"first", "missing"}, func(marker *Marker, index int) {
			t.Error("unexpected marker callback")
		})
		return
	}
	cmd := exec.Command(os.Args[0], "-test.run=^TestGoToEachMarkerMissing$")
	cmd.Env = append(os.Environ(), helperEnv+"=1")
	output, err := cmd.CombinedOutput()
	if err == nil || !strings.Contains(string(output), "Marker 'missing' not found") || strings.Contains(string(output), "unexpected marker callback") {
		t.Fatalf("expected missing marker failure before any callbacks; got %v\n%s", err, output)
	}
}
