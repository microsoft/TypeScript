package incremental

import (
	"context"
	"maps"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestGetAllDependencies(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		files    map[string]string
		expected map[string][]string
	}{
		{
			name: "follows imports transitively",
			files: map[string]string{
				"/project/index.ts":     `import { a } from "./a"; export const value = a;`,
				"/project/a.ts":         `import { shared } from "./shared"; export const a = shared;`,
				"/project/b.ts":         `import { shared } from "./shared"; export const b = shared;`,
				"/project/shared.ts":    `export const shared = 1;`,
				"/project/unrelated.ts": `export const unrelated = 1;`,
			},
			expected: map[string][]string{
				"index.ts":     {"index.ts", "shared.ts", "a.ts"},
				"b.ts":         {"b.ts", "shared.ts"},
				"shared.ts":    {"shared.ts"},
				"unrelated.ts": {"unrelated.ts"},
			},
		},
		{
			name: "includes module augmentations of imported modules",
			files: map[string]string{
				"/project/index.ts":   `import type { Shared } from "./shared"; export type Value = Shared;`,
				"/project/shared.ts":  `export interface Shared { a: number; }`,
				"/project/augment.ts": `export {}; declare module "./shared" { interface Shared { b: string; } }`,
			},
			expected: map[string][]string{
				"index.ts":   {"index.ts", "augment.ts", "shared.ts"},
				"augment.ts": {"augment.ts", "shared.ts"},
			},
		},
		{
			name: "includes ambient module declarations",
			files: map[string]string{
				"/project/index.ts":     `import { value } from "virtual"; export const local = value;`,
				"/project/ambient.d.ts": `declare module "virtual" { export const value: number; }`,
			},
			expected: map[string][]string{
				"index.ts": {"index.ts", "ambient.d.ts"},
			},
		},
		{
			name: "includes triple slash references and type reference directives",
			files: map[string]string{
				"/project/index.ts": `/// <reference path="./globals.d.ts" />
/// <reference types="pkg" />
export const value = 1;`,
				"/project/globals.d.ts":                       `declare const globalValue: number;`,
				"/project/node_modules/@types/pkg/index.d.ts": `declare const pkgValue: string;`,
				"/project/unrelated.ts":                       `export const unrelated = 1;`,
			},
			expected: map[string][]string{
				"index.ts":     {"index.ts", "globals.d.ts", "node_modules/@types/pkg/index.d.ts"},
				"unrelated.ts": {"unrelated.ts"},
			},
		},
		{
			name: "returns every file for files that affect the global scope",
			files: map[string]string{
				"/project/script.ts":        `const scriptValue = 1;`,
				"/project/globalAugment.ts": `export {}; declare global { var augmented: number; }`,
				"/project/module.ts":        `export const value = 1;`,
			},
			expected: map[string][]string{
				"script.ts":        {"script.ts", "globalAugment.ts", "module.ts"},
				"globalAugment.ts": {"globalAugment.ts", "module.ts", "script.ts"},
				"module.ts":        {"module.ts"},
			},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			program := newDependenciesTestProgram(test.files)
			checker, done := program.GetTypeChecker(context.Background())
			defer done()
			for root, expected := range test.expected {
				file := program.GetSourceFile(tspath.ToRootedFilePath(root, "/project"))
				assert.Assert(t, file != nil, root)
				actual := core.Map(GetAllDependencies(program, checker, file), func(f *ast.SourceFile) string {
					return strings.TrimPrefix(f.FileName().AsString(), "/project/")
				})
				assert.DeepEqual(t, actual, expected)
			}
		})
	}
}

func newDependenciesTestProgram(files map[string]string) *compiler.Program {
	host := compiler.NewCompilerHost(vfstest.FromMap(files, tspath.CaseSensitive), "/lib", nil, nil, nil)
	var roots []tspath.RootedFilePath
	for _, name := range slices.Sorted(maps.Keys(files)) {
		if !strings.Contains(name, "/node_modules/") {
			roots = append(roots, tspath.ToRootedFilePath(name, "/project"))
		}
	}
	options := &core.CompilerOptions{NoLib: core.TSTrue, Module: core.ModuleKindESNext, ModuleResolution: core.ModuleResolutionKindBundler}
	config := tsoptions.NewParsedCommandLine(options, roots, nil, "/project", tspath.CaseSensitive)
	return compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host})
}
