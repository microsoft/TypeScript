package lsproto

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
	"gotest.tools/v3/assert"
)

func TestMarshalMessage(t *testing.T) {
	t.Parallel()

	text := "invalid \xff utf8 <b>&amp; \"quoted\""
	inner := []any{
		&ResponseMessage{ID: jsonrpc.NewIDInt(1), Result: &Hover{Contents: MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{MarkupContent: &MarkupContent{Kind: MarkupKindMarkdown, Value: text}}}},
		&ResponseMessage{ID: jsonrpc.NewIDString("a"), Result: nil},
		&ResponseMessage{ID: jsonrpc.NewIDInt(2), Error: &jsonrpc.ResponseError{Code: -32601, Message: text}},
		&RequestMessage{ID: jsonrpc.NewIDString("ts1"), Method: MethodWorkspaceConfiguration, Params: &ConfigurationParams{}},
		&RequestMessage{Method: MethodWindowLogMessage, Params: &LogMessageParams{Type: MessageTypeInfo, Message: text}},
	}
	for _, msg := range inner {
		var wrapped *Message
		switch msg := msg.(type) {
		case *ResponseMessage:
			wrapped = msg.Message()
		case *RequestMessage:
			wrapped = msg.Message()
		}
		expected, err := json.Marshal(msg)
		assert.NilError(t, err)
		actual, err := json.Marshal(wrapped)
		assert.NilError(t, err)
		assert.Equal(t, string(actual), string(expected))
	}
}

func TestResponseErrorString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		err  *jsonrpc.ResponseError
		want string
	}{
		{
			name: "JSON details",
			err: &jsonrpc.ResponseError{
				Code:    jsonrpc.CodeInvalidParams,
				Message: "invalid params",
				Data: struct {
					Details []string `json:"details"`
				}{Details: []string{`expected "name"`, "line\nbreak"}},
			},
			want: "[-32602]: invalid params\n" + `{"details":["expected \"name\"","line\nbreak"]}`,
		},
		{
			name: "nil receiver",
			want: "",
		},
		{
			name: "nil data",
			err:  &jsonrpc.ResponseError{Code: jsonrpc.CodeInternalError, Message: "failed"},
			want: "[-32603]: failed",
		},
		{
			name: "unmarshalable data",
			err:  &jsonrpc.ResponseError{Code: jsonrpc.CodeInternalError, Message: "failed", Data: make(chan int)},
			want: "[-32603]: failed",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, tt.err.String(), tt.want)
			assert.Equal(t, tt.err.Error(), tt.want)
		})
	}
}

func BenchmarkMarshalCompletionResponse(b *testing.B) {
	items := make([]*CompletionItem, 2000)
	for i := range items {
		sortText := "11"
		items[i] = &CompletionItem{
			Label:    fmt.Sprintf("symbol%d", i),
			Kind:     new(CompletionItemKindFunction),
			SortText: &sortText,
			Data: &CompletionItemData{
				FileName: "/home/projects/src/components/chart.tsx",
				Position: 16126,
				Name:     fmt.Sprintf("symbol%d", i),
			},
		}
	}
	msg := (&ResponseMessage{
		ID:     jsonrpc.NewIDInt(1),
		Result: CompletionItemsOrListOrNull{List: &CompletionList{Items: items}},
	}).Message()

	b.ReportAllocs()
	for b.Loop() {
		if _, err := json.Marshal(msg); err != nil {
			b.Fatal(err)
		}
	}
}
