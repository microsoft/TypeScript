package project

import (
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type WatcherHandle string

type Client interface {
	WatchFiles(watchers []*lsproto.FileSystemWatcher) (WatcherHandle, error)
	UnwatchFiles(handle WatcherHandle) error
	RefreshDiagnostics() error
}

type ServiceHost interface {
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	NewLine() string

	Client() Client
}
