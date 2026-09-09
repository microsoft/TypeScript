package project

import (
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
)

// This is transient input to one clone, not snapshot state. Resolution effects
// must survive overlay coalescing even when all visible notifications disappear.
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
	var affected collections.Set[string]
	invalidateAll := false
	for start := 0; start < len(changes); {
		kind := changes[start].Kind
		if !kind.IsWatchKind() && kind != FileChangeKindSave {
			result = append(result, changes[start])
			start++
			continue
		}
		// Same-kind runs can share subtree traversal. Do not reorder across
		// creates/deletes or editor operations: the overlay coalescer uses order.
		end := start + 1
		for end < len(changes) && changes[end].Kind == kind {
			end++
		}
		var summary FileChangeSummary
		for _, change := range changes[start:end] {
			switch kind {
			case FileChangeKindWatchCreate:
				summary.Created.Add(change.URI)
			case FileChangeKindWatchDelete:
				summary.Deleted.Add(change.URI)
			default:
				summary.Changed.Add(change.URI)
			}
		}
		summary, names := s.matchWatchChanges(summary)
		invalidateAll = invalidateAll || summary.InvalidateAll
		for _, name := range names {
			affected.Add(name)
		}
		if kind == FileChangeKindSave {
			// Only the original document is saved. Alias notifications still
			// invalidate disk entries when the saved document has no overlay.
			for uri := range summary.Changed.Keys() {
				result = append(result, FileChange{Kind: FileChangeKindWatchChange, URI: uri})
			}
			result = append(result, changes[start:end]...)
		} else {
			for _, uris := range []collections.Set[lsproto.DocumentUri]{summary.Created, summary.Changed, summary.Deleted} {
				for uri := range uris.Keys() {
					result = append(result, FileChange{Kind: kind, URI: uri})
				}
			}
		}
		start = end
	}
	return result, &preparedWatchChanges{snapshotID: s.id, affected: slices.Collect(maps.Keys(affected.Keys()))}, invalidateAll
}

func (s *Snapshot) prepareWatchSummary(change FileChangeSummary) FileChangeSummary {
	change, affected := s.matchWatchChanges(change)
	change.preparedWatchChanges = &preparedWatchChanges{snapshotID: s.id, affected: affected}
	return change
}
