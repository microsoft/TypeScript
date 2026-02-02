package lsp

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

// This test uses non-trimmed paths to emulate debug builds.
// Most users won't actually see this.
func TestSanitizedDebugStackTraceCompletionsRequest(t *testing.T) {
	t.Parallel()

	input := `goroutine 1196 [running]:
runtime/debug.Stack()
        /usr/local/go/src/runtime/debug/stack.go:26 +0x8e
github.com/microsoft/typescript-go/internal/lsp.(*Server).recover(0xc0001dae08, {0x14bc418, 0xc00bc60960}, 0xc00baf16e0)
        /workspaces/typescript-go/internal/lsp/server.go:777 +0x65
panic({0x1077b40?, 0x1abcb70?})
        /usr/local/go/src/runtime/panic.go:783 +0x136
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData.func15()
        /workspaces/typescript-go/internal/ls/completions.go:1303 +0xfa
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData.func18()
        /workspaces/typescript-go/internal/ls/completions.go:1548 +0x2df
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData(0xc004b08240, {0x14bc418, 0xc00bc60a20}, 0xc0069ef908, 0xc000272008, 0x1b, 0xc002b28e00)
        /workspaces/typescript-go/internal/ls/completions.go:1581 +0x2b92
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionsAtPosition(0xc004b08240, {0x14bc418, 0xc00bc60a20}, 0xc000272008, 0x1b, 0x0)
        /workspaces/typescript-go/internal/ls/completions.go:347 +0x690
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).ProvideCompletion(0xc004b08240, {0x14bc418, 0xc00bc60a20}, {0xc0092e02a0, 0x28}, {0x2, 0x4}, 0xc004580c30)
        /workspaces/typescript-go/internal/ls/completions.go:47 +0x207
github.com/microsoft/typescript-go/internal/lsp.(*Server).handleCompletion(0xc0001dae08, {0x14bc418, 0xc00bc60960}, 0xc004b08240, 0xc00baf14d0)
        /workspaces/typescript-go/internal/lsp/server.go:1102 +0xe5
github.com/microsoft/typescript-go/internal/lsp.registerLanguageServiceWithAutoImportsRequestHandler[...].func1({0x14bc418, 0xc00bc60960}, 0xc00baf16e0)
        /workspaces/typescript-go/internal/lsp/server.go:682 +0x32a
github.com/microsoft/typescript-go/internal/lsp.(*Server).handleRequestOrNotification(0xc0001dae08, {0x14bc418, 0xc00bc60960}, 0xc00baf16e0)
        /workspaces/typescript-go/internal/lsp/server.go:531 +0x11e
github.com/microsoft/typescript-go/internal/lsp.(*Server).dispatchLoop.func1()
        /workspaces/typescript-go/internal/lsp/server.go:414 +0x65
created by github.com/microsoft/typescript-go/internal/lsp.(*Server).dispatchLoop in goroutine 19
        /workspaces/typescript-go/internal/lsp/server.go:438 +0x60`

	baseline.Run(t, "completionsDebugStackTrace.md", sanitizedStackTraceBaselineContents(t, input), baseline.Options{
		Subfolder: "lsp/stackSanitizer/",
	})
}

func TestSanitizedReleaseStackTraceCompletionsRequest(t *testing.T) {
	t.Parallel()

	input := `runtime error: invalid memory address or nil pointer dereference
goroutine 2331 [running]:
runtime/debug.Stack()
	runtime/debug/stack.go:26 +0x5e
github.com/microsoft/typescript-go/internal/lsp.(*Server).recover(0xc0001c6e08, {0x441ae5?, 0xc000e976c0?}, 0xc00ab6c7b0)
	github.com/microsoft/typescript-go/internal/lsp/server.go:777 +0x58
panic({0xc323a0?, 0x1780b90?})
	runtime/panic.go:783 +0x132
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData.func15()
	github.com/microsoft/typescript-go/internal/ls/completions.go:1303 +0xba
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData.func18(...)
	github.com/microsoft/typescript-go/internal/ls/completions.go:1548
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionData(0xc008329200, {0x10f6688, 0xc00c2871d0}, 0xc00190b308, 0xc0001fe008, 0x1b, 0xc0008a2f00)
	github.com/microsoft/typescript-go/internal/ls/completions.go:1581 +0x1ed4
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getCompletionsAtPosition(0xc008329200, {0x10f6688, 0xc00c2871d0}, 0xc0001fe008, 0x1b, 0x0)
	github.com/microsoft/typescript-go/internal/ls/completions.go:347 +0x35f
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).ProvideCompletion(0xc008329200, {0x10f6688, 0xc00c287110}, {0xc00b472030?, 0xc00c287110?}, {0xb472030?, 0xc0?}, 0xc00c3ea000)
	github.com/microsoft/typescript-go/internal/ls/completions.go:47 +0x11c
github.com/microsoft/typescript-go/internal/lsp.(*Server).handleCompletion(0x418834?, {0x10f6688?, 0xc00c287110?}, 0xc00b472030?, 0x10f6688?)
	github.com/microsoft/typescript-go/internal/lsp/server.go:1105 +0x39
github.com/microsoft/typescript-go/internal/lsp.init.func1.registerLanguageServiceWithAutoImportsRequestHandler[...].28({0x10f6688, 0xc00c287110}, 0xc00ab6c7b0)
	github.com/microsoft/typescript-go/internal/lsp/server.go:682 +0x16c
github.com/microsoft/typescript-go/internal/lsp.(*Server).handleRequestOrNotification(0xc0001c6e08, {0x10f66c0?, 0xc006589180?}, 0xc00ab6c7b0)
	github.com/microsoft/typescript-go/internal/lsp/server.go:531 +0x1c6
github.com/microsoft/typescript-go/internal/lsp.(*Server).dispatchLoop.func1()
	github.com/microsoft/typescript-go/internal/lsp/server.go:414 +0x3a
created by github.com/microsoft/typescript-go/internal/lsp.(*Server).dispatchLoop in goroutine 35
	github.com/microsoft/typescript-go/internal/lsp/server.go:438 +0x9f1`

	baseline.Run(t, "completionsReleaseStackTrace.md", sanitizedStackTraceBaselineContents(t, input), baseline.Options{
		Subfolder: "lsp/stackSanitizer/",
	})
}

func sanitizedStackTraceBaselineContents(t *testing.T, input string) string {
	builder := strings.Builder{}
	builder.WriteString("Test name: `")
	builder.WriteString(t.Name())
	builder.WriteString("`\n\n# Unsanitized input:\n\n````\n")
	builder.WriteString(input)
	builder.WriteString("\n````\n\n# Sanitized output:\n\n````\n")
	builder.WriteString(sanitizeStackTrace(input))
	builder.WriteString("\n````\n")
	return builder.String()
}
