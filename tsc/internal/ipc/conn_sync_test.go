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

type syncPanickingResponseProtocol struct {
	syncFailingResponseProtocol
}

func (*syncPanickingResponseProtocol) WriteResponse(*jsonrpc.ID, any) error {
	panic("response write panic")
}

func TestSyncConnRunReturnsResponseWritePanic(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		responseErr := errors.New("error write failed")
		protocol := &syncPanickingResponseProtocol{syncFailingResponseProtocol{
			message:     &ipc.Message{ID: jsonrpc.NewIDInt(1), Method: "transform"},
			responseErr: responseErr,
		}}
		conn := ipc.NewSyncConn(nil, protocol, noOpHandler{})

		err := conn.Run(t.Context())
		assert.Assert(t, errors.Is(err, responseErr), "expected panic response write error, got %v", err)
		assert.ErrorContains(t, err, "original panic: response write panic")
	})
}

type syncStackClient struct {
	toServer chan *ipc.Message
	toClient chan *ipc.Message
	waiting  map[string]chan struct{}
	answers  map[string]string
}

func (c *syncStackClient) ReadMessage() (*ipc.Message, error) {
	msg, ok := <-c.toServer
	if !ok {
		return nil, io.EOF
	}
	return msg, nil
}

func (c *syncStackClient) WriteRequest(id *jsonrpc.ID, method string, params any) error {
	data, err := json.Marshal(params)
	if err != nil {
		return err
	}
	c.toClient <- &ipc.Message{ID: id, Method: method, Params: data}
	return nil
}

func (c *syncStackClient) WriteNotification(method string, params any) error {
	data, err := json.Marshal(params)
	if err != nil {
		return err
	}
	c.toClient <- &ipc.Message{Method: method, Params: data}
	return nil
}

func (c *syncStackClient) WriteResponse(id *jsonrpc.ID, result any) error {
	data, err := json.Marshal(result)
	if err != nil {
		return err
	}
	c.toClient <- &ipc.Message{ID: id, Result: data}
	return nil
}

func (c *syncStackClient) WriteError(id *jsonrpc.ID, responseErr *jsonrpc.ResponseError) error {
	c.toClient <- &ipc.Message{ID: id, Error: responseErr}
	return nil
}

func (c *syncStackClient) run() {
	for msg := range c.toClient {
		c.handle(msg)
	}
}

func (c *syncStackClient) handle(callback *ipc.Message) {
	c.toServer <- &ipc.Message{ID: jsonrpc.NewIDString("resolve"), Method: "resolve", Params: callback.Params}
	if waiting := c.waiting[string(callback.Params)]; waiting != nil {
		close(waiting)
	}
	c.answers[string(callback.Params)] = string(c.await())
	c.toServer <- &ipc.Message{ID: callback.ID, Result: callback.Params}
}

func (c *syncStackClient) await() json.Value {
	for msg := range c.toClient {
		if msg.IsRequest() {
			c.handle(msg)
			continue
		}
		return msg.Result
	}
	return nil
}

type syncNestedRequestHandler struct {
	aServing  chan struct{}
	bAtClient chan struct{}
	releaseB  chan struct{}
}

func (h *syncNestedRequestHandler) HandleRequest(_ context.Context, _ string, params json.Value) (any, error) {
	switch string(params) {
	case `"a"`:
		close(h.aServing)
		<-h.bAtClient
	case `"b"`:
		<-h.releaseB
	}
	return params, nil
}

func (*syncNestedRequestHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

func TestSyncConnNestedRequestsAnswerInStackOrder(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		handler := &syncNestedRequestHandler{
			aServing:  make(chan struct{}),
			bAtClient: make(chan struct{}),
			releaseB:  make(chan struct{}),
		}
		client := &syncStackClient{
			toServer: make(chan *ipc.Message),
			toClient: make(chan *ipc.Message),
			waiting:  map[string]chan struct{}{`"b"`: handler.bAtClient},
			answers:  map[string]string{},
		}
		go client.run()
		conn := ipc.NewSyncConn(nil, client, handler)

		var wg sync.WaitGroup
		results := map[string]string{}
		var resultsMu sync.Mutex
		call := func(name string) {
			result, err := conn.Call(t.Context(), "callback", json.Value(name))
			if err != nil {
				t.Errorf("Call(callback, %s) = %v", name, err)
			}
			resultsMu.Lock()
			results[name] = string(result)
			resultsMu.Unlock()
		}
		wg.Go(func() { call(`"a"`) })
		<-handler.aServing
		wg.Go(func() { call(`"b"`) })
		<-handler.bAtClient
		synctest.Wait()
		close(handler.releaseB)
		wg.Wait()
		close(client.toClient)

		want := map[string]string{`"a"`: `"a"`, `"b"`: `"b"`}
		assert.DeepEqual(t, client.answers, want)
		assert.DeepEqual(t, results, want)
	})
}

