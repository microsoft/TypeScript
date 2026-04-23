Test name: `TestSanitizedStackTraceDefeatsVSCodeGenericSecretRegex`

# Unsanitized input:

````
goroutine 7 [running]:
runtime/debug.Stack()
	runtime/debug/stack.go:26 +0x5e
github.com/microsoft/typescript-go/internal/ls.(*LanguageService).getSignatureHelp(0x1)
	github.com/microsoft/typescript-go/internal/ls/signature.go:42 +0x10
github.com/microsoft/typescript-go/internal/ls.LookupKey(0x2)
	github.com/microsoft/typescript-go/internal/ls/keys.go:7 +0x10
github.com/microsoft/typescript-go/internal/ls.validateToken(0x3)
	github.com/microsoft/typescript-go/internal/ls/token.go:9 +0x10
github.com/microsoft/typescript-go/internal/ls.signRequest(0x4)
	github.com/microsoft/typescript-go/internal/ls/sig.go:11 +0x10
github.com/microsoft/typescript-go/internal/ls.setPwd(0x5)
	github.com/microsoft/typescript-go/internal/ls/pwd.go:13 +0x10
````

# Sanitized output:

````
(REDACTED FRAME)
	(REDACTED FRAME)
typescript-go|>internal|>ls.(*LanguageService).getSignatureHelp()
	typescript-go|>internal|>ls|>signatureX_X.go:42
typescript-go|>internal|>ls.LookupKeyX_X()
	typescript-go|>internal|>ls|>keys.go:7
typescript-go|>internal|>ls.validateTokenX_X()
	typescript-go|>internal|>ls|>tokenX_X.go:9
typescript-go|>internal|>ls.signRequest()
	typescript-go|>internal|>ls|>sigX_X.go:11
typescript-go|>internal|>ls.setPwdX_X()
	typescript-go|>internal|>ls|>pwdX_X.go:13
````
