Test name: `TestSanitizedReleaseStackTraceCompletionsRequest`

# Unsanitized input:

````
runtime error: invalid memory address or nil pointer dereference
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
	github.com/microsoft/typescript-go/internal/lsp/server.go:438 +0x9f1
````

# Sanitized output:

````
(REDACTED FRAME)
	(REDACTED FRAME)
typescript-go|>internal|>lsp.(*Server).recover()
	typescript-go|>internal|>lsp|>server.go:777 +0x58
(REDACTED FRAME)
	(REDACTED FRAME)
typescript-go|>internal|>ls.(*LanguageService).getCompletionData.func15()
	typescript-go|>internal|>ls|>completions.go:1303 +0xba
typescript-go|>internal|>ls.(*LanguageService).getCompletionData.func18()
	typescript-go|>internal|>ls|>completions.go:1548
typescript-go|>internal|>ls.(*LanguageService).getCompletionData()
	typescript-go|>internal|>ls|>completions.go:1581 +0x1ed4
typescript-go|>internal|>ls.(*LanguageService).getCompletionsAtPosition()
	typescript-go|>internal|>ls|>completions.go:347 +0x35f
typescript-go|>internal|>ls.(*LanguageService).ProvideCompletion()
	typescript-go|>internal|>ls|>completions.go:47 +0x11c
typescript-go|>internal|>lsp.(*Server).handleCompletion()
	typescript-go|>internal|>lsp|>server.go:1105 +0x39
typescript-go|>internal|>lsp.init.func1.registerLanguageServiceWithAutoImportsRequestHandler[...].28()
	typescript-go|>internal|>lsp|>server.go:682 +0x16c
typescript-go|>internal|>lsp.(*Server).handleRequestOrNotification()
	typescript-go|>internal|>lsp|>server.go:531 +0x1c6
typescript-go|>internal|>lsp.(*Server).dispatchLoop.func1()
	typescript-go|>internal|>lsp|>server.go:414 +0x3a
typescript-go|>internal|>lsp.(*Server).dispatchLoop in goroutine 35
	typescript-go|>internal|>lsp|>server.go:438 +0x9f1
````
