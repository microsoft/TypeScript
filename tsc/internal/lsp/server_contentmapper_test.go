package lsp_test

import (
	"context"
	"io"
	"strings"
	"sync"
	"testing"
	"unicode/utf16"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestSetContentMapperContributionsBeforeDidOpen(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const component = `<component name="ProfileCard">
<template><h1>{{ title }}</h1></template>
<script lang="ts">
export const title = "Profile";
</script>`
	const box = `// 💥
// @box-expect-error: unused
const café = 1;`
	files := map[string]string{
		"/home/project/tsconfig.json": `{
			"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": true },
			"contentMappers": [
				{ "package": "mapper", "extensions": [".vue"] },
				{ "package": "box-mapper", "extensions": [".box"] }
			]
		}`,
		"/home/project/node_modules/mapper/package.json":     contentmappertest.PackageJSON(contentmappertest.ComponentMapper),
		"/home/project/node_modules/box-mapper/package.json": strings.Replace(contentmappertest.PackageJSON(contentmappertest.TransformingMapper), `"name": "mapper"`, `"name": "box-mapper"`, 1),
		"/home/project/ProfileCard.vue":                      component,
		"/home/project/example.box":                          box,
	}

	var mu sync.Mutex
	var registrations []*lsproto.Registration
	var unregistrations []*lsproto.Unregistration
	unregisteredSignal := make(chan struct{}, 1)
	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		switch req.Method {
		case lsproto.MethodWorkspaceConfiguration:
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: []any{nil, nil, nil, nil}}
		case lsproto.MethodClientRegisterCapability:
			params, err := lsproto.UnmarshalParams[*lsproto.RegistrationParams](req)
			assert.NilError(t, err)
			mu.Lock()
			registrations = append(registrations, params.Registrations...)
			mu.Unlock()
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		case lsproto.MethodClientUnregisterCapability:
			params, err := lsproto.UnmarshalParams[*lsproto.UnregistrationParams](req)
			assert.NilError(t, err)
			mu.Lock()
			unregistrations = append(unregistrations, params.Unregisterations...)
			mu.Unlock()
			unregisteredSignal <- struct{}{}
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		default:
			return nil
		}
	}

	fs := bundled.WrapFS(vfstest.FromMap(files, false))
	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err:                io.Discard,
		Cwd:                "/home/project",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),
		Spawn:              contentmappertest.NewSpawner().Spawn,
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	caps := &lsproto.ClientCapabilities{
		Workspace: &lsproto.WorkspaceClientCapabilities{
			FileOperations: &lsproto.FileOperationClientCapabilities{
				DynamicRegistration: new(true),
				WillRename:          new(true),
			},
		},
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			Synchronization: &lsproto.TextDocumentSyncClientCapabilities{DynamicRegistration: new(true)},
			DocumentSymbol:  &lsproto.DocumentSymbolClientCapabilities{DynamicRegistration: new(true)},
			FoldingRange:    &lsproto.FoldingRangeClientCapabilities{DynamicRegistration: new(true)},
			SelectionRange:  &lsproto.SelectionRangeClientCapabilities{DynamicRegistration: new(true)},
			InlayHint:       &lsproto.InlayHintClientCapabilities{DynamicRegistration: new(true)},
			CodeLens:        &lsproto.CodeLensClientCapabilities{DynamicRegistration: new(true)},
			CodeAction:      &lsproto.CodeActionClientCapabilities{DynamicRegistration: new(true)},
			Formatting:      &lsproto.DocumentFormattingClientCapabilities{DynamicRegistration: new(true)},
			RangeFormatting: &lsproto.DocumentRangeFormattingClientCapabilities{DynamicRegistration: new(true)},
			OnTypeFormatting: &lsproto.DocumentOnTypeFormattingClientCapabilities{
				DynamicRegistration: new(true),
			},
			LinkedEditingRange: &lsproto.LinkedEditingRangeClientCapabilities{DynamicRegistration: new(true)},
			CallHierarchy:      &lsproto.CallHierarchyClientCapabilities{DynamicRegistration: new(true)},
			SemanticTokens: &lsproto.SemanticTokensClientCapabilities{
				DynamicRegistration: new(true),
				Requests:            &lsproto.ClientSemanticTokensRequestOptions{},
				TokenTypes:          []string{},
				TokenModifiers:      []string{},
				Formats:             []lsproto.TokenFormat{lsproto.TokenFormatRelative},
			},
		},
	}
	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: caps,
		InitializationOptions: &lsproto.InitializationOptionsOrNull{InitializationOptions: &lsproto.InitializationOptions{
			RunExternalCode: new(true),
		}},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/project/ProfileCard.vue")
	msg, _, ok := lsptestutil.SendRequest(t, client, lsproto.CustomSetContentMapperContributionsInfo, &lsproto.SetContentMapperContributionsParams{
		OpenDocuments: []lsproto.TextDocumentIdentifier{{Uri: uri}},
		Contributions: []*lsproto.ContentMapperContribution{{
			ContributorId: "test",
			Extensions:    []string{".vue", ".svelte"},
		}},
	})
	assert.Assert(t, ok && msg.AsResponse().Error == nil)

	mu.Lock()
	registered := append([]*lsproto.Registration(nil), registrations...)
	mu.Unlock()
	assert.Assert(t, len(registered) > 0, "expected dynamic registrations")
	expectedMapperRegistrations := map[string]bool{
		"content-mapper-did-open":           false,
		"content-mapper-did-change":         false,
		"content-mapper-did-close":          false,
		"content-mapper-semantic-tokens":    false,
		"content-mapper-document-symbol":    false,
		"content-mapper-folding-range":      false,
		"content-mapper-selection-range":    false,
		"content-mapper-inlay-hint":         false,
		"content-mapper-code-lens":          false,
		"content-mapper-code-action":        false,
		"content-mapper-formatting":         false,
		"content-mapper-range-formatting":   false,
		"content-mapper-on-type-formatting": false,
		"content-mapper-linked-editing":     false,
		"content-mapper-call-hierarchy":     false,
		"content-mapper-will-rename-files":  false,
	}
	for _, registration := range registered {
		if _, expected := expectedMapperRegistrations[registration.Id]; !expected {
			assert.Assert(t, !strings.HasPrefix(registration.Id, "content-mapper-"), "unexpected unsupported content mapper registration %q", registration.Id)
		} else {
			expectedMapperRegistrations[registration.Id] = true
		}
		if registration.Id == "content-mapper-did-open" {
			assert.Assert(t, registration.RegisterOptions != nil && registration.RegisterOptions.TextDocumentDidOpen != nil)
			selector := registration.RegisterOptions.TextDocumentDidOpen.DocumentSelector.DocumentSelector
			assert.Assert(t, selector != nil && len(*selector) == 2)
			patterns := map[string]bool{}
			for _, filter := range *selector {
				patterns[*filter.Pattern.Pattern.Pattern] = true
			}
			assert.Assert(t, patterns["**/*.vue"])
			assert.Assert(t, patterns["**/*.box"])
		}
		if registration.Id == "content-mapper-semantic-tokens" {
			assert.Assert(t, registration.RegisterOptions != nil && registration.RegisterOptions.TextDocumentSemanticTokens != nil)
			selector := registration.RegisterOptions.TextDocumentSemanticTokens.DocumentSelector.DocumentSelector
			assert.Assert(t, selector != nil && len(*selector) == 2)
			patterns := map[string]bool{}
			for _, filter := range *selector {
				patterns[*filter.Pattern.Pattern.Pattern] = true
			}
			assert.Assert(t, patterns["**/*.vue"])
			assert.Assert(t, patterns["**/*.box"])
		}
		if registration.Id == "content-mapper-code-action" {
			assert.Assert(t, registration.RegisterOptions != nil && registration.RegisterOptions.TextDocumentCodeAction != nil)
			assert.DeepEqual(t, *registration.RegisterOptions.TextDocumentCodeAction.CodeActionKinds, expectedCodeActionKinds())
		}
	}
	for id, found := range expectedMapperRegistrations {
		assert.Assert(t, found, "expected %s registration for .vue", id)
	}

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "vue", Version: 1, Text: component},
	})
	hoverMsg, hover, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentHoverInfo, &lsproto.HoverParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 3, Character: 15},
	})
	assert.Assert(t, ok && hoverMsg.AsResponse().Error == nil)
	assert.Assert(t, hover.Hover != nil, "expected hover after first foreign didOpen")

	isContentMappedMsg, isContentMapped, ok := lsptestutil.SendRequest(t, client, lsproto.CustomIsContentMappedInfo, &lsproto.IsContentMappedParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && isContentMappedMsg.AsResponse().Error == nil)
	assert.Assert(t, isContentMapped.IsContentMapped)

	virtualFilesMsg, virtualFiles, ok := lsptestutil.SendRequest(t, client, lsproto.CustomContentMapperVirtualFilesInfo, &lsproto.ContentMapperVirtualFilesParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && virtualFilesMsg.AsResponse().Error == nil)
	assert.Equal(t, len(virtualFiles.Files), 1)
	assert.Equal(t, virtualFiles.Files[0].FileName, "/home/project/ProfileCard.vue.ts")
	assert.Equal(t, virtualFiles.Files[0].ScriptKind, int32(3))
	assert.Assert(t, strings.Contains(virtualFiles.Files[0].Text, `export const title = "Profile";`))
	assert.Assert(t, len(virtualFiles.Files[0].Mappings) > 0)
	assert.Equal(t, virtualFiles.Files[0].Mappings[0].Kind, int32(0))
	assert.Equal(t, virtualFiles.Files[0].Mappings[0].Features, int32((1<<20)-1))

	boxURI := lsproto.DocumentUri("file:///home/project/example.box")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: boxURI, LanguageId: "box", Version: 1, Text: box},
	})
	_, boxVirtualFiles, ok := lsptestutil.SendRequest(t, client, lsproto.CustomContentMapperVirtualFilesInfo, &lsproto.ContentMapperVirtualFilesParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: boxURI},
	})
	assert.Assert(t, ok)
	assert.Equal(t, len(boxVirtualFiles.Files), 1)
	boxVirtualFile := boxVirtualFiles.Files[0]
	assert.Equal(t, len(boxVirtualFile.Mappings), 1)
	mappedTextStart := strings.Index(boxVirtualFile.Text, "// 💥")
	assert.Assert(t, mappedTextStart >= 0)
	assert.Equal(t, boxVirtualFile.Mappings[0].GeneratedStart, int32(utf16Length(boxVirtualFile.Text[:mappedTextStart])))
	assert.Equal(t, boxVirtualFile.Mappings[0].GeneratedLength, int32(utf16Length(box)))
	assert.Equal(t, boxVirtualFile.Mappings[0].OriginalLength, int32(utf16Length(box)))
	assert.Equal(t, len(boxVirtualFile.DiagnosticDirectives), 1)
	directive := boxVirtualFile.DiagnosticDirectives[0]
	directiveStart := strings.Index(box, "// @box-expect-error")
	directiveEnd := directiveStart + strings.IndexByte(box[directiveStart:], '\n')
	assert.Equal(t, directive.OriginalRange.Pos, int32(utf16Length(box[:directiveStart])))
	assert.Equal(t, directive.OriginalRange.End, int32(utf16Length(box[:directiveEnd])))
	affectedText := "const café = 1;"
	affectedStart := strings.Index(boxVirtualFile.Text, affectedText)
	assert.Assert(t, affectedStart >= 0)
	assert.Equal(t, directive.VirtualRange.Pos, int32(utf16Length(boxVirtualFile.Text[:affectedStart])))
	assert.Equal(t, directive.VirtualRange.End, int32(utf16Length(boxVirtualFile.Text[:affectedStart+len(affectedText)])))

	assert.NilError(t, fs.WriteFile("/home/project/tsconfig.json", `{
		"compilerOptions": { "target": "es2020", "module": "esnext", "moduleResolution": "bundler", "strict": true }
	}`))
	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeWatchedFilesInfo, &lsproto.DidChangeWatchedFilesParams{
		Changes: []*lsproto.FileEvent{{Uri: "file:///home/project/tsconfig.json", Type: lsproto.FileChangeTypeChanged}},
	})
	hoverMsg, hover, _ = lsptestutil.SendRequest(t, client, lsproto.TextDocumentHoverInfo, &lsproto.HoverParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 3, Character: 15},
	})
	assert.Assert(t, hoverMsg != nil && hoverMsg.AsResponse().Error == nil, "request before didClose should return a null result")
	assert.Assert(t, hover.Hover == nil)
	isContentMappedMsg, isContentMapped, ok = lsptestutil.SendRequest(t, client, lsproto.CustomIsContentMappedInfo, &lsproto.IsContentMappedParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && isContentMappedMsg.AsResponse().Error == nil)
	assert.Assert(t, !isContentMapped.IsContentMapped)
	virtualFilesMsg, virtualFiles, ok = lsptestutil.SendRequest(t, client, lsproto.CustomContentMapperVirtualFilesInfo, &lsproto.ContentMapperVirtualFilesParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && virtualFilesMsg.AsResponse().Error == nil)
	assert.Equal(t, len(virtualFiles.Files), 0)
	diagnosticMsg, diagnostics, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentDiagnosticInfo, &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok && diagnosticMsg.AsResponse().Error == nil, "diagnostics before didClose should return an empty report")
	assert.Assert(t, diagnostics.FullDocumentDiagnosticReport != nil)
	assert.Equal(t, len(diagnostics.FullDocumentDiagnosticReport.Items), 0)
	completionMsg, completion, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentCompletionInfo, &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 3, Character: 15},
	})
	assert.Assert(t, ok && completionMsg.AsResponse().Error == nil)
	assert.Assert(t, completion.Items == nil && completion.List == nil)
	referencesMsg, references, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentReferencesInfo, &lsproto.ReferenceParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 3, Character: 15},
		Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
	})
	assert.Assert(t, ok && referencesMsg.AsResponse().Error == nil)
	assert.Assert(t, references.Locations == nil)
	renameMsg, rename, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentRenameInfo, &lsproto.RenameParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lsproto.Position{Line: 3, Character: 15},
		NewName:      "renamed",
	})
	assert.Assert(t, ok && renameMsg.AsResponse().Error == nil)
	assert.Assert(t, rename.WorkspaceEdit == nil)
	<-unregisteredSignal
	mu.Lock()
	unregistered := append([]*lsproto.Unregistration(nil), unregistrations...)
	mu.Unlock()
	assert.Assert(t, len(unregistered) > 0, "expected dynamic unregistration")
	expectedUnregistrations := make(map[string]bool, len(expectedMapperRegistrations))
	for id := range expectedMapperRegistrations {
		expectedUnregistrations[id] = false
	}
	for _, unregistration := range unregistered {
		if _, expected := expectedUnregistrations[unregistration.Id]; !expected {
			assert.Assert(t, !strings.HasPrefix(unregistration.Id, "content-mapper-"), "unexpected unsupported content mapper unregistration %q", unregistration.Id)
		} else {
			expectedUnregistrations[unregistration.Id] = true
		}
	}
	for id, found := range expectedUnregistrations {
		assert.Assert(t, found, "expected %s unregistration", id)
	}

	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: boxURI},
	})
}

func utf16Length(text string) int {
	return len(utf16.Encode([]rune(text)))
}
