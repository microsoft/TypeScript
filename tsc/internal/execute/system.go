package execute

import (
	"io"
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
)

type System interface {
	Writer() io.Writer
	EndWrite() // needed for testing
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	WriteOutputIsTTY() bool
	GetWidthOfTerminal() int
	GetEnvironmentVariable(name string) string

	Now() time.Time
	SinceStart() time.Duration
}

type ExitStatus int

const (
	ExitStatusSuccess                              ExitStatus = 0
	ExitStatusDiagnosticsPresent_OutputsSkipped    ExitStatus = 1
	ExitStatusDiagnosticsPresent_OutputsGenerated  ExitStatus = 2
	ExitStatusInvalidProject_OutputsSkipped        ExitStatus = 3
	ExitStatusProjectReferenceCycle_OutputsSkipped ExitStatus = 4
	ExitStatusNotImplemented                       ExitStatus = 5
)
