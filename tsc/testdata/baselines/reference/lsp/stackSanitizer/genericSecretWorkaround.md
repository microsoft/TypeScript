Test name: `TestSanitizedStackTraceDefeatsVSCodeGenericSecretRegex`

# Unsanitized input:

````
goroutine 7 [running]:
runtime/debug.Stack()
	runtime/debug/stack.go:26 +0x5e
github.com/microsoft/TypeScript/tsc/cmd/tsc.runMain()
	github.com/microsoft/TypeScript/tsc/cmd/tsc/main.go:17 +0x20
github.com/microsoft/TypeScript/tsc/internal/ls.(*LanguageService).getSignatureHelp(0x1)
	github.com/microsoft/TypeScript/tsc/internal/ls/signature.go:42 +0x10
github.com/microsoft/TypeScript/tsc/internal/ls.LookupKey(0x2)
	github.com/microsoft/TypeScript/tsc/internal/ls/keys.go:7 +0x10
github.com/microsoft/TypeScript/tsc/internal/ls.validateToken(0x3)
	github.com/microsoft/TypeScript/tsc/internal/ls/token.go:9 +0x10
github.com/microsoft/TypeScript/tsc/internal/ls.signRequest(0x4)
	github.com/microsoft/TypeScript/tsc/internal/ls/sig.go:11 +0x10
github.com/microsoft/TypeScript/tsc/internal/ls.setPwd(0x5)
	github.com/microsoft/TypeScript/tsc/internal/ls/pwd.go:13 +0x10
````

# Sanitized output:

````
(REDACTED FRAME)
	(REDACTED FRAME)
TypeScript|>tsc|>cmd|>tsc.runMain()
	TypeScript|>tsc|>cmd|>tsc|>main.go:17
TypeScript|>tsc|>internal|>ls.(*LanguageService).getSignatureHelp()
	TypeScript|>tsc|>internal|>ls|>signatureX_X.go:42
TypeScript|>tsc|>internal|>ls.LookupKeyX_X()
	TypeScript|>tsc|>internal|>ls|>keys.go:7
TypeScript|>tsc|>internal|>ls.validateTokenX_X()
	TypeScript|>tsc|>internal|>ls|>tokenX_X.go:9
TypeScript|>tsc|>internal|>ls.signRequest()
	TypeScript|>tsc|>internal|>ls|>sigX_X.go:11
TypeScript|>tsc|>internal|>ls.setPwdX_X()
	TypeScript|>tsc|>internal|>ls|>pwdX_X.go:13
````
