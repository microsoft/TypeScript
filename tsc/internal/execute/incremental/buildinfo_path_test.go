package incremental

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"gotest.tools/v3/assert"
)

func TestBuildInfoPathJSONRoundTrip(t *testing.T) {
	t.Parallel()

	buildInfo := &BuildInfo{
		Root:                 []*BuildInfoRoot{{NonIncremental: "./src/root.ts"}},
		PackageJsons:         []BuildInfoPath{"./package.json"},
		MissingPackageJsons:  []BuildInfoPath{"../package.json"},
		FileNames:            []BuildInfoPath{"./src/root.ts", "lib.es5.d.ts"},
		LatestChangedDtsFile: "./dist/root.d.ts",
	}

	data, err := json.Marshal(buildInfo)
	assert.NilError(t, err)
	assert.Equal(
		t,
		string(data),
		`{"root":["./src/root.ts"],"packageJsons":["./package.json"],"missingPackageJsons":["../package.json"],"fileNames":["./src/root.ts","lib.es5.d.ts"],"latestChangedDtsFile":"./dist/root.d.ts"}`,
	)

	var roundTripped BuildInfo
	assert.NilError(t, json.Unmarshal(data, &roundTripped))
	assert.DeepEqual(t, roundTripped.Root, buildInfo.Root)
	assert.DeepEqual(t, roundTripped.PackageJsons, buildInfo.PackageJsons)
	assert.DeepEqual(t, roundTripped.MissingPackageJsons, buildInfo.MissingPackageJsons)
	assert.DeepEqual(t, roundTripped.FileNames, buildInfo.FileNames)
	assert.Equal(t, roundTripped.LatestChangedDtsFile, buildInfo.LatestChangedDtsFile)
}

func TestBuildInfoCompilerOptionsJSONRoundTrip(t *testing.T) {
	t.Parallel()
	const input = `{"options":{"paths":{"second":["b","a"],"first":[]},"rootDirs":["./src","../generated"],"typeRoots":["./types"],"types":[],"customConditions":["custom"]}}`
	var info BuildInfo
	assert.NilError(t, json.Unmarshal([]byte(input), &info))
	options := info.GetCompilerOptions("/project/dist")
	assert.DeepEqual(t, slices.Collect(options.Paths.Keys()), []string{"second", "first"})
	assert.DeepEqual(t, options.Paths.GetOrZero("second"), []string{"b", "a"})
	assert.DeepEqual(t, options.Paths.GetOrZero("first"), []string{})
	assert.Assert(t, options.Types != nil)
	assert.Equal(t, options.RootDirs[0].AsString(), "/project/dist/src")
	assert.Equal(t, options.RootDirs[1].AsString(), "/project/generated")
	assert.Equal(t, options.TypeRoots[0].AsString(), "/project/dist/types")
	data, err := json.Marshal(&info)
	assert.NilError(t, err)
	assert.Equal(t, string(data), input)
	var restored BuildInfo
	assert.NilError(t, json.Unmarshal(data, &restored))
	restoredOptions := restored.GetCompilerOptions("/project/dist")
	assert.Assert(t, options.Equals(restoredOptions))
	assert.Assert(t, !tsoptions.CompilerOptionsAffectEmit(options, restoredOptions))
	assert.Assert(t, !tsoptions.CompilerOptionsAffectSemanticDiagnostics(options, restoredOptions))
}
