package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportHelpersAfterScriptBecomesDecoratedModule(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"target": "es2015",
		"module": "commonjs",
		"experimentalDecorators": true,
		"importHelpers": true
	},
	"files": ["foo.ts"]
}

// @Filename: /foo.ts
declare function dec(value: Function): void;
/*insert*/class C {}

// @Filename: /node_modules/tslib/package.json
{ "name": "tslib", "typings": "tslib.d.ts" }

// @Filename: /node_modules/tslib/tslib.d.ts
export declare function __decorate(...args: any[]): any;

// @Filename: /node_modules/tslib/tslib.js
exports.__decorate = function () {};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToFile(t, "/foo.ts")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.Replace(t, f.MarkerByName(t, "insert").Position, 0, `@dec
export `)
	// The second diagnostics request forces external helper resolution after the edit.
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}
