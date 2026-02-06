package api

import (
	"io"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// JSONRPCProtocol implements the Protocol interface using JSON-RPC 2.0
// with the LSP base protocol framing (Content-Length headers).
type JSONRPCProtocol struct {
	reader *jsonrpc.Reader
	writer *jsonrpc.Writer
}

var _ Protocol = (*JSONRPCProtocol)(nil)

// NewJSONRPCProtocol creates a new JSON-RPC protocol handler.
func NewJSONRPCProtocol(rw io.ReadWriter) *JSONRPCProtocol {
	return &JSONRPCProtocol{
		reader: jsonrpc.NewReader(rw),
		writer: jsonrpc.NewWriter(rw),
	}
}

// ReadMessage implements Protocol.
func (p *JSONRPCProtocol) ReadMessage() (*Message, error) {
	data, err := p.reader.Read()
	if err != nil {
		return nil, err
	}

	var msg Message
	if err := json.Unmarshal(data, &msg); err != nil {
		return nil, err
	}

	return &msg, nil
}

// WriteRequest implements Protocol.
func (p *JSONRPCProtocol) WriteRequest(id *jsonrpc.ID, method string, params any) error {
	msg := jsonrpc.RequestMessage{
		ID:     id,
		Method: method,
		Params: params,
	}
	data, err := json.Marshal(msg, jsontext.AllowInvalidUTF8(true))
	if err != nil {
		return err
	}
	return p.writer.Write(data)
}

// WriteNotification implements Protocol.
func (p *JSONRPCProtocol) WriteNotification(method string, params any) error {
	msg := jsonrpc.RequestMessage{
		Method: method,
		Params: params,
	}
	data, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return p.writer.Write(data)
}

// WriteResponse implements Protocol.
func (p *JSONRPCProtocol) WriteResponse(id *jsonrpc.ID, result any) error {
	msg := jsonrpc.ResponseMessage{
		ID:     id,
		Result: result,
	}
	data, err := json.Marshal(msg, jsontext.AllowInvalidUTF8(true))
	if err != nil {
		return err
	}
	return p.writer.Write(data)
}

// WriteError implements Protocol.
func (p *JSONRPCProtocol) WriteError(id *jsonrpc.ID, respErr *jsonrpc.ResponseError) error {
	msg := jsonrpc.ResponseMessage{
		ID:    id,
		Error: respErr,
	}
	data, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return p.writer.Write(data)
}
