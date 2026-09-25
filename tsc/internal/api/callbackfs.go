package api

import (
	"context"
	"fmt"
	iofs "io/fs"
	"slices"
	"strings"
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
	writeFileNoop    bool
	errorCallbacks   map[string]bool
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
	errorCallbacks := make(map[string]bool)
	for _, cb := range callbacks {
		if name, isError := strings.CutSuffix(cb, ":error"); isError {
			if !isCallbackName(name) {
				panic("unknown callback name: " + name)
			}
			errorCallbacks[name] = true
			continue
		}
		if cb == "realpath:identity" || cb == "stat:fakeStat" || cb == "writeFile:noop" {
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
		writeFileNoop:    slices.Contains(callbacks, "writeFile:noop"),
		errorCallbacks:   errorCallbacks,
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

type callbackResponse struct {
	Kind  string     `json:"kind"`
	Value json.Value `json:"value"`
}

func decodeCallbackResponse(name string, result []byte) callbackResponse {
	var response callbackResponse
	if err := json.Unmarshal(result, &response); err != nil {
		panic(err)
	}
	if response.Kind == "" {
		panic("filesystem callback response is missing a kind")
	}
	if response.Kind == "error" {
		panic("filesystem callback returned serverFS.error: " + name)
	}
	return response
}

func invalidCallbackResponse(name string, response callbackResponse) {
	panic(fmt.Sprintf("invalid %s callback response kind: %s", name, response.Kind))
}

func (fs *callbackFS) panicIfError(name string) {
	if fs.errorCallbacks[name] {
		panic("filesystem operation configured with serverFS.error: " + name)
	}
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *callbackFS) UseCaseSensitiveFileNames() bool {
	if fs.caseSensitive != nil {
		return *fs.caseSensitive
	}
	return fs.base.UseCaseSensitiveFileNames()
}

// ReadFile implements vfs.FS.
func (fs *callbackFS) ReadFile(path string) (contents string, ok bool) {
	fs.panicIfError(callbackReadFile)
	if fs.isEnabled(callbackReadFile) {
		result, err := fs.call(callbackReadFile, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackReadFile, result)
		switch response.Kind {
		case "value":
			var content string
			if err := json.Unmarshal(response.Value, &content); err != nil {
				panic(err)
			}
			return content, true
		case "missing":
			return "", false
		case "useOS":
			return fs.base.ReadFile(path)
		default:
			invalidCallbackResponse(callbackReadFile, response)
		}
	}
	return fs.base.ReadFile(path)
}

// FileExists implements vfs.FS.
func (fs *callbackFS) FileExists(path string) bool {
	fs.panicIfError(callbackFileExists)
	if fs.isEnabled(callbackFileExists) {
		result, err := fs.call(callbackFileExists, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackFileExists, result)
		switch response.Kind {
		case "value":
			var exists bool
			if err := json.Unmarshal(response.Value, &exists); err != nil {
				panic(err)
			}
			return exists
		case "useOS":
			return fs.base.FileExists(path)
		default:
			invalidCallbackResponse(callbackFileExists, response)
		}
	}
	return fs.base.FileExists(path)
}

// DirectoryExists implements vfs.FS.
func (fs *callbackFS) DirectoryExists(path string) bool {
	fs.panicIfError(callbackDirectoryExists)
	if fs.isEnabled(callbackDirectoryExists) {
		result, err := fs.call(callbackDirectoryExists, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackDirectoryExists, result)
		switch response.Kind {
		case "value":
			var exists bool
			if err := json.Unmarshal(response.Value, &exists); err != nil {
				panic(err)
			}
			return exists
		case "useOS":
			return fs.base.DirectoryExists(path)
		default:
			invalidCallbackResponse(callbackDirectoryExists, response)
		}
	}
	return fs.base.DirectoryExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *callbackFS) GetAccessibleEntries(path string) vfs.Entries {
	fs.panicIfError(callbackGetAccessibleEntries)
	if fs.isEnabled(callbackGetAccessibleEntries) {
		result, err := fs.call(callbackGetAccessibleEntries, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackGetAccessibleEntries, result)
		switch response.Kind {
		case "value":
			var rawEntries *struct {
				Files       []string `json:"files"`
				Directories []string `json:"directories"`
				Symlinks    []string `json:"symlinks"`
			}
			if err := json.Unmarshal(response.Value, &rawEntries); err != nil {
				panic(err)
			}
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
		case "useOS":
			return fs.base.GetAccessibleEntries(path)
		default:
			invalidCallbackResponse(callbackGetAccessibleEntries, response)
		}
	}
	return fs.base.GetAccessibleEntries(path)
}

// Realpath implements vfs.FS.
func (fs *callbackFS) Realpath(path string) string {
	fs.panicIfError(callbackRealpath)
	if fs.isEnabled(callbackRealpath) {
		result, err := fs.call(callbackRealpath, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackRealpath, result)
		switch response.Kind {
		case "value":
			var realpath string
			if err := json.Unmarshal(response.Value, &realpath); err != nil {
				panic(err)
			}
			return realpath
		case "identity":
			return path
		case "useOS":
			return fs.base.Realpath(path)
		default:
			invalidCallbackResponse(callbackRealpath, response)
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
	fs.panicIfError(callbackStat)
	if fs.isEnabled(callbackStat) {
		result, err := fs.call(callbackStat, path)
		if err != nil {
			panic(err)
		}
		response := decodeCallbackResponse(callbackStat, result)
		switch response.Kind {
		case "value":
			var stat struct {
				Mode  uint32 `json:"mode"`
				Size  int64  `json:"size"`
				MTime string `json:"mtime"`
			}
			if unmarshalErr := json.Unmarshal(response.Value, &stat); unmarshalErr != nil {
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
		case "missing":
			return nil
		case "fakeStat":
			return fs.fakeStatForPath(path)
		case "useOS":
			return fs.base.Stat(path)
		default:
			invalidCallbackResponse(callbackStat, response)
		}
	}
	if fs.fakeStat {
		return fs.fakeStatForPath(path)
	}
	return fs.base.Stat(path)
}

func (fs *callbackFS) fakeStatForPath(path string) vfs.FileInfo {
	if fs.DirectoryExists(path) {
		return &callbackFileInfo{name: tspath.GetBaseFileName(path), mode: iofs.ModeDir | 0o555}
	}
	if fs.FileExists(path) {
		return &callbackFileInfo{name: tspath.GetBaseFileName(path), mode: 0o444}
	}
	return nil
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
	fs.panicIfError(callbackWriteFile)
	if fs.isEnabled(callbackWriteFile) {
		payload := struct {
			Path string `json:"path"`
			Data string `json:"data"`
		}{Path: path, Data: data}

		result, err := fs.call(callbackWriteFile, payload)
		if err != nil {
			return err
		}
		response := decodeCallbackResponse(callbackWriteFile, result)
		switch response.Kind {
		case "value", "noop":
			return nil
		case "useOS":
			return fs.base.WriteFile(path, data)
		default:
			invalidCallbackResponse(callbackWriteFile, response)
		}
	}
	if fs.writeFileNoop {
		return nil
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
