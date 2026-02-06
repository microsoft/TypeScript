package api

import (
	"context"
	"errors"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

var (
	ErrConnClosed     = errors.New("api: connection closed")
	ErrRequestTimeout = errors.New("api: request timeout")
)

// Handler processes incoming API requests and notifications.
type Handler interface {
	// HandleRequest handles an incoming request and returns a result or error.
	HandleRequest(ctx context.Context, method string, params jsontext.Value) (any, error)
	// HandleNotification handles an incoming notification.
	HandleNotification(ctx context.Context, method string, params jsontext.Value) error
}

// Conn represents a bidirectional connection for API communication.
type Conn interface {
	// Run starts processing messages on the connection.
	// It blocks until the context is cancelled or an error occurs.
	Run(ctx context.Context) error

	// Call sends a request to the client and waits for a response.
	Call(ctx context.Context, method string, params any) (jsontext.Value, error)

	// Notify sends a notification to the client (no response expected).
	Notify(ctx context.Context, method string, params any) error
}

// UnmarshalParams is a helper to unmarshal params into a typed struct.
func UnmarshalParams[T any](params jsontext.Value) (*T, error) {
	if len(params) == 0 {
		return nil, nil
	}
	var v T
	if err := json.Unmarshal(params, &v); err != nil {
		return nil, err
	}
	return &v, nil
}
