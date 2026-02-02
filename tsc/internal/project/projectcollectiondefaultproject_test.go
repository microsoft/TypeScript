package project_test

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
)

func TestProjectCollectionDefaultProject(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Project 1 references project 2, which does not have open files.
	// File project1/dist/index.d.ts does not belong to any tsconfig.json, but is included in programs for
	// projects 3 and 4 via project 1's output.
	// When looking for a default project for project1/dist/index.d.ts,
	// we should not try to unconditionally access project 2,
	// which isn't loaded because of `disableReferencedProjectLoad`.
	files := map[string]any{
		"/project1/tsconfig.json": `{
			"extends": "../tsconfig.json",
			"files": [],
			"include": ["src/**/*"],
			"references": [
				{
					"path": "../project2"
				}
			],
			"compilerOptions": {
				"composite": true,
				"outDir": "./dist",
				"rootDir": "./src",
			}
		}`,
		"/project1/src/index.ts": `export const foo = 42;
		export type Bar = { a: string };`,
		"/project1/dist/index.d.ts": `export declare const foo = 42;
			export type Bar = {
				a: string;
			};`,
		"/project2/tsconfig.json": `{
			"extends": "../tsconfig.json",
			"files": [],
			"include": ["src/**/*"],
			"compilerOptions": {
				"composite": true,
				"outDir": "./dist",
				"rootDir": "./src"
			}
		}`,
		"/project3/tsconfig.json": `{
			"extends": "../tsconfig.json",
			"files": [],
			"include": ["src/**/*"],
			"references": [
				{
					"path": "../project1"
				}
			],
			"compilerOptions": {
				"composite": true,
				"outDir": "./dist",
				"rootDir": "./src",
			}
		}`,
		"/project3/src/index.ts": `import { Bar } from "../../project1/dist/index.js";
			declare const b: Bar;
			const x: string = b.a;`,
		"/project4/tsconfig.json": `{
			"extends": "../tsconfig.json",
			"files": [],
			"include": ["src/**/*"],
			"references": [
				{
					"path": "../project1"
				}
			],
			"compilerOptions": {
				"composite": true,
				"outDir": "./dist",
				"rootDir": "./src",
			}
		}`,
		"/project4/src/index.ts": `import { Bar } from "../../project1/dist/index.js";
declare const b: Bar;
const x: string = b.a;`,
		"/tsconfig.json": `{
			"compilerOptions": {
				"disableReferencedProjectLoad": true,
				"disableSolutionSearching": true,
				"disableSourceOfProjectReferenceRedirect": true
			},
			"files": [],
			"references": [
				{
					"path": "./project1"
				},
				{
					"path": "./project2"
				},
				{
					"path": "./project3"
				},
				{
					"path": "./project4"
				}
			]
		}`,
	}
	uris := []lsproto.DocumentUri{
		"file:///project1/dist/index.d.ts",
		"file:///project1/src/index.ts",
		"file:///project3/src/index.ts",
		"file:///project4/src/index.ts",
	}
	session, _ := projecttestutil.Setup(files)
	// Should not crash.
	for _, uri := range uris {
		content := files[string(uri)[7:]].(string)
		session.DidOpenFile(context.Background(), uri, 1, content, lsproto.LanguageKindTypeScript)
	}
}
