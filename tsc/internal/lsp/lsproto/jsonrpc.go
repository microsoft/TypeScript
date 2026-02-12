package lsproto

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// NewID creates an ID from an IntegerOrString value.
// This wrapper exists because lsproto has its own IntegerOrString type.
func NewID(rawValue IntegerOrString) *jsonrpc.ID {
	if rawValue.String != nil {
		return jsonrpc.NewIDString(*rawValue.String)
	}
	return jsonrpc.NewIDInt(*rawValue.Integer)
}

type Message struct {
	Kind jsonrpc.MessageKind
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
		JSONRPC jsonrpc.JSONRPCVersion `json:"jsonrpc"`
		Method  Method                 `json:"method"`
		ID      *jsonrpc.ID            `json:"id,omitzero"`
		Params  json.Value             `json:"params"`
		// We don't have a method in the response, so we have no idea what to decode.
		// Store the raw text and let the caller decode it.
		Result json.Value             `json:"result,omitzero"`
		Error  *jsonrpc.ResponseError `json:"error,omitzero"`
	}
	if err := json.Unmarshal(data, &raw); err != nil {
		return fmt.Errorf("%w: %w", ErrorCodeInvalidRequest, err)
	}
	if raw.ID != nil && raw.Method == "" {
		m.Kind = jsonrpc.MessageKindResponse
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
	}

	if raw.ID == nil {
		m.Kind = jsonrpc.MessageKindNotification
	} else {
		m.Kind = jsonrpc.MessageKindRequest
	}

	m.msg = &RequestMessage{
		ID:     raw.ID,
		Method: raw.Method,
		Params: params,
	}

	if err != nil {
		return fmt.Errorf("%w: %w", ErrorCodeInvalidParams, err)
	}
	return nil
}

func (m *Message) MarshalJSON() ([]byte, error) {
	return json.Marshal(m.msg)
}

type RequestMessage struct {
	JSONRPC jsonrpc.JSONRPCVersion `json:"jsonrpc"`
	ID      *jsonrpc.ID            `json:"id,omitzero"`
	Method  Method                 `json:"method"`
	Params  any                    `json:"params,omitzero"`
}

func (r *RequestMessage) Message() *Message {
	kind := jsonrpc.MessageKindRequest
	if r.ID == nil {
		kind = jsonrpc.MessageKindNotification
	}
	return &Message{
		Kind: kind,
		msg:  r,
	}
}

func (r *RequestMessage) UnmarshalJSON(data []byte) error {
	var raw struct {
		JSONRPC jsonrpc.JSONRPCVersion `json:"jsonrpc"`
		ID      *jsonrpc.ID            `json:"id"`
		Method  Method                 `json:"method"`
		Params  json.Value             `json:"params"`
	}
	if err := json.Unmarshal(data, &raw); err != nil {
		return fmt.Errorf("%w: %w", ErrorCodeInvalidRequest, err)
	}

	r.ID = raw.ID
	r.Method = raw.Method

	var err error
	r.Params, err = unmarshalParams(raw.Method, raw.Params)
	if err != nil {
		return fmt.Errorf("%w: %w", ErrorCodeInvalidRequest, err)
	}

	return nil
}

type ResponseMessage struct {
	JSONRPC jsonrpc.JSONRPCVersion `json:"jsonrpc"`
	ID      *jsonrpc.ID            `json:"id"`
	Result  any                    `json:"result,omitzero"`
	Error   *jsonrpc.ResponseError `json:"error,omitzero"`
}

func (r *ResponseMessage) Message() *Message {
	return &Message{
		Kind: jsonrpc.MessageKindResponse,
		msg:  r,
	}
}
