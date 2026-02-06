package api

import (
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// Message is an alias for jsonrpc.Message for convenience.
type Message = jsonrpc.Message

// Protocol defines the interface for reading and writing API messages.
type Protocol interface {
	// ReadMessage reads the next message from the connection.
	ReadMessage() (*Message, error)
	// WriteRequest writes a request message.
	WriteRequest(id *jsonrpc.ID, method string, params any) error
	// WriteNotification writes a notification message (no ID).
	WriteNotification(method string, params any) error
	// WriteResponse writes a successful response.
	WriteResponse(id *jsonrpc.ID, result any) error
	// WriteError writes an error response.
	WriteError(id *jsonrpc.ID, err *jsonrpc.ResponseError) error
}
