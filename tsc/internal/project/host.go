package project

import "github.com/microsoft/typescript-go/internal/vfs"

type ProjectServiceHost interface {
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	NewLine() string
	Trace(msg string)
	Log(msg ...any)
}
