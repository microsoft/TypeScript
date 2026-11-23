package ipc_test

import (
	"context"
	"errors"
	"io"
	"net"
	"sync"
	"testing"
	"testing/synctest"

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

type gatedHandler map[string]chan struct{}

func (h gatedHandler) HandleRequest(_ context.Context, _ string, params json.Value) (any, error) {
	<-h[string(params)]
	return params, nil
}

func (gatedHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

func TestSyncConnAnswersNestedRequestsInStackOrder(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		server, client := net.Pipe()
		handler := gatedHandler{`"a"`: make(chan struct{}), `"b"`: make(chan struct{})}
		conn := ipc.NewSyncConn(server, ipc.NewJSONRPCProtocol(server), handler)
		peer := ipc.NewJSONRPCProtocol(client)
		answers := map[string]string{}
		var serve func() json.Value
		serve = func() json.Value {
			for {
				msg, err := peer.ReadMessage()
				if err != nil {
					return nil
				}
				if msg.IsResponse() {
					return msg.Result
				}
				_ = peer.WriteRequest(jsonrpc.NewIDString("resolve"), "resolve", msg.Params)
				answers[string(msg.Params)] = string(serve())
				_ = peer.WriteResponse(msg.ID, msg.Params)
			}
		}
		go serve()

		var wg sync.WaitGroup
		var a, b json.Value
		wg.Go(func() { a, _ = conn.Call(t.Context(), "callback", json.Value(`"a"`)) })
		synctest.Wait()
		wg.Go(func() { b, _ = conn.Call(t.Context(), "callback", json.Value(`"b"`)) })
		synctest.Wait()
		close(handler[`"a"`])
		synctest.Wait()
		close(handler[`"b"`])
		wg.Wait()
		assert.NilError(t, client.Close())

		assert.DeepEqual(t, answers, map[string]string{`"a"`: `"a"`, `"b"`: `"b"`})
		assert.Equal(t, string(a), `"a"`)
		assert.Equal(t, string(b), `"b"`)
	})
}

type callingNotificationHandler struct {
	noOpHandler
	conn *ipc.SyncConn
}

func (h *callingNotificationHandler) HandleNotification(ctx context.Context, _ string, _ json.Value) error {
	_, err := h.conn.Call(ctx, "inner", nil)
	return err
}

func TestSyncConnNotificationHandlerCanCall(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		server, client := net.Pipe()
		handler := &callingNotificationHandler{}
		conn := ipc.NewSyncConn(server, ipc.NewJSONRPCProtocol(server), handler)
		handler.conn = conn
		peer := ipc.NewJSONRPCProtocol(client)
		go func() {
			outer, _ := peer.ReadMessage()
			_ = peer.WriteNotification("notify", nil)
			inner, _ := peer.ReadMessage()
			_ = peer.WriteResponse(inner.ID, inner.Method)
			_ = peer.WriteResponse(outer.ID, outer.Method)
		}()

		result, err := conn.Call(t.Context(), "outer", nil)
		assert.NilError(t, err)
		assert.Equal(t, string(result), `"outer"`)
	})
}
