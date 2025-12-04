package compiler

import (
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/symlinks"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
)

type projectReferenceDtsFakingHost struct {
	host CompilerHost
	fs   *cachedvfs.FS
}

var _ module.ResolutionHost = (*projectReferenceDtsFakingHost)(nil)

func newProjectReferenceDtsFakingHost(loader *fileLoader) module.ResolutionHost {
	// Create a new host that will fake the dts files
	host := &projectReferenceDtsFakingHost{
		host: loader.opts.Host,
		fs: cachedvfs.From(&projectReferenceDtsFakingVfs{
			projectReferenceFileMapper: loader.projectReferenceFileMapper,
			dtsDirectories:             loader.dtsDirectories,
			knownSymlinks:              symlinks.KnownSymlinks{},
		}),
	}
	return host
}

// FS implements module.ResolutionHost.
func (h *projectReferenceDtsFakingHost) FS() vfs.FS {
	return h.fs
}

// GetCurrentDirectory implements module.ResolutionHost.
func (h *projectReferenceDtsFakingHost) GetCurrentDirectory() string {
	return h.host.GetCurrentDirectory()
}

type projectReferenceDtsFakingVfs struct {
	projectReferenceFileMapper *projectReferenceFileMapper
	dtsDirectories             collections.Set[tspath.Path]
	knownSymlinks              symlinks.KnownSymlinks
}

var _ vfs.FS = (*projectReferenceDtsFakingVfs)(nil)

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) UseCaseSensitiveFileNames() bool {
	return fs.projectReferenceFileMapper.opts.Host.FS().UseCaseSensitiveFileNames()
}

// FileExists implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) FileExists(path string) bool {
	if fs.projectReferenceFileMapper.opts.Host.FS().FileExists(path) {
		return true
	}
	if !tspath.IsDeclarationFileName(path) {
		return false
	}
	// Project references go to source file instead of .d.ts file
	return fs.fileOrDirectoryExistsUsingSource(path /*isFile*/, true)
}

// ReadFile implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) ReadFile(path string) (contents string, ok bool) {
	// Dont need to override as we cannot mimick read file
	return fs.projectReferenceFileMapper.opts.Host.FS().ReadFile(path)
}

// WriteFile implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) WriteFile(path string, data string, writeByteOrderMark bool) error {
	panic("should not be called by resolver")
}

// Remove implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) Remove(path string) error {
	panic("should not be called by resolver")
}

// Chtimes implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	panic("should not be called by resolver")
}

// DirectoryExists implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) DirectoryExists(path string) bool {
	if fs.projectReferenceFileMapper.opts.Host.FS().DirectoryExists(path) {
		fs.handleDirectoryCouldBeSymlink(path)
		return true
	}
	return fs.fileOrDirectoryExistsUsingSource(path /*isFile*/, false)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) GetAccessibleEntries(path string) vfs.Entries {
	panic("should not be called by resolver")
}

// Stat implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) Stat(path string) vfs.FileInfo {
	panic("should not be called by resolver")
}

// WalkDir implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	panic("should not be called by resolver")
}

// Realpath implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) Realpath(path string) string {
	result, ok := fs.knownSymlinks.Files().Load(fs.toPath(path))
	if ok {
		return result
	}
	return fs.projectReferenceFileMapper.opts.Host.FS().Realpath(path)
}

func (fs *projectReferenceDtsFakingVfs) toPath(path string) tspath.Path {
	return tspath.ToPath(path, fs.projectReferenceFileMapper.opts.Host.GetCurrentDirectory(), fs.UseCaseSensitiveFileNames())
}

