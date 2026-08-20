package lsproto

import (
	"fmt"
	"reflect"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/json"
)

// This file provides a single reflection-driven object decoder that replaces
// the per-type UnmarshalJSONFrom methods the generator emits for plain
// structs. It preserves the same strictness those methods enforce: the value
// must be an object, all required fields must be present, and a JSON null is
// rejected for nilable fields whose spec is not nullable. Required fields, and
// the rare spec-nullable fields, are marked with an `lsp:"required"` /
// `lsp:"nullable"` struct tag (the spec nullability that decides this is not
// otherwise recoverable from the json tag); any other nilable field rejects
// null by default. The per-type spec is resolved once via reflection and
// cached, so the only per-call work is the object scan.

type structFieldSpec struct {
	index      int
	requiredID int // bit position among required fields, or -1
	rejectNull bool
}

type structSpec struct {
	byName        map[string]structFieldSpec
	requiredNames []string
	requiredMask  uint64
}

type structDecoder struct {
	rv   reflect.Value
	spec *structSpec
	seen uint64
}

var structSpecCache sync.Map // reflect.Type -> *structSpec

func specFor(t reflect.Type) *structSpec {
	if cached, ok := structSpecCache.Load(t); ok {
		return cached.(*structSpec)
	}
	spec := &structSpec{byName: make(map[string]structFieldSpec, t.NumField())}
	for i := range t.NumField() {
		f := t.Field(i)
		jsonName, _, _ := strings.Cut(f.Tag.Get("json"), ",")
		if jsonName == "" || jsonName == "-" {
			continue
		}
		fs := structFieldSpec{index: i, requiredID: -1}
		var nullable bool
		for marker := range strings.SplitSeq(f.Tag.Get("lsp"), ",") {
			switch marker {
			case "required":
				fs.requiredID = len(spec.requiredNames)
				spec.requiredMask |= 1 << fs.requiredID
				spec.requiredNames = append(spec.requiredNames, jsonName)
			case "nullable":
				nullable = true
			}
		}
		// A nilable field (pointer/slice/map) rejects an explicit JSON null
		// unless the spec marks it nullable.
		switch f.Type.Kind() {
		case reflect.Pointer, reflect.Slice, reflect.Map:
			fs.rejectNull = !nullable
		}
		spec.byName[jsonName] = fs
	}
	actual, _ := structSpecCache.LoadOrStore(t, spec)
	return actual.(*structSpec)
}

func newStructDecoder(v any) *structDecoder {
	rv := reflect.ValueOf(v).Elem()
	return &structDecoder{
		rv:   rv,
		spec: specFor(rv.Type()),
	}
}

func (d *structDecoder) field(name string, kind json.Kind, decode func(any) error) error {
	fs, ok := d.spec.byName[name]
	if !ok {
		return decode(nil)
	}
	if fs.requiredID >= 0 {
		d.seen |= 1 << fs.requiredID
	}
	if fs.rejectNull && kind == 'n' {
		return errNull(name)
	}
	return decode(d.rv.Field(fs.index).Addr().Interface())
}

func (d *structDecoder) finish() error {
	if missing := d.spec.requiredMask &^ d.seen; missing != 0 {
		var missingProps []string
		for id, n := range d.spec.requiredNames {
			if missing&(1<<id) != 0 {
				missingProps = append(missingProps, n)
			}
		}
		return errMissing(missingProps)
	}
	return nil
}

// unmarshalStruct decodes a JSON object into the struct pointed to by v,
// enforcing object-kind, required-field, and non-nullable-field strictness as
// declared by lsp struct tags. Up to 64 required fields are supported.
func unmarshalStruct(v any, dec *json.Decoder) error {
	d := newStructDecoder(v)

	if k := dec.PeekKind(); k != '{' {
		return errNotObject(k)
	}
	if _, err := dec.ReadToken(); err != nil {
		return err
	}

	for dec.PeekKind() != '}' {
		name, err := dec.ReadValue()
		if err != nil {
			return err
		}
		// name includes surrounding quotes; m[string(b)] is a no-alloc lookup.
		if err := d.field(string(name[1:len(name)-1]), dec.PeekKind(), func(out any) error {
			if out == nil {
				return dec.SkipValue()
			}
			return json.UnmarshalDecode(dec, out)
		}); err != nil {
			return err
		}
	}
	if _, err := dec.ReadToken(); err != nil {
		return err
	}

	return d.finish()
}

