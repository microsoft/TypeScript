package incremental

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGlobalFileDeletionAfterNonGlobalFile(t *testing.T) {
	t.Parallel()
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, "export {};", core.ScriptKindTS)
	for _, globalFirst := range []bool{false, true} {
		t.Run(core.IfElse(globalFirst, "global first", "non-global first"), func(t *testing.T) {
			t.Parallel()
			current := &snapshot{
				allFilesExcludingDefaultLibraryFile: []*ast.SourceFile{file},
			}

			current.allFilesExcludingDefaultLibraryFileOnce.Do(func() {})
			current.fileInfos.Store(file.PathKey(), &FileInfo{})
			to := &toProgramSnapshot{snapshot: current}
			deletions := []struct {
				path tspath.PathKey
				info *FileInfo
			}{
				{"/empty.d.ts", &FileInfo{}},
				{"/globals.d.ts", &FileInfo{affectsGlobalScope: true}},
			}
			if globalFirst {
				deletions[0], deletions[1] = deletions[1], deletions[0]
			}
			// Enumerate both possible orders without relying on SyncMap iteration order.
			for _, deletion := range deletions {
				if !to.handleDeletedFile(deletion.path, deletion.info) {
					break
				}
			}
			assert.Assert(t, to.globalFileRemoved)
			assert.Assert(t, current.changedFilesSet.Has(file.PathKey()))
			assert.Assert(t, current.buildInfoEmitPending.Load())
		})
	}
}

func TestGlobalFileOrderChanged(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name    string
		old     []tspath.PathKey
		new     []tspath.PathKey
		changed bool
	}{
		{"unchanged", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/a", "/module", "/b"}, false},
		{"global reorder", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/b", "/module", "/a"}, true},
		{"module reorder", []tspath.PathKey{"/a", "/module", "/b"}, []tspath.PathKey{"/module", "/a", "/b"}, false},
		{"global added", []tspath.PathKey{"/a", "/b"}, []tspath.PathKey{"/a", "/new", "/b"}, false},
		{"global removed", []tspath.PathKey{"/a", "/removed", "/b"}, []tspath.PathKey{"/a", "/b"}, false},
		{"reorder with removal", []tspath.PathKey{"/a", "/removed", "/b"}, []tspath.PathKey{"/b", "/a"}, true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			old := &snapshot{fileOrder: test.old}
			current := &snapshot{fileOrder: test.new}
			for _, path := range test.old {
				old.fileInfos.Store(path, &FileInfo{affectsGlobalScope: path != "/module"})
			}
			for _, path := range test.new {
				current.fileInfos.Store(path, &FileInfo{affectsGlobalScope: path != "/module"})
			}
			assert.Equal(t, globalFileOrderChanged(old, current), test.changed)
		})
	}
}
