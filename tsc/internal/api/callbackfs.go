package api

import (
	"context"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
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

func callbackPath(path string) struct {
	PathBase64 string `json:"pathBase64"`
} {
	return struct {
		PathBase64 string `json:"pathBase64"`
	}{PathBase64: base64.StdEncoding.EncodeToString([]byte(path))}
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *callbackFS) UseCaseSensitiveFileNames() bool {
	return fs.base.UseCaseSensitiveFileNames()
}

// ReadFile implements vfs.FS.
//
// The readFile callback uses a wrapped response format to distinguish three states:
//   - undefined (fall back to real FS): null or empty on wire
//   - null (not found, no fallback): {"contentBase64": null}
//   - string content: {"contentBase64": "<WTF-8 bytes>"}
func (fs *callbackFS) ReadFile(path string) (contents string, ok bool) {
	if fs.isEnabled(callbackReadFile) {
		result, err := fs.call(callbackReadFile, callbackPath(path))
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var wrapper struct {
				ContentBase64 *string `json:"contentBase64"`
			}
			if err := json.Unmarshal(result, &wrapper); err != nil {
				panic(err)
			}
			if wrapper.ContentBase64 == nil {
				return "", false
			}
			content, err := base64.StdEncoding.DecodeString(*wrapper.ContentBase64)
			if err != nil {
				panic(fmt.Errorf("invalid readFile contentBase64: %w", err))
			}
			return string(content), true
		}
	}
	return fs.base.ReadFile(path)
}

// FileExists implements vfs.FS.
func (fs *callbackFS) FileExists(path string) bool {
	if fs.isEnabled(callbackFileExists) {
		result, err := fs.call(callbackFileExists, callbackPath(path))
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
func (fs *callbackFS) DirectoryExists(path string) bool {
	if fs.isEnabled(callbackDirectoryExists) {
		result, err := fs.call(callbackDirectoryExists, callbackPath(path))
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
func (fs *callbackFS) GetAccessibleEntries(path string) vfs.Entries {
	if fs.isEnabled(callbackGetAccessibleEntries) {
		result, err := fs.call(callbackGetAccessibleEntries, callbackPath(path))
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			var rawEntries *struct {
				FilesBase64       []string `json:"filesBase64"`
				DirectoriesBase64 []string `json:"directoriesBase64"`
			}
			if err := json.Unmarshal(result, &rawEntries); err != nil {
				panic(err)
			}
			if rawEntries != nil {
				return vfs.Entries{
					Files:       decodeCallbackStrings(rawEntries.FilesBase64),
					Directories: decodeCallbackStrings(rawEntries.DirectoriesBase64),
				}
			}
		}
	}
	return fs.base.GetAccessibleEntries(path)
}

// Realpath implements vfs.FS.
func (fs *callbackFS) Realpath(path string) string {
	if fs.isEnabled(callbackRealpath) {
		result, err := fs.call(callbackRealpath, callbackPath(path))
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var wrapper struct {
				PathBase64 string `json:"pathBase64"`
			}
			if err := json.Unmarshal(result, &wrapper); err != nil {
				panic(err)
			}
			realpath, err := base64.StdEncoding.DecodeString(wrapper.PathBase64)
			if err != nil {
				panic(fmt.Errorf("invalid realpath pathBase64: %w", err))
			}
			return string(realpath)
		}
	}
	return fs.base.Realpath(path)
}

// WriteFile implements vfs.FS.
func (fs *callbackFS) WriteFile(path string, data string) error {
	if fs.isEnabled(callbackWriteFile) {
		payload := struct {
			PathBase64 string `json:"pathBase64"`
			DataBase64 string `json:"dataBase64"`
		}{
			PathBase64: base64.StdEncoding.EncodeToString([]byte(path)),
			DataBase64: base64.StdEncoding.EncodeToString([]byte(data)),
		}

		_, err := fs.call(callbackWriteFile, payload)
		if err != nil {
			return err
		}
		return nil
	}

	return fs.base.WriteFile(path, data)
}

func decodeCallbackStrings(values []string) []string {
	result := make([]string, len(values))
	for i, value := range values {
		decoded, err := base64.StdEncoding.DecodeString(value)
		if err != nil {
			panic(fmt.Errorf("invalid callback base64 string: %w", err))
		}
		result[i] = string(decoded)
	}
	return result
}

// AppendFile implements vfs.FS - always delegates to base (no callback support).
func (fs *callbackFS) AppendFile(path string, data string) error {
	return fs.base.AppendFile(path, data)
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
