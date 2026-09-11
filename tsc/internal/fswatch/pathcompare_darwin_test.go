//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// Check identity independently of the comparer, including exclusive creation.
// Filesystems that do not support a particular alias cannot exercise its watch.
func requireDarwinAlias(t *testing.T, a, b string) {
	t.Helper()
	first, err := os.Stat(a)
	if err != nil {
		t.Fatal(err)
	}
	second, err := os.Stat(b)
	if errors.Is(err, os.ErrNotExist) {
		t.Skip("filesystem does not alias these spellings")
	}
	if err != nil {
		t.Fatal(err)
	}
	if !os.SameFile(first, second) {
		t.Fatal("alternate spelling resolved to a different inode")
	}
	if err := os.Mkdir(b, 0o755); !errors.Is(err, os.ErrExist) {
		t.Fatalf("exclusive alternate creation: %v", err)
	}
}

func TestDarwinWatchFileComparison(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name                string
		diskRoot, watchRoot string
		diskFile, watchFile string
		alias               bool
	}{
		{"root-case", "Mixed", "mixed", "file.ts", "file.ts", true},
		{"leaf-case", "root", "root", "File.ts", "file.ts", true},
		{"sharp-s", "root", "root", "\u00df.ts", "SS.ts", true},
		{"dotted-i", "root", "root", "\u0130.ts", "i\u0307.ts", true},
		{"ligature", "root", "root", "\ufb03.ts", "ffi.ts", true},
		{"normalization", "root", "root", "cafe\u0301.ts", "caf\u00e9.ts", true},
		{"dotless-i", "root", "root", "I.ts", "\u0131.ts", false},
		{"ascii-dotted-i", "root", "root", "i.ts", "\u0130.ts", false},
		{"fullwidth", "root", "root", "\uff21.ts", "A.ts", false},
		{"sibling", "root", "root", "file.ts2", "file.ts", false},
		{"case-sensitive", "root", "root", "File.ts", "file.ts", false},
	}
	for _, impl := range []Watcher{Kqueue(), FSEvents()} {
		for _, c := range cases {
			t.Run(impl.Name()+"/"+c.name, func(t *testing.T) {
				t.Parallel()
				for _, reverse := range []bool{false, true} {
					diskRoot, watchRoot := c.diskRoot, c.watchRoot
					diskName, watchName := c.diskFile, c.watchFile
					if reverse {
						diskRoot, watchRoot = watchRoot, diskRoot
						diskName, watchName = watchName, diskName
					}
					parent := newTmpDir(t)
					diskRoot, watchRoot = filepath.Join(parent, diskRoot), filepath.Join(parent, watchRoot)
					if err := os.Mkdir(diskRoot, 0o755); err != nil {
						t.Fatal(err)
					}
					requireDarwinAlias(t, diskRoot, watchRoot)
					diskFile, watchFile := filepath.Join(diskRoot, diskName), filepath.Join(watchRoot, watchName)
					if err := os.WriteFile(diskFile, nil, 0o644); err != nil {
						t.Fatal(err)
					}
					if c.alias {
						requireDarwinAlias(t, diskFile, watchFile)
					} else {
						f, err := os.OpenFile(watchFile, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
						if errors.Is(err, os.ErrExist) {
							t.Skip("filesystem aliases these spellings")
						}
						if err != nil {
							t.Fatal(err)
						}
						if err = f.Close(); err != nil {
							t.Fatal(err)
						}
						a, err := os.Stat(diskFile)
						if err != nil {
							t.Fatal(err)
						}
						b, err := os.Stat(watchFile)
						if err != nil || os.SameFile(a, b) {
							t.Fatalf("expected distinct inodes: %v", err)
						}
					}
					// Subscribe while the target is absent to exercise discovery
					// as well as subsequent fd-based updates and deletion.
					if err := os.Remove(diskFile); err != nil {
						t.Fatal(err)
					}
					dir, _ := subscribeForOpts(t, watchRoot, impl)
					file, _ := subscribeFileFor(t, watchFile, impl)
					wantDir := filepath.Join(watchRoot, diskName)
					if impl == FSEvents() {
						wantDir = canonicalizePath(wantDir)
					}
					for round := range 3 {
						kind := EventUpdate
						if round == 2 {
							kind = EventDelete
							if err := os.Remove(diskFile); err != nil {
								t.Fatal(err)
							}
						} else if err := os.WriteFile(diskFile, make([]byte, round+1), 0o644); err != nil {
							t.Fatal(err)
						}
						expectContains(t, dir, kind, wantDir)
						if c.alias {
							events := expectContains(t, file, kind, canonicalizePath(watchFile))
							for _, e := range events {
								if e.Path != canonicalizePath(watchFile) {
									t.Fatalf("unexpected file event spelling: %q", e.Path)
								}
							}
						} else if events := file.next(400 * time.Millisecond); len(events) != 0 {
							t.Fatalf("cross-routed distinct filename: %v", events)
						}
					}
				}
			})
		}
	}
}
