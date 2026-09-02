package requestfilesystem

import (
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// Handle is a request filesystem whose backing layers can be compacted as snapshots are released.
type Handle struct {
	value        atomic.Pointer[requestFileSystem]
	dependencies atomic.Pointer[dependencyState]
}

// dependencyState is immutable once published. The dependency graph has a forward edge
// from a child's value to its base and a reverse edge from the base to the child:
//
//	child                                      base
//	-----                                      ----
//	registerWithBase
//	  base := layeredBase(value)
//	  ---------------- addDependent(child) --> CAS active[D] -> active[D + child]
//	  verify value still points to base
//	  -- if not: removeDependent(child) ------> CAS active[D + child] -> active[D]
//
// releaseDependencies closes the reverse-edge set with CAS active[D] -> released and
// gives D to the releaser. Registration racing that CAS is resolved as follows:
//
//	addDependent wins                       releaseDependencies wins
//	-----------------                       ------------------------
//	release CAS retries and claims          addDependent observes released
//	a set containing the child              and returns false
//	          |                                        |
//	          +----------> child.compactBase(base) <---+
//
// compactBase CASes child.value from a layer over base to the merged value, calls
// base.removeDependent(child) to discard the old reverse edge, then calls
// child.registerWithBase() to register the merged value's new base. Stale reverse edges
// are harmless because compactBase first verifies that child.value still points to base.
// A nil dependencies pointer means active with no dependents; released is terminal.
type dependencyState struct {
	released   bool
	dependents *collections.Set[*Handle]
}

func (h *Handle) load() *requestFileSystem {
	return h.value.Load()
}

func (h *Handle) initialize(value requestFileSystem) {
	if !h.value.CompareAndSwap(nil, &value) {
		panic("request filesystem handle already initialized")
	}
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
func (h *Handle) InitializeForUpdate(params *RequestFileSystem, base *Handle, host vfs.FS, currentDirectory string, fileChanges *project.FileChangeSummary, hasBaseSnapshot bool) error {
	if params == nil {
		if base != nil {
			h.CloneFrom(base)
		}
		return nil
	}
	if params.Kind == KindCache && hasBaseSnapshot {
		baseFS := host
		if base != nil {
			baseFS = base
		}
		addFileChanges(fileChanges, params, baseFS, currentDirectory)
		return h.initializeLayered(params, baseFS, currentDirectory)
	}
	return h.initializeFromRequest(params, host, currentDirectory)
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
	value := *source.load()
	if !h.value.CompareAndSwap(nil, &value) {
		panic("request filesystem handle already initialized")
	}
	h.registerWithBase()
}

// Release removes this handle from the dependency graph and compacts live dependents.
func (h *Handle) Release() {
	if h == nil {
		return
	}
	if h.load() == nil {
		return
	}
	dependents, released := h.releaseDependencies()
	if !released {
		return
	}

	h.compactDependents(dependents)
	h.unregisterFromBase()
}

func (h *Handle) registerWithBase() {
	for {
		if h.isReleased() {
			return
		}
		base := h.layeredBase()
		if base == nil {
			return
		}
		if !base.addDependent(h) {
			h.compactBase(base)
			continue
		}
		if h.isReleased() {
			base.removeDependent(h)
			return
		}
		if h.layeredBase() == base {
			return
		}
		base.removeDependent(h)
	}
}

func (h *Handle) unregisterFromBase() {
	if base := h.layeredBase(); base != nil {
		base.removeDependent(h)
	}
}

func (h *Handle) layeredBase() *Handle {
	return layeredBase(h.load())
}

func (h *Handle) compactBase(base *Handle) bool {
	for {
		value := h.load()
		if layeredBase(value) != base {
			return false
		}
		compacted := value.applyTo(*base.load())
		if h.value.CompareAndSwap(value, &compacted) {
			base.removeDependent(h)
			h.registerWithBase()
			return true
		}
	}
}

func (h *Handle) compactDependents(dependents *collections.Set[*Handle]) {
	for dependent := range dependents.Keys() {
		state := dependent.dependencies.Load()
		if dependent.compactBase(h) && state != nil {
			dependent.compactDependents(state.dependents)
		}
	}
}

func (h *Handle) addDependent(dependent *Handle) bool {
	for {
		state := h.dependencies.Load()
		if state != nil {
			if state.released {
				return false
			}
			if state.dependents.Has(dependent) {
				return true
			}
		}
		dependents := collections.NewSetWithSizeHint[*Handle](1)
		if state != nil {
			dependents = state.dependents.Clone()
		}
		dependents.Add(dependent)
		if h.dependencies.CompareAndSwap(state, &dependencyState{dependents: dependents}) {
			return true
		}
	}
}

func (h *Handle) removeDependent(dependent *Handle) {
	for {
		state := h.dependencies.Load()
		if state == nil || state.released {
			return
		}
		if !state.dependents.Has(dependent) {
			return
		}
		dependents := state.dependents.Clone()
		dependents.Delete(dependent)
		if h.dependencies.CompareAndSwap(state, &dependencyState{dependents: dependents}) {
			return
		}
	}
}

func (h *Handle) releaseDependencies() (*collections.Set[*Handle], bool) {
	for {
		state := h.dependencies.Load()
		if state != nil && state.released {
			return nil, false
		}
		if h.dependencies.CompareAndSwap(state, &dependencyState{released: true}) {
			if state == nil {
				return nil, true
			}
			return state.dependents, true
		}
	}
}

func (h *Handle) isReleased() bool {
	state := h.dependencies.Load()
	return state != nil && state.released
}

func layeredBase(value *requestFileSystem) *Handle {
	if !value.layered {
		return nil
	}
	return getRequestFileSystem(value.baseFileSystem())
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
