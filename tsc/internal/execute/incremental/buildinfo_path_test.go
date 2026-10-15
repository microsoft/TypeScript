package incremental

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
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
