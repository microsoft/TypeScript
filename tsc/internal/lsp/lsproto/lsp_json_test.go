package lsproto

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/json"
	"gotest.tools/v3/assert"
)

func TestUnmarshalRejectsNullForOptionalNonNullableFields(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		input   string
		target  any
		errText string
	}{
		{
			name:    "InlayHint kind null",
			input:   `{"position": {"line": 0, "character": 0}, "label": "foo", "kind": null}`,
			target:  new(InlayHint),
			errText: `null value is not allowed for field "kind"`,
		},
		{
			name:    "InlayHint textEdits null",
			input:   `{"position": {"line": 0, "character": 0}, "label": "foo", "textEdits": null}`,
			target:  new(InlayHint),
			errText: `null value is not allowed for field "textEdits"`,
		},
		{
			name:    "InlayHint paddingLeft null",
			input:   `{"position": {"line": 0, "character": 0}, "label": "foo", "paddingLeft": null}`,
			target:  new(InlayHint),
			errText: `null value is not allowed for field "paddingLeft"`,
		},
		{
			name:    "FoldingRange kind null",
			input:   `{"startLine": 0, "endLine": 10, "kind": null}`,
			target:  new(FoldingRange),
			errText: `null value is not allowed for field "kind"`,
		},
		{
			name:    "FoldingRange startCharacter null",
			input:   `{"startLine": 0, "endLine": 10, "startCharacter": null}`,
			target:  new(FoldingRange),
			errText: `null value is not allowed for field "startCharacter"`,
		},
		{
			name:    "CompletionItem insertTextFormat null",
			input:   `{"label": "test", "insertTextFormat": null}`,
			target:  new(CompletionItem),
			errText: `null value is not allowed for field "insertTextFormat"`,
		},
		{
			name:    "Hover range null",
			input:   `{"contents": {"kind": "plaintext", "value": "hi"}, "range": null}`,
			target:  new(Hover),
			errText: `null value is not allowed for field "range"`,
		},
		{
			name:    "WorkDoneProgressOptions workDoneProgress null",
			input:   `{"workDoneProgress": null}`,
			target:  new(WorkDoneProgressOptions),
			errText: `null value is not allowed for field "workDoneProgress"`,
		},
		{
			name:    "CallHierarchyIncomingCallsParams item null",
			input:   `{"item": null}`,
			target:  new(CallHierarchyIncomingCallsParams),
			errText: `null value is not allowed for field "item"`,
		},
		{
			name:    "CallHierarchyIncomingCall from null",
			input:   `{"from": null, "fromRanges": []}`,
			target:  new(CallHierarchyIncomingCall),
			errText: `null value is not allowed for field "from"`,
		},
		{
			name:    "InitializeParams capabilities null",
			input:   `{"processId": null, "rootUri": null, "capabilities": null}`,
			target:  new(InitializeParams),
			errText: `null value is not allowed for field "capabilities"`,
		},
		{
			name:    "InitializeResult capabilities null",
			input:   `{"capabilities": null}`,
			target:  new(InitializeResult),
			errText: `null value is not allowed for field "capabilities"`,
		},
		{
			name:    "SemanticTokens data null (required slice)",
			input:   `{"data": null}`,
			target:  new(SemanticTokens),
			errText: `null value is not allowed for field "data"`,
		},
		{
			name:    "TextDocumentEdit edits null (required slice)",
			input:   `{"textDocument": {"uri": "file:///a.ts", "version": 1}, "edits": null}`,
			target:  new(TextDocumentEdit),
			errText: `null value is not allowed for field "edits"`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := json.Unmarshal([]byte(tt.input), tt.target)
			assert.ErrorContains(t, err, tt.errText)
		})
	}
}

func TestUnmarshalAcceptsNullForNullableFields(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		input  string
		target any
	}{
		{
			name:   "InitializeParams rootUri null",
			input:  `{"processId": null, "rootUri": null, "capabilities": {}}`,
			target: new(InitializeParams),
		},
		{
			name:   "InitializeParams workspaceFolders null",
			input:  `{"processId": null, "rootUri": null, "capabilities": {}, "workspaceFolders": null}`,
			target: new(InitializeParams),
		},
		{
			name:   "InitializeParams processId null",
			input:  `{"processId": null, "rootUri": null, "capabilities": {}}`,
			target: new(InitializeParams),
		},
		{
			name:   "InitializationOptions userPreferences null",
			input:  `{"userPreferences": null}`,
			target: new(InitializationOptions),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := json.Unmarshal([]byte(tt.input), tt.target)
			assert.NilError(t, err)
		})
	}
}

