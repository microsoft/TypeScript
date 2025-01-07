package packagejson

import (
	json2 "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/collections"
)

type exportsObjectKind int8

const (
	exportsObjectKindUnknown exportsObjectKind = iota
	exportsObjectKindSubpaths
	exportsObjectKindConditions
	exportsObjectKindInvalid
)

type Exports struct {
	JSONValue
	objectKind exportsObjectKind
}

func (e *Exports) UnmarshalJSON(data []byte) error {
	return unmarshalJSONValue[Exports](&e.JSONValue, data)
}

func (e *Exports) UnmarshalJSONV2(dec *jsontext.Decoder, opts json2.Options) error {
	return unmarshalJSONValueV2[Exports](&e.JSONValue, dec, opts)
}

func (e Exports) AsObject() *collections.OrderedMap[string, Exports] {
	if e.Type != JSONValueTypeObject {
		panic("expected object")
	}
	return e.Value.(*collections.OrderedMap[string, Exports])
}

func (e Exports) AsArray() []Exports {
	if e.Type != JSONValueTypeArray {
		panic("expected array")
	}
	return e.Value.([]Exports)
}

func (e Exports) IsSubpaths() bool {
	e.initObjectKind()
	return e.objectKind == exportsObjectKindSubpaths
}

func (e Exports) IsConditions() bool {
	e.initObjectKind()
	return e.objectKind == exportsObjectKindConditions
}

func (e *Exports) initObjectKind() {
	if e.objectKind == exportsObjectKindUnknown && e.Type == JSONValueTypeObject {
		if obj := e.AsObject(); obj.Size() > 0 {
			seenDot, seenNonDot := false, false
			for k := range obj.Keys() {
				if len(k) > 0 {
					seenDot = seenDot || k[0] == '.'
					seenNonDot = seenNonDot || k[0] != '.'
					if seenDot && seenNonDot {
						e.objectKind = exportsObjectKindInvalid
						return
					}
				}
			}
			if seenDot {
				e.objectKind = exportsObjectKindSubpaths
				return
			}
		}
		e.objectKind = exportsObjectKindConditions
	}
}
