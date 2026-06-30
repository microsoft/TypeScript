package lsproto

import (
	"bytes"
	"context"
	"fmt"
	"net/url"
	"strings"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/json"

	"github.com/microsoft/typescript-go/internal/jsonrpc"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type DocumentUri string // !!!

func (uri DocumentUri) FileName() string {
	if bundled.IsBundled(string(uri)) {
		return string(uri)
	}
	if strings.HasPrefix(string(uri), "file://") {
		parsed, err := url.Parse(string(uri))
		if err != nil {
			panic(fmt.Sprintf("invalid file URI: %s", uri))
		}
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

type HasTextDocumentPosition interface {
	HasTextDocumentURI
	TextDocumentPosition() Position
}

type HasLocations interface {
	GetLocations() *[]Location
}

type HasLocation interface {
	GetLocation() Location
}

type URI string // !!!

type Method string

func errNotObject(k json.Kind) error {
	return fmt.Errorf("expected object start, but encountered %v", k)
}

func errNull(field string) error {
	return fmt.Errorf("null value is not allowed for field %q", field)
}

func errMissing(props []string) error {
	return fmt.Errorf("missing required properties: %s", strings.Join(props, ", "))
}

func errInvalidKind(typeName string, got json.Kind) error {
	return fmt.Errorf("invalid %s: got %v", typeName, got)
}

func errInvalidValue(typeName string, data []byte) error {
	return fmt.Errorf("invalid %s: %s", typeName, data)
}

func errLiteralMismatch(typeName string, expected string, got []byte) error {
	return fmt.Errorf("expected %s value %s, got %s", typeName, expected, got)
}

func assertOnlyOne(message string, count int) {
	if count != 1 {
		panic(message)
	}
}

func assertAtMostOne(message string, count int) {
	if count > 1 {
		panic(message)
	}
}

// jsonKeyCheck compares a raw JSON key token (including quotes) against a Go string.
func jsonKeyCheck(name []byte, key string) bool {
	return len(name) == len(key)+2 && name[0] == '"' && string(name[1:len(name)-1]) == key
}

// jsonObjectRawField scans the top-level keys of a JSON object looking for the
// given field name, and returns its raw JSON value (e.g. `"full"` with quotes).
// Returns nil if the field is not found.
func jsonObjectRawField(data []byte, field string) json.Value {
	dec := json.NewDecoder(bytes.NewBuffer(data))
	if dec.PeekKind() != '{' {
		return nil
	}
	if _, err := dec.ReadToken(); err != nil {
		return nil
	}
	for dec.PeekKind() != '}' {
		name, err := dec.ReadValue()
		if err != nil {
			return nil
		}
		if jsonKeyCheck(name, field) {
			val, err := dec.ReadValue()
			if err != nil {
				return nil
			}
			return val
		}
		if err := dec.SkipValue(); err != nil {
			return nil
		}
	}
	return nil
}

// jsonObjectHasKey scans the top-level keys of a JSON object looking for any of the
// given keys. Returns the index of the first key found, or -1 if none match.
// Bails early on first match without decoding any values.
func jsonObjectHasKey(data []byte, keys ...string) int {
	dec := json.NewDecoder(bytes.NewBuffer(data))
	if dec.PeekKind() != '{' {
		return -1
	}
	if _, err := dec.ReadToken(); err != nil {
		return -1
	}
	for dec.PeekKind() != '}' {
		name, err := dec.ReadValue()
		if err != nil {
			return -1
		}
		for i, key := range keys {
			if jsonKeyCheck(name, key) {
				return i
			}
		}
		if err := dec.SkipValue(); err != nil {
			return -1
		}
	}
	return -1
}

// Inspired by https://www.youtube.com/watch?v=dab3I-HcTVk

type RequestInfo[Params, Resp any] struct {
	_      [0]Params
	_      [0]Resp
	Method Method
}

func (info RequestInfo[Params, Resp]) UnmarshalResult(result any) (Resp, error) {
	raw, ok := result.(json.Value)
	if !ok {
		return *new(Resp), fmt.Errorf("expected json.Value, got %T", result)
	}

	var r Resp
	if err := json.Unmarshal(raw, &r); err != nil {
		return *new(Resp), err
	}
	return r, nil
}

func (info RequestInfo[Params, Resp]) NewRequestMessage(id *jsonrpc.ID, params Params) *RequestMessage {
	return &RequestMessage{
		ID:     id,
		Method: info.Method,
		Params: params,
	}
}

type NotificationInfo[Params any] struct {
	_      [0]Params
	Method Method
}

func (info NotificationInfo[Params]) NewNotificationMessage(params Params) *RequestMessage {
	return &RequestMessage{
		Method: info.Method,
		Params: params,
	}
}

// UnmarshalParams decodes the params of an inbound request or notification
// message into the requested type. Inbound messages store their params as a
// raw [json.Value] (see [Message.UnmarshalJSON]); decoding is deferred to the
// point of dispatch so that param types for methods the server never handles
// are not forced into the binary.
//
// A [NoParams] method must be given no params; every other method must be given
// params as an object or array. A violation returns [ErrorCodeInvalidParams].
func UnmarshalParams[T any](req *RequestMessage) (T, error) {
	var params T
	var raw json.Value
	if req.Params != nil {
		v, ok := req.Params.(json.Value)
		if !ok {
			return params, fmt.Errorf("%w: unexpected params type %T", ErrorCodeInvalidParams, req.Params)
		}
		raw = v
	}

	// params is the zero value of T; this asserts on its type, i.e. whether the
	// method was declared with NoParams.
	if _, declaresNoParams := any(params).(NoParams); declaresNoParams {
		if len(raw) != 0 {
			return params, fmt.Errorf("%w: expected no params, got %s", ErrorCodeInvalidParams, raw)
		}
		return params, nil
	}

	// The base protocol defines params as `array | object`; reject anything else
	// (absent, null, or a scalar).
	if k := raw.Kind(); k != '{' && k != '[' {
		return params, fmt.Errorf("%w: params must be an object or array", ErrorCodeInvalidParams)
	}
	if err := json.Unmarshal(raw, &params); err != nil {
		return params, fmt.Errorf("%w: %w", ErrorCodeInvalidParams, err)
	}
	return params, nil
}

type Null struct{}

func (Null) UnmarshalJSONFrom(dec *json.Decoder) error {
	data, err := dec.ReadValue()
	if err != nil {
		return err
	}
	if string(data) != "null" {
		return fmt.Errorf("expected null, got %s", data)
	}
	return nil
}

func (Null) MarshalJSONTo(enc *json.Encoder) error {
	return enc.WriteToken(json.Null)
}

type NoParams struct{}

func (NoParams) IsZero() bool { return true }

type clientCapabilitiesKey struct{}

func WithClientCapabilities(ctx context.Context, caps *ResolvedClientCapabilities) context.Context {
	return context.WithValue(ctx, clientCapabilitiesKey{}, caps)
}

func GetClientCapabilities(ctx context.Context) *ResolvedClientCapabilities {
	if caps, _ := ctx.Value(clientCapabilitiesKey{}).(*ResolvedClientCapabilities); caps != nil {
		return caps
	}
	return &ResolvedClientCapabilities{}
}

// PreferredMarkupKind returns the first (most preferred) markup kind from the given formats,
// or MarkupKindPlainText if the slice is empty.
func PreferredMarkupKind(formats []MarkupKind) MarkupKind {
	if len(formats) > 0 {
		return formats[0]
	}
	return MarkupKindPlainText
}

const (
	CodeActionKindSourceRemoveUnusedImports CodeActionKind = "source.removeUnusedImports"
	CodeActionKindSourceSortImports         CodeActionKind = "source.sortImports"
)
