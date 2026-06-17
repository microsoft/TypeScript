package watchmanager

import (
	"io"
	"strings"

	"github.com/microsoft/typescript-go/internal/fswatch"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// WatchBackend abstracts fswatch.Watcher for testing
type WatchBackend interface {
	WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error)
}

// CommandLineTestingWithWatchBackend is an optional extension of
// [CommandLineTesting] that supplies a [WatchBackend] for test mode
type CommandLineTestingWithWatchBackend interface {
	WatchBackend() WatchBackend
}

type FSWatchBackend struct{ Inner fswatch.Watcher }

func (b *FSWatchBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error) {
	var opts []fswatch.WatchOption
	if recursive {
		opts = append(opts, fswatch.WithRecursive())
	}
	if ignore != nil {
		opts = append(opts, fswatch.WithIgnore(ignore))
	}
	return b.Inner.WatchDirectory(dir, fn, opts...)
}

func ShouldIgnoreWatchPath(path string) bool {
	p := tspath.NormalizeSlashes(path)
	return strings.HasSuffix(p, "/.git") ||
		strings.Contains(p, "/.git/") ||
		strings.Contains(p, "/node_modules/.") ||
		strings.Contains(p, "/.#")
}

func CanWatchDirectory(dir string) bool {
	components := tspath.GetPathComponents(dir, "")
	length := len(components)
	if length <= 2 {
		return false
	}
	rootLength := PerceivedOsRootLengthForWatching(components)
	return length > rootLength+1
}

func PerceivedOsRootLengthForWatching(components []string) int {
	length := len(components)
	if length <= 1 {
		return 1
	}
	root := components[0]
	indexAfterOsRoot := 1
	isDosStyle := len(root) >= 2 && tspath.IsVolumeCharacter(root[0]) && root[1] == ':'

	if root != "/" && !isDosStyle && len(components) > 1 {
		if len(components[1]) >= 2 && tspath.IsVolumeCharacter(components[1][0]) && strings.HasSuffix(components[1], "$") {
			if length == 2 {
				return 2
			}
			indexAfterOsRoot = 2
			isDosStyle = true
		}
	}

	if isDosStyle && (indexAfterOsRoot >= length || !strings.EqualFold(components[indexAfterOsRoot], "users")) {
		return indexAfterOsRoot
	}

	if indexAfterOsRoot < length && strings.EqualFold(components[indexAfterOsRoot], "workspaces") {
		return indexAfterOsRoot + 1
	}

	return indexAfterOsRoot + 2
}
