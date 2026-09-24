package watchalias

import (
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Registration describes an observed name, not a compiler identity. Realpath is
// a non-empty filesystem observation.
// Only explicit directory observations may rebase unknown descendants.
type Registration struct {
	Name       string
	Realpath   string
	Dependency bool
	Directory  bool
}

type registeredPath struct {
	registrations []registeredEndpoint
	children      []*registeredPath
}

type registeredEndpoint struct {
	*Registration
	logical  bool
	physical bool
}

func (i *Index) toPath(name string) tspath.Path {
	// Native equivalence is supplied by expandNative, including volume-sensitive
	// ancestors. Compiler canonicalization must not merge those endpoint trees.
	return tspath.ToPath(name, "", i.provider != nil || i.filesystem == nil || i.filesystem.UseCaseSensitiveFileNames())
}

func (i *Index) path(key tspath.Path) *registeredPath {
	if node := i.paths[key]; node != nil {
		return node
	}
	if i.paths == nil {
		i.paths = make(map[tspath.Path]*registeredPath)
	}
	node := &registeredPath{}
	i.paths[key] = node
	parent := key.GetDirectoryPath()
	if parent != key && parent != "" {
		p := i.path(parent)
		p.children = append(p.children, node)
	}
	return node
}

func (i *Index) Register(registration Registration) error {
	debug.Assert(registration.Realpath != "")
	if err := i.Add(registration.Name); err != nil {
		return err
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
	i.hasMappings = i.hasMappings || registration.Name != registration.Realpath
	logical := i.path(i.toPath(registration.Name))
	physical := i.path(i.toPath(registration.Realpath))
	logical.registrations = append(logical.registrations, registeredEndpoint{
		Registration: &registration, logical: true, physical: physical == logical,
	})
	if physical != logical {
		physical.registrations = append(physical.registrations, registeredEndpoint{Registration: &registration, physical: true})
	}
	return nil
}

func (i *Index) Covers(registration Registration) bool {
	previous := i.registrations[registration.Name]
	return previous != nil && previous.Realpath == registration.Realpath &&
		(!registration.Dependency || previous.Dependency) && (!registration.Directory || previous.Directory)
}

func (i *Index) rebase(name string, toPhysical bool, add func(string)) {
	for ancestor := name; ; {
		if node := i.paths[i.toPath(ancestor)]; node != nil {
			for _, registration := range node.registrations {
				if registration.Name == registration.Realpath || ancestor != name && !registration.Directory {
					continue
				}
				if toPhysical && !registration.logical || !toPhysical && !registration.physical {
					continue
				}
				target := registration.Realpath
				if !toPhysical {
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
	if !i.hasMappings {
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
func (i *Index) Match(events map[string]fswatch.EventKind) Matches {
	result := Matches{Changes: make(map[string]fswatch.EventKind, len(events))}
	for name, kind := range events {
		for _, name := range i.Expand(name) {
			if previous, ok := result.Changes[name]; !ok || previous != fswatch.EventDelete {
				result.Changes[name] = kind
			}
			result.NamespaceChanged = result.NamespaceChanged || i.isDirectory(name)
		}
	}
	return i.matchSubtrees(result)
}

func (i *Index) isDirectory(name string) bool {
	// Every endpoint's ancestors are indexed, including missing directories.
	// Unknown paths cannot change comparison state for existing registrations.
	if node := i.paths[i.toPath(name)]; node != nil {
		if len(node.children) != 0 {
			return true
		}
		for _, registration := range node.registrations {
			if registration.Directory {
				return true
			}
		}
	}
	return false
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
		for _, registration := range node.registrations {
			if _, ok := affected[registration.Registration]; !ok {
				affected[registration.Registration] = struct{}{}
				result.Affected = append(result.Affected, registration.Name)
			}
			if deleted && registration.Dependency {
				add(registration.Name, fswatch.EventDelete)
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
