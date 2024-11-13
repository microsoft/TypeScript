package packagejson

import (
	"encoding/json"
	"fmt"

	json2 "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/collections"
)

type JSONValueType int8

const (
	JSONValueTypeNull JSONValueType = iota
	JSONValueTypeString
	JSONValueTypeNumber
	JSONValueTypeBoolean
	JSONValueTypeArray
	JSONValueTypeObject
)

func (t JSONValueType) String() string {
	switch t {
	case JSONValueTypeNull:
		return "null"
	case JSONValueTypeString:
		return "string"
	case JSONValueTypeNumber:
		return "number"
	case JSONValueTypeBoolean:
		return "boolean"
	case JSONValueTypeArray:
		return "array"
	case JSONValueTypeObject:
		return "object"
	default:
		return fmt.Sprintf("unknown(%d)", t)
	}
}

type JSONValue struct {
	Type  JSONValueType
	Value any
}

func (v *JSONValue) AsObject() *collections.Map[string, *JSONValue] {
	if v.Type != JSONValueTypeObject {
		panic(fmt.Sprintf("expected object, got %v", v.Type))
	}
	return v.Value.(*collections.Map[string, *JSONValue])
}

func (v *JSONValue) AsArray() []*JSONValue {
	if v.Type != JSONValueTypeArray {
		panic(fmt.Sprintf("expected array, got %v", v.Type))
	}
	return v.Value.([]*JSONValue)
}

func (v *JSONValue) UnmarshalJSON(data []byte) error {
	return unmarshalJSONValue[JSONValue](v, data)
}

func (v *JSONValue) UnmarshalJSONV2(dec *jsontext.Decoder, opts json2.Options) error {
	return unmarshalJSONValueV2[JSONValue](v, dec, opts)
}

func unmarshalJSONValue[T any](v *JSONValue, data []byte) error {
	if string(data) == "null" {
		*v = JSONValue{Type: JSONValueTypeNull}
	} else if data[0] == '"' {
		v.Type = JSONValueTypeString
		return json.Unmarshal(data, &v.Value)
	} else if data[0] == '[' {
		var elements []*T
		if err := json.Unmarshal(data, &elements); err != nil {
			return err
		}
		v.Type = JSONValueTypeArray
		v.Value = elements
	} else if data[0] == '{' {
		var object collections.Map[string, *T]
		if err := json.Unmarshal(data, &object); err != nil {
			return err
		}
		v.Type = JSONValueTypeObject
		v.Value = &object
	} else if string(data) == "true" {
		v.Type = JSONValueTypeBoolean
		v.Value = true
	} else if string(data) == "false" {
		v.Type = JSONValueTypeBoolean
		v.Value = false
	} else {
		v.Type = JSONValueTypeNumber
		return json.Unmarshal(data, &v.Value)
	}
	return nil
}

func unmarshalJSONValueV2[T any](v *JSONValue, dec *jsontext.Decoder, opts json2.Options) error {
	switch dec.PeekKind() {
	case 'n': // jsontext.Null.Kind()
		if _, err := dec.ReadToken(); err != nil {
			return err
		}
		v.Value = nil
		v.Type = JSONValueTypeNull
		return nil
	case '"':
		v.Type = JSONValueTypeString
		if err := json2.UnmarshalDecode(dec, &v.Value, opts); err != nil {
			return err
		}
	case '[':
		if _, err := dec.ReadToken(); err != nil {
			return err
		}
		var elements []*T
		for dec.PeekKind() != jsontext.ArrayEnd.Kind() {
			var element *T
			if err := json2.UnmarshalDecode(dec, &element, opts); err != nil {
				return err
			}
			elements = append(elements, element)
		}
		if _, err := dec.ReadToken(); err != nil {
			return err
		}
		v.Type = JSONValueTypeArray
		v.Value = elements
	case '{':
		var object collections.Map[string, *T]
		if err := json2.UnmarshalDecode(dec, &object, opts); err != nil {
			return err
		}
		v.Type = JSONValueTypeObject
		v.Value = &object
	case 't', 'f': // jsontext.True.Kind(), jsontext.False.Kind()
		v.Type = JSONValueTypeBoolean
		if err := json2.UnmarshalDecode(dec, &v.Value, opts); err != nil {
			return err
		}
	default:
		v.Type = JSONValueTypeNumber
		if err := json2.UnmarshalDecode(dec, &v.Value, opts); err != nil {
			return err
		}
	}
	return nil
}
