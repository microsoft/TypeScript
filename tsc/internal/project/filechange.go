package project

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

const excessiveChangeThreshold = 1000

type FileChangeKind int

const (
	FileChangeKindOpen FileChangeKind = iota
	FileChangeKindClose
	FileChangeKindChange
	FileChangeKindSave
	FileChangeKindWatchCreate
	FileChangeKindWatchChange
	FileChangeKindWatchDelete
)

func (k FileChangeKind) IsWatchKind() bool {
	return k == FileChangeKindWatchCreate || k == FileChangeKindWatchChange || k == FileChangeKindWatchDelete
}

type FileChange struct {
	Kind         FileChangeKind
	URI          lsproto.DocumentUri
	Version      int32                                                     // Only set for Open/Change
	Content      string                                                    // Only set for Open
	LanguageKind lsproto.LanguageKind                                      // Only set for Open
	Changes      []lsproto.TextDocumentContentChangePartialOrWholeDocument // Only set for Change
}

type FileChangeSummary struct {
	// Only one file can be opened at a time per request
	Opened lsproto.DocumentUri
	// Reopened is set if a close and open occurred for the same file in a single batch of changes.
	Reopened lsproto.DocumentUri
	Closed   collections.Set[lsproto.DocumentUri]
	Changed  collections.Set[lsproto.DocumentUri]
	// Only set when file watching is enabled
	Created collections.Set[lsproto.DocumentUri]
	// Only set when file watching is enabled
	Deleted collections.Set[lsproto.DocumentUri]

	// IncludesWatchChangeOutsideNodeModules is true if the summary includes a create, change, or delete watch
	// event of a file outside a node_modules directory.
	IncludesWatchChangeOutsideNodeModules bool
	// InvalidateAll indicates that all cached file state should be discarded.
	InvalidateAll bool
}

func (f FileChangeSummary) IsEmpty() bool {
	return !f.InvalidateAll && f.Opened == "" && f.Reopened == "" && f.Closed.Len() == 0 && f.Changed.Len() == 0 && f.Created.Len() == 0 && f.Deleted.Len() == 0
}

func (f FileChangeSummary) HasExcessiveWatchEvents() bool {
	return f.InvalidateAll || f.Created.Len()+f.Deleted.Len()+f.Changed.Len() > excessiveChangeThreshold
}

func (f FileChangeSummary) HasExcessiveNonCreateWatchEvents() bool {
	return f.InvalidateAll || f.Deleted.Len()+f.Changed.Len() > excessiveChangeThreshold
}

// mergeFileChangeSummary merges src into dst, combining their change sets.
func mergeFileChangeSummary(dst *FileChangeSummary, src FileChangeSummary) {
	if src.IsEmpty() {
		return
	}
	if src.InvalidateAll {
		dst.InvalidateAll = true
	}
	for uri := range src.Changed.Keys() {
		dst.Changed.Add(uri)
	}
	for uri := range src.Created.Keys() {
		dst.Created.Add(uri)
	}
	for uri := range src.Deleted.Keys() {
		dst.Deleted.Add(uri)
	}
	if src.IncludesWatchChangeOutsideNodeModules {
		dst.IncludesWatchChangeOutsideNodeModules = true
	}
}
