package vfsmatch

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/core"

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
// Each directory is queued at most once. Base paths are all marked as queued
// before any is read, so a walk from an ancestor base path stops at a
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
		wg:               core.NewWorkGroup(maxWorkers),
		scheduled:        make(map[tspath.RootedDirectoryPath]struct{}, len(basePaths)),
		results:          make(map[tspath.RootedDirectoryPath]prefetchedDirectory),
	}
	items := make([]prefetchItem, 0, len(basePaths))
	for _, basePath := range basePaths {
		if _, ok := p.scheduled[basePath]; !ok {
			p.scheduled[basePath] = struct{}{}
			items = append(items, prefetchItem{path: basePath, depth: depth})
		}
	}
	for _, item := range items {
		p.queue(item)
	}
	p.wg.RunAndWait()

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
	wg               core.WorkGroup

	mu         sync.Mutex
	scheduled  map[tspath.RootedDirectoryPath]struct{}
	panicked   bool
	panicValue any
	results    map[tspath.RootedDirectoryPath]prefetchedDirectory
}

func (p *directoryPrefetcher) queue(item prefetchItem) {
	p.wg.Queue(func() { p.run(item) })
}

func (p *directoryPrefetcher) run(item prefetchItem) {
	p.mu.Lock()
	stop := p.panicked
	p.mu.Unlock()
	if stop {
		return
	}

	dir, children, panicked, panicValue := p.fetch(item)

	p.mu.Lock()
	if panicked {
		if !p.panicked {
			p.panicked = true
			p.panicValue = panicValue
		}
		p.mu.Unlock()
		return
	}
	p.results[item.path] = dir
	unscheduled := children[:0]
	for _, child := range children {
		if _, ok := p.scheduled[child.path]; !ok {
			p.scheduled[child.path] = struct{}{}
			unscheduled = append(unscheduled, child)
		}
	}
	p.mu.Unlock()

	for _, child := range unscheduled {
		p.queue(child)
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
