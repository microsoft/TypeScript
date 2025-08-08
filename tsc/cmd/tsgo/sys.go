package main

import (
	"fmt"
	"io"
	"os"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
	"golang.org/x/term"
)

type osSys struct {
	writer             io.Writer
	fs                 vfs.FS
	defaultLibraryPath string
	cwd                string
	start              time.Time
}

func (s *osSys) SinceStart() time.Duration {
	return time.Since(s.start)
}

func (s *osSys) Now() time.Time {
	return time.Now()
}

func (s *osSys) FS() vfs.FS {
	return s.fs
}

func (s *osSys) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

func (s *osSys) GetCurrentDirectory() string {
	return s.cwd
}

func (s *osSys) Writer() io.Writer {
	return s.writer
}

func (s *osSys) EndWrite() {
	// do nothing, this is needed in the interface for testing
	// todo: revisit if improving tsc/build/watch unittest baselines
}

func (s *osSys) WriteOutputIsTTY() bool {
	return term.IsTerminal(int(os.Stdout.Fd()))
}

func (s *osSys) GetWidthOfTerminal() int {
	width, _, _ := term.GetSize(int(os.Stdout.Fd()))
	return width
}

func (s *osSys) GetEnvironmentVariable(name string) string {
	return os.Getenv(name)
}

func newSystem() *osSys {
	cwd, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(int(execute.ExitStatusInvalidProject_OutputsSkipped))
	}

	return &osSys{
		cwd:                tspath.NormalizePath(cwd),
		fs:                 bundled.WrapFS(osvfs.FS()),
		defaultLibraryPath: bundled.LibPath(),
		writer:             os.Stdout,
		start:              time.Now(),
	}
}
