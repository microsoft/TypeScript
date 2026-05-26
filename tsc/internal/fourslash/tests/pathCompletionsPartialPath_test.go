package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPartialPathRelativeImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @Filename: /src/main.ts
import { } from "./foo//*$*/";
// @Filename: /src/foo/async.ts
export const asyncApi = "async";
// @Filename: /src/foo/fs.ts
export const fsApi = "fs";
// @Filename: /src/foo/sync.ts
export const syncApi = "sync";`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "$", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"async",
				"fs",
				"sync",
			},
		},
	})
}

func TestPathCompletionsPartialPathPackageNoExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @moduleResolution: bundler
// @Filename: /node_modules/@typescript/native-preview/package.json
{ "name": "@typescript/native-preview", "version": "0.0.0" }
// @Filename: /node_modules/@typescript/native-preview/unstable/async.ts
export const asyncApi = "async";
// @Filename: /node_modules/@typescript/native-preview/unstable/fs.ts
export const fsApi = "fs";
// @Filename: /node_modules/@typescript/native-preview/unstable/sync.ts
export const syncApi = "sync";
// @Filename: /package.json
{ "dependencies": { "@typescript/native-preview": "0.0.0" } }
// @Filename: /src/main.ts
import { } from "@typescript/native-preview/unstable//*$*/";`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "$", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"async",
				"fs",
				"sync",
			},
		},
	})
}

func TestPathCompletionsPartialPathPackageExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @moduleResolution: bundler
// @Filename: /node_modules/@typescript/native-preview/package.json
{
	"name": "@typescript/native-preview",
	"version": "0.0.0",
	"exports": {
		"./unstable/sync": "./dist/api/sync/api.js",
		"./unstable/async": "./dist/api/async/api.js",
		"./unstable/fs": "./dist/api/fs.js"
	}
}
// @Filename: /node_modules/@typescript/native-preview/index.d.ts
export {};
// @Filename: /node_modules/@typescript/native-preview/dist/api/async/api.js
export const asyncApi = "async";
// @Filename: /node_modules/@typescript/native-preview/dist/api/fs.js
export const fsApi = "fs";
// @Filename: /node_modules/@typescript/native-preview/dist/api/sync/api.js
export const syncApi = "sync";
// @Filename: /package.json
{ "dependencies": { "@typescript/native-preview": "0.0.0" } }
// @Filename: /src/main.ts
import { } from "@typescript/native-preview/unstable//*$*/";`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "$", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"async",
				"fs",
				"sync",
			},
		},
	})
}

func TestPathCompletionsPartialPathPackageExportsEndingStar(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @moduleResolution: bundler
// @Filename: /node_modules/@typescript/native-preview/package.json
{
	"name": "@typescript/native-preview",
	"version": "0.0.0",
	"exports": {
		"./unstable/*": "./dist/unstable/*.d.ts"
	}
}
// @Filename: /node_modules/@typescript/native-preview/dist/unstable/async.d.ts
export declare const asyncApi: string;
// @Filename: /node_modules/@typescript/native-preview/dist/unstable/fs.d.ts
export declare const fsApi: string;
// @Filename: /node_modules/@typescript/native-preview/dist/unstable/sync.d.ts
export declare const syncApi: string;
// @Filename: /package.json
{ "dependencies": { "@typescript/native-preview": "0.0.0" } }
// @Filename: /src/main.ts
import { } from "@typescript/native-preview/unstable//*$*/";`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "$", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"async",
				"fs",
				"sync",
			},
		},
	})
}

func TestPathCompletionsPartialPathPackageExportsMiddleStar(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @moduleResolution: bundler
// @Filename: /node_modules/@typescript/native-preview/package.json
{
	"name": "@typescript/native-preview",
	"version": "0.0.0",
	"exports": {
		"./unstable/_*/api": "./dist/api/*.d.ts"
	}
}
// @Filename: /node_modules/@typescript/native-preview/dist/api/async.d.ts
export declare const asyncApi: string;
// @Filename: /node_modules/@typescript/native-preview/dist/api/fs.d.ts
export declare const fsApi: string;
// @Filename: /node_modules/@typescript/native-preview/dist/api/sync.d.ts
export declare const syncApi: string;
// @Filename: /package.json
{ "dependencies": { "@typescript/native-preview": "0.0.0" } }
// @Filename: /src/main.ts
import { } from "@typescript/native-preview/unstable//*$*/";`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "$", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"_async/api",
				"_fs/api",
				"_sync/api",
			},
		},
	})
}
