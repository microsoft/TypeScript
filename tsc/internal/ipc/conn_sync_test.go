package ipc_test

import (
	"context"
	"errors"
	"io"
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

type stackClient struct {
	toServer chan *ipc.Message
	toClient chan *ipc.Message
	waiting  map[string]chan struct{}
	answers  map[string]string
}

func (c *stackClient) ReadMessage() (*ipc.Message, error) {
	return <-c.toServer, nil
}

func (c *stackClient) WriteRequest(id *jsonrpc.ID, method string, params any) error {
	data, err := json.Marshal(params)
	c.toClient <- &ipc.Message{ID: id, Method: method, Params: data}
	return err
}

func (*stackClient) WriteNotification(string, any) error {
	return nil
}

func (c *stackClient) WriteResponse(id *jsonrpc.ID, result any) error {
	data, err := json.Marshal(result)
	c.toClient <- &ipc.Message{ID: id, Result: data}
	return err
}

func (c *stackClient) WriteError(id *jsonrpc.ID, responseErr *jsonrpc.ResponseError) error {
	c.toClient <- &ipc.Message{ID: id, Error: responseErr}
	return nil
}

func (c *stackClient) run() {
	for msg := range c.toClient {
		c.handle(msg)
	}
}

func (c *stackClient) handle(callback *ipc.Message) {
	c.toServer <- &ipc.Message{ID: jsonrpc.NewIDString("resolve"), Method: "resolve", Params: callback.Params}
	if waiting := c.waiting[string(callback.Params)]; waiting != nil {
		close(waiting)
	}
	c.answers[string(callback.Params)] = string(c.await())
	c.toServer <- &ipc.Message{ID: callback.ID, Result: callback.Params}
}

func (c *stackClient) await() json.Value {
	for msg := range c.toClient {
		if msg.IsRequest() {
			c.handle(msg)
			continue
		}
		return msg.Result
	}
	return nil
}

type nestedRequestHandler struct {
	aServing  chan struct{}
	bAtClient chan struct{}
	releaseB  chan struct{}
}

func (h *nestedRequestHandler) HandleRequest(_ context.Context, _ string, params json.Value) (any, error) {
	switch string(params) {
	case `"a"`:
		close(h.aServing)
		<-h.bAtClient
	case `"b"`:
		<-h.releaseB
	}
	return params, nil
}

func (*nestedRequestHandler) HandleNotification(context.Context, string, json.Value) error {
	return nil
}

func TestSyncConnNestedRequestsAnswerInStackOrder(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		handler := &nestedRequestHandler{
			aServing:  make(chan struct{}),
			bAtClient: make(chan struct{}),
			releaseB:  make(chan struct{}),
		}
		client := &stackClient{
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
