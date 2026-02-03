Test name: `TestSanitizedDebugStackTraceCompletionsRequest`

# Unsanitized input:

````
goroutine 1196 [running]:
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
        /workspaces/typescript-go/internal/lsp/server.go:438 +0x60
````

# Sanitized output:

````
(REDACTED FRAME)
        (REDACTED FRAME)
typescript-go|>internal|>lsp.(*Server).recover()
        typescript-go|>internal|>lsp|>server.go:777
(REDACTED FRAME)
        (REDACTED FRAME)
typescript-go|>internal|>ls.(*LanguageService).getCompletionData.func15()
        typescript-go|>internal|>ls|>completions.go:1303
typescript-go|>internal|>ls.(*LanguageService).getCompletionData.func18()
        typescript-go|>internal|>ls|>completions.go:1548
typescript-go|>internal|>ls.(*LanguageService).getCompletionData()
        typescript-go|>internal|>ls|>completions.go:1581
typescript-go|>internal|>ls.(*LanguageService).getCompletionsAtPosition()
        typescript-go|>internal|>ls|>completions.go:347
typescript-go|>internal|>ls.(*LanguageService).ProvideCompletion()
        typescript-go|>internal|>ls|>completions.go:47
typescript-go|>internal|>lsp.(*Server).handleCompletion()
        typescript-go|>internal|>lsp|>server.go:1102
typescript-go|>internal|>lsp.registerLanguageServiceWithAutoImportsRequestHandler[...].func1()
        typescript-go|>internal|>lsp|>server.go:682
typescript-go|>internal|>lsp.(*Server).handleRequestOrNotification()
        typescript-go|>internal|>lsp|>server.go:531
typescript-go|>internal|>lsp.(*Server).dispatchLoop.func1()
        typescript-go|>internal|>lsp|>server.go:414
typescript-go|>internal|>lsp.(*Server).dispatchLoop
        typescript-go|>internal|>lsp|>server.go:438
````
