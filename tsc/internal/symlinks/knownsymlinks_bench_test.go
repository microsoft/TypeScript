package symlinks

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func BenchmarkPopulateSymlinksFromResolutions(b *testing.B) {
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	deps := make([]struct{ orig, resolved tspath.RootedFilePath }, 50)
	for i := range 50 {
		suffix := strconv.Itoa(i)
		deps[i].orig = tspath.RootedFilePathFromNormalized("/project/node_modules/pkg" + suffix + "/index.js")
		deps[i].resolved = tspath.RootedFilePathFromNormalized("/real/pkg" + suffix + "/index.js")
	}

	for b.Loop() {
		for _, dep := range deps {
			cache.ProcessResolution(dep.orig, dep.resolved)
		}
	}
}

func BenchmarkSetFile(b *testing.B) {
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	symlink := "/project/file.ts"
	path := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized(symlink))

	for b.Loop() {
		cache.SetFile(tspath.RootedFilePathFromNormalized(symlink), path, "/real/file.ts")
	}
}

func BenchmarkSetDirectory(b *testing.B) {
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	symlinkPath := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/project/symlink"))
	realDir := &KnownDirectoryLink{
		Real:     tspath.RootedDirectoryPathFromNormalized("/real/path"),
		RealPath: tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/real/path")),
	}

	for b.Loop() {
		cache.SetDirectory("/project/symlink", symlinkPath, realDir)
	}
}

func BenchmarkGuessDirectorySymlink(b *testing.B) {
	cache := NewKnownSymlinks(tspath.CaseSensitive)
	currentDirectory := tspath.RootedDirectoryPathFromNormalized("/project")

	for b.Loop() {
		cache.guessDirectorySymlinkFromFilePaths(
			tspath.ToRootedFilePath("/real/node_modules/package/dist/index.js", currentDirectory),
			tspath.ToRootedFilePath("/project/symlink/package/dist/index.js", currentDirectory),
		)
	}
}

func BenchmarkConcurrentAccess(b *testing.B) {
	cache := NewKnownSymlinks(tspath.CaseSensitive)

	b.RunParallel(func(pb *testing.PB) {
		i := 0
		for pb.Next() {
			symlink := "/project/file" + string(rune('A'+(i%26))) + ".ts"
			path := tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized(symlink))
			cache.SetFile(tspath.RootedFilePathFromNormalized(symlink), path, "/real/file.ts")
			cache.Files().Load(path)
			i++
		}
	})
}
