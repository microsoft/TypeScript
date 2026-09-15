package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// Auto-imports read through autoImportBuilderFS rather than the snapshot's ordinary
// file source, so the API-supplied layer has to be stacked over that too.
func TestAutoImportHostReadsThroughRequestLayer(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path { return tspath.Path(fileName) }
	fs := vfstest.FromMap(map[string]string{"/pkg/index.d.ts": "export declare const fromHost: number;"}, true)
	layer, err := newLayer(&RequestFileSystem{
		Kind:  RequestFileSystemKindLayer,
		Files: map[string]string{"/pkg/index.d.ts": "export declare const fromLayer: number;"},
	}, nil, fs, "/")
	assert.NilError(t, err)
	builder := newSnapshotFSBuilder(
		fs,
		layer,
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
