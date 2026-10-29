package tsctests

import (
	"strings"
	"testing"
)

func TestTscContentMapperInclusion(t *testing.T) {
	t.Parallel()
	for _, rewrite := range []bool{false, true} {
		input := &tscInput{
			subScenario: "manifest extensions with a narrowing include and declaration fallback",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": `{
				"compilerOptions": { "outDir": "./dist", "declaration": true, "module": "preserve", "allowArbitraryExtensions": true },
				"contentMappers": [{ "package": "mapper", "include": ["**/blob.toml"] }]
			}`,
				"/home/src/workspaces/project/node_modules/mapper/package.json": `{
				"name": "mapper", "version": "1.0.0",
				"typescript": { "contentMapper": { "exec": ["verbatim-mapper"], "extensions": [".toml"] } }
			}`,
				"/home/src/workspaces/project/index.ts": `
				export { value } from "./blob.toml";
				export { other } from "./other.toml";
				export { packaged } from "./node_modules/pkg/blob.toml";
				export { ambient } from "./ambient.toml";
				`,
				"/home/src/workspaces/project/blob.toml":                  `export const value = 1;`,
				"/home/src/workspaces/project/other.toml":                 `not TypeScript`,
				"/home/src/workspaces/project/other.d.toml.ts":            `export declare const other: "declaration";`,
				"/home/src/workspaces/project/ambient.toml":               `not TypeScript`,
				"/home/src/workspaces/project/ambient.d.ts":               `declare module "*.toml" { export const ambient: string; }`,
				"/home/src/workspaces/project/node_modules/pkg/blob.toml": `export const packaged = true;`,
			},
			commandLineArgs: []string{"--runExternalCode", "--listFiles"},
		}
		if rewrite {
			input.subScenario = "filtered files rewrite but unclaimed imports keep their extension"
			configPath := "/home/src/workspaces/project/tsconfig.json"
			input.files[configPath] = strings.ReplaceAll(input.files[configPath].(string), `"declaration": true`, `"declaration": true, "rewriteRelativeImportExtensions": true`)
			manifestPath := "/home/src/workspaces/project/node_modules/mapper/package.json"
			input.files[manifestPath] = strings.ReplaceAll(input.files[manifestPath].(string), `"extensions": [".toml"]`, `"extensions": [".toml"], "outputExtensions": {".toml": ".js"}`)
		}
		input.run(t, "contentMapperInclusion")
	}
}
