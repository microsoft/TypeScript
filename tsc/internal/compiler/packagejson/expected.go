package packagejson

import (
	"encoding/json"
)

type Expected[T any] struct {
	Null  bool
	Valid bool
	Value T
}

func (e *Expected[T]) UnmarshalJSON(data []byte) error {
	if string(data) == "null" {
		*e = Expected[T]{Null: true}
		return nil
	}
	if json.Unmarshal(data, &e.Value) == nil {
		e.Valid = true
	}
	return nil
}
