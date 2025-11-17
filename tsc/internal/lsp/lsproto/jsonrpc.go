package lsproto

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

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

type ID struct {
	str string
	int int32
}

func NewID(rawValue IntegerOrString) *ID {
	if rawValue.String != nil {
		return &ID{str: *rawValue.String}
	}
	return &ID{int: *rawValue.Integer}
}

func NewIDString(str string) *ID {
	return &ID{str: str}
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

type MessageKind int

const (
	MessageKindNotification MessageKind = iota
	MessageKindRequest
	MessageKindResponse
)

type Message struct {
	Kind MessageKind
	msg  any
}

func (m *Message) AsRequest() *RequestMessage {
	return m.msg.(*RequestMessage)
}

func (m *Message) AsResponse() *ResponseMessage {
	return m.msg.(*ResponseMessage)
}

func (m *Message) UnmarshalJSON(data []byte) error {
	var raw struct {
		JSONRPC JSONRPCVersion `json:"jsonrpc"`
		Method  Method         `json:"method"`
		ID      *ID            `json:"id,omitzero"`
		Params  jsontext.Value `json:"params"`
		// We don't have a method in the response, so we have no idea what to decode.
		// Store the raw text and let the caller decode it.
		Result jsontext.Value `json:"result,omitzero"`
		Error  *ResponseError `json:"error,omitzero"`
	}
	if err := json.Unmarshal(data, &raw); err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidRequest, err)
	}
	if raw.ID != nil && raw.Method == "" {
		m.Kind = MessageKindResponse
		m.msg = &ResponseMessage{
			ID:     raw.ID,
			Result: raw.Result,
			Error:  raw.Error,
		}
		return nil
	}

	var params any
	var err error
	if len(raw.Params) > 0 {
		params, err = unmarshalParams(raw.Method, raw.Params)
		if err != nil {
			return fmt.Errorf("%w: %w", ErrInvalidRequest, err)
		}
	}

	if raw.ID == nil {
		m.Kind = MessageKindNotification
	} else {
		m.Kind = MessageKindRequest
	}

	m.msg = &RequestMessage{
		ID:     raw.ID,
		Method: raw.Method,
		Params: params,
	}

	return nil
}

func (m *Message) MarshalJSON() ([]byte, error) {
	return json.Marshal(m.msg)
}

type RequestMessage struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id,omitzero"`
	Method  Method         `json:"method"`
	Params  any            `json:"params,omitzero"`
}

func (r *RequestMessage) Message() *Message {
	return &Message{
		Kind: MessageKindRequest,
		msg:  r,
	}
}

func (r *RequestMessage) UnmarshalJSON(data []byte) error {
	var raw struct {
		JSONRPC JSONRPCVersion `json:"jsonrpc"`
		ID      *ID            `json:"id"`
		Method  Method         `json:"method"`
		Params  jsontext.Value `json:"params"`
	}
	if err := json.Unmarshal(data, &raw); err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidRequest, err)
	}

	r.ID = raw.ID
	r.Method = raw.Method

	var err error
	r.Params, err = unmarshalParams(raw.Method, raw.Params)
	if err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidRequest, err)
	}

	return nil
}

type ResponseMessage struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id,omitzero"`
	Result  any            `json:"result,omitzero"`
	Error   *ResponseError `json:"error,omitzero"`
}

func (r *ResponseMessage) Message() *Message {
	return &Message{
		Kind: MessageKindResponse,
		msg:  r,
	}
}

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