type syncCallingHandler struct {
	conn               ipc.Conn
	notificationResult chan error
}

func (h *syncCallingHandler) HandleRequest(ctx context.Context, _ string, params json.Value) (any, error) {
	return h.conn.Call(ctx, "callback", params)
}

func (h *syncCallingHandler) HandleNotification(ctx context.Context, _ string, params json.Value) error {
	result, err := h.conn.Call(ctx, "callback", params)
	if err == nil && string(result) != string(params) {
		err = errors.New("notification callback received the wrong result")
	}
	h.notificationResult <- err
	return err
}

func TestSyncConnHandlerCanCallClient(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client := &syncStackClient{toServer: make(chan *ipc.Message), toClient: make(chan *ipc.Message)}
		handler := &syncCallingHandler{notificationResult: make(chan error, 1)}
		conn := ipc.NewSyncConn(nil, client, handler)
		handler.conn = conn
		runDone := make(chan error, 1)
		go func() { runDone <- conn.Run(t.Context()) }()

		client.toServer <- &ipc.Message{ID: jsonrpc.NewIDString("outer"), Method: "outer", Params: json.Value(`"a"`)}
		outer := <-client.toClient
		assert.Equal(t, outer.Method, "callback")
		assert.Equal(t, string(outer.Params), `"a"`)

		client.toServer <- &ipc.Message{ID: jsonrpc.NewIDString("nested"), Method: "nested", Params: json.Value(`"b"`)}
		nested := <-client.toClient
		assert.Equal(t, nested.Method, "callback")
		assert.Equal(t, string(nested.Params), `"b"`)
		client.toServer <- &ipc.Message{ID: nested.ID, Result: nested.Params}
		response := <-client.toClient
		assert.Equal(t, response.ID.String(), "nested")
		assert.Equal(t, string(response.Result), `"b"`)

		client.toServer <- &ipc.Message{Method: "notification", Params: json.Value(`"c"`)}
		notification := <-client.toClient
		assert.Equal(t, notification.Method, "callback")
		assert.Equal(t, string(notification.Params), `"c"`)
		client.toServer <- &ipc.Message{ID: notification.ID, Result: notification.Params}
		assert.NilError(t, <-handler.notificationResult)

		client.toServer <- &ipc.Message{ID: outer.ID, Result: outer.Params}
		response = <-client.toClient
		assert.Equal(t, response.ID.String(), "outer")
		assert.Equal(t, string(response.Result), `"a"`)
		close(client.toServer)
		assert.NilError(t, <-runDone)
	})
}

func TestSyncConnFailureUnblocksQueuedOperations(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client := &syncStackClient{toServer: make(chan *ipc.Message), toClient: make(chan *ipc.Message)}
		conn := ipc.NewSyncConn(nil, client, noOpHandler{})
		firstDone := make(chan error, 1)
		go func() {
			_, err := conn.Call(t.Context(), "callback", "a")
			firstDone <- err
		}()
		<-client.toClient
		secondDone := make(chan error, 1)
		go func() {
			_, err := conn.Call(t.Context(), "callback", "b")
			secondDone <- err
		}()
		notifyDone := make(chan error, 1)
		go func() { notifyDone <- conn.Notify(t.Context(), "notification", nil) }()
		synctest.Wait()
		close(client.toServer)

		assert.Assert(t, errors.Is(<-firstDone, io.EOF))
		for _, err := range []error{<-secondDone, <-notifyDone} {
			assert.Assert(t, errors.Is(err, ipc.ErrConnClosed))
			assert.Assert(t, errors.Is(err, io.EOF))
		}
		_, err := conn.Call(t.Context(), "callback", nil)
		assert.Assert(t, errors.Is(err, ipc.ErrConnClosed))
		assert.Assert(t, errors.Is(conn.Run(t.Context()), ipc.ErrConnClosed))
	})
}

func TestSyncConnQueuedCallCanBeCanceled(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client := &syncStackClient{toServer: make(chan *ipc.Message), toClient: make(chan *ipc.Message)}
		conn := ipc.NewSyncConn(nil, client, noOpHandler{})
		firstDone := make(chan error, 1)
		go func() {
			_, err := conn.Call(t.Context(), "callback", "a")
			firstDone <- err
		}()
		first := <-client.toClient
		ctx, cancel := context.WithCancel(t.Context())
		secondDone := make(chan error, 1)
		go func() {
			_, err := conn.Call(ctx, "callback", "b")
			secondDone <- err
		}()
		synctest.Wait()
		cancel()
		assert.Assert(t, errors.Is(<-secondDone, context.Canceled))
		client.toServer <- &ipc.Message{ID: first.ID, Result: first.Params}
		assert.NilError(t, <-firstDone)
		notifyDone := make(chan error, 1)
		go func() { notifyDone <- conn.Notify(t.Context(), "notification", nil) }()
		assert.Equal(t, (<-client.toClient).Method, "notification")
		assert.NilError(t, <-notifyDone)
	})
}

