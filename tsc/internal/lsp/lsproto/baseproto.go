package lsproto

import (
	"bufio"
	"bytes"
	"errors"
	"fmt"
	"io"
	"strconv"
)

// https://microsoft.github.io/language-server-protocol/specifications/base/0.9/specification/

var (
	ErrInvalidHeader        = errors.New("lsp: invalid header")
	ErrInvalidContentLength = errors.New("lsp: invalid content length")
	ErrNoContentLength      = errors.New("lsp: no content length")
)

type BaseReader struct {
	r *bufio.Reader
}

func NewBaseReader(r io.Reader) *BaseReader {
	return &BaseReader{
		r: bufio.NewReader(r),
	}
}

func (r *BaseReader) Read() ([]byte, error) {
	var contentLength int64

	for {
		line, err := r.r.ReadBytes('\n')
		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil, io.EOF
			}
			return nil, fmt.Errorf("lsp: read header: %w", err)
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
		return nil, fmt.Errorf("lsp: read content: %w", err)
	}

	return data, nil
}

type BaseWriter struct {
	w *bufio.Writer
}

func NewBaseWriter(w io.Writer) *BaseWriter {
	return &BaseWriter{
		w: bufio.NewWriter(w),
	}
}

func (w *BaseWriter) Write(data []byte) error {
	if _, err := fmt.Fprintf(w.w, "Content-Length: %d\r\n\r\n", len(data)); err != nil {
		return err
	}
	if _, err := w.w.Write(data); err != nil {
		return err
	}
	return w.w.Flush()
}
