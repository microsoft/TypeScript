package lsp_test

import (
	"context"
	"io"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestSemanticTokensCRLF reproduces a crash where semantic tokens panics with
// "token spans multiple lines" when the editor opens a file with CRLF line endings
// but the project originally loaded the file from disk with LF line endings.
//
// The SourceFile AST keeps positions from the LF text, but the converter's
// line map is recomputed from the CRLF overlay, causing a mismatch.
func TestSemanticTokensCRLF(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Enough lines so the cumulative \r\n vs \n offset difference
	// causes an LF-based position to land on a \r in the CRLF text.
	fileOnDisk := "var x\nvar x\nvar x\nvar x\nvar x\nvar x\nconst a = 1\n"
	fileFromEditor := strings.ReplaceAll(fileOnDisk, "\n", "\r\n")

	files := map[string]string{
		"/home/projects/tsconfig.json": `{}`,
		"/home/projects/test.ts":       fileOnDisk,
		"/home/projects/other.ts":      "export {}",
	}
	fs := bundled.WrapFS(vfstest.FromMap(files, false))

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		if req.Method == lsproto.MethodClientRegisterCapability || req.Method == lsproto.MethodClientUnregisterCapability {
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		}
		return nil
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err: io.Discard, Cwd: "/home/projects", FS: fs, DefaultLibraryPath: bundled.LibPath(),
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				SemanticTokens: &lsproto.SemanticTokensClientCapabilities{
					Requests: &lsproto.ClientSemanticTokensRequestOptions{
						Full: &lsproto.BooleanOrClientSemanticTokensRequestFullDelta{Boolean: new(true)},
					},
					TokenTypes:     []string{"namespace", "type", "class", "enum", "interface", "struct", "typeParameter", "parameter", "variable", "property", "enumMember", "event", "function", "method", "macro", "keyword", "modifier", "comment", "string", "number", "regexp", "operator", "decorator"},
					TokenModifiers: []string{"declaration", "definition", "readonly", "static", "deprecated", "abstract", "async", "modification", "documentation", "defaultLibrary", "local"},
				},
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	// Open another project file to force the project to load test.ts from disk (LF).
	otherUri := lsproto.DocumentUri("file:///home/projects/other.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: otherUri, LanguageId: "typescript", Text: files["/home/projects/other.ts"]},
	})
	msg1, _, _ := lsptestutil.SendRequest(t, client, lsproto.TextDocumentSemanticTokensFullInfo, &lsproto.SemanticTokensParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: otherUri},
	})
	assert.Assert(t, msg1.AsResponse().Error == nil, "Initial request failed")

	// Open test.ts with CRLF content; the project already parsed it from disk (LF).
	uri := lsproto.DocumentUri("file:///home/projects/test.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: fileFromEditor},
	})

	// This panics: AST positions are LF-based but the line map is CRLF-based.
	msg, _, _ := lsptestutil.SendRequest(t, client, lsproto.TextDocumentSemanticTokensFullInfo, &lsproto.SemanticTokensParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	if msg.AsResponse().Error != nil {
		t.Fatalf("Semantic tokens request failed: %s", msg.AsResponse().Error.Message)
	}
}

// TestSemanticTokensDefaultLibraryCaseInsensitive reproduces #4635: on
// case-insensitive file systems, tokens for default-library symbols never
// carried the defaultLibrary modifier. The lib files map in the program is
// keyed by canonical (lowercased) tspath.Path, but semantic tokens looked up
// declarations by their raw case-preserving file name. With the default
// library under a mixed-case directory (/TSLib), the lookup always missed.
func TestSemanticTokensDefaultLibraryCaseInsensitive(t *testing.T) {
	t.Parallel()

	libContent := `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };
`

	files := map[string]string{
		"/home/projects/tsconfig.json": `{"compilerOptions": {"lib": ["es5"]}}`,
		"/home/projects/test.ts":       `console.log("hi");`,
		"/TSLib/lib.es5.d.ts":          libContent,
	}
	// Case-insensitive VFS: canonical paths are lowercased, so the lib's
	// canonical path (/tslib/lib.es5.d.ts) differs from its file name.
	fs := vfstest.FromMap(files, false)

	onServerRequest := func(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
		if req.Method == lsproto.MethodClientRegisterCapability || req.Method == lsproto.MethodClientUnregisterCapability {
			return &lsproto.ResponseMessage{ID: req.ID, JSONRPC: req.JSONRPC, Result: lsproto.Null{}}
		}
		return nil
	}

	client, closeClient := lsptestutil.NewLSPClient(t, lsp.ServerOptions{
		Err: io.Discard, Cwd: "/home/projects", FS: fs, DefaultLibraryPath: "/TSLib",
	}, onServerRequest)
	t.Cleanup(func() { _ = closeClient() })

	initMsg, _, ok := lsptestutil.SendRequest(t, client, lsproto.InitializeInfo, &lsproto.InitializeParams{
		Capabilities: &lsproto.ClientCapabilities{
			TextDocument: &lsproto.TextDocumentClientCapabilities{
				SemanticTokens: &lsproto.SemanticTokensClientCapabilities{
					Requests: &lsproto.ClientSemanticTokensRequestOptions{
						Full: &lsproto.BooleanOrClientSemanticTokensRequestFullDelta{Boolean: new(true)},
					},
					TokenTypes:     []string{"namespace", "type", "class", "enum", "interface", "struct", "typeParameter", "parameter", "variable", "property", "enumMember", "event", "function", "method", "macro", "keyword", "modifier", "comment", "string", "number", "regexp", "operator", "decorator"},
					TokenModifiers: []string{"declaration", "definition", "readonly", "static", "deprecated", "abstract", "async", "modification", "documentation", "defaultLibrary", "local"},
				},
			},
		},
	})
	assert.Assert(t, ok && initMsg.AsResponse().Error == nil, "Initialize failed")
	lsptestutil.SendNotification(t, client, lsproto.InitializedInfo, &lsproto.InitializedParams{})
	<-client.Server.InitComplete()

	uri := lsproto.DocumentUri("file:///home/projects/test.ts")
	lsptestutil.SendNotification(t, client, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{Uri: uri, LanguageId: "typescript", Text: files["/home/projects/test.ts"]},
	})

	msg, result, ok := lsptestutil.SendRequest(t, client, lsproto.TextDocumentSemanticTokensFullInfo, &lsproto.SemanticTokensParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
	})
	assert.Assert(t, ok, "Semantic tokens request did not return a result")
	if msg.AsResponse().Error != nil {
		t.Fatalf("Semantic tokens request failed: %s", msg.AsResponse().Error.Message)
	}
	assert.Assert(t, result.SemanticTokens != nil, "Expected non-null semantic tokens")

	data := result.SemanticTokens.Data
	assert.Assert(t, len(data) >= 5 && len(data)%5 == 0, "Malformed semantic tokens data (len %d)", len(data))

	// Tokens are encoded as 5 ints each; the 5th is the modifier bitset.
	// defaultLibrary is index 9 in the TokenModifiers legend above.
	const defaultLibraryBit = 1 << 9
	hasDefaultLibrary := false
	for i := 4; i < len(data); i += 5 {
		if data[i]&defaultLibraryBit != 0 {
			hasDefaultLibrary = true
			break
		}
	}
	assert.Assert(t, hasDefaultLibrary, "Expected at least one token with the defaultLibrary modifier (console is declared in the default library); data: %v", data)
}
