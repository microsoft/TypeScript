package pnpvfs

import (
	"archive/zip"
	"path"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/iovfs"
)

type pnpFS struct {
	fs                  vfs.FS
	cachedZipReadersMap map[string]*zip.ReadCloser
	cacheReaderMutex    sync.Mutex
}

var _ vfs.FS = (*pnpFS)(nil)

func From(fs vfs.FS) vfs.FS {
	pnpFS := &pnpFS{
		fs:                  fs,
		cachedZipReadersMap: make(map[string]*zip.ReadCloser),
	}

	return pnpFS
}

// resolve maps a (possibly virtual, possibly zip-internal) path to the FS that owns it and the path within that FS.
func (pnpFS *pnpFS) resolve(path string) (fs vfs.FS, formattedPath string, zipPath string) {
	path, _, _ = resolveVirtual(path)
	return getMatchingFS(pnpFS, path)
}

func (pnpFS *pnpFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	realPath, _, _ := resolveVirtual(path.AsString())
	if strings.HasSuffix(realPath, ".zip") {
		return pnpFS.fs.FileExists(tspath.RootedFilePathFromNormalized(realPath))
	}
	fs, formattedPath, _ := getMatchingFS(pnpFS, realPath)
	return fs.DirectoryExists(tspath.RootedDirectoryPathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) FileExists(path tspath.RootedFilePath) bool {
	realPath, _, _ := resolveVirtual(path.AsString())
	if strings.HasSuffix(realPath, ".zip") {
		return pnpFS.fs.FileExists(tspath.RootedFilePathFromNormalized(realPath))
	}
	fs, formattedPath, _ := getMatchingFS(pnpFS, realPath)
	return fs.FileExists(tspath.RootedFilePathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	fs, formattedPath, _ := pnpFS.resolve(path.AsString())
	return fs.GetAccessibleEntries(tspath.RootedDirectoryPathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	fs, formattedPath, _ := pnpFS.resolve(path.AsString())
	return fs.ReadFile(tspath.RootedFilePathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) Chtimes(path tspath.RootedPath, mtime time.Time, atime time.Time) error {
	fs, formattedPath, _ := pnpFS.resolve(path.AsString())
	return fs.Chtimes(tspath.RootedPathFromNormalized(formattedPath), mtime, atime)
}

func (pnpFS *pnpFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	realPath, hash, basePath := resolveVirtual(path.AsString())
	fs, formattedPath, zipPath := getMatchingFS(pnpFS, realPath)
	fullPath := zipPath + fs.Realpath(tspath.RootedPathFromNormalized(formattedPath)).AsString()
	return tspath.RootedPathFromNormalized(makeVirtualPath(basePath, hash, fullPath))
}

func (pnpFS *pnpFS) Remove(path tspath.RootedPath) error {
	fs, formattedPath, _ := pnpFS.resolve(path.AsString())
	return fs.Remove(tspath.RootedPathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	fs, formattedPath, _ := pnpFS.resolve(path.AsString())
	return fs.Stat(tspath.RootedPathFromNormalized(formattedPath))
}

func (pnpFS *pnpFS) CaseSensitivity() tspath.CaseSensitivity {
	// pnp fs is always case sensitive
	return tspath.CaseSensitive
}

func (pnpFS *pnpFS) WriteFile(path tspath.RootedFilePath, data string) error {
	fs, formattedPath, zipPath := pnpFS.resolve(path.AsString())
	if zipPath != "" {
		panic("cannot write to zip file")
	}
	return fs.WriteFile(tspath.RootedFilePathFromNormalized(formattedPath), data)
}

func (pnpFS *pnpFS) AppendFile(path tspath.RootedFilePath, data string) error {
	fs, formattedPath, zipPath := pnpFS.resolve(path.AsString())
	if zipPath != "" {
		panic("cannot append to zip file")
	}
	return fs.AppendFile(tspath.RootedFilePathFromNormalized(formattedPath), data)
}

func splitZipPath(path string) (string, string) {
	parts := strings.Split(path, ".zip/")
	if len(parts) < 2 {
		return path, "/"
	}
	return parts[0] + ".zip", "/" + parts[1]
}

func getMatchingFS(pnpFS *pnpFS, path string) (vfs.FS, string, string) {
	if !tspath.IsZipPath(path) {
		return pnpFS.fs, path, ""
	}

	zipPath, internalPath := splitZipPath(path)

	zipStat := pnpFS.fs.Stat(tspath.RootedPathFromNormalized(zipPath))
	if zipStat == nil {
		return pnpFS.fs, path, ""
	}

	var usedReader *zip.ReadCloser

	pnpFS.cacheReaderMutex.Lock()
	defer pnpFS.cacheReaderMutex.Unlock()

	cachedReader, ok := pnpFS.cachedZipReadersMap[zipPath]
	if ok {
		usedReader = cachedReader
	} else {
		zipReader, err := zip.OpenReader(zipPath)
		if err != nil {
			return pnpFS.fs, path, ""
		}

		usedReader = zipReader
		pnpFS.cachedZipReadersMap[zipPath] = usedReader
	}

	return iovfs.From(usedReader, tspath.CaseSensitive), internalPath, zipPath
}

// Virtual paths are used to make different paths resolve to the same real file or folder, which is necessary in some cases when PnP is enabled
// See https://yarnpkg.com/advanced/lexicon#virtual-package and https://yarnpkg.com/advanced/pnpapi#resolvevirtual for more details
func resolveVirtual(path string) (realPath string, hash string, basePath string) {
	base, rest, found := strings.Cut(path, "/__virtual__/")
	if !found {
		return path, "", ""
	}

	parts := strings.SplitN(rest, "/", 3)
	if len(parts) < 3 {
		// Not enough parts to match the pattern, return as is
		return path, "", ""
	}
	hash = parts[0]
	subpath := parts[2]
	depth, err := strconv.Atoi(parts[1])
	if err != nil || depth < 0 {
		// Invalid n, return as is
		return path, "", ""
	}

	basePath = base + "/__virtual__"

	// Apply dirname n times to base
	for range depth {
		base = tspath.GetDirectoryPath(base)
	}
	// Join base and subpath
	if base == "/" {
		return "/" + subpath, hash, basePath
	}

	return tspath.CombinePaths(base, subpath), hash, basePath
}

func makeVirtualPath(basePath string, hash string, targetPath string) string {
	if basePath == "" || hash == "" {
		return targetPath
	}

	relativePath := tspath.GetRelativePathFromDirectory(
		tspath.GetDirectoryPath(basePath),
		targetPath,
		tspath.CaseSensitive)

	segments := strings.Split(relativePath, "/")

	depth := 0
	for depth < len(segments) && segments[depth] == ".." {
		depth++
	}

	subPath := strings.Join(segments[depth:], "/")

	return path.Join(basePath, hash, strconv.Itoa(depth), subPath)
}

// TODO: improve the cache clearing system, as somehow the GC is not able to collect all zip readers
// even when they are all closed and cleared from the map
func (pnpFS *pnpFS) ClearCache() error {
	pnpFS.cacheReaderMutex.Lock()
	defer pnpFS.cacheReaderMutex.Unlock()

	for _, reader := range pnpFS.cachedZipReadersMap {
		err := reader.Close()
		if err != nil {
			return err
		}
	}

	pnpFS.cachedZipReadersMap = make(map[string]*zip.ReadCloser)

	return nil
}
