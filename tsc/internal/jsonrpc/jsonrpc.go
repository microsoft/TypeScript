// Package jsonrpc provides generic JSON-RPC 2.0 types and utilities
// that can be shared between LSP and other JSON-RPC based protocols.
package jsonrpc

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

// JSONRPCVersion represents the JSON-RPC version field, always "2.0".
type JSONRPCVersion struct{}

const jsonRPCVersion = `"2.0"`

func (JSONRPCVersion) MarshalJSON() ([]byte, error) {
	return []byte(jsonRPCVersion), nil
}

var ErrInvalidJSONRPCVersion = errors.New("invalid JSON-RPC version")

func (*JSONRPCVersion) UnmarshalJSON(data []byte) error {
	if string(data) != jsonRPCVersion {
		return ErrInvalidJSONRPCVersion
	}
	return nil
}

// ID represents a JSON-RPC message ID, which can be either a string or integer.
type ID struct {
	str string
	int int32
}

// NewID creates an ID from an IntegerOrString value.
func NewID(rawValue IntegerOrString) *ID {
	if rawValue.String != nil {
		return &ID{str: *rawValue.String}
	}
	return &ID{int: *rawValue.Integer}
}

// NewIDString creates a string ID.
func NewIDString(str string) *ID {
	return &ID{str: str}
}

// NewIDInt creates an integer ID.
func NewIDInt(i int32) *ID {
	return &ID{int: i}
}

func (id *ID) String() string {
	if id.str != "" {
		return id.str
	}
	return strconv.Itoa(int(id.int))
}

func (id *ID) MarshalJSON() ([]byte, error) {
	if id.str != "" {
		return json.Marshal(id.str)
	}
	return json.Marshal(id.int)
}

func (id *ID) UnmarshalJSON(data []byte) error {
	*id = ID{}
	if len(data) > 0 && data[0] == '"' {
		return json.Unmarshal(data, &id.str)
	}
	return json.Unmarshal(data, &id.int)
}

func (id *ID) TryInt() (int32, bool) {
	if id == nil || id.str != "" {
		return 0, false
	}
	return id.int, true
}

func (id *ID) MustInt() int32 {
	if id.str != "" {
		panic("ID is not an integer")
	}
	return id.int
}

// IntegerOrString is a helper type for creating IDs.
type IntegerOrString struct {
	Integer *int32
	String  *string
}

// ResponseError represents a JSON-RPC error response.
type ResponseError struct {
	Code    int32  `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitzero"`
}

func (r *ResponseError) String() string {
	if r == nil {
		return ""
	}
	data, err := json.Marshal(r.Data)
	if err != nil {
		return fmt.Sprintf("[%d]: %s\n%v", r.Code, r.Message, data)
	}
	return fmt.Sprintf("[%d]: %s", r.Code, r.Message)
}

func (r *ResponseError) Error() string {
	return r.String()
}

// Standard JSON-RPC error codes.
const (
	CodeParseError     int32 = -32700
	CodeInvalidRequest int32 = -32600
	CodeMethodNotFound int32 = -32601
	CodeInvalidParams  int32 = -32602
	CodeInternalError  int32 = -32603
)

// MessageKind indicates what type of message this is.
type MessageKind int

const (
	MessageKindNotification MessageKind = iota
	MessageKindRequest
	MessageKindResponse
)

// Message represents a raw JSON-RPC message that can be a request, notification, or response.
// Unlike lsproto.Message, this keeps params/result as raw JSON for generic handling.
type Message struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id,omitzero"`
	Method  string         `json:"method,omitzero"`
	Params  jsontext.Value `json:"params,omitzero"`
	Result  jsontext.Value `json:"result,omitzero"`
	Error   *ResponseError `json:"error,omitzero"`
}

// Kind returns the kind of message this is.
func (m *Message) Kind() MessageKind {
	if m.ID != nil && m.Method == "" {
		return MessageKindResponse
	}
	if m.ID == nil {
		return MessageKindNotification
	}
	return MessageKindRequest
}

// IsRequest returns true if this message is a request (has ID and method).
func (m *Message) IsRequest() bool {
	return m.ID != nil && m.Method != ""
}

// IsNotification returns true if this message is a notification (has method but no ID).
func (m *Message) IsNotification() bool {
	return m.ID == nil && m.Method != ""
}

// IsResponse returns true if this message is a response (has ID but no method).
func (m *Message) IsResponse() bool {
	return m.ID != nil && m.Method == ""
}

// RequestMessage is a convenience type for creating request/notification messages.
type RequestMessage struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id,omitzero"`
	Method  string         `json:"method"`
	Params  any            `json:"params,omitzero"`
}

// ResponseMessage is a convenience type for creating response messages.
type ResponseMessage struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id,omitzero"`
	Result  any            `json:"result,omitzero"`
	Error   *ResponseError `json:"error,omitzero"`
}
