package project

import (
	"context"
)

// APIUpdate creates a new snapshot incorporating the given file changes and the
// supplied API open/close request. The apiRequest may open or close projects and
// files; opens are tracked in the snapshot (ref-counted) so they persist across
// future updates, and closes release a previously taken ref. Even an empty
// apiRequest ensures all API-opened projects and files are kept up to date.
// Returns a ref'd snapshot (which the caller must Deref when done) and any error
// encountered while applying the request, e.g. failing to load a project to open.
func (s *Session) APIUpdate(ctx context.Context, apiFileChanges FileChangeSummary, apiRequest *APISnapshotRequest) (*Snapshot, error) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()
	s.cancelScheduledSnapshotUpdate()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)

	newSnapshot := s.updateSnapshotRef(ctx, overlays, SnapshotChange{
		apiRequest:  apiRequest,
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
	})
	return newSnapshot, newSnapshot.apiError
}
