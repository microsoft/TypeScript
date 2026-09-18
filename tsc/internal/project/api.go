package project

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// APIUpdate creates a new snapshot incorporating the given file changes and the
// supplied API open/close request. The apiRequest may open or close projects and
// files; opens are tracked in the snapshot (ref-counted) so they persist across
// future updates, and closes release a previously taken ref. Programs are updated
// only when explicitly requested by an open or ensure operation.
// On success, returns a ref'd snapshot which the caller must Deref when done.
// On failure, releases the rejected snapshot and returns nil and the error.
// A snapshot with an API error is never adopted as canonical session state;
// host changes flushed alongside it are adopted separately.
func (s *Session) APIUpdate(ctx context.Context, apiFileChanges FileChangeSummary, apiRequest *APISnapshotRequest) (*Snapshot, error) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()
	s.cancelScheduledSnapshotUpdate()

	hostFileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	snapshot := s.Snapshot()
	hostFileChanges = snapshot.prepareWatchSummary(hostFileChanges)
	apiFileChanges = snapshot.prepareWatchSummary(apiFileChanges)
	fileChanges := hostFileChanges.Clone()
	mergeFileChangeSummary(&fileChanges, apiFileChanges)
	var fs vfs.FS
	var replaceFileSystem bool
	if apiRequest != nil {
		fs = apiRequest.FileSystem
		replaceFileSystem = apiRequest.ReplaceFileSystem
	}

	newSnapshot := s.updateSnapshotRef(ctx, overlays, SnapshotChange{
		apiRequest:         apiRequest,
		fs:                 fs,
		fileSystemOverride: fs != nil,
		replaceFileSystem:  replaceFileSystem,
		fileChanges:        fileChanges,
		ataChanges:         ataChanges,
	})
	if newSnapshot.apiError != nil {
		apiError := newSnapshot.apiError
		newSnapshot.Deref()
		if !hostFileChanges.IsEmpty() || s.watchAliasesNeedRefresh(hostFileChanges) || len(ataChanges) != 0 {
			// The API request is rejected as a unit, but host changes were already
			// flushed and must still advance the canonical session snapshot.
			s.UpdateSnapshot(ctx, overlays, SnapshotChange{
				fileChanges: hostFileChanges,
				ataChanges:  ataChanges,
			})
		}
		return nil, apiError
	}
	return newSnapshot, nil
}

// TryAdoptSnapshotInBackground retains a derived snapshot and attempts to adopt it
// as the session's current snapshot without blocking the caller.
func (s *Session) TryAdoptSnapshotInBackground(baseSnapshot, newSnapshot *Snapshot) {
	s.RetainSnapshot(newSnapshot)
	s.tryAdoptSnapshotChangeInBackground(baseSnapshot, newSnapshot)
}
