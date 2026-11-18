package lsp_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestReferencesOnFromAfterUnrelatedEdit(t *testing.T) {
	t.Parallel()

	for _, unsavedEdit := range []bool{false, true} {
		name := "fresh session"
		if unsavedEdit {
			name = "unsaved edit"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			const originalApp = "import React from 'react';\n"
			const editedApp = "import React f;\n"
			files := map[string]string{
				"/root/tsconfig.json":     `{ "include": ["src"], "exclude": ["src/test.ts"] }`,
				"/root/src/utils/noop.ts": "export default function noop() {}\n",
				"/root/src/test.ts":       "import noop from './utils/noop';\n",
				"/root/src/form.ts":       "import noop from './utils/noop';\nnoop();\n",
				"/root/app/tsconfig.json": `{ "include": ["src"] }`,
				"/root/app/src/form.ts":   editedApp,
			}
			if unsavedEdit {
				files["/root/app/src/form.ts"] = originalApp
			}
			client, _ := initMutableLSPClient(t, files, &lsutil.UserPreferences{})
			testURI := lsconv.FileNameToDocumentURI("/root/src/test.ts")
			appURI := lsconv.FileNameToDocumentURI("/root/app/src/form.ts")
			client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
				TextDocument: &lsproto.TextDocumentItem{Uri: testURI, LanguageId: "typescript", Version: 1, Text: files["/root/src/test.ts"]},
			})
			if unsavedEdit {
				// The requesting file is excluded from the main configured project.
				// Opening the unrelated app file unloads that project before the search.
				client.SendNotification(t, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
					TextDocument: &lsproto.TextDocumentItem{Uri: appURI, LanguageId: "typescript", Version: 1, Text: originalApp},
				})
				client.SendNotification(t, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
					TextDocument: lsproto.VersionedTextDocumentIdentifier{Uri: appURI, Version: 2},
					ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
						{Partial: &lsproto.TextDocumentContentChangePartial{
							Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 14}, End: lsproto.Position{Line: 0, Character: 25}},
							Text:  "",
						}},
					},
				})
			}

			verifyReferences := func() {
				t.Helper()
				msg, resp, ok := client.SendRequest(t, lsproto.TextDocumentReferencesInfo, &lsproto.ReferenceParams{
					TextDocument: lsproto.TextDocumentIdentifier{Uri: testURI},
					Position:     lsproto.Position{Line: 0, Character: 14}, // from
					Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
				})
				assert.Assert(t, ok, "expected response")
				assert.Assert(t, msg.AsResponse().Error == nil)
				assert.Assert(t, resp.Locations != nil)
				assert.DeepEqual(t, *resp.Locations, []lsproto.Location{
					{Uri: testURI, Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 18}, End: lsproto.Position{Line: 0, Character: 30}}},
					{Uri: lsconv.FileNameToDocumentURI("/root/src/utils/noop.ts"), Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 24}, End: lsproto.Position{Line: 0, Character: 28}}},
					{Uri: lsconv.FileNameToDocumentURI("/root/src/form.ts"), Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 7}, End: lsproto.Position{Line: 0, Character: 11}}},
					{Uri: lsconv.FileNameToDocumentURI("/root/src/form.ts"), Range: lsproto.Range{Start: lsproto.Position{Line: 1, Character: 0}, End: lsproto.Position{Line: 1, Character: 4}}},
				})
			}
			verifyReferences()
			if unsavedEdit {
				client.SendNotification(t, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
					TextDocument: lsproto.VersionedTextDocumentIdentifier{Uri: appURI, Version: 3},
					ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
						{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: originalApp}},
					},
				})
				client.SendNotification(t, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
					TextDocument: lsproto.TextDocumentIdentifier{Uri: appURI},
				})
				verifyReferences()
			}
		})
	}
}
