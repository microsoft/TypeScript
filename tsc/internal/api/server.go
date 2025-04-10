package api

import (
	"bufio"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"sync"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=MessageType -output=stringer_generated.go

type MessageType uint8

const (
	MessageTypeUnknown MessageType = iota
	MessageTypeRequest
	MessageTypeCallResponse
	MessageTypeCallError
	MessageTypeResponse
	MessageTypeError
	MessageTypeCall
)

func (m MessageType) IsValid() bool {
	return m >= MessageTypeRequest && m <= MessageTypeCall
}

type MessagePackType uint8

const (
	MessagePackTypeFixedArray3 MessagePackType = 0x93
	MessagePackTypeBin8        MessagePackType = 0xC4
	MessagePackTypeBin16       MessagePackType = 0xC5
	MessagePackTypeBin32       MessagePackType = 0xC6
	MessagePackTypeU8          MessagePackType = 0xCC
)

type Callback int

const (
	CallbackDirectoryExists Callback = 1 << iota
	CallbackFileExists
	CallbackGetAccessibleEntries
	CallbackReadFile
	CallbackRealpath
)

type ServerOptions struct {
	In                 io.Reader
	Out                io.Writer
	Err                io.Writer
	Cwd                string
	NewLine            string
	DefaultLibraryPath string
}

var (
	_ APIHost = (*Server)(nil)
	_ vfs.FS  = (*Server)(nil)
)

type Server struct {
	r      *bufio.Reader
	w      *bufio.Writer
	stderr io.Writer

	cwd                string
	newLine            string
	fs                 vfs.FS
	defaultLibraryPath string

	callbackMu       sync.Mutex
	enabledCallbacks Callback
	logger           *project.Logger
	api              *API

	requestId int
}

func NewServer(options *ServerOptions) *Server {
	if options.Cwd == "" {
		panic("Cwd is required")
	}

	server := &Server{
		r:                  bufio.NewReader(options.In),
		w:                  bufio.NewWriter(options.Out),
		stderr:             options.Err,
		cwd:                options.Cwd,
		newLine:            options.NewLine,
		fs:                 bundled.WrapFS(osvfs.FS()),
		defaultLibraryPath: options.DefaultLibraryPath,
	}
	logger := project.NewLogger([]io.Writer{options.Err}, "", project.LogLevelVerbose)
	api := NewAPI(server, APIOptions{
		Logger: logger,
	})
	server.logger = logger
	server.api = api
	return server
}

// DefaultLibraryPath implements APIHost.
func (s *Server) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

// FS implements APIHost.
func (s *Server) FS() vfs.FS {
	return s
}

// GetCurrentDirectory implements APIHost.
func (s *Server) GetCurrentDirectory() string {
	return s.cwd
}

// NewLine implements APIHost.
func (s *Server) NewLine() string {
	return s.newLine
}

func (s *Server) Run() error {
	for {
		messageType, method, payload, err := s.readRequest("")
		if err != nil {
			return err
		}

		switch messageType {
		case MessageTypeRequest:
			result, err := s.handleRequest(method, payload)

			if err != nil {
				if err := s.sendError(method, err); err != nil {
					return err
				}
			} else {
				if err := s.sendResponse(method, result); err != nil {
					return err
				}
			}
		default:
			return fmt.Errorf("%w: expected request, received: %s", ErrInvalidRequest, messageType.String())
		}
	}
}

func (s *Server) readRequest(expectedMethod string) (messageType MessageType, method string, payload []byte, err error) {
	t, err := s.r.ReadByte()
	if err != nil {
		return messageType, method, payload, err
	}
	if MessagePackType(t) != MessagePackTypeFixedArray3 {
		return messageType, method, payload, fmt.Errorf("%w: expected message to be encoded as fixed 3-element array (0x93), received: 0x%2x", ErrInvalidRequest, t)
	}
	t, err = s.r.ReadByte()
	if err != nil {
		return messageType, method, payload, err
	}
	if MessagePackType(t) != MessagePackTypeU8 {
		return messageType, method, payload, fmt.Errorf("%w: expected first element of message tuple to be encoded as unsigned 8-bit int (0xcc), received: 0x%2x", ErrInvalidRequest, t)
	}
	rawMessageType, err := s.r.ReadByte()
	if err != nil {
		return messageType, method, payload, err
	}
	messageType = MessageType(rawMessageType)
	if !messageType.IsValid() {
		return messageType, method, payload, fmt.Errorf("%w: unknown message type: %d", ErrInvalidRequest, messageType)
	}
	rawMethod, err := s.readBin()
	if err != nil {
		return messageType, method, payload, err
	}
	method = string(rawMethod)
	if expectedMethod != "" && method != expectedMethod {
		return messageType, method, payload, fmt.Errorf("%w: expected method %q, received %q", ErrInvalidRequest, expectedMethod, method)
	}
	payload, err = s.readBin()
	return messageType, method, payload, err
}

func (s *Server) readBin() ([]byte, error) {
	// https://github.com/msgpack/msgpack/blob/master/spec.md#bin-format-family
	t, err := s.r.ReadByte()
	if err != nil {
		return nil, err
	}
	var size uint
	switch MessagePackType(t) {
	case MessagePackTypeBin8:
		var size8 uint8
		if err = binary.Read(s.r, binary.BigEndian, &size8); err != nil {
			return nil, err
		}
		size = uint(size8)
	case MessagePackTypeBin16:
		var size16 uint16
		if err = binary.Read(s.r, binary.BigEndian, &size16); err != nil {
			return nil, err
		}
		size = uint(size16)
	case MessagePackTypeBin32:
		var size32 uint32
		if err = binary.Read(s.r, binary.BigEndian, &size32); err != nil {
			return nil, err
		}
		size = uint(size32)
	default:
		return nil, fmt.Errorf("%w: expected binary data length (0xc4-0xc6), received: 0x%2x", ErrInvalidRequest, t)
	}
	payload := make([]byte, size)
	bytesRead, err := io.ReadFull(s.r, payload)
	if err != nil {
		return nil, err
	}
	if bytesRead != int(size) {
		return nil, fmt.Errorf("%w: expected %d bytes, read %d", ErrInvalidRequest, size, bytesRead)
	}
	return payload, nil
}

func (s *Server) enableCallback(callback string) error {
	switch callback {
	case "directoryExists":
		s.enabledCallbacks |= CallbackDirectoryExists
	case "fileExists":
		s.enabledCallbacks |= CallbackFileExists
	case "getAccessibleEntries":
		s.enabledCallbacks |= CallbackGetAccessibleEntries
	case "readFile":
		s.enabledCallbacks |= CallbackReadFile
	case "realpath":
		s.enabledCallbacks |= CallbackRealpath
	default:
		return fmt.Errorf("unknown callback: %s", callback)
	}
	return nil
}

func (s *Server) handleRequest(method string, payload []byte) ([]byte, error) {
	s.requestId++
	switch method {
	case "configure":
		return nil, s.handleConfigure(payload)
	case "echo":
		return payload, nil
	default:
		return s.api.HandleRequest(s.requestId, method, payload)
	}
}

func (s *Server) handleConfigure(payload []byte) error {
	var params *ConfigureParams
	if err := json.Unmarshal(payload, &params); err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidRequest, err)
	}
	for _, callback := range params.Callbacks {
		if err := s.enableCallback(callback); err != nil {
			return err
		}
	}
	if params.LogFile != "" {
		s.logger.SetFile(params.LogFile)
	} else {
		s.logger.SetFile("")
	}
	return nil
}

