package project

import (
	"context"

	"github.com/microsoft/typescript-go/internal/collections"
)

// APIOpenProject opens a project and returns a ref'd snapshot.
// The caller must call snapshot.Deref(s) when done.
func (s *Session) APIOpenProject(ctx context.Context, configFileName string, apiFileChanges FileChangeSummary) (*Project, *Snapshot, error) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)
	newSnapshot := s.updateSnapshotRef(ctx, overlays, SnapshotChange{
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
		apiRequest: &APISnapshotRequest{
			OpenProjects: collections.NewSetFromItems(configFileName),
		},
	})

	if newSnapshot.apiError != nil {
		return nil, newSnapshot, newSnapshot.apiError
	}

	project := newSnapshot.ProjectCollection.ConfiguredProject(s.toPath(configFileName))
	if project == nil {
		panic("OpenProject request returned no error but project not present in snapshot")
	}

	return project, newSnapshot, nil
}

// APIUpdateWithFileChanges creates a new snapshot incorporating the given
// file changes. Returns a ref'd snapshot; caller must Deref when done.
func (s *Session) APIUpdateWithFileChanges(ctx context.Context, apiFileChanges FileChangeSummary) *Snapshot {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)

	return s.updateSnapshotRef(ctx, overlays, SnapshotChange{
		apiRequest:  &APISnapshotRequest{},
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
	})
}
