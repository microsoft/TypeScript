package jsonutil

import (
	"io"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

func MarshalIndent(in any, prefix, indent string) (out []byte, err error) {
	if prefix == "" && indent == "" {
		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
		return json.Marshal(in)
	}
	return json.Marshal(in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}

func MarshalIndentWrite(out io.Writer, in any, prefix, indent string) (err error) {
	if prefix == "" && indent == "" {
		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
		return json.MarshalWrite(out, in)
	}
	return json.MarshalWrite(out, in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
}
