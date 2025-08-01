package json

import (
	"io"

	jsonv2 "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

func Marshal(in any, opts ...jsonv2.Options) (out []byte, err error) {
	return jsonv2.Marshal(in, opts...)
}

func MarshalEncode(out *jsontext.Encoder, in any, opts ...jsonv2.Options) (err error) {
	return jsonv2.MarshalEncode(out, in, opts...)
}

func MarshalWrite(out io.Writer, in any, opts ...jsonv2.Options) (err error) {
	return jsonv2.MarshalWrite(out, in, opts...)
}

func MarshalIndent(in any, prefix, indent string) (out []byte, err error) {
	if prefix == "" && indent == "" {
		return Marshal(in)
	}
	return Marshal(in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}

func MarshalIndentWrite(out io.Writer, in any, prefix, indent string) (err error) {
	if prefix == "" && indent == "" {
		return MarshalWrite(out, in)
	}
	return MarshalWrite(out, in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}

func Unmarshal(in []byte, out any, opts ...jsonv2.Options) (err error) {
	return jsonv2.Unmarshal(in, out, opts...)
}

func UnmarshalDecode(in *jsontext.Decoder, out any, opts ...jsonv2.Options) (err error) {
	return jsonv2.UnmarshalDecode(in, out, opts...)
}

func UnmarshalRead(in io.Reader, out any, opts ...jsonv2.Options) (err error) {
	return jsonv2.UnmarshalRead(in, out, opts...)
}

type (
	Value           = jsontext.Value
	UnmarshalerFrom = jsonv2.UnmarshalerFrom
	MarshalerTo     = jsonv2.MarshalerTo
)
