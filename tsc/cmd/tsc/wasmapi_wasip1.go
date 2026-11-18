//go:build wasip1

package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"runtime/debug"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/api/wasmreactor"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

// Statuses returned by exports. receive_message otherwise returns the
// api.MessageType of the message it received.
const (
	statusOK     = 0
	statusFailed = 1
	statusAbsent = 2
	statusClosed = 0
)

var (
	reactor *wasmreactor.Reactor

	requestBuffer []byte

	responseBuffer    []byte
	responsePtr       uint32
	responseLen       uint32
	responseMethodLen uint32
)

//go:wasmexport create_session
func createSession(optionsLen uint32) (status uint32) {
	if reactor != nil {
		return fail("session already created")
	}
	if !withinRequest(optionsLen, 0) {
		return fail("invalid session options length: exceeds the request buffer")
	}
	defer func() {
		if recovered := recover(); recovered != nil {
			reactor = nil
			status = fail(fmt.Sprintf("panic creating session: %v\n%s", recovered, debug.Stack()))
		}
	}()

	var options wasmreactor.Options
	if err := json.Unmarshal(requestBuffer[:optionsLen], &options); err != nil {
		return fail(fmt.Sprintf("invalid session options: %v", err))
	}
	reactor = wasmreactor.New(context.Background(), options)
	setResponse(nil)
	return statusOK
}

//go:wasmexport start_session
func startSession(callbacksLen uint32) uint32 {
	return guarded("starting session", callbacksLen, 0, func() uint32 {
		var callbacks []string
		if err := json.Unmarshal(requestBuffer[:callbacksLen], &callbacks); err != nil {
			return fail(fmt.Sprintf("invalid callbacks: %v", err))
		}
		if err := reactor.Start(callbacks); err != nil {
			return fail(err.Error())
		}
		setResponse(nil)
		return statusOK
	})
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

//go:wasmexport send_message
func sendMessage(messageType uint32, methodLen uint32, payloadLen uint32) uint32 {
	return guarded("sending message", methodLen, payloadLen, func() uint32 {
		message := wasmreactor.Message{
			Type:    api.MessageType(messageType),
			Method:  string(requestBuffer[:methodLen]),
			Payload: append([]byte(nil), requestBuffer[methodLen:methodLen+payloadLen]...),
		}
		if err := reactor.Send(message); err != nil {
			return fail(err.Error())
		}
		setResponse(nil)
		return statusOK
	})
}

//go:wasmexport receive_message
func receiveMessage() uint32 {
	return guarded("receiving message", 0, 0, func() uint32 {
		message, err := reactor.Receive()
		if errors.Is(err, io.EOF) {
			setResponse(nil)
			return statusClosed
		}
		if err != nil {
			return fail(err.Error())
		}
		buffer := make([]byte, 0, len(message.Method)+len(message.Payload))
		buffer = append(buffer, message.Method...)
		buffer = append(buffer, message.Payload...)
		setResponse(buffer)
		responseMethodLen = uint32(len(message.Method))
		return uint32(message.Type)
	})
}

//go:wasmexport set_file
func setFile(pathLen uint32, contentLen uint32) uint32 {
	return guarded("setting file", pathLen, contentLen, func() uint32 {
		path := string(requestBuffer[:pathLen])
		content := string(requestBuffer[pathLen : pathLen+contentLen])
		if err := reactor.SetFile(path, content); err != nil {
			return fail(err.Error())
		}
		setResponse(nil)
		return statusOK
	})
}

//go:wasmexport read_file
func readFile(pathLen uint32) uint32 {
	return guarded("reading file", pathLen, 0, func() uint32 {
		content, ok := reactor.ReadFile(string(requestBuffer[:pathLen]))
		if !ok {
			setResponse(nil)
			return statusAbsent
		}
		setResponse([]byte(content))
		return statusOK
	})
}

//go:wasmexport remove_file
func removeFile(pathLen uint32) uint32 {
	return guarded("removing file", pathLen, 0, func() uint32 {
		if err := reactor.RemoveFile(string(requestBuffer[:pathLen])); err != nil {
			return fail(err.Error())
		}
		setResponse(nil)
		return statusOK
	})
}

// guarded runs an export that operates on the session and the first+second
// bytes of the request buffer, reporting panics as failures.
func guarded(operation string, first uint32, second uint32, run func() uint32) (status uint32) {
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(first, second) {
		return fail(operation + ": lengths exceed the request buffer")
	}
	defer func() {
		if recovered := recover(); recovered != nil {
			status = fail(fmt.Sprintf("panic %s: %v\n%s", operation, recovered, debug.Stack()))
		}
	}()
	return run()
}

//go:wasmexport response_ptr
func responsePointer() uint32 {
	return responsePtr
}

//go:wasmexport response_len
func responseLength() uint32 {
	return responseLen
}

//go:wasmexport response_method_len
func responseMethodLength() uint32 {
	return responseMethodLen
}

//go:wasmexport __typescript_cli_start
func cliStart() {
	os.Exit(runMain())
}

func fail(message string) uint32 {
	setResponse([]byte(message))
	return statusFailed
}

func setResponse(data []byte) {
	responseBuffer = data
	responsePtr = bytesPointer(responseBuffer)
	responseLen = uint32(len(responseBuffer))
	responseMethodLen = 0
}

func withinRequest(first uint32, second uint32) bool {
	return first+second >= first && first+second <= uint32(len(requestBuffer))
}

func bytesPointer(bytes []byte) uint32 {
	if len(bytes) == 0 {
		return 0
	}
	return uint32(uintptr(unsafe.Pointer(&bytes[0])))
}
