package tsctests

import "testing"

func TestTscIncrementalSharedDependency(t *testing.T) {
	t.Parallel()
	const project = "/home/src/workspaces/project/"
	for _, args := range [][]string{{}, {"--watch"}} {
		(&tscInput{
			subScenario:     "shared dependency with inferred types",
			commandLineArgs: args,
			files: FileMap{
				project + "tsconfig.json": `{"compilerOptions":{"strict":true,"noEmit":true,"incremental":true}}`,
				project + "hub.ts":        `export const prefix = "hub";`,
				project + "model.ts":      `export interface Model { id: string; } export function make(id: string): Model { return { id }; }`,
				project + "factory.ts":    `export { make } from "./model";`,
				project + "left.ts":       `import { prefix } from "./hub"; import { make } from "./factory"; export const left = make(prefix); export { right } from "./right";`,
				project + "right.ts":      `import { prefix } from "./hub"; import { make } from "./factory"; export const right = make(prefix); export { left } from "./left";`,
				project + "barrel.ts":     `export { left } from "./left"; export { right } from "./right";`,
				project + "index.ts":      `import { left, right } from "./barrel"; export const ids: string[] = [left.id, right.id];`,
			},
			edits: []*tscEdit{
				noChange,
				{
					caption: "first comment only edit",
					edit: func(sys *TestSys) {
						sys.appendFile(project+"hub.ts", "\n// first edit\n")
					},
				},
				{
					caption: "second comment only edit",
					edit: func(sys *TestSys) {
						sys.appendFile(project+"hub.ts", "\n// second edit\n")
					},
				},
				{
					caption: "change the shared value type",
					edit: func(sys *TestSys) {
						sys.replaceFileText(project+"hub.ts", `"hub"`, "10")
					},
				},
				{
					caption: "change the inferred type through the barrel",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(project+"model.ts", `export interface Model { id: number; } export function make(id: number): Model { return { id }; }`)
					},
				},
				{
					caption: "restore both shared dependencies",
					edit: func(sys *TestSys) {
						sys.replaceFileText(project+"hub.ts", "10", `"hub"`)
						sys.writeFileNoError(project+"model.ts", `export interface Model { id: string; } export function make(id: string): Model { return { id }; }`)
					},
				},
			},
		}).run(t, "incremental")
	}
}
