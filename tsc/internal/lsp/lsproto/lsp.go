package lsproto

import (
	"fmt"
	"net/url"
	"strings"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type DocumentUri string // !!!

func (uri DocumentUri) FileName() string {
	if strings.HasPrefix(string(uri), "file://") {
		parsed := core.Must(url.Parse(string(uri)))
		if parsed.Host != "" {
			return "//" + parsed.Host + parsed.Path
		}
		return fixWindowsURIPath(parsed.Path)
	}

	// Leave all other URIs escaped so we can round-trip them.

	scheme, path, ok := strings.Cut(string(uri), ":")
	if !ok {
		panic(fmt.Sprintf("invalid URI: %s", uri))
	}

	authority := "ts-nul-authority"
	if rest, ok := strings.CutPrefix(path, "//"); ok {
		authority, path, ok = strings.Cut(rest, "/")
		if !ok {
			panic(fmt.Sprintf("invalid URI: %s", uri))
		}
	}

	return "^/" + scheme + "/" + authority + "/" + path
}

func (uri DocumentUri) Path(useCaseSensitiveFileNames bool) tspath.Path {
	fileName := uri.FileName()
	return tspath.ToPath(fileName, "", useCaseSensitiveFileNames)
}

func fixWindowsURIPath(path string) string {
	if rest, ok := strings.CutPrefix(path, "/"); ok {
		if volume, rest, ok := tspath.SplitVolumePath(rest); ok {
			return volume + rest
		}
	}
	return path
}

type HasTextDocumentURI interface {
	TextDocumentURI() DocumentUri
}

type URI string // !!!

type Method string

func unmarshalPtrTo[T any](data []byte) (*T, error) {
	var v T
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal %T: %w", (*T)(nil), err)
	}
	return &v, nil
}

func unmarshalAny(data []byte) (any, error) {
	var v any
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal any: %w", err)
	}
	return v, nil
}

func unmarshalEmpty(data []byte) (any, error) {
	if len(data) != 0 {
		return nil, fmt.Errorf("expected empty, got: %s", string(data))
	}
	return nil, nil
}

func assertOnlyOne(message string, values ...bool) {
	count := 0
	for _, v := range values {
		if v {
			count++
		}
	}
	if count != 1 {
		panic(message)
	}
}

func assertAtMostOne(message string, values ...bool) {
	count := 0
	for _, v := range values {
		if v {
			count++
		}
	}
	if count > 1 {
		panic(message)
	}
}

func ptrTo[T any](v T) *T {
	return &v
}

type requiredProp bool

func (v *requiredProp) UnmarshalJSONFrom(dec *jsontext.Decoder) error {
	*v = true
	return dec.SkipValue()
}

// Inspired by https://www.youtube.com/watch?v=dab3I-HcTVk

type RequestInfo[Params, Resp any] struct {
	_      [0]Params
	_      [0]Resp
	Method Method
}

type NotificationInfo[Params any] struct {
	_      [0]Params
	Method Method
}

type Null struct{}

func (Null) UnmarshalJSONFrom(dec *jsontext.Decoder) error {
	data, err := dec.ReadValue()
	if err != nil {
		return err
	}
	if string(data) != "null" {
		return fmt.Errorf("expected null, got %s", data)
	}
	return nil
}

func (Null) MarshalJSONTo(enc *jsontext.Encoder) error {
	return enc.WriteToken(jsontext.Null)
}