type deferredStructField struct {
	name  string
	value json.Value
}

// unmarshalDiscriminatedStruct selects a concrete struct using one of its
// fields. Fields after the discriminator decode directly from dec; only fields
// that precede it are retained and replayed.
func unmarshalDiscriminatedStruct(
	dec *json.Decoder,
	typeName string,
	discriminator string,
	newTarget func(json.Value) any,
) (any, error) {
	if k := dec.PeekKind(); k != '{' {
		return nil, errNotObject(k)
	}
	if _, err := dec.ReadToken(); err != nil {
		return nil, err
	}

	var deferred []deferredStructField
	var target any
	var targetDecoder *structDecoder
	for dec.PeekKind() != '}' {
		rawName, err := dec.ReadValue()
		if err != nil {
			return nil, err
		}
		name := string(rawName[1 : len(rawName)-1])

		if targetDecoder == nil {
			value, err := dec.ReadValue()
			if err != nil {
				return nil, err
			}
			if name != discriminator {
				deferred = append(deferred, deferredStructField{name: name, value: value.Clone()})
				continue
			}

			target = newTarget(value)
			if target == nil {
				return nil, fmt.Errorf("invalid %s discriminator %q: %s", typeName, discriminator, value)
			}
			targetDecoder = newStructDecoder(target)
			// newTarget validates the string literal discriminator. Mark it as
			// seen without reparsing it into the generated zero-sized literal type.
			if err := targetDecoder.field(name, value.Kind(), func(any) error { return nil }); err != nil {
				return nil, err
			}
			for _, field := range deferred {
				if err := targetDecoder.field(field.name, field.value.Kind(), func(out any) error {
					if out == nil {
						return nil
					}
					return json.Unmarshal(field.value, out)
				}); err != nil {
					return nil, err
				}
			}
			deferred = nil
			continue
		}

		if err := targetDecoder.field(name, dec.PeekKind(), func(out any) error {
			if out == nil {
				return dec.SkipValue()
			}
			return json.UnmarshalDecode(dec, out)
		}); err != nil {
			return nil, err
		}
	}
	if _, err := dec.ReadToken(); err != nil {
		return nil, err
	}

	if targetDecoder == nil {
		target = newTarget(nil)
		if target == nil {
			return nil, fmt.Errorf("invalid %s: missing discriminator %q", typeName, discriminator)
		}
		targetDecoder = newStructDecoder(target)
		for _, field := range deferred {
			if err := targetDecoder.field(field.name, field.value.Kind(), func(out any) error {
				if out == nil {
					return nil
				}
				return json.Unmarshal(field.value, out)
			}); err != nil {
				return nil, err
			}
		}
	}
	if err := targetDecoder.finish(); err != nil {
		return nil, err
	}
	return target, nil
}

// marshalUnion encodes a union struct whose fields are all pointers, exactly
// one of which is set. It writes the single non-nil field; if nullable, an
// empty union marshals as null, otherwise an empty union is a programming
// error. The name is only used for the panic message.
func marshalUnion(v any, enc *json.Encoder, name string, nullable bool) error {
	rv := reflect.ValueOf(v).Elem()
	var set reflect.Value
	count := 0
	for _, f := range rv.Fields() {
		if !f.IsNil() {
			count++
			if !set.IsValid() {
				set = f
			}
		}
	}
	if nullable {
		assertAtMostOne("more than one element of "+name+" is set", count)
		if !set.IsValid() {
			return enc.WriteToken(json.Null)
		}
	} else {
		assertOnlyOne("exactly one element of "+name+" should be set", count)
	}
	return json.MarshalEncode(enc, set.Interface())
}

// countNonNil returns the number of non-nil pointer/slice/map fields in the
// struct pointed to by v. Used to assert externally-tagged unions have exactly
// one arm set.
func countNonNil(v any) int {
	rv := reflect.ValueOf(v).Elem()
	count := 0
	for _, f := range rv.Fields() {
		if !f.IsNil() {
			count++
		}
	}
	return count
}
