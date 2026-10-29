package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestContentMapperSelectorPatternIntersection(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		include, want string
	}{
		{"**/foo*", "**/foo*.vue"},
		{"**/*.v*", "**/*.v*"},
		{"**/fo?", "**/fo?"},
		{"**/*oml", "**/*oml"},
	} {
		got, ok := contentMapperSelectorPattern(test.include, ".vue")
		assert.Assert(t, ok)
		assert.Equal(t, got, test.want)
	}
}

func TestContentMapperSelectorIncludes(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, directory, include, base string
		extended, withoutSourceFile    bool
	}{
		{name: "configDir", directory: "/project", include: "${configDir}/local", base: "/project/local"},
		{name: "inherited", directory: "/project", include: "src", extended: true, base: "/shared/src"},
		{name: "rooted", directory: "/project", include: "/shared/src", base: "/shared/src"},
		{name: "without source file", directory: "/project", include: "src", withoutSourceFile: true, base: "/project/src"},
		{name: "Windows", directory: "c:/project", include: "../shared/src", base: "c:/shared/src"},
		{name: "Windows separators", directory: "c:/project", include: `c:\\shared\\src`, base: "c:/shared/src"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			configText := `{"contentMappers": [{"package": "mapper", "include": ["` + test.include + `"]}]}`
			files := map[string]string{
				test.directory + "/tsconfig.json": configText,
				test.directory + "/index.ts":      "",
				test.directory + "/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".toml"]}}
				}`,
			}
			if test.extended {
				// Inherited includes stay relative to the base config, not the extending project.
				files["/shared/base.json"] = configText
				files[test.directory+"/tsconfig.json"] = `{"extends": "../shared/base.json"}`
			}
			fs := vfstest.FromMap(files, tspath.CaseSensitive)
			config, errors := tsoptions.GetParsedCommandLineOfConfigFile(
				tspath.RootedFilePathFromAbsolute(test.directory+"/tsconfig.json"),
				&core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), 0)
			if test.withoutSourceFile {
				config.ConfigFile = nil
			}
			got := collectConfiguredContentMappers([]*tsoptions.ParsedCommandLine{config})
			assert.DeepEqual(t, got.selectors, []ContentMapperSelector{{
				Base: tspath.RootedDirectoryPathFromAbsolute(test.base), Pattern: "**/*.toml", Extension: ".toml",
			}})
		})
	}
}
