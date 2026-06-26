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
	WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error)
}

type WatchDirectoryRequest struct {
	Dir       string
	Callback  fswatch.WatchCallback
	Recursive bool
	Ignore    func(string) bool
}

// CommandLineTestingWithWatchBackend is an optional extension of
// [CommandLineTesting] that supplies a [WatchBackend] for test mode
type CommandLineTestingWithWatchBackend interface {
	WatchBackend() WatchBackend
}

type FSWatchBackend struct{ Inner fswatch.Watcher }

func (b *FSWatchBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error) {
	closers, err := b.WatchDirectories([]WatchDirectoryRequest{{
		Dir:       dir,
		Callback:  fn,
		Recursive: recursive,
		Ignore:    ignore,
	}})
	if err != nil {
		return nil, err
	}
	return closers[0], nil
}

func (b *FSWatchBackend) WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error) {
	fswatchRequests := make([]fswatch.WatchDirectoryRequest, len(requests))
	for i, request := range requests {
		var opts []fswatch.WatchOption
		if request.Recursive {
			opts = append(opts, fswatch.WithRecursive())
		}
		if request.Ignore != nil {
			opts = append(opts, fswatch.WithIgnore(request.Ignore))
		}
		fswatchRequests[i] = fswatch.WatchDirectoryRequest{
			Dir:      request.Dir,
			Callback: request.Callback,
			Options:  opts,
		}
	}
	watches, err := b.Inner.WatchDirectories(fswatchRequests)
	if err != nil {
		return nil, err
	}
	closers := make([]io.Closer, len(watches))
	for i, watch := range watches {
		closers[i] = watch
	}
	return closers, nil
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
