package packagejson

import (
	json2 "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/collections"
)

type objectKind int8

const (
	objectKindUnknown objectKind = iota
	objectKindSubpaths
	objectKindConditions
	objectKindImports
	objectKindInvalid
)

type ExportsOrImports struct {
	JSONValue
	objectKind objectKind
}

func (e *ExportsOrImports) UnmarshalJSON(data []byte) error {
	return unmarshalJSONValue[ExportsOrImports](&e.JSONValue, data)
}

func (e *ExportsOrImports) UnmarshalJSONV2(dec *jsontext.Decoder, opts json2.Options) error {
	return unmarshalJSONValueV2[ExportsOrImports](&e.JSONValue, dec, opts)
}

func (e ExportsOrImports) AsObject() *collections.OrderedMap[string, ExportsOrImports] {
	if e.Type != JSONValueTypeObject {
		panic("expected object")
	}
	return e.Value.(*collections.OrderedMap[string, ExportsOrImports])
}

func (e ExportsOrImports) AsArray() []ExportsOrImports {
	if e.Type != JSONValueTypeArray {
		panic("expected array")
	}
	return e.Value.([]ExportsOrImports)
}

func (e ExportsOrImports) IsSubpaths() bool {
	e.initObjectKind()
	return e.objectKind == objectKindSubpaths
}

func (e ExportsOrImports) IsImports() bool {
	e.initObjectKind()
	return e.objectKind == objectKindImports
}

func (e ExportsOrImports) IsConditions() bool {
	e.initObjectKind()
	return e.objectKind == objectKindConditions
}

func (e *ExportsOrImports) initObjectKind() {
	if e.objectKind == objectKindUnknown && e.Type == JSONValueTypeObject {
		if obj := e.AsObject(); obj.Size() > 0 {
			seenDot, seenHash, seenOther := false, false, false
			for k := range obj.Keys() {
				if len(k) > 0 {
					seenDot = seenDot || k[0] == '.'
					seenHash = seenHash || k[0] == '#'
					seenOther = seenOther || (k[0] != '.' && k[0] != '#')
					if seenOther && (seenDot || seenHash) {
						e.objectKind = objectKindInvalid
						return
					}
				}
			}
			if seenDot {
				e.objectKind = objectKindSubpaths
				return
			}
			if seenHash {
				e.objectKind = objectKindImports
				return
			}
		}
		e.objectKind = objectKindConditions
	}
}
