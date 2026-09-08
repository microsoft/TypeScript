// Package watchalias translates watch notifications into registered original
// spellings without changing compiler path identity.
package watchalias

import (
	"errors"
	"io/fs"
	"strings"
	"syscall"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// ComparerProvider is an optional filesystem capability. Implementations query
// the supplied directory, returning fs.ErrNotExist for a missing directory.
// Filesystems without this capability use exact watch names and never probe the
// host. In particular, UseCaseSensitiveFileNames alone does not enable folding.
type ComparerProvider interface {
	WatchPathComparer(directory string) (fswatch.PathComparer, error)
}

type comparerResult struct {
	comparer fswatch.PathComparer
	err      error
}

// Index belongs to one watch-state generation. Register original, absolute,
// slash-normalized names, never already-canonicalized compiler paths. Discard
// the index when rebuilding that state, so directory comparers and aliases cannot
// outlive the state they describe. Callers synchronize mutations with reads.
type Index struct {
	provider           ComparerProvider
	directoryComparers map[string]comparerResult
	added              map[string]struct{}
	aliases            map[fswatch.PathComparer]map[string][]string
}

func New(filesystem vfs.FS) *Index {
	if !Enabled(filesystem) {
		return &Index{}
	}
	provider, _ := filesystem.(ComparerProvider)
	return &Index{provider: provider}
}

// Enabled checks the host capability without querying any filesystem paths.
func Enabled(filesystem vfs.FS) bool {
	if _, ok := filesystem.(ComparerProvider); !ok {
		return false
	}
	if host, ok := filesystem.(interface{ WatchPathComparisonEnabled() bool }); ok {
		return host.WatchPathComparisonEnabled()
	}
	return true
}

// Add registers a spelling and its ancestors. Volume queries are cached per
// directory in this index, and only missing directories inherit their nearest
// existing ancestor's comparer. Other errors are returned, with no partial alias
// registration. Retrying Add after an error requires a new index.
func (i *Index) Add(original string) error {
	if i.provider == nil {
		return nil
	}
	if _, ok := i.added[original]; ok {
		return nil
	}
	type entry struct {
		name     string
		comparer fswatch.PathComparer
	}
	var buffer [8]entry
	entries := buffer[:0]
	for name := original; ; {
		if _, ok := i.added[name]; ok {
			break
		}
		parent := tspath.GetDirectoryPath(name)
		c, err := i.comparer(parent)
		if err != nil {
			return err
		}
		entries = append(entries, entry{name, c})
		if parent == name || parent == "" {
			break
		}
		name = parent
	}
	if i.added == nil {
		i.added = make(map[string]struct{})
	}
	for _, entry := range entries {
		i.added[entry.name] = struct{}{}
		if entry.comparer == (fswatch.PathComparer{}) {
			continue
		}
		if i.aliases == nil {
			i.aliases = make(map[fswatch.PathComparer]map[string][]string)
		}
		aliases := i.aliases[entry.comparer]
		if aliases == nil {
			aliases = make(map[string][]string)
			i.aliases[entry.comparer] = aliases
		}
		key := entry.comparer.Key(entry.name)
		aliases[key] = append(aliases[key], entry.name)
	}
	return nil
}

func (i *Index) comparer(directory string) (fswatch.PathComparer, error) {
	if cached, ok := i.directoryComparers[directory]; ok {
		return cached.comparer, cached.err
	}
	c, err := i.provider.WatchPathComparer(directory)
	if errors.Is(err, fs.ErrNotExist) || errors.Is(err, syscall.ENOTDIR) {
		if parent := tspath.GetDirectoryPath(directory); parent != directory && parent != "" {
			c, err = i.comparer(parent)
		}
	}
	if i.directoryComparers == nil {
		i.directoryComparers = make(map[string]comparerResult)
	}
	i.directoryComparers[directory] = comparerResult{c, err}
	return c, err
}

// Expand returns the event first, followed by distinct registered spellings and
// rebases through registered ancestors. Unknown descendants (including newly
// created configs and files) retain their event suffix. There is no filesystem
// access, and work depends on event depth and matching aliases, not file count.
func (i *Index) Expand(event string) []string {
	result := []string{event}
	var seen map[string]struct{}
	for comparer, aliases := range i.aliases {
		key := comparer.Key(event)
		nameEnd, keyEnd := len(event), len(key)
		for {
			for _, original := range aliases[key[:keyEnd]] {
				if !i.matchesSensitiveAncestors(original, event[:nameEnd]) {
					continue
				}
				expanded := original + event[nameEnd:]
				if expanded == event {
					continue
				}
				if seen == nil {
					seen = make(map[string]struct{})
				}
				if _, ok := seen[expanded]; !ok {
					seen[expanded] = struct{}{}
					result = append(result, expanded)
				}
			}
			nameEnd = strings.LastIndexByte(event[:nameEnd], '/')
			keyEnd = strings.LastIndexByte(key[:keyEnd], '/')
			if nameEnd <= 0 || keyEnd <= 0 {
				break
			}
		}
	}
	return result
}

func (i *Index) matchesSensitiveAncestors(original, event string) bool {
	// A case-insensitive volume may be mounted beneath a case-sensitive
	// directory. Folding the volume's full path is only a candidate lookup;
	// its sensitive ancestor components must still match byte-for-byte.
	for original != event {
		parent := tspath.GetDirectoryPath(original)
		eventParent := tspath.GetDirectoryPath(event)
		if parent == original || eventParent == event {
			break
		}
		if i.directoryComparers[parent].comparer == (fswatch.PathComparer{}) && original[len(parent):] != event[len(eventParent):] {
			return false
		}
		original, event = parent, eventParent
	}
	return true
}
