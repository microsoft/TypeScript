//nolint:depguard
package json

import (
	"io"
	"slices"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

var allowInvalid []json.Options = slices.Clip([]json.Options{jsontext.AllowInvalidUTF8(true)})

func Marshal(in any, opts ...json.Options) (out []byte, err error) {
	if len(opts) == 0 {
		opts = allowInvalid
	} else {
		opts = append(allowInvalid, opts...)
	}
	return json.Marshal(in, opts...)
}

func MarshalEncode(out typeutil.DefPtr[jsontext.Encoder], in any, opts ...json.Options) (err error) {
	if len(opts) == 0 {
		opts = allowInvalid
	} else {
		opts = append(allowInvalid, opts...)
	}
	return json.MarshalEncode(out, in, opts...)
}

func MarshalWrite(out io.Writer /* ref: nonnil */, in any, opts ...json.Options) (err error) {
	if len(opts) == 0 {
		opts = allowInvalid
	} else {
		opts = append(allowInvalid, opts...)
	}
	return json.MarshalWrite(out, in, opts...)
}

func MarshalIndent(in any, prefix, indent string) (out []byte, err error) {
	if prefix == "" && indent == "" {
		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
		return Marshal(in)
	}
	return Marshal(in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}

func MarshalIndentWrite(out io.Writer /* ref: nonnil */, in any, prefix, indent string) (err error) {
	if prefix == "" && indent == "" {
		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
		return MarshalWrite(out, in)
	}
	return MarshalWrite(out, in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}

func Unmarshal(in []byte, out typeutil.DefAny, opts ...json.Options) (err error) {
	return json.Unmarshal(in, out, opts...)
}

func UnmarshalDecode(in typeutil.DefPtr[jsontext.Decoder], out typeutil.DefAny, opts ...json.Options) (err error) {
	return json.UnmarshalDecode(in, out, opts...)
}

func UnmarshalRead(in io.Reader /* ref: nonnil */, out typeutil.DefAny, opts ...json.Options) (err error) {
	return json.UnmarshalRead(in, out, opts...)
}

func AllowDuplicateNames(allow bool) json.Options {
	return jsontext.AllowDuplicateNames(allow)
}

func Deterministic(v bool) json.Options {
	return json.Deterministic(v)
}

func WithIndent(indent string) json.Options {
	return jsontext.WithIndent(indent)
}

func NewDecoder(r io.Reader /* ref: nonnil */) typeutil.DefPtr[jsontext.Decoder] {
	return typeutil.NonNil(jsontext.NewDecoder(r))
}

type (
	Value           = jsontext.Value
	Kind            = jsontext.Kind
	UnmarshalerFrom = json.UnmarshalerFrom
	MarshalerTo     = json.MarshalerTo
	Decoder         = jsontext.Decoder
	Encoder         = jsontext.Encoder
)

var (
	BeginObject = jsontext.BeginObject
	EndObject   = jsontext.EndObject
	Null        = jsontext.Null
	BeginArray  = jsontext.BeginArray
	EndArray    = jsontext.EndArray
)
