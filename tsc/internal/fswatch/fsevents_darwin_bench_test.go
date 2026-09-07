//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

func BenchmarkFSEventsDisplayPath(b *testing.B) {
	const root = "/Users/developer/work/TypeScript/packages/vscode-typescript"
	for _, scenario := range []struct {
		name string
		root string
		path string
		want string
		ok   bool
	}{
		{"exact-match", root, root + "/src/File.ts", root + "/src/File.ts", true},
		{"case-mismatch", strings.ToLower(root), root + "/src/File.ts", strings.ToLower(root) + "/src/File.ts", true},
		{"sibling-miss", root, "/Users/developer/work/TypeScript/packages/other-package/src/File.ts", "", false},
		{"unrelated-miss", root, "/private/tmp/other/File.ts", "", false},
		{"unicode-match", "/Users/developer/work/caf\u00e9", "/Users/developer/work/CAF\u00c9/File.ts", "/Users/developer/work/caf\u00e9/File.ts", true},
		{"unicode-length-match", "/Users/developer/work/s", "/Users/developer/work/\u017f/File.ts", "/Users/developer/work/s/File.ts", true},
	} {
		b.Run(scenario.name, func(b *testing.B) {
			w := &dirWatch{dir: scenario.root, physicalDir: scenario.root, comparer: pathComparer{ignoreCase: true}}
			if got, ok := fseventsDisplayPath(w, scenario.path); got != scenario.want || ok != scenario.ok {
				b.Fatalf("got (%q, %v), want (%q, %v)", got, ok, scenario.want, scenario.ok)
			}
			b.ReportAllocs()
			for b.Loop() {
				fseventsDisplayPath(w, scenario.path)
			}
		})
	}
}

func BenchmarkFSEventsRoutingFanout(b *testing.B) {
	for _, count := range []int{100, 1000} {
		watches := make([]dirWatch, count)
		for i := range watches {
			dir := fmt.Sprintf("/Users/developer/work/TypeScript/packages/package%04d", i)
			watches[i] = dirWatch{dir: dir, physicalDir: dir, comparer: pathComparer{ignoreCase: true}}
		}
		path := watches[count-1].dir + "/src/File.ts"
		b.Run(strconv.Itoa(count), func(b *testing.B) {
			matches := 0
			for i := range watches {
				if got, ok := fseventsDisplayPath(&watches[i], path); ok {
					matches++
					if got != path {
						b.Fatalf("got %q, want %q", got, path)
					}
				}
			}
			if matches != 1 {
				b.Fatalf("got %d matches, want 1", matches)
			}
			b.ReportAllocs()
			for b.Loop() {
				for i := range watches {
					fseventsDisplayPath(&watches[i], path)
				}
			}
		})
	}
}
