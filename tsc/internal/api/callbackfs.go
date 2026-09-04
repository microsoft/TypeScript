package api

import (
	"context"
	"fmt"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
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
	conn ipc.Conn
	ctx  context.Context
}

// Callback names that can be enabled
const (
	callbackReadFile             = "readFile"
	callbackFileExists           = "fileExists"
	callbackDirectoryExists      = "directoryExists"
	callbackGetAccessibleEntries = "getAccessibleEntries"
	callbackRealpath             = "realpath"
	callbackWriteFile            = "writeFile"
)

func isCallbackName(name string) bool {
	switch name {
	case callbackReadFile,
		callbackFileExists,
		callbackDirectoryExists,
		callbackGetAccessibleEntries,
		callbackRealpath,
		callbackWriteFile:
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
func (fs *callbackFS) SetConnection(ctx context.Context, conn ipc.Conn) {
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

// CaseSensitivity implements vfs.FS.
func (fs *callbackFS) CaseSensitivity() tspath.CaseSensitivity {
	return fs.base.CaseSensitivity()
}

// ReadFile implements vfs.FS.
//
// The readFile callback uses a wrapped response format to distinguish three states:
//   - undefined (fall back to real FS): null or empty on wire
//   - null (not found, no fallback): {"content": null}
//   - string content: {"content": "..."}
func (fs *callbackFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	if fs.isEnabled(callbackReadFile) {
		result, err := fs.call(callbackReadFile, path.AsString())
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var wrapper struct {
				Content *string `json:"content"`
			}
			if err := json.Unmarshal(result, &wrapper); err != nil {
				panic(err)
			}
			if wrapper.Content == nil {
				return "", false
			}
			return *wrapper.Content, true
		}
	}
	return fs.base.ReadFile(path)
}

// FileExists implements vfs.FS.
func (fs *callbackFS) FileExists(path tspath.RootedFilePath) bool {
	if fs.isEnabled(callbackFileExists) {
		result, err := fs.call(callbackFileExists, path.AsString())
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			return string(result) == "true"
		}
	}
	return fs.base.FileExists(path)
}

// DirectoryExists implements vfs.FS.
func (fs *callbackFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	if fs.isEnabled(callbackDirectoryExists) {
		result, err := fs.call(callbackDirectoryExists, path.AsString())
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			return string(result) == "true"
		}
	}
	return fs.base.DirectoryExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *callbackFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	if fs.isEnabled(callbackGetAccessibleEntries) {
		result, err := fs.call(callbackGetAccessibleEntries, path.AsString())
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
func (fs *callbackFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	if fs.isEnabled(callbackRealpath) {
		result, err := fs.call(callbackRealpath, path.AsString())
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var realpath string
			if err := json.Unmarshal(result, &realpath); err != nil {
				panic(err)
			}
			if realpath == "" {
				return fs.base.Realpath(path)
			}
			return tspath.ToRootedPath(realpath, path.Directory())
		}
	}
	return fs.base.Realpath(path)
}

// WriteFile implements vfs.FS.
func (fs *callbackFS) WriteFile(path tspath.RootedFilePath, data string) error {
	if fs.isEnabled(callbackWriteFile) {
		payload := struct {
			Path string `json:"path"`
			Data string `json:"data"`
		}{Path: path.AsString(), Data: data}

		_, err := fs.call(callbackWriteFile, payload)
		if err != nil {
			return err
		}
		return nil
	}

	return fs.base.WriteFile(path, data)
}

// AppendFile implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) AppendFile(path tspath.RootedFilePath, data string) error {
	return fs.base.AppendFile(path, data)
}

// Remove implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Remove(path tspath.RootedPath) error {
	return fs.base.Remove(path)
}

// Chtimes implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	return fs.base.Chtimes(path, aTime, mTime)
}

// Stat implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	return fs.base.Stat(path)
}

// WalkDir implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	return fs.base.WalkDir(root, walkFn)
}
