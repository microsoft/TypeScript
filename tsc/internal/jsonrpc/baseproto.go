package jsonrpc

import (
	"bufio"
	"bytes"
	"errors"
	"fmt"
	"io"
	"strconv"
)

// Base protocol for JSON-RPC with Content-Length headers (as used by LSP).
// https://microsoft.github.io/language-server-protocol/specifications/base/0.9/specification/

var (
	ErrInvalidHeader        = errors.New("jsonrpc: invalid header")
	ErrInvalidContentLength = errors.New("jsonrpc: invalid content length")
	ErrNoContentLength      = errors.New("jsonrpc: no content length")
)

// Reader reads JSON-RPC messages with Content-Length framing.
type Reader struct {
	r *bufio.Reader
}

// NewReader creates a new Reader.
func NewReader(r io.Reader) *Reader {
	return &Reader{
		r: bufio.NewReader(r),
	}
}

// Read reads the next message payload.
func (r *Reader) Read() ([]byte, error) {
	var contentLength int64

	for {
		line, err := r.r.ReadBytes('\n')
		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil, io.EOF
			}
			return nil, fmt.Errorf("jsonrpc: read header: %w", err)
		}

		if bytes.Equal(line, []byte("\r\n")) {
			break
		}

		key, value, ok := bytes.Cut(line, []byte(":"))
		if !ok {
			return nil, fmt.Errorf("%w: %q", ErrInvalidHeader, line)
		}

		if bytes.Equal(key, []byte("Content-Length")) {
			contentLength, err = strconv.ParseInt(string(bytes.TrimSpace(value)), 10, 64)
			if err != nil {
				return nil, fmt.Errorf("%w: parse error: %w", ErrInvalidContentLength, err)
			}
			if contentLength < 0 {
				return nil, fmt.Errorf("%w: negative value %d", ErrInvalidContentLength, contentLength)
			}
		}
	}

	if contentLength <= 0 {
		return nil, ErrNoContentLength
	}

	data := make([]byte, contentLength)
	if _, err := io.ReadFull(r.r, data); err != nil {
		return nil, fmt.Errorf("jsonrpc: read content: %w", err)
	}

	return data, nil
}

// Writer writes JSON-RPC messages with Content-Length framing.
type Writer struct {
	w *bufio.Writer
}

// NewWriter creates a new Writer.
func NewWriter(w io.Writer) *Writer {
	return &Writer{
		w: bufio.NewWriter(w),
	}
}

// Write writes a message payload with Content-Length header.
func (w *Writer) Write(data []byte) error {
	if _, err := fmt.Fprintf(w.w, "Content-Length: %d\r\n\r\n", len(data)); err != nil {
		return err
	}
	if _, err := w.w.Write(data); err != nil {
		return err
	}
	return w.w.Flush()
}
