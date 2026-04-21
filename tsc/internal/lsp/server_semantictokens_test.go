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
