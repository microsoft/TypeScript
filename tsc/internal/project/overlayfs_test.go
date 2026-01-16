package project

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestProcessChanges(t *testing.T) {
	t.Parallel()
	// Helper to create test overlayFS
	createOverlayFS := func() *overlayFS {
		testFS := vfstest.FromMap(map[string]string{
			"/test1.ts": "// existing content",
			"/test2.ts": "// existing content",
		}, false /* useCaseSensitiveFileNames */)
		return newOverlayFS(
			testFS,
			make(map[tspath.Path]*Overlay),
			lsproto.PositionEncodingKindUTF16,
			func(fileName string) tspath.Path {
				return tspath.Path(fileName)
			},
		)
	}

	// Test URI constants
	const (
		testURI1 = lsproto.DocumentUri("file:///test1.ts")
		testURI2 = lsproto.DocumentUri("file:///test2.ts")
	)

	t.Run("multiple opens should panic", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		changes := []FileChange{
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI1,
				Version:      1,
				Content:      "const x = 1;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI2,
				Version:      1,
				Content:      "const y = 2;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
		}

		assert.Assert(t, func() (panicked bool) {
			defer func() {
				if r := recover(); r != nil {
					panicked = true
				}
			}()
			fs.processChanges(changes)
			return false
		}())
	})

	t.Run("watch create then delete becomes nothing", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		changes := []FileChange{
			{
				Kind: FileChangeKindWatchCreate,
				URI:  testURI1,
			},
			{
				Kind: FileChangeKindWatchDelete,
				URI:  testURI1,
			},
		}

		result, _ := fs.processChanges(changes)
		assert.Assert(t, result.IsEmpty())
	})

	t.Run("watch delete then create becomes change", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		changes := []FileChange{
			{
				Kind: FileChangeKindWatchDelete,
				URI:  testURI1,
			},
			{
				Kind: FileChangeKindWatchCreate,
				URI:  testURI1,
			},
		}

		result, _ := fs.processChanges(changes)

		assert.Equal(t, result.Created.Len(), 0)
		assert.Equal(t, result.Deleted.Len(), 0)
		assert.Assert(t, result.Changed.Has(testURI1))
	})

	t.Run("multiple watch changes deduplicated", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		changes := []FileChange{
			{
				Kind: FileChangeKindWatchChange,
				URI:  testURI1,
			},
			{
				Kind: FileChangeKindWatchChange,
				URI:  testURI1,
			},
			{
				Kind: FileChangeKindWatchChange,
				URI:  testURI1,
			},
		}

		result, _ := fs.processChanges(changes)

		assert.Assert(t, result.Changed.Has(testURI1))
		assert.Equal(t, result.Changed.Len(), 1)
	})

	t.Run("save marks overlay as matching disk", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		// First create an overlay
		fs.processChanges([]FileChange{
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI1,
				Version:      1,
				Content:      "const x = 1;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
		})
		// Then save
		result, _ := fs.processChanges([]FileChange{
			{
				Kind: FileChangeKindSave,
				URI:  testURI1,
			},
		})
		// We don't observe saves for snapshot changes,
		// so they're not included in the summary
		assert.Assert(t, result.IsEmpty())

		// Check that the overlay is marked as matching disk text
		fh := fs.getFile(testURI1.FileName())
		assert.Assert(t, fh != nil)
		assert.Assert(t, fh.MatchesDiskText())
	})

	t.Run("watch change on overlay marks as not matching disk", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		// First create an overlay
		fs.processChanges([]FileChange{
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI1,
				Version:      1,
				Content:      "const x = 1;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
		})
		assert.Assert(t, !fs.getFile(testURI1.FileName()).MatchesDiskText())

		// Then save
		fs.processChanges([]FileChange{
			{
				Kind: FileChangeKindSave,
				URI:  testURI1,
			},
		})
		assert.Assert(t, fs.getFile(testURI1.FileName()).MatchesDiskText())

		// Now process a watch change
		fs.processChanges([]FileChange{
			{
				Kind: FileChangeKindWatchChange,
				URI:  testURI1,
			},
		})
		assert.Assert(t, !fs.getFile(testURI1.FileName()).MatchesDiskText())
	})

	t.Run("close then open in same batch marks as changed", func(t *testing.T) {
		t.Parallel()
		fs := createOverlayFS()

		// First create an overlay
		fs.processChanges([]FileChange{
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI1,
				Version:      1,
				Content:      "const x = 1;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
		})

		// Now close and reopen in the same batch (like Neovim does for file reload)
		result, _ := fs.processChanges([]FileChange{
			{
				Kind: FileChangeKindClose,
				URI:  testURI1,
			},
			{
				Kind:         FileChangeKindOpen,
				URI:          testURI1,
				Version:      0,
				Content:      "const x = 2;",
				LanguageKind: lsproto.LanguageKindTypeScript,
			},
		})

		// Should not be marked as opened since it was already open
		assert.Assert(t, result.Opened == "", "close then open should not mark as opened")
		// Should also be marked as changed since it was closed and reopened
		assert.Assert(t, result.Changed.Has(testURI1), "close then open should mark as changed")
		// Should have the new content
		fh := fs.getFile(testURI1.FileName())
		assert.Equal(t, fh.Content(), "const x = 2;")
	})
}
