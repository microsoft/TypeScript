package lsproto

import (
	"io"

	"github.com/microsoft/typescript-go/internal/jsonrpc"
)

// https://microsoft.github.io/language-server-protocol/specifications/base/0.9/specification/

// BaseReader wraps jsonrpc.Reader for backwards compatibility.
type BaseReader struct {
	*jsonrpc.Reader
}

// NewBaseReader creates a new BaseReader.
func NewBaseReader(r io.Reader) *BaseReader {
	return &BaseReader{
		Reader: jsonrpc.NewReader(r),
	}
}

// BaseWriter wraps jsonrpc.Writer for backwards compatibility.
type BaseWriter struct {
	*jsonrpc.Writer
}

// NewBaseWriter creates a new BaseWriter.
func NewBaseWriter(w io.Writer) *BaseWriter {
	return &BaseWriter{
		Writer: jsonrpc.NewWriter(w),
	}
}
