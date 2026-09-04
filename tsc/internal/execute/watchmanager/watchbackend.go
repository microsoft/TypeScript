package watchmanager

import (
	"io"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// WatchBackend abstracts fswatch.Watcher for testing
type WatchBackend interface {
	WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error)
}

type WatchEvent struct {
	Path tspath.RootedFilePath
	Kind fswatch.EventKind
}

type WatchCallback func(events []WatchEvent, err error)

type WatchDirectoryRequest struct {
	Dir       tspath.RootedDirectoryPath
	Callback  WatchCallback
	Recursive bool
	Ignore    func(tspath.RootedFilePath) bool
}

// CommandLineTestingWithWatchBackend is an optional extension of
// [CommandLineTesting] that supplies a [WatchBackend] for test mode
type CommandLineTestingWithWatchBackend interface {
	WatchBackend() WatchBackend
}

type FSWatchBackend struct{ Inner fswatch.Watcher }

func (b *FSWatchBackend) WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error) {
	fswatchRequests := make([]fswatch.WatchDirectoryRequest, len(requests))
	for i, request := range requests {
		var opts []fswatch.WatchOption
		if request.Recursive {
			opts = append(opts, fswatch.WithRecursive())
		}
		if request.Ignore != nil {
			opts = append(opts, fswatch.WithIgnore(func(path string) bool {
				return request.Ignore(tspath.RootedFilePathFromAbsolute(path))
			}))
		}
		fswatchRequests[i] = fswatch.WatchDirectoryRequest{
			Dir: request.Dir.AsString(),
			Callback: func(events []fswatch.Event, err error) {
				typedEvents := make([]WatchEvent, len(events))
				for i, event := range events {
					typedEvents[i] = WatchEvent{
						Path: tspath.RootedFilePathFromAbsolute(event.Path),
						Kind: event.Kind,
					}
				}
				request.Callback(typedEvents, err)
			},
			Options: opts,
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

func ShouldIgnoreWatchPath(path tspath.RootedFilePath) bool {
	text := path.AsString()
	return strings.HasSuffix(text, "/.git") ||
		strings.Contains(text, "/.git/") ||
		strings.Contains(text, "/node_modules/.") ||
		strings.Contains(text, "/.#")
}

func CanWatchDirectory(dir tspath.RootedDirectoryPath) bool {
	components := dir.Components()
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
