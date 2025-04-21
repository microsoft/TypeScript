package lsproto

import (
	"encoding/json"
	"errors"
	"fmt"
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

func (id *ID) MustInt() int32 {
	if id.str != "" {
		panic("ID is not an integer")
	}
	return id.int
}

// TODO(jakebailey): NotificationMessage? Use RequestMessage without ID?

type RequestMessage struct {
	JSONRPC JSONRPCVersion `json:"jsonrpc"`
	ID      *ID            `json:"id"`
	Method  Method         `json:"method"`
	Params  any            `json:"params"`
}

func (r *RequestMessage) UnmarshalJSON(data []byte) error {
	var raw struct {
		JSONRPC JSONRPCVersion  `json:"jsonrpc"`
		ID      *ID             `json:"id"`
		Method  Method          `json:"method"`
		Params  json.RawMessage `json:"params"`
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
	ID      *ID            `json:"id,omitempty"`
	Result  any            `json:"result"`
	Error   *ResponseError `json:"error,omitempty"`
}

type ResponseError struct {
	Code    int32  `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}
