package tsoptionstest

import (
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
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

type VfsParseConfigHost struct {
	Vfs              vfs.FS
	CurrentDirectory tspath.RootedDirectoryPath
}

var _ tsoptions.ParseConfigHost = (*VfsParseConfigHost)(nil)

func (h *VfsParseConfigHost) FS() vfs.FS {
	return h.Vfs
}

func (h *VfsParseConfigHost) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return h.CurrentDirectory
}

func NewVFSParseConfigHost(files map[string]string, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *VfsParseConfigHost {
	return &VfsParseConfigHost{
		Vfs:              vfstest.FromMap(files, caseSensitivity),
		CurrentDirectory: currentDirectory,
	}
}

// NewVFSParseConfigHostWithSymlinks builds a parse-config host whose vfs also contains the given symlinks
// (link path -> target path), so config parsing resolves packages through symlinks as it would on disk.
func NewVFSParseConfigHostWithSymlinks(files map[string]string, symlinks map[string]string, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *VfsParseConfigHost {
	if len(symlinks) == 0 {
		return NewVFSParseConfigHost(files, currentDirectory, caseSensitivity)
	}
	entries := make(map[string]any, len(files)+len(symlinks))
	for name, content := range files {
		entries[name] = content
	}
	for link, target := range symlinks {
		entries[tspath.GetNormalizedAbsolutePath(link, currentDirectory)] = vfstest.Symlink(tspath.GetNormalizedAbsolutePath(target, currentDirectory))
	}
	return &VfsParseConfigHost{
		Vfs:              vfstest.FromMap(entries, caseSensitivity),
		CurrentDirectory: currentDirectory,
	}
}
