package watchalias

import (
	"fmt"
	"maps"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Registration describes an observed name, not a compiler identity. Realpath is
// an explicit filesystem observation; an empty value registers only spelling.
// Only explicit directory observations may rebase unknown descendants.
type Registration struct {
	Name       string
	Realpath   string
	Dependency bool
	Directory  bool
}

type registeredPath struct {
	logical  []*Registration
	physical []*Registration
	children []*registeredPath
}

func (i *Index) toPath(name string) tspath.Path {
	// Native equivalence is supplied by expandNative, including volume-sensitive
	// ancestors. Compiler canonicalization must not merge those endpoint trees.
	return tspath.ToPath(name, "", i.provider != nil || i.filesystem == nil || i.filesystem.UseCaseSensitiveFileNames())
}

func (i *Index) path(name string) *registeredPath {
	key := i.toPath(name)
	if node := i.paths[key]; node != nil {
		return node
	}
	if i.paths == nil {
		i.paths = make(map[tspath.Path]*registeredPath)
	}
	node := &registeredPath{}
	i.paths[key] = node
	parent := tspath.GetDirectoryPath(name)
	if parent != name && parent != "" {
		p := i.path(parent)
		p.children = append(p.children, node)
	}
	return node
}

func (i *Index) Register(registration Registration) error {
	if err := i.Add(registration.Name); err != nil {
		return err
	}
	if registration.Realpath == "" {
		return nil
	}
	if err := i.Add(registration.Realpath); err != nil {
		return err
	}
	if previous := i.registrations[registration.Name]; previous != nil {
		if previous.Realpath != registration.Realpath {
			return fmt.Errorf("conflicting watch resolutions for %q: %q and %q", registration.Name, previous.Realpath, registration.Realpath)
		}
		previous.Dependency = previous.Dependency || registration.Dependency
		previous.Directory = previous.Directory || registration.Directory
		return nil
	}
	if i.registrations == nil {
		i.registrations = make(map[string]*Registration)
	}
	i.registrations[registration.Name] = &registration
	logical := i.path(registration.Name)
	logical.logical = append(logical.logical, &registration)
	physical := i.path(registration.Realpath)
	physical.physical = append(physical.physical, &registration)
	return nil
}

func (i *Index) Covers(registration Registration) bool {
	if registration.Realpath == "" {
		return i.Contains(registration.Name)
	}
	previous := i.registrations[registration.Name]
	return previous != nil && previous.Realpath == registration.Realpath &&
		(!registration.Dependency || previous.Dependency) && (!registration.Directory || previous.Directory)
}

func (i *Index) rebase(name string, physical bool, add func(string)) {
	for ancestor := name; ; {
		if node := i.paths[i.toPath(ancestor)]; node != nil {
			registrations := node.logical
			if !physical {
				registrations = node.physical
			}
			for _, registration := range registrations {
				if registration.Name == registration.Realpath || ancestor != name && !registration.Directory {
					continue
				}
				target := registration.Realpath
				if !physical {
					target = registration.Name
				}
				add(tspath.CombinePaths(target, strings.TrimPrefix(name[len(ancestor):], "/")))
			}
		}
		parent := tspath.GetDirectoryPath(ancestor)
		if parent == ancestor || parent == "" {
			return
		}
		ancestor = parent
	}
}

// Expand matches finite, explicit endpoints. Requested watch roots may first
// supply a logical spelling; logical paths then map to resolved endpoints, and
// resolved endpoints fan out to original names. Returned names are never fed
// back into an unrestricted symlink-rewrite loop.
func (i *Index) Expand(event string) []string {
	if len(i.registrations) == 0 {
		return i.expandNative(event)
	}
	names := i.expandNative(event)
	seen := make(map[string]struct{}, len(names))
	for _, name := range names {
		seen[name] = struct{}{}
	}
	add := func(name string) {
		for _, expanded := range i.expandNative(name) {
			if _, ok := seen[expanded]; !ok {
				seen[expanded] = struct{}{}
				names = append(names, expanded)
			}
		}
	}
	for _, name := range names {
		i.rebase(name, false, add)
	}
	for _, name := range names {
		i.rebase(name, true, add)
	}
	for _, name := range names {
		i.rebase(name, false, add)
	}
	return names
}

type Matches struct {
	Changes          map[string]fswatch.EventKind
	Affected         []string
	NamespaceChanged bool
}

// Match returns original-name candidates and affected resolution observations.
// Physical deletions use the same endpoint tree as resolution invalidation.
// Logical cache directory traversal remains the caller's responsibility when
// it registers only spellings, rather than resolved dependencies.
func (i *Index) Match(events map[string]fswatch.EventKind) Matches {
	result := Matches{Changes: make(map[string]fswatch.EventKind, len(events))}
	for name, kind := range events {
		knownLeaf := false
		for _, name := range i.Expand(name) {
			if previous, ok := result.Changes[name]; !ok || previous != fswatch.EventDelete {
				result.Changes[name] = kind
			}
			leaf, directory := i.classifyPath(name)
			knownLeaf = knownLeaf || leaf
			result.NamespaceChanged = result.NamespaceChanged || directory
		}
		result.NamespaceChanged = result.NamespaceChanged || kind != fswatch.EventUpdate || !knownLeaf
	}
	return i.matchSubtrees(result)
}

// MatchExpanded applies subtree effects to already-expanded event spellings.
// Ordered callers can coalesce directory lifecycles before deriving deletions,
// without expanding aliases again and reviving canceled notifications.
func (i *Index) MatchExpanded(events map[string]fswatch.EventKind) Matches {
	result := Matches{Changes: maps.Clone(events)}
	for name, kind := range events {
		leaf, directory := i.classifyPath(name)
		result.NamespaceChanged = result.NamespaceChanged || directory || kind != fswatch.EventUpdate || !leaf
	}
	return i.matchSubtrees(result)
}

func (i *Index) classifyPath(name string) (leaf, directory bool) {
	if node := i.paths[i.toPath(name)]; node != nil {
		if len(node.children) != 0 {
			return false, true
		}
		for _, registrations := range [][]*Registration{node.logical, node.physical} {
			for _, registration := range registrations {
				directory = directory || registration.Directory
				leaf = leaf || !registration.Directory
			}
		}
	}
	return leaf, directory
}

func (i *Index) matchSubtrees(result Matches) Matches {
	add := func(name string, kind fswatch.EventKind) {
		if previous, ok := result.Changes[name]; !ok || previous != fswatch.EventDelete {
			result.Changes[name] = kind
		}
	}
	affected := make(map[*Registration]struct{})
	visited := make(map[*registeredPath]struct{})
	var visit func(*registeredPath, bool, bool)
	visit = func(node *registeredPath, subtree, deleted bool) {
		if node == nil {
			return
		}
		if _, ok := visited[node]; ok {
			return
		}
		visited[node] = struct{}{}
		for _, registrations := range [][]*Registration{node.logical, node.physical} {
			for _, registration := range registrations {
				if _, ok := affected[registration]; !ok {
					affected[registration] = struct{}{}
					result.Affected = append(result.Affected, registration.Name)
				}
				if deleted && registration.Dependency {
					add(registration.Name, fswatch.EventDelete)
				}
			}
		}
		if subtree {
			for _, child := range node.children {
				visit(child, true, deleted)
			}
		}
	}
	// Process deletes first so overlapping update/delete notifications cannot
	// cause a matched subtree to be revisited.
	for name, kind := range result.Changes {
		if kind == fswatch.EventDelete {
			visit(i.paths[i.toPath(name)], true, true)
		}
	}
	for name, kind := range result.Changes {
		if kind != fswatch.EventDelete {
			visit(i.paths[i.toPath(name)], result.NamespaceChanged, false)
		}
	}
	return result
}
