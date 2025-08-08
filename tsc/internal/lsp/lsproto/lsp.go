package lsproto

import (
	"fmt"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

type DocumentUri string // !!!

type URI string // !!!

type Method string

func unmarshalPtrTo[T any](data []byte) (*T, error) {
	var v T
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal %T: %w", (*T)(nil), err)
	}
	return &v, nil
}

func unmarshalAny(data []byte) (any, error) {
	var v any
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal any: %w", err)
	}
	return v, nil
}

func unmarshalEmpty(data []byte) (any, error) {
	if len(data) != 0 {
		return nil, fmt.Errorf("expected empty, got: %s", string(data))
	}
	return nil, nil
}

func assertOnlyOne(message string, values ...bool) {
	count := 0
	for _, v := range values {
		if v {
			count++
		}
	}
	if count != 1 {
		panic(message)
	}
}

func assertAtMostOne(message string, values ...bool) {
	count := 0
	for _, v := range values {
		if v {
			count++
		}
	}
	if count > 1 {
		panic(message)
	}
}

func ptrTo[T any](v T) *T {
	return &v
}

type requiredProp bool

func (v *requiredProp) UnmarshalJSONFrom(dec *jsontext.Decoder) error {
	*v = true
	return dec.SkipValue()
}

// Inspired by https://www.youtube.com/watch?v=dab3I-HcTVk

type RequestInfo[Params, Resp any] struct {
	_      [0]Params
	_      [0]Resp
	Method Method
}

type NotificationInfo[Params any] struct {
	_      [0]Params
	Method Method
}

type Null struct{}

func (Null) UnmarshalJSONFrom(dec *jsontext.Decoder) error {
	data, err := dec.ReadValue()
	if err != nil {
		return err
	}
	if string(data) != "null" {
		return fmt.Errorf("expected null, got %s", data)
	}
	return nil
}

func (Null) MarshalJSONTo(enc *jsontext.Encoder) error {
	return enc.WriteToken(jsontext.Null)
}