func TestUnmarshalAcceptsOmittedOptionalFields(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		input  string
		target any
		check  func(t *testing.T, target any)
	}{
		{
			name:   "InlayHint with only required fields",
			input:  `{"position": {"line": 1, "character": 5}, "label": "test"}`,
			target: new(InlayHint),
			check: func(t *testing.T, target any) {
				t.Helper()
				hint := target.(*InlayHint)
				assert.Assert(t, hint.Kind == nil)
				assert.Assert(t, hint.TextEdits == nil)
				assert.Assert(t, hint.Tooltip == nil)
				assert.Assert(t, hint.PaddingLeft == nil)
				assert.Assert(t, hint.PaddingRight == nil)
				assert.Assert(t, hint.Data == nil)
				assert.Equal(t, hint.Position.Line, uint32(1))
				assert.Equal(t, hint.Position.Character, uint32(5))
			},
		},
		{
			name:   "FoldingRange with only required fields",
			input:  `{"startLine": 5, "endLine": 10}`,
			target: new(FoldingRange),
			check: func(t *testing.T, target any) {
				t.Helper()
				fr := target.(*FoldingRange)
				assert.Assert(t, fr.Kind == nil)
				assert.Assert(t, fr.StartCharacter == nil)
				assert.Assert(t, fr.EndCharacter == nil)
				assert.Assert(t, fr.CollapsedText == nil)
				assert.Equal(t, fr.StartLine, uint32(5))
				assert.Equal(t, fr.EndLine, uint32(10))
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := json.Unmarshal([]byte(tt.input), tt.target)
			assert.NilError(t, err)
			tt.check(t, tt.target)
		})
	}
}

func TestUnmarshalRejectsIncompleteObjects(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		input   string
		target  any
		errText string
	}{
		{
			name:    "InlayHint missing position",
			input:   `{"label": "test"}`,
			target:  new(InlayHint),
			errText: "missing required properties: position",
		},
		{
			name:    "InlayHint missing label",
			input:   `{"position": {"line": 0, "character": 0}}`,
			target:  new(InlayHint),
			errText: "missing required properties: label",
		},
		{
			name:    "Location missing uri",
			input:   `{"range": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 0}}}`,
			target:  new(Location),
			errText: "missing required properties: uri",
		},
		{
			name:    "Location empty object",
			input:   `{}`,
			target:  new(Location),
			errText: "missing required properties: uri, range",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := json.Unmarshal([]byte(tt.input), tt.target)
			assert.ErrorContains(t, err, tt.errText)
		})
	}
}

func TestMarshalUnmarshalRoundTrip(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		value any
	}{
		{
			name: "InlayHint with kind",
			value: &InlayHint{
				Position: Position{Line: 1, Character: 5},
				Label:    StringOrInlayHintLabelParts{String: new("param")},
				Kind:     new(InlayHintKindParameter),
			},
		},
		{
			name: "InlayHint minimal",
			value: &InlayHint{
				Position: Position{Line: 0, Character: 0},
				Label:    StringOrInlayHintLabelParts{String: new("x")},
			},
		},
		{
			name: "FoldingRange with all fields",
			value: &FoldingRange{
				StartLine:      1,
				StartCharacter: new(uint32(0)),
				EndLine:        10,
				EndCharacter:   new(uint32(5)),
				Kind:           new(FoldingRangeKindRegion),
				CollapsedText:  new("..."),
			},
		},
		{
			name: "Location",
			value: &Location{
				Uri: "file:///test.ts",
				Range: Range{
					Start: Position{Line: 1, Character: 2},
					End:   Position{Line: 3, Character: 4},
				},
			},
		},
		{
			name: "InitializeParams with null processId",
			value: &InitializeParams{
				ProcessId:    IntegerOrNull{},
				RootUri:      DocumentUriOrNull{DocumentUri: new(DocumentUri("file:///workspace"))},
				Capabilities: &ClientCapabilities{},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			data, err := json.Marshal(tt.value)
			assert.NilError(t, err)

			// Unmarshal into a new value of the same type
			switch v := tt.value.(type) {
			case *InlayHint:
				var result InlayHint
				err = json.Unmarshal(data, &result)
				assert.NilError(t, err)
				assert.DeepEqual(t, *v, result)
			case *FoldingRange:
				var result FoldingRange
				err = json.Unmarshal(data, &result)
				assert.NilError(t, err)
				assert.DeepEqual(t, *v, result)
			case *Location:
				var result Location
				err = json.Unmarshal(data, &result)
				assert.NilError(t, err)
				assert.DeepEqual(t, *v, result)
			case *InitializeParams:
				var result InitializeParams
				err = json.Unmarshal(data, &result)
				assert.NilError(t, err)
				assert.DeepEqual(t, *v, result)
			default:
				t.Fatalf("unhandled type %T", tt.value)
			}
		})
	}
}

