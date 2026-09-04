package tsoptionstest

import (
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func fixRoot(path string) string {
	rootLength := tspath.GetRootLength(path)
	if rootLength == 0 {
		return path
	}
	if len(path) == rootLength {
		return "."
	}
	return path[rootLength:]
}

func NewVFS(files map[string]string, caseSensitivity tspath.CaseSensitivity) vfs.FS {
	return vfstest.FromMap(files, caseSensitivity)
}

// NewVFSWithSymlinks builds a VFS that contains the given symlinks (link path -> target path).
func NewVFSWithSymlinks(files map[string]string, symlinks map[string]string, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) vfs.FS {
	if len(symlinks) == 0 {
		return NewVFS(files, caseSensitivity)
	}
	entries := make(map[string]any, len(files)+len(symlinks))
	for name, content := range files {
		entries[name] = content
	}
	for link, target := range symlinks {
		entries[tspath.GetNormalizedAbsolutePath(link, currentDirectory)] = vfstest.Symlink(tspath.GetNormalizedAbsolutePath(target, currentDirectory))
	}
	return vfstest.FromMap(entries, caseSensitivity)
}
