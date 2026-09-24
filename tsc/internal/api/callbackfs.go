package api

import (
	"context"
	"fmt"
	iofs "io/fs"
	"slices"
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
	realpathIdentity bool
	fakeStat         bool
	caseSensitive    *bool

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
	callbackStat                 = "stat"
	callbackWriteFile            = "writeFile"
)

func isCallbackName(name string) bool {
	switch name {
	case callbackReadFile,
		callbackFileExists,
		callbackDirectoryExists,
		callbackGetAccessibleEntries,
		callbackRealpath,
		callbackStat,
		callbackWriteFile:
		return true
	default:
		return false
	}
}

// newCallbackFS creates a new callbackFS wrapping the given base filesystem.
// The callbacks slice specifies which filesystem operations should be delegated
// to the client (e.g., "readFile", "fileExists").
func newCallbackFS(base vfs.FS, callbacks []string, caseSensitive *bool) *callbackFS {
	enabled := make(map[string]bool, len(callbacks))
	for _, cb := range callbacks {
		if cb == "realpath:identity" || cb == "stat:fakeStat" {
			continue
		}
		if !isCallbackName(cb) {
			panic("unknown callback name: " + cb)
		}
		enabled[cb] = true
	}
	return &callbackFS{
		base:             base,
		enabledCallbacks: enabled,
		realpathIdentity: slices.Contains(callbacks, "realpath:identity"),
		fakeStat:         slices.Contains(callbacks, "stat:fakeStat"),
		caseSensitive:    caseSensitive,
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

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *callbackFS) UseCaseSensitiveFileNames() bool {
	if fs.caseSensitive != nil {
		return *fs.caseSensitive
	}
	return fs.base.UseCaseSensitiveFileNames()
}

// ReadFile implements vfs.FS.
//
// The readFile callback uses a wrapped response format to distinguish three states:
//   - useOS: null or empty on wire
//   - null (not found, no fallback): {"content": null}
//   - string content: {"content": "..."}
func (fs *callbackFS) ReadFile(path string) (contents string, ok bool) {
	if fs.isEnabled(callbackReadFile) {
		result, err := fs.call(callbackReadFile, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var wrapper struct {
				Content *string `json:"content"`
			}
			if unmarshalErr := json.Unmarshal(result, &wrapper); unmarshalErr != nil {
				panic(unmarshalErr)
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
func (fs *callbackFS) FileExists(path string) bool {
	if fs.isEnabled(callbackFileExists) {
		result, err := fs.call(callbackFileExists, path)
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
		result, err := fs.call(callbackDirectoryExists, path)
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
		result, err := fs.call(callbackGetAccessibleEntries, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			var rawEntries *struct {
				Files       []string `json:"files"`
				Directories []string `json:"directories"`
				Symlinks    []string `json:"symlinks"`
			}
			if err := json.Unmarshal(result, &rawEntries); err != nil {
				panic(err)
			}
			if rawEntries != nil {
				entries := vfs.Entries{
					Files:       rawEntries.Files,
					Directories: rawEntries.Directories,
				}
				if rawEntries.Symlinks != nil {
					entries.Symlinks = make(map[string]struct{}, len(rawEntries.Symlinks))
					for _, name := range rawEntries.Symlinks {
						entries.Symlinks[name] = struct{}{}
					}
				}
				return entries
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
		if len(result) > 0 && string(result) != "null" {
			var realpath string
			if err := json.Unmarshal(result, &realpath); err != nil {
				panic(err)
			}
			return realpath
		}
	}
	if fs.realpathIdentity {
		return path
	}
	return fs.base.Realpath(path)
}

type callbackFileInfo struct {
	name    string
	size    int64
	mode    iofs.FileMode
	modTime time.Time
}

func (info *callbackFileInfo) Name() string        { return info.name }
func (info *callbackFileInfo) Size() int64         { return info.size }
func (info *callbackFileInfo) Mode() iofs.FileMode { return info.mode }
func (info *callbackFileInfo) ModTime() time.Time  { return info.modTime }
func (info *callbackFileInfo) IsDir() bool         { return info.mode.IsDir() }
func (info *callbackFileInfo) Sys() any            { return nil }

// Stat implements vfs.FS.
func (fs *callbackFS) Stat(path string) vfs.FileInfo {
	if fs.isEnabled(callbackStat) {
		result, err := fs.call(callbackStat, path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 && string(result) != "null" {
			var wrapper struct {
				Stat json.Value `json:"stat"`
			}
			if unmarshalErr := json.Unmarshal(result, &wrapper); unmarshalErr != nil {
				panic(unmarshalErr)
			}
			if string(wrapper.Stat) == "null" {
				return nil
			}
			var stat struct {
				Mode  uint32 `json:"mode"`
				Size  int64  `json:"size"`
				MTime string `json:"mtime"`
			}
			if unmarshalErr := json.Unmarshal(wrapper.Stat, &stat); unmarshalErr != nil {
				panic(unmarshalErr)
			}
			info := &callbackFileInfo{
				name: tspath.GetBaseFileName(path),
				size: stat.Size,
				mode: nodeFileModeToGoFileMode(stat.Mode),
			}
			info.modTime, err = time.Parse(time.RFC3339Nano, stat.MTime)
			if err != nil {
				panic(err)
			}
			return info
		}
	}
	if fs.fakeStat {
		if fs.DirectoryExists(path) {
			return &callbackFileInfo{name: tspath.GetBaseFileName(path), mode: iofs.ModeDir | 0o555}
		}
		if fs.FileExists(path) {
			return &callbackFileInfo{name: tspath.GetBaseFileName(path), mode: 0o444}
		}
		return nil
	}
	return fs.base.Stat(path)
}

func nodeFileModeToGoFileMode(mode uint32) iofs.FileMode {
	result := iofs.FileMode(mode & 0o777)
	if mode&0o4000 != 0 {
		result |= iofs.ModeSetuid
	}
	if mode&0o2000 != 0 {
		result |= iofs.ModeSetgid
	}
	if mode&0o1000 != 0 {
		result |= iofs.ModeSticky
	}
	switch mode & 0o170000 {
	case 0o010000:
		result |= iofs.ModeNamedPipe
	case 0o020000:
		result |= iofs.ModeDevice | iofs.ModeCharDevice
	case 0o040000:
		result |= iofs.ModeDir
	case 0o060000:
		result |= iofs.ModeDevice
	case 0o100000:
		// Regular file.
	case 0o120000:
		result |= iofs.ModeSymlink
	case 0o140000:
		result |= iofs.ModeSocket
	default:
		result |= iofs.ModeIrregular
	}
	return result
}

// WriteFile implements vfs.FS.
func (fs *callbackFS) WriteFile(path string, data string) error {
	if fs.isEnabled(callbackWriteFile) {
		payload := struct {
			Path string `json:"path"`
			Data string `json:"data"`
		}{Path: path, Data: data}

		result, err := fs.call(callbackWriteFile, payload)
		if err != nil {
			return err
		}
		if len(result) > 0 && string(result) != "null" {
			return nil
		}
	}

	return fs.base.WriteFile(path, data)
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
