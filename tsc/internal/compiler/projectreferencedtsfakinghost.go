package compiler

import (
	"strings"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
)

type projectReferenceDtsFakingHost struct {
	currentDirectory string
	fs               *cachedvfs.FS
}

var _ module.ResolutionHost = (*projectReferenceDtsFakingHost)(nil)

func newProjectReferenceDtsFakingHost(host module.ResolutionHost, references *projectReferenceFileMapper) module.ResolutionHost {
	// Create a new host that will fake the dts files
	return &projectReferenceDtsFakingHost{
		currentDirectory: host.GetCurrentDirectory(),
		fs: cachedvfs.From(&projectReferenceDtsFakingVfs{
			host:                       host,
			projectReferenceFileMapper: references,
			knownSymlinks:              symlinks.KnownSymlinks{},
		}),
	}
}

// FS implements module.ResolutionHost.
func (h *projectReferenceDtsFakingHost) FS() vfs.FS {
	return h.fs
}

// GetCurrentDirectory implements module.ResolutionHost.
func (h *projectReferenceDtsFakingHost) GetCurrentDirectory() string {
	return h.currentDirectory
}

type projectReferenceDtsFakingVfs struct {
	host                       module.ResolutionHost
	projectReferenceFileMapper *projectReferenceFileMapper
	knownSymlinks              symlinks.KnownSymlinks
}

var _ vfs.FS = (*projectReferenceDtsFakingVfs)(nil)

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) UseCaseSensitiveFileNames() bool {
	return fs.host.FS().UseCaseSensitiveFileNames()
}

// FileExists implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) FileExists(path string) bool {
	if fs.host.FS().FileExists(path) {
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
	return fs.host.FS().ReadFile(path)
}

// WriteFile implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) WriteFile(path string, data string) error {
	panic("should not be called by resolver")
}

// AppendFile implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) AppendFile(path string, data string) error {
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
	if fs.host.FS().DirectoryExists(path) {
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

// Realpath implements vfs.FS.
func (fs *projectReferenceDtsFakingVfs) Realpath(path string) string {
	result, ok := fs.knownSymlinks.Files().Load(fs.toPath(path))
	if ok {
		return result
	}
	return fs.host.FS().Realpath(path)
}

func (fs *projectReferenceDtsFakingVfs) toPath(path string) tspath.Path {
	return tspath.ToPath(path, fs.host.GetCurrentDirectory(), fs.UseCaseSensitiveFileNames())
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

	fileOrDirectoryPath := fs.toPath(fileOrDirectory)
	if !strings.Contains(string(fileOrDirectoryPath), "/node_modules/") {
		return false
	}
	// Check if the directory or file is a symlinked package
	if packageRoot := module.ParseNodeModuleFromPath(fileOrDirectory, true /*isFolder*/); packageRoot != "" {
		fs.handleDirectoryCouldBeSymlink(packageRoot)
	}
	knownDirectoryLinks := fs.knownSymlinks.Directories()
	if knownDirectoryLinks.Size() == 0 {
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
		if !strings.HasPrefix(string(fileOrDirectoryPath), string(directoryPath)) {
			return true
		}
		realFileOrDirectory, ok := knownDirectoryLink.ResolveFileName(fileOrDirectory, fs.UseCaseSensitiveFileNames())
		if !ok {
			panic("canonical symlink path did not match its presentation path")
		}
		if exists = fileOrDirectoryExistsUsingSource(realFileOrDirectory).IsTrue(); exists {
			if isFile {
				// Store the real path for the file
				absolutePath := tspath.GetNormalizedAbsolutePath(fileOrDirectory, fs.host.GetCurrentDirectory())
				fs.knownSymlinks.SetFile(
					absolutePath,
					fileOrDirectoryPath,
					realFileOrDirectory,
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
		return core.IfElse(fs.host.FS().FileExists(source.Source), core.TSTrue, core.TSFalse)
	}
	return core.TSUnknown
}

func (fs *projectReferenceDtsFakingVfs) directoryExistsIfProjectReferenceDeclDir(dir string) core.Tristate {
	dirPath := fs.toPath(dir)
	for declDirPath := range fs.projectReferenceFileMapper.dtsDirectories.Keys() {
		if dirPath.ContainsPath(declDirPath) || declDirPath.ContainsPath(dirPath) {
			return core.TSTrue
		}
	}
	return core.TSUnknown
}
