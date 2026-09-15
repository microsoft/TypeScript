package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// testLayer is a minimal FileSystemLayer supplying a fixed set of files. Only the
// parts the stack actually exercises are implemented.
type testLayer struct {
	vfs.FS
	files map[string]string
}

func (l testLayer) Shadows(path string) bool {
	_, ok := l.files[path]
	return ok
}

func (l testLayer) Stack(base FileSource) FileSource {
	return testStacked{layer: l, base: base}
}

type testStacked struct {
	layer testLayer
	base  FileSource
}

func (s testStacked) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, tspath.Path(fileName))
}

func (s testStacked) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if content, ok := s.layer.files[fileName]; ok {
		return NewFileHandle(fileName, content)
	}
	return s.base.GetFileByPath(fileName, path)
}

func (s testStacked) FileExists(fileName string, path tspath.Path) bool {
	if _, ok := s.layer.files[fileName]; ok {
		return true
	}
	return s.base.FileExists(fileName, path)
}

func (s testStacked) DirectoryExists(path string) bool { return s.base.DirectoryExists(path) }
func (s testStacked) GetAccessibleEntries(p string) vfs.Entries {
	return s.base.GetAccessibleEntries(p)
}
func (s testStacked) Realpath(path string) string     { return s.base.Realpath(path) }
func (s testStacked) UseCaseSensitiveFileNames() bool { return s.base.UseCaseSensitiveFileNames() }

// Auto-imports read through autoImportBuilderFS rather than the snapshot's ordinary
// file source, so the API-supplied layer has to be stacked over that too.
func TestAutoImportHostReadsThroughRequestLayer(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path { return tspath.Path(fileName) }
	layer := testLayer{files: map[string]string{"/pkg/index.d.ts": "export declare const fromLayer: number;"}}
	builder := newSnapshotFSBuilder(
		vfstest.FromMap(map[string]string{"/pkg/index.d.ts": "export declare const fromHost: number;"}, true),
		layer,
		make(map[tspath.Path]*Overlay),
		make(map[tspath.Path]*Overlay),
		make(map[tspath.Path]*diskFile),
		make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		nil,
		lsproto.PositionEncodingKindUTF8,
		toPath,
	)

	host := newAutoImportRegistryCloneHost(nil, nil, builder, "/", toPath)
	content, ok := host.FS().ReadFile("/pkg/index.d.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "export declare const fromLayer: number;")
}