func (fs *projectReferenceDtsFakingVfs) handleDirectoryCouldBeSymlink(directory string) {
	if tspath.ContainsIgnoredPath(directory) {
		return
	}

	// Because we already watch node_modules, handle symlinks in there
	if !strings.Contains(directory, "/node_modules/") {
		return
	}

	directoryPath := tspath.Path(tspath.EnsureTrailingDirectorySeparator(string(fs.toPath(directory))))
	if _, ok := fs.knownSymlinks.Directories().Load(directoryPath); ok {
		return
	}

	realDirectory := fs.Realpath(directory)
	var realPath tspath.Path
	if realDirectory == directory {
		// not symlinked
		return
	}
	if realPath = tspath.Path(tspath.EnsureTrailingDirectorySeparator(string(fs.toPath(realDirectory)))); realPath == directoryPath {
		// not symlinked
		return
	}
	fs.knownSymlinks.SetDirectory(directory, directoryPath, &symlinks.KnownDirectoryLink{
		Real:     tspath.EnsureTrailingDirectorySeparator(realDirectory),
		RealPath: realPath,
	})
}

func (fs *projectReferenceDtsFakingVfs) fileOrDirectoryExistsUsingSource(fileOrDirectory string, isFile bool) bool {
	fileOrDirectoryExistsUsingSource := core.IfElse(isFile, fs.fileExistsIfProjectReferenceDts, fs.directoryExistsIfProjectReferenceDeclDir)
	// Check current directory or file
	result := fileOrDirectoryExistsUsingSource(fileOrDirectory)
	if result != core.TSUnknown {
		return result == core.TSTrue
	}

	knownDirectoryLinks := fs.knownSymlinks.Directories()
	if knownDirectoryLinks.Size() == 0 {
		return false
	}
	fileOrDirectoryPath := fs.toPath(fileOrDirectory)
	if !strings.Contains(string(fileOrDirectoryPath), "/node_modules/") {
		return false
	}
	if isFile {
		_, ok := fs.knownSymlinks.Files().Load(fileOrDirectoryPath)
		if ok {
			return true
		}
	}

	// If it contains node_modules check if its one of the symlinked path we know of
	var exists bool
	knownDirectoryLinks.Range(func(directoryPath tspath.Path, knownDirectoryLink *symlinks.KnownDirectoryLink) bool {
		relative, hasPrefix := strings.CutPrefix(string(fileOrDirectoryPath), string(directoryPath))
		if !hasPrefix {
			return true
		}
		if exists = fileOrDirectoryExistsUsingSource(string(knownDirectoryLink.RealPath) + relative).IsTrue(); exists {
			if isFile {
				// Store the real path for the file
				absolutePath := tspath.GetNormalizedAbsolutePath(fileOrDirectory, fs.projectReferenceFileMapper.opts.Host.GetCurrentDirectory())
				fs.knownSymlinks.SetFile(
					fileOrDirectoryPath,
					knownDirectoryLink.Real+absolutePath[len(directoryPath):],
				)
			}
			return false
		}
		return true
	})
	return exists
}

func (fs *projectReferenceDtsFakingVfs) fileExistsIfProjectReferenceDts(file string) core.Tristate {
	source := fs.projectReferenceFileMapper.getProjectReferenceFromOutputDts(fs.toPath(file))
	if source != nil {
		return core.IfElse(fs.projectReferenceFileMapper.opts.Host.FS().FileExists(source.Source), core.TSTrue, core.TSFalse)
	}
	return core.TSUnknown
}

func (fs *projectReferenceDtsFakingVfs) directoryExistsIfProjectReferenceDeclDir(dir string) core.Tristate {
	dirPath := fs.toPath(dir)
	dirPathWithTrailingDirectorySeparator := dirPath + "/"
	for declDirPath := range fs.dtsDirectories.Keys() {
		if dirPath == declDirPath ||
			// Any parent directory of declaration dir
			strings.HasPrefix(string(declDirPath), string(dirPathWithTrailingDirectorySeparator)) ||
			// Any directory inside declaration dir
			strings.HasPrefix(string(dirPath), string(declDirPath)+"/") {
			return core.TSTrue
		}
	}
	return core.TSUnknown
}
