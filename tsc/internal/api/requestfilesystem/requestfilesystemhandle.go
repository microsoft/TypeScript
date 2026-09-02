package requestfilesystem

import (
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// This can be replaced with per-handle mutexes if contention is high in practice.
var requestFileSystemDependenciesMu sync.Mutex

// Handle is a request filesystem whose backing layers can be compacted as snapshots are released.
type Handle struct {
	value      atomic.Pointer[requestFileSystem]
	dependents map[*Handle]struct{}
}

func (h *Handle) load() *requestFileSystem {
	return h.value.Load()
}

func (h *Handle) store(value *requestFileSystem) {
	h.value.Store(value)
}

func (h *Handle) initialize(value requestFileSystem) {
	if h.Initialized() {
		panic("request filesystem handle already initialized")
	}
	h.store(&value)
	h.registerWithBase()
}

// Initialized reports whether the handle contains a request filesystem.
func (h *Handle) Initialized() bool {
	return h.load() != nil
}

func (h *Handle) initializeFromRequest(params *RequestFileSystem, base vfs.FS, currentDirectory string) error {
	value, err := newRequestFileSystemWorker(params, base, currentDirectory, false)
	if err != nil {
		return err
	}
	h.initialize(*value)
	return nil
}

func (h *Handle) initializeLayered(params *RequestFileSystem, base vfs.FS, currentDirectory string) error {
	if params.Kind != KindCache {
		return h.initializeFromRequest(params, base, currentDirectory)
	}
	value, err := newRequestFileSystemWorker(params, base, currentDirectory, true)
	if err != nil {
		return err
	}
	h.initialize(*value)
	return nil
}

// InitializeForUpdate initializes the handle from a snapshot update request and its optional base.
func (h *Handle) InitializeForUpdate(params *RequestFileSystem, base *Handle, host vfs.FS, currentDirectory string, fileChanges *project.FileChangeSummary) error {
	if params == nil {
		if base != nil {
			h.CloneFrom(base)
		}
		return nil
	}
	baseFS := host
	if base != nil {
		baseFS = base
	}
	if base != nil && params.Kind == KindCache {
		addFileChanges(fileChanges, params, baseFS, currentDirectory)
		return h.initializeLayered(params, baseFS, currentDirectory)
	}
	return h.initializeFromRequest(params, baseFS, currentDirectory)
}

// FS returns this handle as a filesystem, or a nil interface when it is uninitialized.
func (h *Handle) FS() vfs.FS {
	if !h.Initialized() {
		return nil
	}
	return h
}

// CloneFrom initializes a zero-value handle with an independently managed copy of source.
func (h *Handle) CloneFrom(source *Handle) {
	if source == nil {
		return
	}
	if h.Initialized() {
		panic("request filesystem handle already initialized")
	}
	requestFileSystemDependenciesMu.Lock()
	defer requestFileSystemDependenciesMu.Unlock()
	value := *source.load()
	h.store(&value)
	h.registerWithBaseLocked()
}

func (h *Handle) applyToLocked(base *Handle) {
	h.unregisterFromBaseLocked()
	value := h.load().applyTo(*base.load())
	h.store(&value)
	h.registerWithBaseLocked()
}

// Release removes this handle from the dependency graph and compacts live dependents.
func (h *Handle) Release() {
	if h == nil {
		return
	}
	if h.load() == nil {
		return
	}
	requestFileSystemDependenciesMu.Lock()
	defer requestFileSystemDependenciesMu.Unlock()
	if h.load() == nil {
		return
	}
	h.compactDependentsLocked()
	h.unregisterFromBaseLocked()
}

func (h *Handle) registerWithBase() {
	requestFileSystemDependenciesMu.Lock()
	defer requestFileSystemDependenciesMu.Unlock()
	h.registerWithBaseLocked()
}

func (h *Handle) registerWithBaseLocked() {
	base := h.layeredBase()
	if base == nil {
		return
	}
	if base.dependents == nil {
		base.dependents = make(map[*Handle]struct{})
	}
	base.dependents[h] = struct{}{}
}

func (h *Handle) unregisterFromBaseLocked() {
	if base := h.layeredBase(); base != nil {
		delete(base.dependents, h)
	}
}

func (h *Handle) layeredBase() *Handle {
	value := h.load()
	if !value.layered {
		return nil
	}
	return getRequestFileSystem(value.baseFileSystem())
}

func (h *Handle) compactDependentsLocked() {
	for dependent := range h.dependents {
		dependent.applyToLocked(h)
		dependent.compactDependentsLocked()
		h.compactDependentsLocked()
		return
	}
}

func (h *Handle) baseFileSystem() vfs.FS {
	return h.load().baseFileSystem()
}

// HasMemoryFileSystem reports whether any backing layer is a total memory filesystem.
func (h *Handle) HasMemoryFileSystem() bool {
	for h != nil {
		value := h.load()
		if value.kind == KindMemory {
			return true
		}
		h = getRequestFileSystem(value.baseFileSystem())
	}
	return false
}

func (h *Handle) UseCaseSensitiveFileNames() bool {
	return h.load().UseCaseSensitiveFileNames()
}

func (h *Handle) ReadFile(fileName string) (string, bool) {
	return h.load().ReadFile(fileName)
}

func (h *Handle) FileExists(fileName string) bool {
	return h.load().FileExists(fileName)
}

func (h *Handle) DirectoryExists(directoryName string) bool {
	return h.load().DirectoryExists(directoryName)
}

func (h *Handle) GetAccessibleEntries(directoryName string) vfs.Entries {
	return h.load().GetAccessibleEntries(directoryName)
}

func (h *Handle) Realpath(path string) string {
	return h.load().Realpath(path)
}

func (h *Handle) WriteFile(fileName string, data string) error {
	return h.load().WriteFile(fileName, data)
}

func (h *Handle) AppendFile(fileName string, data string) error {
	return h.load().AppendFile(fileName, data)
}

func (h *Handle) Remove(path string) error {
	return h.load().Remove(path)
}

func (h *Handle) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	return h.load().Chtimes(path, aTime, mTime)
}

func (h *Handle) Stat(path string) vfs.FileInfo {
	return h.load().Stat(path)
}

func (h *Handle) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return h.load().WalkDir(root, walkFn)
}

var _ vfs.FS = (*Handle)(nil)
