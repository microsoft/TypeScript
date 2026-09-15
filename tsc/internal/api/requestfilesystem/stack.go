package requestfilesystem

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// stackedFileSystem is a request filesystem bound to the snapshot layers beneath it.
// A request filesystem alone falls back to the session host; stacked, it falls back
// to the snapshot's editor overlays and cached disk files first. That ordering is
// what puts request contents above open editor documents, and it lets a request
// symlink target a file that only exists as an overlay.
type stackedFileSystem struct {
	// layer serves non-content operations. It is the request filesystem rebased onto
	// the host as the snapshot sees it, so directory and symlink resolution match the
	// standalone filesystem.
	layer *requestFileSystem
	below project.FileSource
	// handles memoizes the file handles this filesystem synthesizes for paths it
	// does not supply directly, so repeated lookups of one path return an identical
	// handle. Later snapshots synthesize their own; the parse cache keys on content
	// rather than handle identity, so their source files are still reused.
	handles collections.SyncMap[tspath.Path, project.FileHandle]
}

var _ project.FileSource = (*stackedFileSystem)(nil)

// Stack implements project.FileSystemLayer.
func (s requestFileSystem) Stack(below project.FileSource) project.FileSource {
	return &stackedFileSystem{layer: &s, below: below}
}

// GetFile implements project.FileSource.
func (s *stackedFileSystem) GetFile(fileName string) project.FileHandle {
	return s.GetFileByPath(fileName, s.layer.toPath(fileName))
}

// GetFileByPath implements project.FileSource.
func (s *stackedFileSystem) GetFileByPath(fileName string, path tspath.Path) project.FileHandle {
	lookup := s.layer.lookupPath(fileName)
	if !lookup.ok || lookup.info != nil && lookup.info.IsDir() {
		return nil
	}
	if file, ok := lookup.info.(*requestFile); ok {
		if !lookup.followedSymlink {
			return file.fileHandle()
		}
		// Reached through a request symlink; report the name that was asked for.
		return s.handle(fileName, path, file.content)
	}
	if lookup.fileSystem == nil {
		return nil
	}
	if lookup.host {
		if content, ok := s.layer.base.ReadFile(lookup.path); ok {
			return s.handle(fileName, path, content)
		}
		return nil
	}
	resolvedPath := s.layer.toPath(lookup.path)
	file := s.below.GetFileByPath(lookup.path, resolvedPath)
	if file == nil || resolvedPath == path {
		return file
	}
	// A symlink redirected into the layers below; report the name that was asked for.
	return s.handle(fileName, path, file.Content())
}

// FileExists implements project.FileSource.
func (s *stackedFileSystem) FileExists(fileName string, path tspath.Path) bool {
	lookup := s.layer.lookupPath(fileName)
	if !lookup.ok || lookup.info != nil && lookup.info.IsDir() {
		return false
	}
	if lookup.info != nil {
		return true
	}
	if lookup.fileSystem == nil {
		return false
	}
	if lookup.host {
		return s.layer.base.FileExists(lookup.path)
	}
	return s.below.FileExists(lookup.path, s.layer.toPath(lookup.path))
}

// DirectoryExists implements project.FileSource.
func (s *stackedFileSystem) DirectoryExists(directoryName string) bool {
	lookup := s.layer.lookupPath(directoryName)
	if !lookup.ok || lookup.info != nil && !lookup.info.IsDir() {
		return false
	}
	if lookup.info != nil {
		return true
	}
	if lookup.fileSystem == nil {
		return false
	}
	if lookup.host {
		return s.layer.base.DirectoryExists(lookup.path)
	}
	return s.below.DirectoryExists(lookup.path)
}

// GetAccessibleEntries implements project.FileSource.
func (s *stackedFileSystem) GetAccessibleEntries(directoryName string) vfs.Entries {
	return s.layer.accessibleEntries(directoryName, s.below.GetAccessibleEntries)
}

// Realpath implements project.FileSource.
func (s *stackedFileSystem) Realpath(path string) string {
	lookup := s.layer.lookupPath(path)
	if !lookup.ok {
		return path
	}
	if lookup.info != nil {
		return lookup.path
	}
	if lookup.host {
		return s.layer.base.Realpath(lookup.path)
	}
	return s.below.Realpath(lookup.path)
}

// Stat implements project.FileSource.
func (s *stackedFileSystem) Stat(path string) vfs.FileInfo {
	lookup := s.layer.lookupPath(path)
	if !lookup.ok {
		return nil
	}
	if lookup.info != nil {
		return lookup.info
	}
	if lookup.host {
		return s.layer.base.Stat(lookup.path)
	}
	return s.below.Stat(lookup.path)
}

// UseCaseSensitiveFileNames implements project.FileSource.
func (s *stackedFileSystem) UseCaseSensitiveFileNames() bool {
	return s.layer.useCaseSensitiveNames
}

func (s *stackedFileSystem) handle(fileName string, path tspath.Path, content string) project.FileHandle {
	if handle, ok := s.handles.Load(path); ok {
		return handle
	}
	handle, _ := s.handles.LoadOrStore(path, project.NewFileHandle(fileName, content))
	return handle
}
