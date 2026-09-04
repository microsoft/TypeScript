package outputpaths_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

type outputPathsHost struct {
	commonSourceDirectory tspath.RootedDirectoryPath
}

func (h outputPathsHost) CommonSourceDirectory() tspath.RootedDirectoryPath {
	return h.commonSourceDirectory
}

func (outputPathsHost) ContentMapperExtensions() []string {
	return nil
}

func (outputPathsHost) CaseSensitivity() tspath.CaseSensitivity {
	return tspath.CaseInsensitive
}

func TestGetSourceFileNameInNewDirSourceMatchesCommonDirectory(t *testing.T) {
	t.Parallel()

	actual := outputpaths.GetSourceFileNameInNewDir(
		tspath.RootedFilePathFromNormalized("/project/src"),
		tspath.RootedDirectoryPathFromNormalized("/project/out"),
		tspath.RootedDirectoryPathFromNormalized("/project/src"),
		tspath.CaseSensitive,
	)
	assert.Equal(t, actual, tspath.RootedFilePath("/project/src"))
}

func TestGetSourceFileNameInNewDirCanonicalizationShrinksCommonDirectory(t *testing.T) {
	t.Parallel()

	// Each Kelvin sign '\u212A' case-folds to the single-byte 'k', so the raw
	// (non-canonicalized) commonSourceDirectory is longer, in bytes, than the source
	// file path it's a case-insensitive prefix of, even though the file path itself
	// is longer overall once its own (already-lowercase) suffix is included.
	// Slicing sourceFilePath by len(commonSourceDirectory) bytes would still panic
	// here ([14:11]); this must clamp per-rune instead, like the reference
	// implementation's substring does.
	actual := outputpaths.GetSourceFileNameInNewDir(
		tspath.RootedFilePathFromNormalized("/kkkk/a.ts"),
		tspath.RootedDirectoryPathFromNormalized("/out"),
		tspath.RootedDirectoryPathFromNormalized("/\u212A\u212A\u212A\u212A"),
		tspath.CaseInsensitive,
	)
	assert.Equal(t, actual, tspath.RootedFilePath("/out/a.ts"))
}

func TestGetBuildInfoFileNameAcrossRoots(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name           string
		rootDir        tspath.RootedDirectoryPath
		outDir         tspath.RootedDirectoryPath
		configFilePath tspath.RootedFilePath
		expected       tspath.RootedFilePath
	}{
		{
			name:           "same root",
			rootDir:        "c:/src",
			outDir:         "c:/out",
			configFilePath: "c:/src/project/tsconfig.json",
			expected:       "c:/out/project/tsconfig.tsbuildinfo",
		},
		{
			name:           "different drive",
			rootDir:        "c:/src",
			outDir:         "c:/out",
			configFilePath: "d:/project/tsconfig.json",
			expected:       "d:/project/tsconfig.tsbuildinfo",
		},
		{
			name:           "different UNC authority",
			rootDir:        "//server-a/src",
			outDir:         "//server-a/out",
			configFilePath: "//server-b/project/tsconfig.json",
			expected:       "//server-b/project/tsconfig.tsbuildinfo",
		},
		{
			name:           "different URL authority",
			rootDir:        "file://server-a/src",
			outDir:         "file://server-a/out",
			configFilePath: "file://server-b/project/tsconfig.json",
			expected:       "file://server-b/project/tsconfig.tsbuildinfo",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			options := &core.CompilerOptions{
				Incremental:    core.TSTrue,
				RootDir:        test.rootDir,
				OutDir:         test.outDir,
				ConfigFilePath: test.configFilePath,
			}
			actual := outputpaths.GetBuildInfoFileName(options, tspath.CaseInsensitive)
			assert.Equal(t, actual, test.expected)
		})
	}
}

func TestGetOutputFileNameAcrossRoots(t *testing.T) {
	t.Parallel()

	input := tspath.RootedFilePathFromNormalized("d:/shared.ts")
	options := &core.CompilerOptions{
		OutDir: tspath.RootedDirectoryPathFromNormalized("c:/dist"),
	}
	host := outputPathsHost{
		commonSourceDirectory: tspath.RootedDirectoryPathFromNormalized("c:/src"),
	}

	assert.Equal(t, outputpaths.GetOutputJSFileNameWorker(input, options, host), tspath.RootedFilePath("d:/shared.js"))
	assert.Equal(t, outputpaths.GetOutputDeclarationFileNameWorker(input, options, host), tspath.RootedFilePath("d:/shared.d.ts"))
}
