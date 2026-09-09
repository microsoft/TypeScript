package vfs_test

import (
	"testing"
	"testing/fstest"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRealpathWithParentFallback(t *testing.T) {
	t.Parallel()
	for _, caseSensitive := range []bool{true, false} {
		disk := vfstest.FromMap(map[string]any{
			"/virtual-watch-only/target/file.ts": "",
			"/virtual-watch-only/link":           vfstest.Symlink("/virtual-watch-only/target"),
		}, caseSensitive)
		for _, fs := range []vfs.FS{disk, cachedvfs.From(disk), bundled.WrapFS(cachedvfs.From(disk))} {
			for _, name := range []string{"/virtual-watch-only/link/file.ts", "/virtual-watch-only/link/missing.ts"} {
				got := vfs.RealpathWithParent(fs, name, func(string) string {
					t.Fatal("a filesystem without the capability must use its own resolver")
					return ""
				})
				assert.Equal(t, got, disk.Realpath(name))
			}
		}
	}
}

func BenchmarkReadFile(b *testing.B) {
	type bench struct {
		name string
		fs   vfs.FS
		path string
	}

	osFS := osvfs.FS()

	const smallData = "hello, world"
	tmpdir := tspath.NormalizeSlashes(b.TempDir())
	osSmallDataPath := tspath.CombinePaths(tmpdir, "foo.ts")
	err := osFS.WriteFile(osSmallDataPath, smallData)
	assert.NilError(b, err)

	tests := []bench{
		{"MapFS small", vfstest.FromMap(fstest.MapFS{
			"/foo.ts": &fstest.MapFile{
				Data: []byte(smallData),
			},
		}, true), "/foo.ts"},
		{"OS small", osFS, osSmallDataPath},
	}

	checkerPath := tspath.CombinePaths(tspath.NormalizeSlashes(repo.TestDataPath()), "fixtures", "compiler", "checker.ts")

	checkerContents, ok := osFS.ReadFile(checkerPath)
	assert.Assert(b, ok)

	tests = append(tests, bench{
		"MapFS checker.ts",
		vfstest.FromMap(fstest.MapFS{
			"/checker.ts": &fstest.MapFile{
				Data: []byte(checkerContents),
			},
		}, true),
		"/checker.ts",
	})
	tests = append(tests, bench{"OS checker.ts", osFS, checkerPath})

	for _, tt := range tests {
		b.Run(tt.name, func(b *testing.B) {
			b.ReportAllocs()
			for range b.N {
				_, _ = tt.fs.ReadFile(tt.path)
			}
		})
	}
}
