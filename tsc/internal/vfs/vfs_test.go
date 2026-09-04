package vfs_test

import (
	"testing"
	"testing/fstest"

	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func BenchmarkReadFile(b *testing.B) {
	type bench struct {
		name string
		fs   vfs.FS
		path string
	}

	osFS := osvfs.FS()

	const smallData = "hello, world"
	tmpdir := tspath.RootedDirectoryPathFromAbsolute(b.TempDir())
	osSmallDataPath := tmpdir.ResolveFile("foo.ts")
	err := osFS.WriteFile(osSmallDataPath, smallData)
	assert.NilError(b, err)

	tests := []bench{
		{"MapFS small", vfstest.FromMap(fstest.MapFS{
			"/foo.ts": &fstest.MapFile{
				Data: []byte(smallData),
			},
		}, tspath.CaseSensitive), "/foo.ts"},
		{"OS small", osFS, osSmallDataPath.AsString()},
	}

	checkerPath := tspath.RootedDirectoryPathFromAbsolute(repo.TestDataPath()).ResolveFile("fixtures/compiler/checker.ts")

	checkerContents, ok := osFS.ReadFile(checkerPath)
	assert.Assert(b, ok)

	tests = append(tests, bench{
		"MapFS checker.ts",
		vfstest.FromMap(fstest.MapFS{
			"/checker.ts": &fstest.MapFile{
				Data: []byte(checkerContents),
			},
		}, tspath.CaseSensitive),
		"/checker.ts",
	})
	tests = append(tests, bench{"OS checker.ts", osFS, checkerPath.AsString()})

	for _, tt := range tests {
		b.Run(tt.name, func(b *testing.B) {
			b.ReportAllocs()
			for range b.N {
				_, _ = tt.fs.ReadFile(tspath.RootedFilePathFromNormalized(tt.path))
			}
		})
	}
}
