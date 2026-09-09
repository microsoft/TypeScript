package watchmanager

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

func TestWatchAliasNativeContainment(t *testing.T) { //nolint:paralleltest // Keep native subscriptions sequential to bound kqueue descriptors and event delays.
	for _, backend := range []fswatch.Watcher{fswatch.Default(), fswatch.Kqueue()} { //nolint:paralleltest // Native subscriptions are intentionally sequential.
		for _, pair := range []struct{ disk, requested string }{
			{"ASCII", "ascii"},
			{"s", "\u017f"},
			{"SS", "\u00df"},
			{"\u00e9", "e\u0301"},
		} {
			t.Run(backend.Name()+"/"+pair.disk, func(t *testing.T) {
				dir, err := filepath.Abs(fmt.Sprintf(".watch-alias-%d-%s-%s", os.Getpid(), backend.Name(), pair.disk))
				if err != nil {
					t.Fatal(err)
				}
				if err = os.Mkdir(dir, 0o755); err != nil {
					t.Fatal(err)
				}
				defer os.RemoveAll(dir)
				disk := filepath.Join(dir, pair.disk)
				requested := filepath.Join(dir, pair.requested)
				if err = os.Mkdir(disk, 0o755); err != nil {
					t.Fatal(err)
				}
				a, err := os.Stat(disk)
				if err != nil {
					t.Fatal(err)
				}
				b, err := os.Stat(requested)
				if err != nil || !os.SameFile(a, b) {
					t.Skip("volume does not equate these filename spellings")
				}
				filesystem := osvfs.FS()
				wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
				wm.SetBackend(&FSWatchBackend{Inner: backend})
				wm.Lock()
				err = wm.ReconcileWatches(nil, map[string]bool{requested: false}, nil)
				wm.Unlock()
				if err != nil {
					t.Fatal(err)
				}
				defer wm.CloseAllWatches()
				if err := os.Mkdir(filepath.Join(disk, "child"), 0o755); err != nil {
					t.Fatal(err)
				}
				deadline := time.NewTimer(5 * time.Second)
				defer deadline.Stop()
				for {
					select {
					case <-wm.DoCycleCh():
						wm.Lock()
						changes := wm.DrainEvents()
						found := false
						covered := false
						for event := range changes.Changes {
							if strings.HasSuffix(event, "/child") {
								found = true
								if wm.IsPathUnderWatch(event, caseInsensitiveOpts) {
									covered = true
								}
							}
						}
						wm.Unlock()
						if changes.Overflow {
							t.Fatal("unexpected overflow")
						}
						if found {
							if !covered {
								t.Errorf("child events %v are outside their requested root %q", changes.Changes, requested)
							}
							return
						}
					case <-deadline.C:
						t.Fatal("no delivered child event")
					}
				}
			})
		}
	}
}
