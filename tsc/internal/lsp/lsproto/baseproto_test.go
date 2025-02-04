package lsproto_test

import (
	"bytes"
	"errors"
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestBaseReader(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name  string
		input []byte
		value []byte
		err   string
	}{
		{
			name:  "empty",
			input: []byte("Content-Length: 0\r\n\r\n"),
			err:   "lsp: no content length",
		},
		{
			name:  "early end",
			input: []byte("oops"),
			err:   "EOF",
		},
		{
			name:  "negative length",
			input: []byte("Content-Length: -1\r\n\r\n"),
			err:   "lsp: invalid content length: negative value -1",
		},
		{
			name:  "invalid content",
			input: []byte("Content-Length: 1\r\n\r\n{"),
			value: []byte("{"),
		},
		{
			name:  "valid content",
			input: []byte("Content-Length: 2\r\n\r\n{}"),
			value: []byte("{}"),
		},
		{
			name:  "extra header values",
			input: []byte("Content-Length: 2\r\nExtra: 1\r\n\r\n{}"),
			value: []byte("{}"),
		},
		{
			name:  "too long content length",
			input: []byte("Content-Length: 100\r\n\r\n{}"),
			err:   "lsp: read content: unexpected EOF",
		},
		{
			name:  "missing content length",
			input: []byte("Content-Length: \r\n\r\n{}"),
			err:   "lsp: invalid content length: parse error: strconv.ParseInt: parsing \"\": invalid syntax",
		},
		{
			name:  "invalid header",
			input: []byte("Nope\r\n\r\n{}"),
			err:   "lsp: invalid header: \"Nope\\r\\n\"",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			r := lsproto.NewBaseReader(bytes.NewReader(tt.input))

			out, err := r.Read()
			if tt.err != "" {
				assert.Error(t, err, tt.err)
			}
			assert.DeepEqual(t, out, tt.value)
		})
	}
}

func TestBaseReaderMultipleReads(t *testing.T) {
	t.Parallel()

	data := []byte(
		"Content-Length: 4\r\n\r\n1234" +
			"Content-Length: 2\r\n\r\n{}",
	)
	r := lsproto.NewBaseReader(bytes.NewReader(data))

	v1, err := r.Read()
	assert.NilError(t, err)
	assert.DeepEqual(t, v1, []byte("1234"))

	v2, err := r.Read()
	assert.NilError(t, err)
	assert.DeepEqual(t, v2, []byte("{}"))

	_, err = r.Read()
	assert.Error(t, err, "EOF")
}

type errorReader struct{}

func (*errorReader) Read([]byte) (int, error) {
	return 0, errors.New("test error")
}

func TestBaseWriter(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name  string
		value []byte
		input []byte
	}{
		{
			name:  "empty",
			value: []byte("{}"),
			input: []byte("Content-Length: 2\r\n\r\n{}"),
		},
		{
			name:  "bigger object",
			value: []byte("{\"key\":\"value\"}"),
			input: []byte("Content-Length: 15\r\n\r\n{\"key\":\"value\"}"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var b bytes.Buffer
			w := lsproto.NewBaseWriter(&b)
			err := w.Write(tt.value)
			assert.NilError(t, err)
			assert.DeepEqual(t, b.Bytes(), tt.input)
		})
	}
}

func TestBaseWriterWriteError(t *testing.T) {
	t.Parallel()

	w := lsproto.NewBaseWriter(&errorWriter{})
	err := w.Write([]byte("{}"))
	assert.Error(t, err, "test error")
}

type errorWriter struct{}

func (*errorWriter) Write([]byte) (int, error) {
	return 0, errors.New("test error")
}
