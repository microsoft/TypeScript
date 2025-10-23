package project

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/zeebo/xxh3"
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
	Hash         xxh3.Uint128                                              // Only set for Close
	Version      int32                                                     // Only set for Open/Change
	Content      string                                                    // Only set for Open
	LanguageKind lsproto.LanguageKind                                      // Only set for Open
	Changes      []lsproto.TextDocumentContentChangePartialOrWholeDocument // Only set for Change
}

type FileChangeSummary struct {
	// Only one file can be opened at a time per request
	Opened lsproto.DocumentUri
	// Values are the content hashes of the overlays before closing.
	Closed  map[lsproto.DocumentUri]xxh3.Uint128
	Changed collections.Set[lsproto.DocumentUri]
	// Only set when file watching is enabled
	Created collections.Set[lsproto.DocumentUri]
	// Only set when file watching is enabled
	Deleted collections.Set[lsproto.DocumentUri]

	// IncludesWatchChangeOutsideNodeModules is true if the summary includes a create, change, or delete watch
	// event of a file outside a node_modules directory.
	IncludesWatchChangeOutsideNodeModules bool
}

func (f FileChangeSummary) IsEmpty() bool {
	return f.Opened == "" && len(f.Closed) == 0 && f.Changed.Len() == 0 && f.Created.Len() == 0 && f.Deleted.Len() == 0
}

func (f FileChangeSummary) HasExcessiveWatchEvents() bool {
	return f.Created.Len()+f.Deleted.Len()+f.Changed.Len() > excessiveChangeThreshold
}

func (f FileChangeSummary) HasExcessiveNonCreateWatchEvents() bool {
	return f.Deleted.Len()+f.Changed.Len() > excessiveChangeThreshold
}
