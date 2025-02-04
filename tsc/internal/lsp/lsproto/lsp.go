package lsproto

import (
	"encoding/json"
	"fmt"
)

type Method string

const (
	MethodInitialize  Method = "initialize"
	MethodInitialized Method = "initialized"

	MethodCancel Method = "$/cancelRequest"

	MethodDidOpenTextDocument   Method = "textDocument/didOpen"
	MethodDidCloseTextDocument  Method = "textDocument/didClose"
	MethodDidChangeTextDocument Method = "textDocument/didChange"
	MethodDidSaveTextDocument   Method = "textDocument/didSave"
	MethodHover                 Method = "textDocument/hover"
)

var requestMethodUnmarshallers = map[Method]func([]byte) (any, error){
	MethodInitialize:            unmarshallerFor[InitializeParams],
	MethodInitialized:           unmarshallerFor[InitializedParams],
	MethodCancel:                unmarshallerFor[CancelParams],
	MethodDidOpenTextDocument:   unmarshallerFor[DidOpenTextDocumentParams],
	MethodDidCloseTextDocument:  unmarshallerFor[DidCloseTextDocumentParams],
	MethodDidChangeTextDocument: unmarshallerFor[DidChangeTextDocumentParams],
	MethodDidSaveTextDocument:   unmarshallerFor[DidSaveTextDocumentParams],
	MethodHover:                 unmarshallerFor[HoverParams],
}

func unmarshallerFor[T any](data []byte) (any, error) {
	var params T
	if err := json.Unmarshal(data, &params); err != nil {
		return nil, fmt.Errorf("unmarshal %T: %w", (*T)(nil), err)
	}
	return &params, nil
}

type InitializeParams struct {
	ProcessID             *Integer    `json:"processId"`
	ClientInfo            *ClientInfo `json:"clientInfo"`
	Locale                *string     `json:"locale"`
	InitializationOptions any         `json:"initializationOptions"`
	Capabilities          any         `json:"capabilities"`
	Trace                 *TraceValue `json:"trace"`
}

type ClientInfo struct {
	Name    string  `json:"name"`
	Version *string `json:"version"`
}

const (
	TraceValueOff      TraceValue = "off"
	TraceValueMessages TraceValue = "messages"
	TraceValueVerbose  TraceValue = "verbose"
)

type TraceValue string

func (t *TraceValue) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}
	switch TraceValue(s) {
	case TraceValueOff:
		*t = TraceValueOff
	case TraceValueMessages:
		*t = TraceValueMessages
	case TraceValueVerbose:
		*t = TraceValueVerbose
	default:
		return fmt.Errorf("unknown TraceValue: %q", s)
	}
	return nil
}

type InitializeResult struct {
	Capabilities any         `json:"capabilities"`
	ServerInfo   *ServerInfo `json:"serverInfo,omitempty"`
}

type ServerInfo struct {
	Name    string `json:"name"`
	Version string `json:"version,omitempty"`
}

type InitializedParams struct{}

type TextDocumentSyncKind int32

const (
	TextDocumentSyncKindNone        TextDocumentSyncKind = 0
	TextDocumentSyncKindFull        TextDocumentSyncKind = 1
	TextDocumentSyncKindIncremental TextDocumentSyncKind = 2
)

type TextDocumentItem struct {
	URI        DocumentURI `json:"uri"`
	LanguageID string      `json:"languageId"`
	Version    Integer     `json:"version"`
	Text       string      `json:"text"`
}

type TextDocumentIdentifier struct {
	URI DocumentURI `json:"uri"`
}

type VersionedTextDocumentIdentifier struct {
	TextDocumentIdentifier
	Version Integer `json:"version"`
}

type DidOpenTextDocumentParams struct {
	TextDocument TextDocumentItem `json:"textDocument"`
}

type DidCloseTextDocumentParams struct {
	TextDocument TextDocumentIdentifier `json:"textDocument"`
}

type DidChangeTextDocumentParams struct {
	TextDocument   VersionedTextDocumentIdentifier  `json:"textDocument"`
	ContentChanges []TextDocumentContentChangeEvent `json:"contentChanges"`
}

type DidSaveTextDocumentParams struct {
	TextDocument TextDocumentIdentifier `json:"textDocument"`
	Text         *string                `json:"text,omitempty"`
}

type TextDocumentContentChangeEvent struct {
	Range       *Range    `json:"range"`
	RangeLength *Uinteger `json:"rangeLength"`
	Text        string    `json:"text"`
}

type Position struct {
	Line      Uinteger `json:"line"`
	Character Uinteger `json:"character"`
}

type Range struct {
	Start Position `json:"start"`
	End   Position `json:"end"`
}

type TextDocumentPositionParams struct {
	TextDocument TextDocumentIdentifier `json:"textDocument"`
	Position     Position               `json:"position"`
}

type HoverParams struct {
	TextDocumentPositionParams
}

type Hover struct {
	Contents MarkupContent `json:"contents"`
	Range    *Range        `json:"range,omitempty"`
}

type MarkupKind string

const (
	MarkupKindPlaintext MarkupKind = "plaintext"
	MarkupKindMarkdown  MarkupKind = "markdown"
)

type MarkupContent struct {
	Kind  MarkupKind `json:"kind"`
	Value string     `json:"value"`
}

type CancelParams struct {
	ID *ID `json:"id"`
}
