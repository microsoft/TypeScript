package checker_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDeclaredAliasDeprecationAndTypeError(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/origin.ts": `/** @deprecated old value */
export const value = 42;
/** @deprecated old function */
export function old(): number { return 42 }`,
		"/middle.ts": `export { value as mid, old } from './origin'`,
		"/last.ts":   `export { mid as final, old } from './middle'`,
		"/main.ts":   `import { final as selected, old } from './last'; export const actual: number = selected + old(); export const invalid: number = 'bad'`,
		"/tsconfig.json": `{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "strict": true,
        "noImplicitReturns": true,
        "noImplicitOverride": true,
        "allowUnreachableCode": false,
        "allowImportingTsExtensions": true,
        "allowJs": true,
        "maxNodeModuleJsDepth": 8,
        "types": [],
        "skipLibCheck": true,
        "noEmit": true,
        "lib": [
            "ES2022"
        ]
    },
    "files": [
        "main.ts"
    ]
}`,
	}, tspath.CaseSensitive))
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0)
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
	})
	program.BindSourceFiles()
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	file := program.GetSourceFile("/main.ts")
	assert.Equal(t, len(c.GetGlobalDiagnostics()), 0)
	diagnostics := c.GetDiagnostics(t.Context(), file)
	assert.Equal(t, len(diagnostics), 1)
	assert.Equal(t, diagnostics[0].Code(), int32(2322))
	deprecated := 0
	for _, suggestion := range c.GetSuggestionDiagnostics(t.Context(), file) {
		if suggestion.ReportsDeprecated() {
			assert.Assert(t, suggestion.Code() == 6385 || suggestion.Code() == 6387)
			deprecated++
		}
	}
	assert.Equal(t, deprecated, 4)
}
