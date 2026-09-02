package requestfilesystem

import (
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

var legacyBenchmarkDependenciesMu sync.Mutex

type legacyBenchmarkHandle struct {
	vfs.FS
	value      atomic.Pointer[requestFileSystem]
	dependents map[*legacyBenchmarkHandle]struct{}
}

func (h *legacyBenchmarkHandle) initialize(value requestFileSystem) {
	h.value.Store(&value)
	h.registerWithBase()
}

func (h *legacyBenchmarkHandle) cloneFrom(source *legacyBenchmarkHandle) {
	if source == nil {
		return
	}
	if h.value.Load() != nil {
		panic("request filesystem handle already initialized")
	}
	legacyBenchmarkDependenciesMu.Lock()
	defer legacyBenchmarkDependenciesMu.Unlock()
	value := *source.value.Load()
	h.value.Store(&value)
	h.registerWithBaseLocked()
}

func (h *legacyBenchmarkHandle) release() {
	if h == nil || h.value.Load() == nil {
		return
	}
	legacyBenchmarkDependenciesMu.Lock()
	defer legacyBenchmarkDependenciesMu.Unlock()
	if h.value.Load() == nil {
		return
	}
	h.compactDependentsLocked()
	h.unregisterFromBaseLocked()
}

func (h *legacyBenchmarkHandle) registerWithBase() {
	legacyBenchmarkDependenciesMu.Lock()
	defer legacyBenchmarkDependenciesMu.Unlock()
	h.registerWithBaseLocked()
}

func (h *legacyBenchmarkHandle) registerWithBaseLocked() {
	base := h.layeredBase()
	if base == nil {
		return
	}
	if base.dependents == nil {
		base.dependents = make(map[*legacyBenchmarkHandle]struct{})
	}
	base.dependents[h] = struct{}{}
}

func (h *legacyBenchmarkHandle) unregisterFromBaseLocked() {
	if base := h.layeredBase(); base != nil {
		delete(base.dependents, h)
	}
}

func (h *legacyBenchmarkHandle) layeredBase() *legacyBenchmarkHandle {
	value := h.value.Load()
	if !value.layered {
		return nil
	}
	base, _ := value.baseFileSystem().(*legacyBenchmarkHandle)
	return base
}

func (h *legacyBenchmarkHandle) UseCaseSensitiveFileNames() bool {
	return h.value.Load().UseCaseSensitiveFileNames()
}

func (h *legacyBenchmarkHandle) applyToLocked(base *legacyBenchmarkHandle) {
	h.unregisterFromBaseLocked()
	value := h.value.Load().applyTo(*base.value.Load())
	h.value.Store(&value)
	h.registerWithBaseLocked()
}

func (h *legacyBenchmarkHandle) compactDependentsLocked() {
	for dependent := range h.dependents {
		dependent.applyToLocked(h)
		dependent.compactDependentsLocked()
		h.compactDependentsLocked()
		return
	}
}

type perHandleMutexBenchmarkHandle struct {
	vfs.FS
	mu         sync.Mutex
	value      atomic.Pointer[requestFileSystem]
	dependents map[*perHandleMutexBenchmarkHandle]struct{}
	released   bool
}

func (h *perHandleMutexBenchmarkHandle) initialize(value requestFileSystem) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.value.Load() != nil {
		panic("request filesystem handle already initialized")
	}
	h.value.Store(&value)
	h.registerWithBaseLocked()
}

func (h *perHandleMutexBenchmarkHandle) cloneFrom(source *perHandleMutexBenchmarkHandle) {
	if source == nil {
		return
	}
	value := *source.value.Load()
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.value.Load() != nil {
		panic("request filesystem handle already initialized")
	}
	h.value.Store(&value)
	h.registerWithBaseLocked()
}

func (h *perHandleMutexBenchmarkHandle) release() {
	if h == nil || h.value.Load() == nil {
		return
	}
	h.mu.Lock()
	if h.released {
		h.mu.Unlock()
		return
	}
	h.released = true
	h.mu.Unlock()
	h.compactDependents()
	h.unregisterFromBase()
}

