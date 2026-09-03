//go:build wasip1

// Command tsc-api-wasm builds the TypeScript API server as a WebAssembly reactor.
package main

import (
	"context"
	"fmt"
	"runtime/debug"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/api/wasmreactor"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
)

func main() {}

var (
	reactor *wasmreactor.Reactor

	requestBuffer []byte

	responseBuffer []byte
	responsePtr    uint32
	responseLen    uint32

	inCall bool
)

//go:wasmexport create_session
func createSession(optionsPtr uint32, optionsLen uint32) (status uint32) {
	if reactor != nil {
		return fail("session already created")
	}
	defer func() {
		if recovered := recover(); recovered != nil {
			reactor = nil
			status = fail(fmt.Sprintf("panic creating session: %v\n%s", recovered, debug.Stack()))
		}
	}()

	var options wasmreactor.Options
	if err := json.Unmarshal(readMemory(optionsPtr, optionsLen), &options); err != nil {
		return fail(fmt.Sprintf("invalid session options: %v", err))
	}
	options.WrapFS = func(files vfs.FS) vfs.FS {
		return wrapvfs.Wrap(files, wrapvfs.Replacements{
			WriteFile: func(path string, data string) error {
				pathBytes := []byte(path)
				dataBytes := []byte(data)
				switch hostWriteFile(bytePointer(pathBytes), uint32(len(pathBytes)), bytePointer(dataBytes), uint32(len(dataBytes))) {
				case 0:
					return nil
				case 2:
					return files.WriteFile(path, data)
				default:
					return fmt.Errorf("%s", readHostError())
				}
			},
		})
	}
	reactor = wasmreactor.New(context.Background(), options)
	setResponse(nil)
	return 0
}

//go:wasmexport close_session
func closeSession() {
	if reactor == nil {
		return
	}
	current := reactor
	reactor = nil
	defer func() {
		_ = recover()
	}()
	current.Close()
}

//go:wasmexport get_request_buffer
func getRequestBuffer(size uint32) uint32 {
	if uint32(cap(requestBuffer)) < size || (cap(requestBuffer) > 1<<20 && uint32(cap(requestBuffer)) > 4*size) {
		requestBuffer = make([]byte, size)
	}
	requestBuffer = requestBuffer[:size]
	return bytesPointer(requestBuffer)
}

//go:wasmexport handle_request
func handleRequest(methodLen uint32, payloadLen uint32) (status uint32) {
	if inCall {
		return fail("re-entrant handle_request: a request is already in flight")
	}
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(methodLen, payloadLen) {
		return fail("invalid request lengths: method + payload exceeds the request buffer")
	}
	inCall = true
	defer func() {
		inCall = false
	}()
	defer func() {
		if recovered := recover(); recovered != nil {
			status = fail(fmt.Sprintf("panic: %v\n%s", recovered, debug.Stack()))
		}
	}()

	method := string(requestBuffer[:methodLen])
	payload := append([]byte(nil), requestBuffer[methodLen:methodLen+payloadLen]...)
	response, err := reactor.HandleRequest(method, payload)
	if err != nil {
		return fail(err.Error())
	}
	setResponse(response.Data)
	return 0
}

//go:wasmexport set_file
func setFile(pathLen uint32, contentLen uint32) uint32 {
	if inCall {
		return fail("re-entrant set_file: a request is already in flight")
	}
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(pathLen, contentLen) {
		return fail("invalid set_file lengths: path + content exceeds the request buffer")
	}
	path := string(requestBuffer[:pathLen])
	content := string(requestBuffer[pathLen : pathLen+contentLen])
	if err := reactor.SetFile(path, content); err != nil {
		return fail(err.Error())
	}
	setResponse(nil)
	return 0
}

//go:wasmexport read_file
func readFile(pathLen uint32) (status uint32) {
	if inCall {
		return fail("re-entrant read_file: a request is already in flight")
	}
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(pathLen, 0) {
		return fail("invalid read_file length: path exceeds the request buffer")
	}
	defer func() {
		if recovered := recover(); recovered != nil {
			status = fail(fmt.Sprintf("panic reading file: %v\n%s", recovered, debug.Stack()))
		}
	}()
	content, ok := reactor.ReadFile(string(requestBuffer[:pathLen]))
	if !ok {
		setResponse(nil)
		return 2
	}
	setResponse([]byte(content))
	return 0
}

//go:wasmexport remove_file
func removeFile(pathLen uint32) uint32 {
	if inCall {
		return fail("re-entrant remove_file: a request is already in flight")
	}
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(pathLen, 0) {
		return fail("invalid remove_file length: path exceeds the request buffer")
	}
	if err := reactor.RemoveFile(string(requestBuffer[:pathLen])); err != nil {
		return fail(err.Error())
	}
	setResponse(nil)
	return 0
}

//go:wasmexport response_ptr
func responsePointer() uint32 {
	return responsePtr
}

//go:wasmexport response_len
func responseLength() uint32 {
	return responseLen
}

func fail(message string) uint32 {
	setResponse([]byte(message))
	return 1
}

func setResponse(data []byte) {
	responseBuffer = data
	responsePtr = bytesPointer(responseBuffer)
	responseLen = uint32(len(responseBuffer))
}

func withinRequest(first uint32, second uint32) bool {
	return first+second >= first && first+second <= uint32(len(requestBuffer))
}

func readMemory(pointer uint32, length uint32) []byte {
	if length == 0 {
		return nil
	}
	return unsafe.Slice((*byte)(unsafe.Pointer(uintptr(pointer))), length)
}

func bytesPointer(bytes []byte) uint32 {
	if len(bytes) == 0 {
		return 0
	}
	return uint32(uintptr(unsafe.Pointer(&bytes[0])))
}

func bytePointer(bytes []byte) *byte {
	if len(bytes) == 0 {
		return nil
	}
	return &bytes[0]
}

func readHostError() string {
	length := hostErrorLength()
	if length == 0 {
		return "host filesystem callback failed"
	}
	buffer := make([]byte, length)
	hostErrorCopy(&buffer[0], length)
	return string(buffer)
}

//go:wasmimport typescript_host write_file
func hostWriteFile(path *byte, pathLen uint32, data *byte, dataLen uint32) uint32

//go:wasmimport typescript_host error_length
func hostErrorLength() uint32

//go:wasmimport typescript_host error_copy
func hostErrorCopy(buffer *byte, length uint32)
