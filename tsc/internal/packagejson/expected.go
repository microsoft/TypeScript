package packagejson

import (
	"reflect"

	"github.com/go-json-experiment/json"
)

type Expected[T any] struct {
	actualJSONType string
	Null           bool
	Valid          bool
	Value          T
}

func (e *Expected[T]) UnmarshalJSON(data []byte) error {
	if string(data) == "null" {
		*e = Expected[T]{Null: true, actualJSONType: "null"}
		return nil
	}
	if json.Unmarshal(data, &e.Value) == nil {
		e.Valid = true
	}
	switch data[0] {
	case '"':
		e.actualJSONType = "string"
	case 't', 'f':
		e.actualJSONType = "boolean"
	case '[':
		e.actualJSONType = "array"
	case '{':
		e.actualJSONType = "object"
	default:
		e.actualJSONType = "number"
	}
	return nil
}

func (e *Expected[T]) IsPresent() bool {
	return e.actualJSONType != ""
}

func (e *Expected[T]) GetValue() (value T, ok bool) {
	return e.Value, e.Valid
}

func (e *Expected[T]) IsValid() bool {
	return e.Valid
}

func (e *Expected[T]) ExpectedJSONType() string {
	switch reflect.TypeFor[T]().Kind() {
	case reflect.String:
		return "string"
	case reflect.Bool:
		return "boolean"
	case reflect.Slice, reflect.Array:
		return "array"
	case reflect.Map:
		return "object"
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return "number"
	default:
		return "unknown"
	}
}

func (e *Expected[T]) ActualJSONType() string {
	return e.actualJSONType
}

func ExpectedOf[T any](value T) Expected[T] {
	return Expected[T]{Value: value, Valid: true, actualJSONType: (*Expected[T])(nil).ExpectedJSONType()}
}