type syncCancelingHandler struct {
	conn      ipc.Conn
	callCtx   context.Context
	firstDone chan error
}

func (h *syncCancelingHandler) HandleRequest(ctx context.Context, _ string, _ json.Value) (any, error) {
	_, err := h.conn.Call(h.callCtx, "callback", "a")
	h.firstDone <- err
	return h.conn.Call(ctx, "callback", "b")
}

func (*syncCancelingHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

func TestSyncConnDrainsCanceledCallBeforeNextExchange(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client := &syncStackClient{toServer: make(chan *ipc.Message), toClient: make(chan *ipc.Message, 1)}
		ctx, cancel := context.WithCancel(t.Context())
		handler := &syncCancelingHandler{callCtx: ctx, firstDone: make(chan error, 1)}
		conn := ipc.NewSyncConn(nil, client, handler)
		handler.conn = conn
		runDone := make(chan error, 1)
		go func() { runDone <- conn.Run(t.Context()) }()

		client.toServer <- &ipc.Message{ID: jsonrpc.NewIDString("outer"), Method: "outer"}
		first := <-client.toClient
		cancel()
		assert.Assert(t, errors.Is(<-handler.firstDone, context.Canceled))
		synctest.Wait()
		assert.Equal(t, len(client.toClient), 0, "next exchange started before canceled call was drained")
		client.toServer <- &ipc.Message{ID: first.ID, Result: first.Params}
		second := <-client.toClient
		assert.Equal(t, string(second.Params), `"b"`)
		client.toServer <- &ipc.Message{ID: second.ID, Result: second.Params}
		response := <-client.toClient
		assert.Equal(t, response.ID.String(), "outer")
		assert.Equal(t, string(response.Result), `"b"`)
		close(client.toServer)
		assert.NilError(t, <-runDone)
	})
}

type syncFailingCallProtocol struct {
	syncFailingResponseProtocol
	callErr error
	panics  bool
}

func (p *syncFailingCallProtocol) WriteRequest(*jsonrpc.ID, string, any) error {
	if p.panics {
		panic("callback write panic")
	}
	return p.callErr
}

func TestSyncConnCallbackWriteFailureStopsPump(t *testing.T) {
	t.Parallel()
	for _, panics := range []bool{false, true} {
		t.Run(map[bool]string{false: "error", true: "panic"}[panics], func(t *testing.T) {
			t.Parallel()
			synctest.Test(t, func(t *testing.T) {
				callErr := errors.New("callback write failed")
				protocol := &syncFailingCallProtocol{
					message: &ipc.Message{ID: jsonrpc.NewIDInt(1), Method: "outer"},
					callErr: callErr,
					panics:  panics,
				}
				handler := &syncCallingHandler{}
				conn := ipc.NewSyncConn(nil, protocol, handler)
				handler.conn = conn
				err := conn.Run(t.Context())
				if panics {
					assert.ErrorContains(t, err, "callback write panic")
				} else {
					assert.Assert(t, errors.Is(err, callErr))
				}
				_, err = conn.Call(t.Context(), "callback", nil)
				assert.Assert(t, errors.Is(err, ipc.ErrConnClosed))
			})
		})
	}
}

func TestSyncConnCancellationInterruptsRead(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client, server := net.Pipe()
		defer server.Close()
		ctx, cancel := context.WithCancel(t.Context())
		conn := ipc.NewSyncConn(client, ipc.NewJSONRPCProtocol(client), noOpHandler{})
		runDone := make(chan error, 1)
		go func() { runDone <- conn.Run(ctx) }()
		synctest.Wait()
		cancel()
		assert.Assert(t, errors.Is(<-runDone, context.Canceled))
		_, err := conn.Call(t.Context(), "callback", nil)
		assert.Assert(t, errors.Is(err, ipc.ErrConnClosed))
		assert.Assert(t, errors.Is(err, context.Canceled))
	})
}

func TestSyncConnStandaloneCallCancellationInterruptsRead(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		client, server := net.Pipe()
		defer server.Close()
		ctx, cancel := context.WithCancel(t.Context())
		conn := ipc.NewSyncConn(client, ipc.NewJSONRPCProtocol(client), noOpHandler{})
		callDone := make(chan error, 1)
		go func() {
			_, err := conn.Call(ctx, "callback", nil)
			callDone <- err
		}()
		_, err := ipc.NewJSONRPCProtocol(server).ReadMessage()
		assert.NilError(t, err)
		cancel()
		assert.Assert(t, errors.Is(<-callDone, context.Canceled))
		assert.Assert(t, errors.Is(conn.Notify(t.Context(), "notification", nil), ipc.ErrConnClosed))
	})
}
