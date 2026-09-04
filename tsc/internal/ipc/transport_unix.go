//go:build !windows

package ipc

import (
	"context"
	"errors"
	"fmt"
	"io"
	iofs "io/fs"
	"net"
	"os"
	"path"
	"sync"
	"syscall"
	"time"

	"golang.org/x/sys/unix"
)

// newPipeListener creates a Unix domain socket listener.
func newPipeListener(path string) (net.Listener, error) {
	// Remove any existing socket file
	_ = os.Remove(path) //nolint:forbidigo
	return net.Listen("unix", path)
}

// GeneratePipePath returns a platform-appropriate pipe path for the given name.
func GeneratePipePath(name string) string {
	//nolint:forbidigo
	return path.Join(os.TempDir(), name)
}

// NewSyncTransport creates two POSIX FIFOs at prefix.in and prefix.out.
func NewSyncTransport(prefix string) (Transport, error) {
	inPath := prefix + ".in"
	outPath := prefix + ".out"
	readyPath := prefix + ".ready"

	if err := removeStalePath(inPath, iofs.ModeNamedPipe); err != nil {
		return nil, err
	}
	if err := removeStalePath(outPath, iofs.ModeNamedPipe); err != nil {
		return nil, err
	}
	if err := removeStalePath(readyPath, 0); err != nil {
		return nil, err
	}
	if err := unix.Mkfifo(inPath, 0o600); err != nil {
		return nil, fmt.Errorf("failed to create FIFO %s: %w", inPath, err)
	}
	if err := unix.Mkfifo(outPath, 0o600); err != nil {
		_ = os.Remove(inPath) //nolint:forbidigo
		return nil, fmt.Errorf("failed to create FIFO %s: %w", outPath, err)
	}

	inInfo, err := os.Lstat(inPath) //nolint:forbidigo
	if err != nil {
		_ = syscall.Unlink(inPath)
		_ = syscall.Unlink(outPath)
		return nil, err
	}
	outInfo, err := os.Lstat(outPath) //nolint:forbidigo
	if err != nil {
		_ = syscall.Unlink(inPath)
		_ = syscall.Unlink(outPath)
		return nil, err
	}

	return &fifoTransport{
		prefix:  prefix,
		inInfo:  inInfo,
		outInfo: outInfo,
	}, nil
}

type fifoTransport struct {
	prefix     string
	inInfo     iofs.FileInfo
	outInfo    iofs.FileInfo
	readyInfo  iofs.FileInfo
	removeOnce sync.Once
	removeErr  error
	used       bool
}

func (t *fifoTransport) Accept(ctx context.Context) (io.ReadWriteCloser, error) {
	if t.used {
		return nil, io.EOF
	}
	t.used = true

	outFile, err := openFIFOForWrite(ctx, t.prefix+".out")
	if err != nil {
		return nil, fmt.Errorf("failed to open FIFO %s.out for writing: %w", t.prefix, err)
	}

	inFile, err := os.OpenFile(t.prefix+".in", os.O_RDONLY|syscall.O_NONBLOCK, 0) //nolint:forbidigo
	if err != nil {
		outFile.Close() //nolint:forbidigo
		return nil, fmt.Errorf("failed to open FIFO %s.in for reading: %w", t.prefix, err)
	}

	readyInfo, err := waitForPath(ctx, t.prefix+".ready")
	t.readyInfo = readyInfo
	if err != nil {
		outFile.Close() //nolint:forbidigo
		inFile.Close()  //nolint:forbidigo
		return nil, err
	}
	if readyInfo.Mode().Type() != 0 {
		outFile.Close() //nolint:forbidigo
		inFile.Close()  //nolint:forbidigo
		return nil, fmt.Errorf("unexpected file at sync transport path %s.ready", t.prefix)
	}
	if err := syscall.SetNonblock(int(outFile.Fd()), false); err != nil { //nolint:forbidigo
		outFile.Close() //nolint:forbidigo
		inFile.Close()  //nolint:forbidigo
		return nil, fmt.Errorf("failed to set FIFO %s.out to blocking mode: %w", t.prefix, err)
	}
	if err := syscall.SetNonblock(int(inFile.Fd()), false); err != nil { //nolint:forbidigo
		outFile.Close() //nolint:forbidigo
		inFile.Close()  //nolint:forbidigo
		return nil, fmt.Errorf("failed to set FIFO %s.in to blocking mode: %w", t.prefix, err)
	}
	return &fifoConn{reader: inFile, writer: outFile}, nil
}

func (t *fifoTransport) Close() error {
	return t.remove()
}

type fifoConn struct {
	reader *os.File //nolint:forbidigo
	writer *os.File //nolint:forbidigo
}

func (c *fifoConn) Read(p []byte) (int, error) {
	return c.reader.Read(p) //nolint:forbidigo
}

func (c *fifoConn) Write(p []byte) (int, error) {
	return c.writer.Write(p) //nolint:forbidigo
}

func (c *fifoConn) Close() error {
	err1 := c.reader.Close() //nolint:forbidigo
	err2 := c.writer.Close() //nolint:forbidigo
	if err1 != nil {
		return err1
	}
	return err2
}

func (t *fifoTransport) remove() error {
	t.removeOnce.Do(func() {
		t.removeErr = errors.Join(
			removePathIfSame(t.prefix+".in", t.inInfo),
			removePathIfSame(t.prefix+".out", t.outInfo),
			removePathIfSame(t.prefix+".ready", t.readyInfo),
		)
	})
	return t.removeErr
}

func openFIFOForWrite(ctx context.Context, path string) (*os.File, error) { //nolint:forbidigo
	for {
		file, err := os.OpenFile(path, os.O_WRONLY|syscall.O_NONBLOCK, 0) //nolint:forbidigo
		if err == nil {
			return file, nil
		}
		if !errors.Is(err, syscall.ENXIO) {
			return nil, err
		}
		select {
		case <-ctx.Done():
			return nil, ctx.Err()
		case <-time.After(10 * time.Millisecond):
			continue
		}
	}
}

func waitForPath(ctx context.Context, path string) (iofs.FileInfo, error) {
	for {
		if info, err := os.Lstat(path); err == nil { //nolint:forbidigo
			return info, nil
		} else if !errors.Is(err, syscall.ENOENT) {
			return nil, err
		}
		select {
		case <-ctx.Done():
			info, err := os.Lstat(path) //nolint:forbidigo
			if err == nil {
				return info, ctx.Err()
			}
			if !errors.Is(err, syscall.ENOENT) {
				return nil, err
			}
			return nil, ctx.Err()
		case <-time.After(10 * time.Millisecond):
			continue
		}
	}
}

func removeStalePath(path string, expectedType iofs.FileMode) error {
	info, err := os.Lstat(path) //nolint:forbidigo
	if errors.Is(err, syscall.ENOENT) {
		return nil
	}
	if err != nil {
		return err
	}
	if info.Mode().Type() != expectedType {
		return fmt.Errorf("refusing to remove unexpected file at sync transport path %s", path)
	}
	return syscall.Unlink(path)
}

func removePathIfSame(path string, expected iofs.FileInfo) error {
	if expected == nil {
		return nil
	}
	current, err := os.Lstat(path) //nolint:forbidigo
	if errors.Is(err, syscall.ENOENT) {
		return nil
	}
	if err != nil {
		return err
	}
	if !os.SameFile(expected, current) { //nolint:forbidigo
		return nil
	}
	return syscall.Unlink(path)
}
