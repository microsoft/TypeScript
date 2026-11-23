package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestPnpAutoImportCompletion1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: /.pnp.cjs
module.exports = {};

// @filename: /.pnp.data.json
{
  "dependencyTreeRoots": [
    {
      "name": "project",
      "reference": "workspace:."
    }
  ],
  "ignorePatternData": null,
  "enableTopLevelFallback": false,
  "fallbackPool": [],
  "fallbackExclusionList": [],
  "packageRegistryData": [
    ["project", [
      ["workspace:.", {
        "packageLocation": "./",
        "packageDependencies": [
          ["package-a", "npm:1.0.0"],
          ["workspace-lib", "workspace:libs/workspace-lib"]
        ]
      }]
    ]],
    ["package-a", [
      ["npm:1.0.0", {
        "packageLocation": "./.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/",
        "packageDependencies": []
      }]
    ]],
    ["package-b", [
      ["npm:1.0.0", {
        "packageLocation": "./.yarn/cache/package-b-npm-1.0.0-efgh5678/node_modules/package-b/",
        "packageDependencies": []
      }]
    ]],
    ["workspace-lib", [
      ["workspace:libs/workspace-lib", {
        "packageLocation": "./libs/workspace-lib/",
        "packageDependencies": []
      }]
    ]]
  ]
}

// @filename: package.json
{
  "name": "project",
  "workspaces": [
    "libs/*"
  ],
  "dependencies": {
    "package-a": "npm:1.0.0",
    "workspace-lib": "workspace:*"
  }
}

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/package.json
{
  "name": "package-a",
  "version": "1.0.0",
  "exports": {
    ".": {"types": "./index.d.ts", "default": "./index.js"},
    "./subpath": {"types": "./helper.d.ts", "default": "./helper.js"}
  },
  "types": "./index.d.ts",
  "main": "./index.js"
}

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/index.js
export const aValue = "Some Var";

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/index.d.ts
export declare const aValue: string;

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/helper.js
export function helperA(value) {
  return "Helper A: " + value;
};

// @filename: /.yarn/cache/package-a-npm-1.0.0-abcd1234/node_modules/package-a/helper.d.ts
export declare function helperA(value: string): string;

// @filename: /libs/workspace-lib/package.json
{
  "name": "workspace-lib",
  "version": "1.0.0",
  "exports": {
    ".": {"types": "./index.d.ts", "default": "./index.js"}
  },
  "types": "./index.d.ts",
  "main": "./index.js"
}

// @filename: /libs/workspace-lib/index.js
export const workspaceValue = "Workspace Value";
export function workspaceHelper() {
  return "Helper from workspace";
};

// @filename: /libs/workspace-lib/index.d.ts
export declare const workspaceValue: string;
export declare function workspaceHelper(): string;

// @filename: /.yarn/cache/package-b-npm-1.0.0-efgh5678/node_modules/package-b/package.json
{
  "name": "package-b",
  "version": "1.0.0",
  "exports": {
    ".": {"types": "./index.d.ts", "default": "./index.js"}
  }
}

// @filename: /.yarn/cache/package-b-npm-1.0.0-efgh5678/node_modules/package-b/index.js
export const bValue = "B Value";
export function helperB(value) {
  return "Helper B: " + value;
};

// @filename: /.yarn/cache/package-b-npm-1.0.0-efgh5678/node_modules/package-b/index.d.ts
export declare const bValue: string;
export declare function helperB(value: string): string;

// @filename: /src/index.ts
import { bValue } from 'package-b'; // Should be erroring because package-b is not in project's dependencies
import { aValue } from 'package-a';
aValue;
/**/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				// Verify that helperA completion creates an import from 'package-a/subpath'
				&lsproto.CompletionItem{
					Label: "helperA",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "package-a/subpath",
						},
					},
					Kind:                new(lsproto.CompletionItemKindFunction),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
				// Verify that workspaceHelper completion creates an import from 'workspace-lib'
				&lsproto.CompletionItem{
					Label: "workspaceHelper",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "workspace-lib",
						},
					},
					Kind:                new(lsproto.CompletionItemKindFunction),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
			// `bValue` can appear in the completion list since it's mentioned in a unresolved import, but `helperB` should not
			Excludes: []string{"helperB"},
		},
	})
}
