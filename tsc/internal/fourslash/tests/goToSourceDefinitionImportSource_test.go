package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToSourceDefinitionImportSource(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext
// @allowJs: true

// @filename: /a.js
const x = 1;
export default function f() {}
const g = 2;

// @filename: /a.wasm
wasm

// @filename: /b.ts
import /*f*/f from "./a.js";
/*fUse*/f();
import source /*g*/g from "/*js*/./a.js";
/*gUse*/g;
import source /*h*/h from "/*wasm*/./a.wasm";
/*hUse*/h;
import.source("/*dynamic*/./a.js");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "f", "fUse", "g", "gUse", "h", "hUse", "js", "wasm", "dynamic")
	f.VerifyBaselineGoToSourceDefinition(t, "f", "fUse", "g", "gUse", "h", "hUse", "js", "wasm", "dynamic")
}