func TestUnmarshalUnionTypes(t *testing.T) {
	t.Parallel()

	t.Run("IntegerOrString with integer", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`42`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Integer != nil)
		assert.Equal(t, *v.Integer, int32(42))
		assert.Assert(t, v.String == nil)
	})

	t.Run("IntegerOrString with string", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`"hello"`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.String != nil)
		assert.Equal(t, *v.String, "hello")
		assert.Assert(t, v.Integer == nil)
	})

	t.Run("IntegerOrNull with integer", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrNull
		err := json.Unmarshal([]byte(`42`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Integer != nil)
		assert.Equal(t, *v.Integer, int32(42))
	})

	t.Run("IntegerOrNull with null", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrNull
		err := json.Unmarshal([]byte(`null`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Integer == nil)
	})

	t.Run("DocumentUriOrNull with string", func(t *testing.T) {
		t.Parallel()
		var v DocumentUriOrNull
		err := json.Unmarshal([]byte(`"file:///test.ts"`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.DocumentUri != nil)
		assert.Equal(t, *v.DocumentUri, DocumentUri("file:///test.ts"))
	})

	t.Run("DocumentUriOrNull with null", func(t *testing.T) {
		t.Parallel()
		var v DocumentUriOrNull
		err := json.Unmarshal([]byte(`null`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.DocumentUri == nil)
	})
}

func TestMarshalUnionTypes(t *testing.T) {
	t.Parallel()

	t.Run("IntegerOrNull with value", func(t *testing.T) {
		t.Parallel()
		v := IntegerOrNull{Integer: new(int32(42))}
		data, err := json.Marshal(&v)
		assert.NilError(t, err)
		assert.Equal(t, string(data), "42")
	})

	t.Run("IntegerOrNull with null", func(t *testing.T) {
		t.Parallel()
		v := IntegerOrNull{}
		data, err := json.Marshal(&v)
		assert.NilError(t, err)
		assert.Equal(t, string(data), "null")
	})

	t.Run("IntegerOrString with integer", func(t *testing.T) {
		t.Parallel()
		v := IntegerOrString{Integer: new(int32(7))}
		data, err := json.Marshal(&v)
		assert.NilError(t, err)
		assert.Equal(t, string(data), "7")
	})

	t.Run("IntegerOrString with string", func(t *testing.T) {
		t.Parallel()
		v := IntegerOrString{String: new("tok")}
		data, err := json.Marshal(&v)
		assert.NilError(t, err)
		assert.Equal(t, string(data), `"tok"`)
	})
}

func TestUnmarshalIgnoresUnknownFields(t *testing.T) {
	t.Parallel()

	t.Run("Location with extra fields", func(t *testing.T) {
		t.Parallel()
		var loc Location
		err := json.Unmarshal([]byte(`{
			"uri": "file:///test.ts",
			"range": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 5}},
			"someUnknownField": 42,
			"anotherUnknown": {"nested": true}
		}`), &loc)
		assert.NilError(t, err)
		assert.Equal(t, loc.Uri, DocumentUri("file:///test.ts"))
	})

	t.Run("InlayHint with extra fields", func(t *testing.T) {
		t.Parallel()
		var hint InlayHint
		err := json.Unmarshal([]byte(`{
			"position": {"line": 0, "character": 0},
			"label": "x",
			"futureField": [1, 2, 3]
		}`), &hint)
		assert.NilError(t, err)
	})
}

func TestUnmarshalRejectsWrongTypes(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		input  string
		target any
	}{
		{
			name:   "Location receives array",
			input:  `[]`,
			target: new(Location),
		},
		{
			name:   "Location receives string",
			input:  `"not an object"`,
			target: new(Location),
		},
		{
			name:   "Location receives number",
			input:  `42`,
			target: new(Location),
		},
		{
			name:   "Location receives null",
			input:  `null`,
			target: new(Location),
		},
		{
			name:   "FoldingRange receives boolean",
			input:  `true`,
			target: new(FoldingRange),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			err := json.Unmarshal([]byte(tt.input), tt.target)
			assert.Assert(t, err != nil, "expected error for input %s", tt.input)
		})
	}
}