func (h *perHandleMutexBenchmarkHandle) registerWithBaseLocked() {
	for {
		base := h.layeredBase()
		if base == nil {
			return
		}
		base.mu.Lock()
		if base.released {
			value := h.value.Load().applyTo(*base.value.Load())
			h.value.Store(&value)
			base.mu.Unlock()
			continue
		}
		if base.dependents == nil {
			base.dependents = make(map[*perHandleMutexBenchmarkHandle]struct{})
		}
		base.dependents[h] = struct{}{}
		base.mu.Unlock()
		return
	}
}

func (h *perHandleMutexBenchmarkHandle) unregisterFromBase() {
	if base := h.layeredBase(); base != nil {
		base.mu.Lock()
		delete(base.dependents, h)
		base.mu.Unlock()
	}
}

func (h *perHandleMutexBenchmarkHandle) layeredBase() *perHandleMutexBenchmarkHandle {
	value := h.value.Load()
	if !value.layered {
		return nil
	}
	base, _ := value.baseFileSystem().(*perHandleMutexBenchmarkHandle)
	return base
}

func (h *perHandleMutexBenchmarkHandle) UseCaseSensitiveFileNames() bool {
	return h.value.Load().UseCaseSensitiveFileNames()
}

func (h *perHandleMutexBenchmarkHandle) compactDependents() {
	for {
		h.mu.Lock()
		var dependent *perHandleMutexBenchmarkHandle
		for candidate := range h.dependents {
			dependent = candidate
			delete(h.dependents, candidate)
			break
		}
		value := h.value.Load()
		h.mu.Unlock()
		if dependent == nil {
			return
		}
		dependent.mu.Lock()
		if !dependent.released && dependent.layeredBase() == h {
			compacted := dependent.value.Load().applyTo(*value)
			dependent.value.Store(&compacted)
			dependent.registerWithBaseLocked()
		}
		dependent.mu.Unlock()
		dependent.compactDependents()
	}
}

func benchmarkRootValue(host vfs.FS) requestFileSystem {
	return requestFileSystem{
		kind:                  KindMemory,
		base:                  host,
		currentDirectory:      "/",
		useCaseSensitiveNames: host.UseCaseSensitiveFileNames(),
		files:                 make(map[tspath.Path]requestFile),
	}
}

func benchmarkLayerValue(base vfs.FS) requestFileSystem {
	return requestFileSystem{
		kind:                  KindCache,
		base:                  base,
		layered:               true,
		currentDirectory:      "/",
		useCaseSensitiveNames: base.UseCaseSensitiveFileNames(),
	}
}

func benchmarkUpdateValue(base vfs.FS) requestFileSystem {
	value := benchmarkLayerValue(base)
	value.files = map[tspath.Path]requestFile{
		"/index.ts": {fileName: "/index.ts", content: "export const value = 1"},
	}
	return value
}

func newAtomicBenchmarkRoot(host vfs.FS) *Handle {
	handle := &Handle{}
	handle.initialize(benchmarkRootValue(host))
	return handle
}

func newAtomicBenchmarkLayer(base *Handle) *Handle {
	handle := &Handle{}
	handle.initialize(benchmarkLayerValue(base))
	return handle
}

func newAtomicBenchmarkUpdate(base *Handle) *Handle {
	handle := &Handle{}
	handle.initialize(benchmarkUpdateValue(base))
	return handle
}

func newLegacyBenchmarkRoot(host vfs.FS) *legacyBenchmarkHandle {
	handle := &legacyBenchmarkHandle{FS: host}
	handle.initialize(benchmarkRootValue(host))
	return handle
}

func newLegacyBenchmarkLayer(base *legacyBenchmarkHandle) *legacyBenchmarkHandle {
	handle := &legacyBenchmarkHandle{FS: base.FS}
	handle.initialize(benchmarkLayerValue(base))
	return handle
}

func newLegacyBenchmarkUpdate(base *legacyBenchmarkHandle) *legacyBenchmarkHandle {
	handle := &legacyBenchmarkHandle{FS: base.FS}
	handle.initialize(benchmarkUpdateValue(base))
	return handle
}

func newPerHandleMutexBenchmarkRoot(host vfs.FS) *perHandleMutexBenchmarkHandle {
	handle := &perHandleMutexBenchmarkHandle{FS: host}
	handle.initialize(benchmarkRootValue(host))
	return handle
}

