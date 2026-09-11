package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSourcePhaseImportPathCompletionsIncludeWasm(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext
// @jsx: preserve

// @filename: /a.wasm
wasm

// @filename: /a.txt
text

// @filename: /a.ts
export {};

// @filename: /javascript.js
export {};

// @filename: /module.mjs
export {};

// @filename: /commonjs.cjs
exports.a = 1;

// @filename: /component.jsx
export const a = <div />;

// @filename: /index.ts
import source a from ".//*static*/";
import.source(".//*dynamic*/");
import(".//*evaluation*/");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	for _, marker := range []string{"static", "dynamic"} {
		f.VerifyCompletions(t, marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &[]string{},
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{"a.wasm", "javascript", "module.mjs", "commonjs.cjs", "component"},
				Excludes: []string{"a.txt"},
			},
		})
	}

	f.VerifyCompletions(t, "evaluation", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{"a.wasm", "a.txt", "javascript", "module.mjs", "commonjs.cjs", "component"},
		},
	})
}

func TestSourcePhaseImportPackageCompletionsIgnoreTypesVersions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /node_modules/pkg/package.json
{"name":"pkg","typesVersions":{"*":{"*":["types/*"]}}}

// @filename: /node_modules/pkg/runtime.js
export {};

// @filename: /node_modules/pkg/types/declaration.d.ts
export {};

// @filename: /src/index.ts
import source a from "pkg//*source*/";
import("pkg//*evaluation*/");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "source", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"runtime"},
			Excludes: []string{"declaration"},
		},
	})

	f.VerifyCompletions(t, "evaluation", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"declaration"},
			Excludes: []string{"runtime"},
		},
	})
}

func TestSourcePhaseImportPackageCompletionsUseRuntimeExportCondition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /node_modules/pkg/package.json
{"name":"pkg","exports":{"./*":{"types":"./types/*.d.ts","default":"./wasm/*.wasm"}}}

// @filename: /node_modules/pkg/types/a.d.ts
export {};

// @filename: /node_modules/pkg/wasm/b.wasm
wasm

// @filename: /src/index.ts
import source a from "pkg//*source*/";
import("pkg//*evaluation*/");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "source", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"b"},
			Excludes: []string{"a"},
		},
	})

	f.VerifyCompletions(t, "evaluation", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"a"},
			Excludes: []string{"b"},
		},
	})
}
