package api

import "github.com/microsoft/typescript-go/internal/vfs"

type APIHost interface {
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	NewLine() string
}
