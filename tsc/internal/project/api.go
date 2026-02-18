package project

import (
	"context"

	"github.com/microsoft/typescript-go/internal/collections"
)

func (s *Session) APIOpenProject(ctx context.Context, configFileName string, apiFileChanges FileChangeSummary) (*Project, *Snapshot, func(), error) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)
	newSnapshot := s.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
		apiRequest: &APISnapshotRequest{
			OpenProjects: collections.NewSetFromItems(configFileName),
		},
	})

	if newSnapshot.apiError != nil {
		return nil, newSnapshot, s.createSnapshotRelease(newSnapshot), newSnapshot.apiError
	}

	project := newSnapshot.ProjectCollection.ConfiguredProject(s.toPath(configFileName))
	if project == nil {
		panic("OpenProject request returned no error but project not present in snapshot")
	}

	return project, newSnapshot, s.createSnapshotRelease(newSnapshot), nil
}

// APIUpdateWithFileChanges creates a new snapshot incorporating the given file changes.
func (s *Session) APIUpdateWithFileChanges(ctx context.Context, apiFileChanges FileChangeSummary) (*Snapshot, func()) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)

	newSnapshot := s.UpdateSnapshot(ctx, overlays, SnapshotChange{
		apiRequest:  &APISnapshotRequest{},
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
	})

	return newSnapshot, s.createSnapshotRelease(newSnapshot)
}
