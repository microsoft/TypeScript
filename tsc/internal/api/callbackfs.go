package api

import (
	"context"
	"fmt"
	"time"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/vfs"
)

// callbackFS wraps a base filesystem and delegates certain operations
// to the client via RPC callbacks. This allows the API client to provide
// a virtual filesystem (e.g., in-memory files for testing).
//
// The callbacks to enable are specified at construction time via the
// --callbacks CLI flag. The connection is set via SetConnection after
// the transport connection is established.
type callbackFS struct {
	base             vfs.FS
	enabledCallbacks map[string]bool

	// conn and ctx are set after connection is established
	conn Conn
	ctx  context.Context
}

// Callback names that can be enabled
const (
	callbackReadFile             = "readFile"
	callbackFileExists           = "fileExists"
	callbackDirectoryExists      = "directoryExists"
	callbackGetAccessibleEntries = "getAccessibleEntries"
	callbackRealpath             = "realpath"
)

func isCallbackName(name string) bool {
	switch name {
	case callbackReadFile,
		callbackFileExists,
		callbackDirectoryExists,
		callbackGetAccessibleEntries,
		callbackRealpath:
		return true
	default:
		return false
	}
}

// newCallbackFS creates a new callbackFS wrapping the given base filesystem.
// The callbacks slice specifies which filesystem operations should be delegated
// to the client (e.g., "readFile", "fileExists").
func newCallbackFS(base vfs.FS, callbacks []string) *callbackFS {
	enabled := make(map[string]bool, len(callbacks))
	for _, cb := range callbacks {
		if !isCallbackName(cb) {
			panic("unknown callback name: " + cb)
		}
		enabled[cb] = true
	}
	return &callbackFS{
		base:             base,
		enabledCallbacks: enabled,
	}
}

// SetConnection sets the RPC connection for callbacks.
// This must be called after the transport connection is established
// but before any filesystem operations that need callbacks.
func (fs *callbackFS) SetConnection(ctx context.Context, conn Conn) {
	fs.ctx = ctx
	fs.conn = conn
}

// isEnabled returns true if the named callback is enabled.
func (fs *callbackFS) isEnabled(name string) bool {
	return fs.enabledCallbacks[name]
}

// call invokes a callback on the client and returns the result.
func (fs *callbackFS) call(name string, arg any) ([]byte, error) {
	if fs.conn == nil {
		return nil, fmt.Errorf("CallbackFS: %s called before connection set", name)
	}

	result, err := fs.conn.Call(fs.ctx, name, arg)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *callbackFS) UseCaseSensitiveFileNames() bool {
	return fs.base.UseCaseSensitiveFileNames()
}

// ReadFile implements vfs.FS.
func (fs *callbackFS) ReadFile(path string) (contents string, ok bool) {
	if fs.isEnabled(callbackReadFile) {
		result, err := fs.call(callbackReadFile, path)
		if err != nil {
			panic(err)
		}
		if string(result) == "null" {
			return "", false
		}
		if len(result) > 0 {
			var content string
			if err := json.Unmarshal(result, &content); err != nil {
				panic(err)
			}
			return content, true
		}
	}
	return fs.base.ReadFile(path)
}

// FileExists implements vfs.FS.
func (fs *callbackFS) FileExists(path string) bool {
	if fs.isEnabled(callbackFileExists) {
		result, err := fs.call(callbackFileExists, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			return string(result) == "true"
		}
	}
	return fs.base.FileExists(path)
}

// DirectoryExists implements vfs.FS.
func (fs *callbackFS) DirectoryExists(path string) bool {
	if fs.isEnabled(callbackDirectoryExists) {
		result, err := fs.call(callbackDirectoryExists, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			return string(result) == "true"
		}
	}
	return fs.base.DirectoryExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *callbackFS) GetAccessibleEntries(path string) vfs.Entries {
	if fs.isEnabled(callbackGetAccessibleEntries) {
		result, err := fs.call(callbackGetAccessibleEntries, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			var rawEntries *struct {
				Files       []string `json:"files"`
				Directories []string `json:"directories"`
			}
			if err := json.Unmarshal(result, &rawEntries); err != nil {
				panic(err)
			}
			if rawEntries != nil {
				return vfs.Entries{
					Files:       rawEntries.Files,
					Directories: rawEntries.Directories,
				}
			}
		}
	}
	return fs.base.GetAccessibleEntries(path)
}

// Realpath implements vfs.FS.
func (fs *callbackFS) Realpath(path string) string {
	if fs.isEnabled(callbackRealpath) {
		result, err := fs.call(callbackRealpath, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			var realpath string
			if err := json.Unmarshal(result, &realpath); err != nil {
				panic(err)
			}
			return realpath
		}
	}
	return fs.base.Realpath(path)
}

// WriteFile implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	return fs.base.WriteFile(path, data, writeByteOrderMark)
}

// Remove implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Remove(path string) error {
	return fs.base.Remove(path)
}

// Chtimes implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	return fs.base.Chtimes(path, aTime, mTime)
}

// Stat implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Stat(path string) vfs.FileInfo {
	return fs.base.Stat(path)
}

// WalkDir implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return fs.base.WalkDir(root, walkFn)
}
