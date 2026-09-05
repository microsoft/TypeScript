package tsoptions_test

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestRawCompilerOptionsFinalizePaths(t *testing.T) {
	t.Parallel()

	var raw tsoptions.RawCompilerOptions
	assert.NilError(t, json.Unmarshal([]byte(`{
		"outDir": "dist",
		"rootDirs": ["src", "${configDir}/generated"],
		"tsBuildInfoFile": "cache/build.tsbuildinfo",
		"sourceRoot": "sources\\mapped",
		"paths": {
			"*a": ["first/*"],
			"*": ["fallback/*"]
		},
		"allowNonTsExtensions": true,
		"suppressOutputPathCheck": true,
		"configFilePath": "",
		"NoImplicitAny": true
	}`), &raw))

	options, diagnostics := raw.Finalize(tspath.RootedDirectoryPathFromNormalized("/project"))
	assert.Equal(t, len(diagnostics), 0)
	assert.Equal(t, options.OutDir, tspath.RootedDirectoryPathFromNormalized("/project/dist"))
	assert.DeepEqual(t, options.RootDirs, []tspath.RootedDirectoryPath{
		tspath.RootedDirectoryPathFromNormalized("/project/src"),
		tspath.RootedDirectoryPathFromNormalized("/project/generated"),
	})
	assert.Equal(t, options.TsBuildInfoFile, tspath.RootedFilePathFromNormalized("/project/cache/build.tsbuildinfo"))
	assert.Equal(t, options.SourceRoot, tspath.ToSourceMapLocation("sources/mapped"))
	assert.DeepEqual(t, slices.Collect(options.Paths.Keys()), []string{"*a", "*"})
	paths, ok := options.Paths.Get("*a")
	assert.Assert(t, ok)
	assert.DeepEqual(t, paths, []string{"first/*"})
	assert.Equal(t, options.AllowNonTsExtensions, core.TSTrue)
	assert.Equal(t, options.SuppressOutputPathCheck, core.TSTrue)
	assert.Equal(t, options.ConfigFilePath, tspath.RootedFilePath(""))
	assert.Equal(t, options.NoImplicitAny, core.TSUnknown)
}