func (s *Server) sendResponse(method string, result []byte) error {
	return s.writeMessage(MessageTypeResponse, method, result)
}

func (s *Server) sendError(method string, err error) error {
	return s.writeMessage(MessageTypeError, method, []byte(err.Error()))
}

func (s *Server) writeMessage(messageType MessageType, method string, payload []byte) error {
	if err := s.w.WriteByte(byte(MessagePackTypeFixedArray3)); err != nil {
		return err
	}
	if err := s.w.WriteByte(byte(MessagePackTypeU8)); err != nil {
		return err
	}
	if err := s.w.WriteByte(byte(messageType)); err != nil {
		return err
	}
	if err := s.writeBin([]byte(method)); err != nil {
		return err
	}
	if err := s.writeBin(payload); err != nil {
		return err
	}
	return s.w.Flush()
}

func (s *Server) writeBin(payload []byte) error {
	length := len(payload)
	if length < 256 {
		if err := s.w.WriteByte(byte(MessagePackTypeBin8)); err != nil {
			return err
		}
		if err := s.w.WriteByte(byte(length)); err != nil {
			return err
		}
	} else if length < 1<<16 {
		if err := s.w.WriteByte(byte(MessagePackTypeBin16)); err != nil {
			return err
		}
		if err := binary.Write(s.w, binary.BigEndian, uint16(length)); err != nil {
			return err
		}
	} else {
		if err := s.w.WriteByte(byte(MessagePackTypeBin32)); err != nil {
			return err
		}
		if err := binary.Write(s.w, binary.BigEndian, uint32(length)); err != nil {
			return err
		}
	}
	_, err := s.w.Write(payload)
	return err
}

