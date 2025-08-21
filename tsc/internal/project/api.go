package project

import (
	"context"

	"github.com/microsoft/typescript-go/internal/collections"
)

func (s *Session) OpenProject(ctx context.Context, configFileName string) (*Project, error) {
	fileChanges, overlays, ataChanges := s.flushChanges(ctx)
	newSnapshot := s.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: fileChanges,
		ataChanges:  ataChanges,
		apiRequest: &APISnapshotRequest{
			OpenProjects: collections.NewSetFromItems(configFileName),
		},
	})

	if newSnapshot.apiError != nil {
		return nil, newSnapshot.apiError
	}

	project := newSnapshot.ProjectCollection.ConfiguredProject(s.toPath(configFileName))
	if project == nil {
		panic("OpenProject request returned no error but project not present in snapshot")
	}

	return project, nil
}
