package project

import (
	"context"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatchPreparationSerializesBackgroundAdoption(t *testing.T) {
	t.Parallel()
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: vfstest.FromMap(map[string]string{}, true), Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	base := session.Snapshot()
	clone, err := session.CloneSnapshot(context.Background(), base, FileChangeSummary{}, nil)
	assert.NilError(t, err)
	session.snapshotUpdateMu.Lock()
	started, adopted := make(chan struct{}), make(chan struct{})
	go func() {
		close(started)
		session.adoptSnapshotChange(base, clone)
		close(adopted)
	}()
	<-started
	var adoptedEarly bool
	select {
	case <-adopted:
		adoptedEarly = true
	case <-time.After(20 * time.Millisecond):
		adoptedEarly = session.Snapshot() != base
	}
	session.snapshotUpdateMu.Unlock()
	<-adopted
	assert.Assert(t, !adoptedEarly, "background adoption changed the base inside the preparation-to-clone boundary")
	assert.Assert(t, session.Snapshot() == clone)
}
