package execute

import (
	"io"

	"github.com/microsoft/typescript-go/internal/vfs"
)

type System interface {
	Writer() io.Writer
	EndWrite() // needed for testing
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	NewLine() string // #241 eventually we want to use "\n"
}

type ExitStatus int

const (
	ExitStatusSuccess                              ExitStatus = 0
	ExitStatusDiagnosticsPresent_OutputsSkipped    ExitStatus = 1
	ExitStatusDiagnosticsPresent_OutputsGenerated  ExitStatus = 2
	ExitStatusInvalidProject_OutputsSkipped        ExitStatus = 3
	ExitStatusProjectReferenceCycle_OutputsSkipped ExitStatus = 4
	ExitStatusNotImplemented                       ExitStatus = 5
	ExitStatusNotImplementedWatch                  ExitStatus = 6
	ExitStatusNotImplementedIncremental            ExitStatus = 7
)