func (s *Server) call(method string, payload any) ([]byte, error) {
	s.callbackMu.Lock()
	defer s.callbackMu.Unlock()
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}
	if err = s.writeMessage(MessageTypeCall, method, jsonPayload); err != nil {
		return nil, err
	}

	messageType, _, responsePayload, err := s.readRequest(method)
	if err != nil {
		return nil, err
	}

	if messageType != MessageTypeCallResponse && messageType != MessageTypeCallError {
		return nil, fmt.Errorf("%w: expected call-response or call-error, received: %s", ErrInvalidRequest, messageType.String())
	}

	if messageType == MessageTypeCallError {
		return nil, fmt.Errorf("%w: %s", ErrClientError, responsePayload)
	}

	return responsePayload, nil
}

// DirectoryExists implements vfs.FS.
func (s *Server) DirectoryExists(path string) bool {
	if s.enabledCallbacks&CallbackDirectoryExists != 0 {
		result, err := s.call("directoryExists", path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			return string(result) == "true"
		}
	}
	return s.fs.DirectoryExists(path)
}

// FileExists implements vfs.FS.
func (s *Server) FileExists(path string) bool {
	if s.enabledCallbacks&CallbackFileExists != 0 {
		result, err := s.call("fileExists", path)
		if err != nil {
			panic(err)
		}
		if len(result) > 0 {
			return string(result) == "true"
		}
	}
	return s.fs.FileExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (s *Server) GetAccessibleEntries(path string) vfs.Entries {
	if s.enabledCallbacks&CallbackGetAccessibleEntries != 0 {
		result, err := s.call("getAccessibleEntries", path)
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
	return s.fs.GetAccessibleEntries(path)
}

// ReadFile implements vfs.FS.
func (s *Server) ReadFile(path string) (contents string, ok bool) {
	if s.enabledCallbacks&CallbackReadFile != 0 {
		data, err := s.call("readFile", path)
		if err != nil {
			panic(err)
		}
		if string(data) == "null" {
			return "", false
		}
		if len(data) > 0 {
			var result string
			if err := json.Unmarshal(data, &result); err != nil {
				panic(err)
			}
			return result, true
		}
	}
	return s.fs.ReadFile(path)
}

// Realpath implements vfs.FS.
func (s *Server) Realpath(path string) string {
	if s.enabledCallbacks&CallbackRealpath != 0 {
		data, err := s.call("realpath", path)
		if err != nil {
			panic(err)
		}
		if len(data) > 0 {
			var result string
			if err := json.Unmarshal(data, &result); err != nil {
				panic(err)
			}
			return result
		}
	}
	return s.fs.Realpath(path)
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (s *Server) UseCaseSensitiveFileNames() bool {
	return s.fs.UseCaseSensitiveFileNames()
}

// WriteFile implements vfs.FS.
func (s *Server) WriteFile(path string, data string, writeByteOrderMark bool) error {
	return s.fs.WriteFile(path, data, writeByteOrderMark)
}

// WalkDir implements vfs.FS.
func (s *Server) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	panic("unimplemented")
}

// Stat implements vfs.FS.
func (s *Server) Stat(path string) vfs.FileInfo {
	panic("unimplemented")
}

// Remove implements vfs.FS.
func (s *Server) Remove(path string) error {
	panic("unimplemented")
}
