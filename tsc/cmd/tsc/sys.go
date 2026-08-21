package main

import (
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
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

func (s *osSys) ErrorWriter() io.Writer {
	return os.Stderr
}

func (s *osSys) WriteOutputIsTTY() bool {
	return term.IsTerminal(int(os.Stdout.Fd()))
}

func (s *osSys) GetWidthOfTerminal() int {
	width, _, _ := term.GetSize(int(os.Stdout.Fd()))
	return width
}

func (s *osSys) GetEnvironmentVariable(name string) (string, bool) {
	return os.LookupEnv(name)
}

func (s *osSys) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return spawnProcess(command, dir, stderr)
}

// spawnProcess launches a process and adapts its stdio to an io.ReadWriteCloser (Read is its stdout,
// Write is its stdin).
func spawnProcess(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	cmd := exec.Command(command[0], command[1:]...)
	cmd.Dir = dir
	cmd.Stderr = stderr
	cmd.WaitDelay = time.Second
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return nil, err
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, err
	}
	if err := cmd.Start(); err != nil {
		return nil, err
	}
	return &childProcess{cmd: cmd, stdin: stdin, stdout: stdout}, nil
}

// childProcess adapts a spawned process's stdout (read) and stdin (write) into one io.ReadWriteCloser.
// Close kills and reaps the process.
type childProcess struct {
	cmd    *exec.Cmd
	stdin  io.WriteCloser
	stdout io.Reader
}

func (p *childProcess) Read(b []byte) (int, error)  { return p.stdout.Read(b) }
func (p *childProcess) Write(b []byte) (int, error) { return p.stdin.Write(b) }

func (p *childProcess) ExitCode() (int, bool) {
	if p.cmd.ProcessState == nil {
		return 0, false
	}
	return p.cmd.ProcessState.ExitCode(), true
}

func (p *childProcess) Close() error {
	_ = p.stdin.Close()
	_ = p.cmd.Process.Kill()
	err := p.cmd.Wait()
	if _, ok := errors.AsType[*exec.ExitError](err); ok {
		return nil
	}
	if errors.Is(err, exec.ErrWaitDelay) {
		return nil
	}
	return err
}

func newSystem() *osSys {
	cwd, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(int(tsc.ExitStatusInvalidProject_OutputsSkipped))
	}

	return &osSys{
		cwd:                tspath.NormalizePath(cwd),
		fs:                 bundled.WrapFS(osvfs.FS()),
		defaultLibraryPath: bundled.LibPath(),
		writer:             os.Stdout,
		start:              time.Now(),
	}
}
