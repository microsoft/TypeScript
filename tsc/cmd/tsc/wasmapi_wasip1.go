//go:build wasip1

package main

import (
	"context"
	"encoding/binary"
	"errors"
	"fmt"
	"os"
	"runtime/debug"
	"slices"
	"sync"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/api/wasmreactor"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
)

const (
	// API callbacks are tunneled through reserved descriptors so that
	// the module only requires standard WASI imports and remains directly runnable.
	hostWriteFileFD    = 0x7fff_fffe
	hostCallbackFD     = 0x7fff_fffd
	hostErrorCapacity  = 16 * 1024
	hostResultCapacity = 64 * 1024
	errnoBadFileNumber = 8
	errnoNoBuffers     = 42
)

var (
	reactor *wasmreactor.Reactor

	requestBuffer []byte

	responseBuffer []byte
	responsePtr    uint32
	responseLen    uint32

	// hostCallbackMu serializes host callback exchanges, which share
	// hostCallbackBuffer and the host's single pending-result slot.
	hostCallbackMu     sync.Mutex
	hostCallbackBuffer []byte
	inCall             bool
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
	options.Conn = hostCallbackConn{}
	options.WrapFS = func(files vfs.FS) vfs.FS {
		return wrapvfs.Wrap(files, wrapvfs.Replacements{
			WriteFile: func(path tspath.RootedFilePath, data string) error {
				handled, err := writeFileToHost(path.AsString(), data)
				if !handled {
					return files.WriteFile(path, data)
				}
				return err
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
func handleRequest(methodLen uint32, payloadLen uint32) uint32 {
	return guarded("handling request", methodLen, payloadLen, func() uint32 {
		method := string(requestBuffer[:methodLen])
		payload := append([]byte(nil), requestBuffer[methodLen:methodLen+payloadLen]...)
		response, err := reactor.HandleRequest(method, payload)
		if err != nil {
			return fail(err.Error())
		}
		setResponse(response.Data)
		return 0
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
		return 0
	})
}

//go:wasmexport read_file
func readFile(pathLen uint32) uint32 {
	return guarded("reading file", pathLen, 0, func() uint32 {
		content, ok := reactor.ReadFile(string(requestBuffer[:pathLen]))
		if !ok {
			setResponse(nil)
			return 2
		}
		setResponse([]byte(content))
		return 0
	})
}

//go:wasmexport remove_file
func removeFile(pathLen uint32) uint32 {
	return guarded("removing file", pathLen, 0, func() uint32 {
		if err := reactor.RemoveFile(string(requestBuffer[:pathLen])); err != nil {
			return fail(err.Error())
		}
		setResponse(nil)
		return 0
	})
}

// guarded runs an export that operates on the session and the first+second
// bytes of the request buffer, rejecting re-entrant calls and reporting panics
// as failures.
func guarded(operation string, first uint32, second uint32, run func() uint32) (status uint32) {
	if inCall {
		return fail(operation + ": re-entrant call while a request is in flight")
	}
	if reactor == nil {
		return fail("no session: create_session must be called first")
	}
	if !withinRequest(first, second) {
		return fail(operation + ": lengths exceed the request buffer")
	}
	inCall = true
	defer func() {
		inCall = false
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

//go:wasmexport __typescript_cli_start
func cliStart() {
	os.Exit(runMain())
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

func bytesPointer(bytes []byte) uint32 {
	if len(bytes) == 0 {
		return 0
	}
	return uint32(uintptr(unsafe.Pointer(&bytes[0])))
}

type hostCallbackConn struct{}

var _ ipc.Conn = hostCallbackConn{}

func (hostCallbackConn) Run(ctx context.Context) error {
	<-ctx.Done()
	return ctx.Err()
}

func (hostCallbackConn) Call(_ context.Context, method string, params any) (json.Value, error) {
	paramsBytes, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}
	hostCallbackMu.Lock()
	defer hostCallbackMu.Unlock()
	bufferSize := 16 + len(method) + len(paramsBytes) + hostResultCapacity + hostErrorCapacity
	if cap(hostCallbackBuffer) < bufferSize {
		hostCallbackBuffer = make([]byte, bufferSize)
	}
	result, errno, err := callHost(hostCallbackBuffer[:bufferSize], method, paramsBytes, hostResultCapacity)
	if errno == errnoNoBuffers {
		// The host retains a result that did not fit; fetch it into a buffer of
		// the reported size rather than invoking the callback again.
		size := int(binary.LittleEndian.Uint32(hostCallbackBuffer[8:]))
		result, _, err = callHost(make([]byte, 16+size+hostErrorCapacity), "", nil, size)
	}
	if err != nil {
		return nil, err
	}
	return json.Value(slices.Clone(result)), nil
}

func callHost(buffer []byte, method string, params []byte, resultCapacity int) ([]byte, uint32, error) {
	binary.LittleEndian.PutUint32(buffer, uint32(len(method)))
	binary.LittleEndian.PutUint32(buffer[4:], uint32(len(params)))
	binary.LittleEndian.PutUint32(buffer[8:], uint32(resultCapacity))
	binary.LittleEndian.PutUint32(buffer[12:], hostErrorCapacity)
	copy(buffer[16:], method)
	copy(buffer[16+len(method):], params)

	iov := [2]uint32{bytesPointer(buffer), uint32(len(buffer))}
	var written uint32
	errno := hostFDWrite(hostCallbackFD, unsafe.Pointer(&iov[0]), 1, &written)
	switch errno {
	case 0:
		resultStart := 16 + len(method) + len(params)
		resultLength := min(int(binary.LittleEndian.Uint32(buffer[8:])), resultCapacity)
		return buffer[resultStart : resultStart+resultLength], 0, nil
	case errnoNoBuffers:
		return nil, errno, nil
	case errnoBadFileNumber:
		return nil, errno, errors.New("host callbacks are not supported by this WebAssembly host")
	}
	return nil, errno, hostError(buffer[16+len(method)+len(params)+resultCapacity:], binary.LittleEndian.Uint32(buffer[12:]), "host callback failed")
}

// hostError reads the error message a host wrote into the error region of an
// exchange buffer.
func hostError(region []byte, length uint32, fallback string) error {
	message := string(region[:min(int(length), hostErrorCapacity)])
	if message == "" {
		message = fallback
	}
	return errors.New(message)
}

func (hostCallbackConn) Notify(context.Context, string, any) error {
	return errors.New("host callback notifications are not supported")
}

func writeFileToHost(path string, data string) (bool, error) {
	pathBytes := []byte(path)
	dataBytes := []byte(data)
	buffer := make([]byte, 12+len(pathBytes)+len(dataBytes)+hostErrorCapacity)
	binary.LittleEndian.PutUint32(buffer, uint32(len(pathBytes)))
	binary.LittleEndian.PutUint32(buffer[4:], uint32(len(dataBytes)))
	binary.LittleEndian.PutUint32(buffer[8:], hostErrorCapacity)
	copy(buffer[12:], pathBytes)
	copy(buffer[12+len(pathBytes):], dataBytes)

	iov := [2]uint32{bytesPointer(buffer), uint32(len(buffer))}
	var written uint32
	errno := hostFDWrite(hostWriteFileFD, unsafe.Pointer(&iov[0]), 1, &written)
	if errno == errnoBadFileNumber {
		return false, nil
	}
	if errno == 0 {
		return true, nil
	}

	return true, hostError(buffer[12+len(pathBytes)+len(dataBytes):], binary.LittleEndian.Uint32(buffer[8:]), "host filesystem callback failed")
}

//go:wasmimport wasi_snapshot_preview1 fd_write
//go:noescape
func hostFDWrite(fd int32, iovs unsafe.Pointer, iovsLen uint32, written *uint32) uint32
