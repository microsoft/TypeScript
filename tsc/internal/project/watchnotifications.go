package project

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
)

// Spellings are expanded, but subtree effects wait until after coalescing.
// Affected observations survive even when all visible notifications disappear.
type preparedWatchChanges struct {
	snapshotID uint64
	affected   []string
}

// prepareWatchNotifications is also used for receipt-time scheduling previews.
// Only the call under the snapshot-update lock supplies the clone's input.
func (s *Snapshot) prepareWatchNotifications(changes []FileChange) ([]FileChange, *preparedWatchChanges, bool) {
	if s.watchAliases == nil && s.watchAliasesError == nil {
		return changes, nil, false
	}
	if !slices.ContainsFunc(changes, func(change FileChange) bool {
		return change.Kind.IsWatchKind() || change.Kind == FileChangeKindSave
	}) {
		return changes, nil, false
	}
	result := make([]FileChange, 0, len(changes))
	observations := make(map[string]fswatch.EventKind)
	for _, change := range changes {
		kind := change.Kind
		if !kind.IsWatchKind() && kind != FileChangeKindSave {
			result = append(result, change)
			continue
		}
		if kind == FileChangeKindSave {
			kind = FileChangeKindWatchChange
		}
		for _, name := range s.watchNames(change.URI.FileName()) {
			result = append(result, FileChange{Kind: kind, URI: lsconv.FileNameToDocumentURI(name)})
			// Observe raw filesystem activity without deriving deletions that
			// could outlive a canceled directory lifecycle.
			observations[name] = fswatch.EventUpdate
		}
		if change.Kind == FileChangeKindSave {
			// Only the original document is saved. Alias notifications still
			// invalidate disk entries when the saved document has no overlay.
			result = append(result, change)
		}
	}
	prepared := &preparedWatchChanges{snapshotID: s.id}
	if s.watchAliases != nil {
		prepared.affected = s.watchAliases.MatchExpanded(observations).Affected
	}
	return result, prepared, s.watchAliasesError != nil
}

func (s *Snapshot) prepareWatchSummary(change FileChangeSummary) FileChangeSummary {
	if change.preparedWatchChanges != nil {
		return change
	}
	expand := func(uris collections.Set[lsproto.DocumentUri]) collections.Set[lsproto.DocumentUri] {
		if s.watchAliases == nil || uris.Len() == 0 {
			return uris
		}
		var result collections.Set[lsproto.DocumentUri]
		for uri := range uris.Keys() {
			for _, name := range s.watchNames(uri.FileName()) {
				result.Add(lsconv.FileNameToDocumentURI(name))
			}
		}
		return result
	}
	change.Created = expand(change.Created)
	change.Changed = expand(change.Changed)
	change.Deleted = expand(change.Deleted)
	change.preparedWatchChanges = &preparedWatchChanges{snapshotID: s.id}
	return change
}
