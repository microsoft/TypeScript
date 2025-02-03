package main

import (
	"fmt"
	"io"
	"os"
	"runtime"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type osSys struct {
	writer  io.Writer
	fs      vfs.FS
	newLine string
	cwd     string
}

func (s *osSys) FS() vfs.FS {
	return s.fs
}

func (s *osSys) GetCurrentDirectory() string {
	return s.cwd
}

func (s *osSys) NewLine() string {
	return s.newLine
}

func (s *osSys) Writer() io.Writer {
	return s.writer
}

func (s *osSys) EndWrite() {
	// do nothing, this is needed in the interface for testing
	// todo: revisit if improving tsc/build/watch unittest baselines
}

func newSystem() *osSys {
	cwd, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(int(execute.ExitStatusInvalidProject_OutputsSkipped))
	}

	return &osSys{
		cwd:     tspath.NormalizePath(cwd),
		fs:      vfs.FromOS(),
		writer:  os.Stdout,
		newLine: core.IfElse(runtime.GOOS == "windows", "\r\n", "\n"),
	}
}
