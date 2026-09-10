package ipc_test

import (
	"context"
	"errors"
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
	"gotest.tools/v3/assert"
)

type syncFailingResponseProtocol struct {
	message     *ipc.Message
	responseErr error
}

func (p *syncFailingResponseProtocol) ReadMessage() (*ipc.Message, error) {
	if p.message == nil {
		return nil, io.EOF
	}
	message := p.message
	p.message = nil
	return message, nil
}

func (*syncFailingResponseProtocol) WriteRequest(*jsonrpc.ID, string, any) error {
	return nil
}

func (*syncFailingResponseProtocol) WriteNotification(string, any) error {
	return nil
}

func (p *syncFailingResponseProtocol) WriteResponse(*jsonrpc.ID, any) error {
	return p.responseErr
}

func (p *syncFailingResponseProtocol) WriteError(*jsonrpc.ID, *jsonrpc.ResponseError) error {
	return p.responseErr
}

type panicHandler struct{}

func (panicHandler) HandleRequest(context.Context, string, json.Value) (any, error) {
	panic("handler panic")
}

func (panicHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

func TestSyncConnRunReturnsResponseWriteFailure(t *testing.T) {
	t.Parallel()
	responseErr := errors.New("response write failed")
	protocol := &syncFailingResponseProtocol{
		message:     &ipc.Message{ID: jsonrpc.NewIDInt(1), Method: "transform"},
		responseErr: responseErr,
	}
	conn := ipc.NewSyncConn(nil, protocol, noOpHandler{})

	err := conn.Run(t.Context())
	assert.Assert(t, errors.Is(err, responseErr), "expected response write error, got %v", err)
}

func TestSyncConnRunReturnsPanicResponseWriteFailure(t *testing.T) {
	t.Parallel()
	responseErr := errors.New("response write failed")
	protocol := &syncFailingResponseProtocol{
		message:     &ipc.Message{ID: jsonrpc.NewIDInt(1), Method: "transform"},
		responseErr: responseErr,
	}
	conn := ipc.NewSyncConn(nil, protocol, panicHandler{})

	err := conn.Run(t.Context())
	assert.Assert(t, errors.Is(err, responseErr), "expected panic response write error, got %v", err)
	assert.ErrorContains(t, err, "original panic: handler panic")
}
