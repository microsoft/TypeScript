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
		{"expanding-event", "/Users/developer/work/SS", "/Users/developer/work/\u00df/File.ts", "/Users/developer/work/SS/File.ts", true},
		{"expanding-root", "/Users/developer/work/\u00df", "/Users/developer/work/SS/File.ts", "/Users/developer/work/\u00df/File.ts", true},
		{"unicode-unrelated-miss", root, "/private/tmp/\u00df/File.ts", "", false},
	} {
		b.Run(scenario.name, func(b *testing.B) {
			w := &dirWatch{dir: scenario.root, physicalDir: scenario.root, comparer: pathComparer{ignoreCase: true}}
			w.setComparer(w.comparer)
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
			watches[i].setComparer(watches[i].comparer)
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
				event := comparisonPath{path: path}
				for i := range watches {
					fseventsDisplayPathPrepared(&watches[i], &event)
				}

			}
		})
	}
}

func BenchmarkFSEventsUnicodeFanout(b *testing.B) {
	for _, scenario := range []struct{ name, root, event string }{
		{"simple", "S", "\u017f"},
		{"expanding-event", "SS", "\u00df"},
		{"expanding-root", "\u00df", "SS"},
	} {
		for _, count := range []int{100, 1000} {
			b.Run(scenario.name+"/"+strconv.Itoa(count), func(b *testing.B) {
				watches := make([]dirWatch, count)
				for i := range watches {
					dir := fmt.Sprintf("/Users/developer/work/%s/package%04d", scenario.root, i)
					watches[i] = dirWatch{dir: dir, physicalDir: dir}
					watches[i].setComparer(pathComparer{ignoreCase: true})
				}
				path := fmt.Sprintf("/Users/developer/work/%s/package%04d/File.ts", scenario.event, count-1)
				matches := 0
				event := comparisonPath{path: path}
				for i := range watches {
					if got, ok := fseventsDisplayPathPrepared(&watches[i], &event); ok {
						matches++
						if got != watches[i].dir+"/File.ts" {
							b.Fatalf("unexpected display path %q", got)
						}
					}
				}
				if matches != 1 || !event.ready {
					b.Fatalf("matches=%d, event folded=%v", matches, event.ready)
				}
				b.ReportAllocs()
				for b.Loop() {
					event := comparisonPath{path: path}
					for i := range watches {
						fseventsDisplayPathPrepared(&watches[i], &event)
					}
				}
			})
		}
	}
}