func TestUnmarshalUnionTypeWrongKind(t *testing.T) {
	t.Parallel()

	t.Run("IntegerOrString rejects boolean", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`true`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("IntegerOrString rejects null", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`null`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("IntegerOrString rejects object", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("IntegerOrString rejects array", func(t *testing.T) {
		t.Parallel()
		var v IntegerOrString
		err := json.Unmarshal([]byte(`[]`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("StringOrInlayHintLabelParts rejects number", func(t *testing.T) {
		t.Parallel()
		var v StringOrInlayHintLabelParts
		err := json.Unmarshal([]byte(`42`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("StringOrInlayHintLabelParts rejects boolean", func(t *testing.T) {
		t.Parallel()
		var v StringOrInlayHintLabelParts
		err := json.Unmarshal([]byte(`true`), &v)
		assert.Assert(t, err != nil)
	})
}

func TestUnmarshalBooleanUnionTypes(t *testing.T) {
	t.Parallel()

	t.Run("BooleanOrHoverOptions with true", func(t *testing.T) {
		t.Parallel()
		var v BooleanOrHoverOptions
		err := json.Unmarshal([]byte(`true`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Boolean != nil)
		assert.Equal(t, *v.Boolean, true)
		assert.Assert(t, v.HoverOptions == nil)
	})

	t.Run("BooleanOrHoverOptions with false", func(t *testing.T) {
		t.Parallel()
		var v BooleanOrHoverOptions
		err := json.Unmarshal([]byte(`false`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Boolean != nil)
		assert.Equal(t, *v.Boolean, false)
		assert.Assert(t, v.HoverOptions == nil)
	})

	t.Run("BooleanOrHoverOptions with object", func(t *testing.T) {
		t.Parallel()
		var v BooleanOrHoverOptions
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Boolean == nil)
		assert.Assert(t, v.HoverOptions != nil)
	})

	t.Run("BooleanOrHoverOptions rejects string", func(t *testing.T) {
		t.Parallel()
		var v BooleanOrHoverOptions
		err := json.Unmarshal([]byte(`"nope"`), &v)
		assert.Assert(t, err != nil)
	})
}

func TestUnmarshalDiscriminatorUnion(t *testing.T) {
	t.Parallel()

	t.Run("WorkDoneProgressBegin", func(t *testing.T) {
		t.Parallel()
		var v WorkDoneProgressBeginOrReportOrEnd
		err := json.Unmarshal([]byte(`{"kind": "begin", "title": "Indexing"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Begin != nil)
		assert.Assert(t, v.Report == nil)
		assert.Assert(t, v.End == nil)
		assert.Equal(t, v.Begin.Title, "Indexing")
	})

	t.Run("WorkDoneProgressReport", func(t *testing.T) {
		t.Parallel()
		var v WorkDoneProgressBeginOrReportOrEnd
		err := json.Unmarshal([]byte(`{"kind": "report", "message": "50%"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Begin == nil)
		assert.Assert(t, v.Report != nil)
		assert.Assert(t, v.End == nil)
		assert.Assert(t, v.Report.Message != nil)
		assert.Equal(t, *v.Report.Message, "50%")
	})

	t.Run("WorkDoneProgressEnd", func(t *testing.T) {
		t.Parallel()
		var v WorkDoneProgressBeginOrReportOrEnd
		err := json.Unmarshal([]byte(`{"kind": "end"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.Begin == nil)
		assert.Assert(t, v.Report == nil)
		assert.Assert(t, v.End != nil)
	})

	t.Run("invalid discriminator", func(t *testing.T) {
		t.Parallel()
		var v WorkDoneProgressBeginOrReportOrEnd
		err := json.Unmarshal([]byte(`{"kind": "invalid"}`), &v)
		assert.Assert(t, err != nil)
	})
}

func TestUnmarshalPresenceDiscriminatorUnion(t *testing.T) {
	t.Parallel()

	t.Run("TextEdit via range field", func(t *testing.T) {
		t.Parallel()
		var v TextEditOrInsertReplaceEdit
		err := json.Unmarshal([]byte(`{
			"range": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 1}},
			"newText": "x"
		}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.TextEdit != nil)
		assert.Assert(t, v.InsertReplaceEdit == nil)
		assert.Equal(t, v.TextEdit.NewText, "x")
	})

	t.Run("InsertReplaceEdit via insert field", func(t *testing.T) {
		t.Parallel()
		var v TextEditOrInsertReplaceEdit
		err := json.Unmarshal([]byte(`{
			"insert": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 1}},
			"replace": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 2}},
			"newText": "y"
		}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.TextEdit == nil)
		assert.Assert(t, v.InsertReplaceEdit != nil)
		assert.Equal(t, v.InsertReplaceEdit.NewText, "y")
	})
}

func TestUnmarshalStringOrArrayUnion(t *testing.T) {
	t.Parallel()

	t.Run("StringOrInlayHintLabelParts with string", func(t *testing.T) {
		t.Parallel()
		var v StringOrInlayHintLabelParts
		err := json.Unmarshal([]byte(`"hello"`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.String != nil)
		assert.Equal(t, *v.String, "hello")
		assert.Assert(t, v.InlayHintLabelParts == nil)
	})

	t.Run("StringOrInlayHintLabelParts with array", func(t *testing.T) {
		t.Parallel()
		var v StringOrInlayHintLabelParts
		err := json.Unmarshal([]byte(`[{"value": "param"}, {"value": ": "}, {"value": "string"}]`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.String == nil)
		assert.Assert(t, v.InlayHintLabelParts != nil)
		assert.Equal(t, len(*v.InlayHintLabelParts), 3)
		assert.Equal(t, (*v.InlayHintLabelParts)[0].Value, "param")
	})
}

func TestUnmarshalDocumentEditUnion(t *testing.T) {
	t.Parallel()

	t.Run("TextDocumentEdit without kind", func(t *testing.T) {
		t.Parallel()
		var v TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile
		err := json.Unmarshal([]byte(`{
			"textDocument": {"uri": "file:///a.ts", "version": 1},
			"edits": [{"range": {"start": {"line": 0, "character": 0}, "end": {"line": 0, "character": 0}}, "newText": "x"}]
		}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.TextDocumentEdit != nil)
		assert.Assert(t, v.CreateFile == nil)
		assert.Assert(t, v.RenameFile == nil)
		assert.Assert(t, v.DeleteFile == nil)
	})

	t.Run("CreateFile with kind create", func(t *testing.T) {
		t.Parallel()
		var v TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile
		err := json.Unmarshal([]byte(`{"kind": "create", "uri": "file:///new.ts"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.TextDocumentEdit == nil)
		assert.Assert(t, v.CreateFile != nil)
		assert.Equal(t, v.CreateFile.Uri, DocumentUri("file:///new.ts"))
	})

	t.Run("RenameFile with kind rename", func(t *testing.T) {
		t.Parallel()
		var v TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile
		err := json.Unmarshal([]byte(`{"kind": "rename", "oldUri": "file:///old.ts", "newUri": "file:///new.ts"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.RenameFile != nil)
		assert.Equal(t, v.RenameFile.OldUri, DocumentUri("file:///old.ts"))
	})

	t.Run("DeleteFile with kind delete", func(t *testing.T) {
		t.Parallel()
		var v TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile
		err := json.Unmarshal([]byte(`{"kind": "delete", "uri": "file:///gone.ts"}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.DeleteFile != nil)
		assert.Equal(t, v.DeleteFile.Uri, DocumentUri("file:///gone.ts"))
	})
}

func TestUnmarshalFieldOrdering(t *testing.T) {
	t.Parallel()

	t.Run("Location with reversed field order", func(t *testing.T) {
		t.Parallel()
		var loc Location
		err := json.Unmarshal([]byte(`{
			"range": {"start": {"line": 1, "character": 2}, "end": {"line": 3, "character": 4}},
			"uri": "file:///test.ts"
		}`), &loc)
		assert.NilError(t, err)
		assert.Equal(t, loc.Uri, DocumentUri("file:///test.ts"))
		assert.Equal(t, loc.Range.Start.Line, uint32(1))
	})

	t.Run("InlayHint with kind before label", func(t *testing.T) {
		t.Parallel()
		var hint InlayHint
		err := json.Unmarshal([]byte(`{
			"kind": 1,
			"label": "x",
			"position": {"line": 0, "character": 0}
		}`), &hint)
		assert.NilError(t, err)
		assert.Assert(t, hint.Kind != nil)
		assert.Equal(t, *hint.Kind, InlayHintKindType)
	})
}

func TestUnmarshalEmptyObject(t *testing.T) {
	t.Parallel()

	t.Run("WorkDoneProgressOptions empty", func(t *testing.T) {
		t.Parallel()
		var v WorkDoneProgressOptions
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.NilError(t, err)
		assert.Assert(t, v.WorkDoneProgress == nil)
	})

	t.Run("InitializationOptions empty", func(t *testing.T) {
		t.Parallel()
		var v InitializationOptions
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.NilError(t, err)
	})

	t.Run("ClientCapabilities empty", func(t *testing.T) {
		t.Parallel()
		var v ClientCapabilities
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.NilError(t, err)
	})

	t.Run("ServerCapabilities empty", func(t *testing.T) {
		t.Parallel()
		var v ServerCapabilities
		err := json.Unmarshal([]byte(`{}`), &v)
		assert.NilError(t, err)
	})
}

func TestMarshalOmitsZeroOptionalFields(t *testing.T) {
	t.Parallel()

	t.Run("InlayHint omits nil fields", func(t *testing.T) {
		t.Parallel()
		hint := InlayHint{
			Position: Position{Line: 0, Character: 0},
			Label:    StringOrInlayHintLabelParts{String: new("x")},
		}
		data, err := json.Marshal(&hint)
		assert.NilError(t, err)
		s := string(data)
		assert.Assert(t, !strings.Contains(s, "kind"), "should not contain 'kind', got: %s", s)
		assert.Assert(t, !strings.Contains(s, "textEdits"), "should not contain 'textEdits', got: %s", s)
		assert.Assert(t, !strings.Contains(s, "paddingLeft"), "should not contain 'paddingLeft', got: %s", s)
		assert.Assert(t, strings.Contains(s, "position"), "should contain 'position', got: %s", s)
		assert.Assert(t, strings.Contains(s, "label"), "should contain 'label', got: %s", s)
	})

	t.Run("FoldingRange omits nil optional fields", func(t *testing.T) {
		t.Parallel()
		fr := FoldingRange{StartLine: 1, EndLine: 10}
		data, err := json.Marshal(&fr)
		assert.NilError(t, err)
		s := string(data)
		assert.Assert(t, !strings.Contains(s, "kind"), "should not contain 'kind', got: %s", s)
		assert.Assert(t, !strings.Contains(s, "startCharacter"), "should not contain 'startCharacter', got: %s", s)
		assert.Assert(t, strings.Contains(s, "startLine"), "should contain 'startLine', got: %s", s)
		assert.Assert(t, strings.Contains(s, "endLine"), "should contain 'endLine', got: %s", s)
	})
}

func TestLiteralTypes(t *testing.T) {
	t.Parallel()

	t.Run("StringLiteralCreate marshal", func(t *testing.T) {
		t.Parallel()
		v := StringLiteralCreate{}
		data, err := json.Marshal(v)
		assert.NilError(t, err)
		assert.Equal(t, string(data), `"create"`)
	})

	t.Run("StringLiteralCreate unmarshal", func(t *testing.T) {
		t.Parallel()
		var v StringLiteralCreate
		err := json.Unmarshal([]byte(`"create"`), &v)
		assert.NilError(t, err)
	})

	t.Run("StringLiteralCreate rejects wrong value", func(t *testing.T) {
		t.Parallel()
		var v StringLiteralCreate
		err := json.Unmarshal([]byte(`"delete"`), &v)
		assert.Assert(t, err != nil)
	})

	t.Run("StringLiteralCreate rejects wrong type", func(t *testing.T) {
		t.Parallel()
		var v StringLiteralCreate
		err := json.Unmarshal([]byte(`42`), &v)
		assert.Assert(t, err != nil)
	})
}

func TestEnumStringValues(t *testing.T) {
	t.Parallel()

	t.Run("InlayHintKind values", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, InlayHintKindType.String(), "Type")
		assert.Equal(t, InlayHintKindParameter.String(), "Parameter")
	})

	t.Run("SymbolKind values", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, SymbolKindFile.String(), "File")
		assert.Equal(t, SymbolKindFunction.String(), "Function")
		assert.Equal(t, SymbolKindVariable.String(), "Variable")
	})

	t.Run("unknown enum value", func(t *testing.T) {
		t.Parallel()
		v := InlayHintKind(999)
		s := v.String()
		assert.Assert(t, strings.Contains(s, "999"), "should contain the numeric value, got: %s", s)
	})
}
