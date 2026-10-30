package vfsmatch

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type prefetchedDirectory struct {
	realPath tspath.RootedDirectoryPath
	entries  vfs.Entries
}

// prefetchDirectories reads the directories that globVisitor.visit is expected
// to walk using up to maxWorkers concurrent readers, so the subsequent ordered
// walk does not wait on sequential directory reads. The walk remains the source
// of truth and reads anything missing from the result itself.
//
// The calling goroutine is the first reader; additional workers start only
// while queued directories outnumber idle workers, so scanning a leaf directory
// starts none. Each directory is queued at most once. Base paths are queued
// first with the full depth, so a walk from an ancestor base path stops at a
// descendant base path rather than reading its subtree again.
//
// Symlinked directories are not followed. Every prefetched directory is then
// reached through its only non-aliased spelling below a base path, so the
// prefetch cannot cycle and its result does not depend on scheduling. The walk
// reads symlinked subtrees itself, exactly as it would without a prefetch.
//
// If the host panics, the remaining work is abandoned and the panic is
// re-raised on the calling goroutine.
func prefetchDirectories(
	host vfs.FS,
	directoryMatcher *globMatcher,
	caseSensitivity tspath.CaseSensitivity,
	basePaths []tspath.RootedDirectoryPath,
	depth int,
	maxWorkers int,
) map[tspath.RootedDirectoryPath]prefetchedDirectory {
	p := &directoryPrefetcher{
		host:             host,
		directoryMatcher: directoryMatcher,
		caseSensitivity:  caseSensitivity,
		scheduled:        make(map[tspath.RootedDirectoryPath]struct{}),
		results:          make(map[tspath.RootedDirectoryPath]prefetchedDirectory),
	}
	p.cond.L = &p.mu
	p.maxWorkers = maxWorkers
	// The calling goroutine is the first worker.
	p.started = 1
	p.idle = 1
	for _, basePath := range basePaths {
		p.schedule(prefetchItem{path: basePath, depth: depth})
	}
	p.mu.Lock()
	p.startWorkers()
	p.mu.Unlock()

	p.work()
	p.wg.Wait()

	if p.panicked {
		panic(p.panicValue)
	}
	return p.results
}

type prefetchItem struct {
	path tspath.RootedDirectoryPath
	// realPath is empty when it must be resolved with the host.
	realPath tspath.RootedDirectoryPath
	depth    int
}

type directoryPrefetcher struct {
	host             vfs.FS
	directoryMatcher *globMatcher
	caseSensitivity  tspath.CaseSensitivity

	mu    sync.Mutex
	cond  sync.Cond
	wg    sync.WaitGroup
	queue []prefetchItem
	// pending counts queued and in-progress items.
	pending    int
	scheduled  map[tspath.RootedDirectoryPath]struct{}
	maxWorkers int
	started    int
	idle       int
	panicked   bool
	panicValue any
	results    map[tspath.RootedDirectoryPath]prefetchedDirectory
}

// schedule queues item unless its directory has already been queued.
// Callers must hold p.mu or be the only goroutine.
func (p *directoryPrefetcher) schedule(item prefetchItem) {
	if _, ok := p.scheduled[item.path]; ok {
		return
	}
	p.scheduled[item.path] = struct{}{}
	p.queue = append(p.queue, item)
	p.pending++
}

// startWorkers starts workers for queued items that idle workers cannot take.
// Workers count as idle from when they are started until they take an item.
// Callers must hold p.mu.
func (p *directoryPrefetcher) startWorkers() {
	for p.started < p.maxWorkers && len(p.queue) > p.idle {
		p.started++
		p.idle++
		p.wg.Go(p.work)
	}
}

func (p *directoryPrefetcher) work() {
	p.mu.Lock()
	defer p.mu.Unlock()
	for {
		for len(p.queue) == 0 && p.pending > 0 && !p.panicked {
			p.cond.Wait()
		}
		if p.pending == 0 || p.panicked {
			p.idle--
			p.cond.Broadcast()
			return
		}
		item := p.queue[len(p.queue)-1]
		p.queue = p.queue[:len(p.queue)-1]
		p.idle--

		p.mu.Unlock()
		dir, children, panicked, panicValue := p.fetch(item)
		p.mu.Lock()

		p.idle++
		p.pending--
		if panicked {
			if !p.panicked {
				p.panicked = true
				p.panicValue = panicValue
			}
			p.cond.Broadcast()
			continue
		}
		p.results[item.path] = dir
		for _, child := range children {
			p.schedule(child)
		}
		if len(p.queue) > 0 {
			p.startWorkers()
			p.cond.Broadcast()
		} else if p.pending == 0 {
			p.cond.Broadcast()
		}
	}
}

func (p *directoryPrefetcher) fetch(item prefetchItem) (dir prefetchedDirectory, children []prefetchItem, panicked bool, panicValue any) {
	defer func() {
		if r := recover(); r != nil {
			panicked, panicValue = true, r
		}
	}()

	realPath := item.realPath
	if realPath == "" {
		realPath = tspath.RootedDirectoryPathFromPath(p.host.Realpath(item.path.AsPath()))
	}
	entries := p.host.GetAccessibleEntries(item.path)
	dir = prefetchedDirectory{realPath: realPath, entries: entries}

	depth := item.depth
	if depth != UnlimitedDepth {
		depth--
		if depth == 0 {
			return dir, nil, false, nil
		}
	}

	absPrefix := tspath.EnsureTrailingDirectorySeparator(item.path.AsString())
	for _, name := range entries.Directories {
		if !p.directoryMatcher.matchesDirectoryParts(absPrefix, name) {
			continue
		}
		childPath := item.path.ResolveDirectory(name)
		childRealPath := realPath.ResolveDirectory(name)
		if entries.Symlinks != nil {
			if _, isSymlink := entries.Symlinks[name]; isSymlink {
				continue
			}
		} else {
			// The host does not report symlinks; resolve the child to find out.
			resolved := tspath.RootedDirectoryPathFromPath(p.host.Realpath(childPath.AsPath()))
			if p.caseSensitivity.PathKey(resolved.AsPath()) != p.caseSensitivity.PathKey(childRealPath.AsPath()) {
				continue
			}
			childRealPath = resolved
		}
		children = append(children, prefetchItem{path: childPath, realPath: childRealPath, depth: depth})
	}
	return dir, children, false, nil
}