func newPerHandleMutexBenchmarkLayer(base *perHandleMutexBenchmarkHandle) *perHandleMutexBenchmarkHandle {
	handle := &perHandleMutexBenchmarkHandle{FS: base.FS}
	handle.initialize(benchmarkLayerValue(base))
	return handle
}

func newPerHandleMutexBenchmarkUpdate(base *perHandleMutexBenchmarkHandle) *perHandleMutexBenchmarkHandle {
	handle := &perHandleMutexBenchmarkHandle{FS: base.FS}
	handle.initialize(benchmarkUpdateValue(base))
	return handle
}

func BenchmarkHandleDependencies(b *testing.B) {
	host := vfstest.FromMap(map[string]string{}, true)
	benchmarkIndependentChains(b, host)
	benchmarkSharedBase(b, host)
	benchmarkTypicalUpdates(b, host)
}

func benchmarkIndependentChains(b *testing.B, host vfs.FS) {
	b.Run("IndependentChains/Atomic", func(b *testing.B) {
		b.ReportAllocs()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				root := newAtomicBenchmarkRoot(host)
				middle := newAtomicBenchmarkLayer(root)
				leaf := newAtomicBenchmarkLayer(middle)
				var clone Handle
				clone.CloneFrom(leaf)
				root.Release()
				middle.Release()
				leaf.Release()
				clone.Release()
			}
		})
	})

	b.Run("IndependentChains/PerHandleMutex", func(b *testing.B) {
		b.ReportAllocs()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				root := newPerHandleMutexBenchmarkRoot(host)
				middle := newPerHandleMutexBenchmarkLayer(root)
				leaf := newPerHandleMutexBenchmarkLayer(middle)
				clone := &perHandleMutexBenchmarkHandle{FS: host}
				clone.cloneFrom(leaf)
				root.release()
				middle.release()
				leaf.release()
				clone.release()
			}
		})
	})

	b.Run("IndependentChains/GlobalMutex", func(b *testing.B) {
		b.ReportAllocs()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				root := newLegacyBenchmarkRoot(host)
				middle := newLegacyBenchmarkLayer(root)
				leaf := newLegacyBenchmarkLayer(middle)
				clone := &legacyBenchmarkHandle{FS: host}
				clone.cloneFrom(leaf)
				root.release()
				middle.release()
				leaf.release()
				clone.release()
			}
		})
	})
}

func benchmarkSharedBase(b *testing.B, host vfs.FS) {
	b.Run("SharedBase/Atomic", func(b *testing.B) {
		base := newAtomicBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				dependent := newAtomicBenchmarkLayer(base)
				dependent.Release()
			}
		})
		b.StopTimer()
		base.Release()
	})

	b.Run("SharedBase/PerHandleMutex", func(b *testing.B) {
		base := newPerHandleMutexBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				dependent := newPerHandleMutexBenchmarkLayer(base)
				dependent.release()
			}
		})
		b.StopTimer()
		base.release()
	})

	b.Run("SharedBase/GlobalMutex", func(b *testing.B) {
		base := newLegacyBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		b.RunParallel(func(pb *testing.PB) {
			for pb.Next() {
				dependent := newLegacyBenchmarkLayer(base)
				dependent.release()
			}
		})
		b.StopTimer()
		base.release()
	})
}

func benchmarkTypicalUpdates(b *testing.B, host vfs.FS) {
	b.Run("TypicalUpdates/Atomic", func(b *testing.B) {
		current := newAtomicBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		for b.Loop() {
			next := newAtomicBenchmarkUpdate(current)
			current.Release()
			current = next
		}
		b.StopTimer()
		current.Release()
	})

	b.Run("TypicalUpdates/PerHandleMutex", func(b *testing.B) {
		current := newPerHandleMutexBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		for b.Loop() {
			next := newPerHandleMutexBenchmarkUpdate(current)
			current.release()
			current = next
		}
		b.StopTimer()
		current.release()
	})

	b.Run("TypicalUpdates/GlobalMutex", func(b *testing.B) {
		current := newLegacyBenchmarkRoot(host)
		b.ReportAllocs()
		b.ResetTimer()
		for b.Loop() {
			next := newLegacyBenchmarkUpdate(current)
			current.release()
			current = next
		}
		b.StopTimer()
		current.release()
	})
}
