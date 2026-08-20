package tsoptionstest

import (
	"github.com/microsoft/TypeScript/tsc/internal/pnp"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/pnpvfs"
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
	CurrentDirectory string
	pnpApi           *pnp.PnpApi
}

var _ tsoptions.ParseConfigHost = (*VfsParseConfigHost)(nil)

func (h *VfsParseConfigHost) FS() vfs.FS {
	return h.Vfs
}

func (h *VfsParseConfigHost) GetCurrentDirectory() string {
	return h.CurrentDirectory
}

func (h *VfsParseConfigHost) PnpApi() *pnp.PnpApi {
	return h.pnpApi
}

func NewVFSParseConfigHost(files map[string]string, currentDirectory string, useCaseSensitiveFileNames bool) *VfsParseConfigHost {
	var fs vfs.FS = vfstest.FromMap(files, useCaseSensitiveFileNames)
	pnpApi := pnp.InitPnpApi(fs, currentDirectory)
	if pnpApi != nil {
		fs = pnpvfs.From(fs)
	}

	return &VfsParseConfigHost{
		Vfs:              fs,
		CurrentDirectory: currentDirectory,
		pnpApi:           pnpApi,
	}
}

// NewVFSParseConfigHostWithSymlinks builds a parse-config host whose vfs also contains the given symlinks
// (link path -> target path), so config parsing resolves packages through symlinks as it would on disk.
func NewVFSParseConfigHostWithSymlinks(files map[string]string, symlinks map[string]string, currentDirectory string, useCaseSensitiveFileNames bool) *VfsParseConfigHost {
	if len(symlinks) == 0 {
		return NewVFSParseConfigHost(files, currentDirectory, useCaseSensitiveFileNames)
	}
	entries := make(map[string]any, len(files)+len(symlinks))
	for name, content := range files {
		entries[name] = content
	}
	for link, target := range symlinks {
		entries[tspath.GetNormalizedAbsolutePath(link, currentDirectory)] = vfstest.Symlink(tspath.GetNormalizedAbsolutePath(target, currentDirectory))
	}
	return &VfsParseConfigHost{
		Vfs:              vfstest.FromMap(entries, useCaseSensitiveFileNames),
		CurrentDirectory: currentDirectory,
	}
}
