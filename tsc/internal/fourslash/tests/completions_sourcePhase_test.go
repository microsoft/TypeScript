package fourslash_test

import (
	"fmt"
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

// @filename: /b.d.ts
export {};

// @filename: /c.d.mts
export {};

// @filename: /d.d.cts
export {};

// @filename: /e.d.wasm.ts
export {};

// @filename: /javascript.d.ts
export {};

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
				Includes: []fourslash.CompletionsExpectedItem{"a", "a.wasm", "e.wasm", "javascript", "module.mjs", "commonjs.cjs", "component"},
				Excludes: []string{"a.txt", "b", "c.mjs", "d.cjs"},
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
			Includes: []fourslash.CompletionsExpectedItem{"b", "c.mjs", "d.cjs", "e.wasm", "javascript"},
			Excludes: []string{"a.wasm", "a.txt", "module.mjs", "commonjs.cjs", "component"},
		},
	})
}

func TestSourcePhaseImportMappedPathCompletionsExcludeDeclarations(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name      string
		config    string
		directory string
		prefix    string
	}{
		{
			name: "paths",
			config: `// @filename: /tsconfig.json
{"compilerOptions":{"module":"esnext","moduleResolution":"bundler","target":"esnext","paths":{"pkg/*":["./a/*"]}}}`,
			directory: "/a",
			prefix:    "pkg/",
		},
		{
			name: "exports",
			config: `// @filename: /tsconfig.json
{"compilerOptions":{"module":"esnext","moduleResolution":"bundler","target":"esnext"}}
// @filename: /node_modules/pkg/package.json
{"name":"pkg","exports":{"./*":"./a/*"}}`,
			directory: "/node_modules/pkg/a",
			prefix:    "pkg/",
		},
		{
			name: "imports",
			config: `// @filename: /tsconfig.json
{"compilerOptions":{"module":"esnext","moduleResolution":"bundler","target":"esnext"}}
// @filename: /package.json
{"imports":{"#a/*":"./a/*"}}`,
			directory: "/a",
			prefix:    "#a/",
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`%[1]s

// @filename: %[2]s/a.d.ts
export {};

// @filename: %[2]s/b.d.mts
export {};

// @filename: %[2]s/c.d.cts
export {};

// @filename: %[2]s/d.d.wasm.ts
export {};

// @filename: %[2]s/e.wasm
wasm

// @filename: %[2]s/f.js
export {};

// @filename: %[2]s/f.d.ts
export {};

// @filename: /src/index.ts
import source a from "%[3]s/*static*/";
import.source("%[3]s/*dynamic*/");
import("%[3]s/*evaluation*/");`, test.config, test.directory, test.prefix)
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			name := "f.js"
			if test.name == "paths" {
				name = "f"
			}
			for _, marker := range []string{"static", "dynamic"} {
				f.VerifyCompletions(t, marker, &fourslash.CompletionsExpectedList{
					IsIncomplete: false,
					ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
						CommitCharacters: &[]string{},
						EditRange:        Ignored,
					},
					Items: &fourslash.CompletionsExpectedItems{
						Includes: []fourslash.CompletionsExpectedItem{"d.wasm", "e.wasm", name},
						Excludes: []string{"a", "a.js", "b.mjs", "c.cjs"},
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
					Includes: []fourslash.CompletionsExpectedItem{"b.mjs", "c.cjs", "d.wasm", name},
					Excludes: []string{"e.wasm"},
				},
			})
		})
	}
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
