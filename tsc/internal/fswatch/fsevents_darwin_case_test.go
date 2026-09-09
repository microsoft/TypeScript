//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestFSEventsDiskCasingDiffersFromSubscription(t *testing.T) {
	t.Parallel()

	runWithRetry(t, func(rt testingT) {
		parent := newTmpDir(rt)
		actualDir := filepath.Join(parent, "MixedCase")
		requestedDir := filepath.Join(parent, "mixedcase")
		if err := os.Mkdir(actualDir, 0o755); err != nil {
			rt.Fatal(err)
		}
		if _, err := os.Stat(requestedDir); err != nil {
			if errors.Is(err, fs.ErrNotExist) {
				rt.Skip("filesystem is case-sensitive")
			}
			rt.Fatal(err)
		}

		r, _ := subscribeFor(rt, requestedDir, FSEvents())
		requestedChild := filepath.Join(requestedDir, "hello.txt")
		if err := os.WriteFile(requestedChild, []byte("hi"), 0o644); err != nil {
			rt.Fatal(err)
		}

		got := r.waitForEvent(r.deadline(), func(event Event) bool {
			return event.Path == requestedChild
		})
		got = append(got, r.next(500*time.Millisecond)...)
		actualChild := filepath.Join(actualDir, "hello.txt")
		foundRequested := false
		for _, event := range got {
			if event.Path == requestedChild {
				foundRequested = true
			}
			if event.Path == actualChild {
				rt.Fatalf("event path used filesystem casing instead of caller casing: %v", got)
			}
		}
		if !foundRequested {
			rt.Fatalf("event for %q not received: %v", requestedChild, got)
		}
	})
}
