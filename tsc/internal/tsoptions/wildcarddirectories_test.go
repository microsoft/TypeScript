package tsoptions

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetWildcardDirectories_DotPrefixedIncludeWithDotDirExclude(t *testing.T) {
	t.Parallel()

	// https://github.com/microsoft/TypeScript/tsc/issues/3733
	// "./"-prefixed include specs must be fully normalized before being tested
	// against exclude patterns; otherwise the leftover literal "." path segment
	// matches dot-directory excludes like "**/.*/", silently dropping every
	// wildcard directory (and with them, root file watching for the config).
	result := getWildcardDirectories(
		[]string{"./app/**/*.ts", "./app/**/*.tsx"},
		[]string{"**/node_modules", "**/.*/", "./build"},
		"/home/projects/monorepo/apps/web",
		tspath.CaseSensitive,
	)
	assert.DeepEqual(t, result, map[tspath.RootedDirectoryPath]bool{"/home/projects/monorepo/apps/web/app": true})
}

func TestGetWildcardDirectories_DriveRoot(t *testing.T) {
	t.Parallel()

	result := getWildcardDirectories(
		[]string{"*.ts"},
		nil,
		"c:/",
		tspath.CaseInsensitive,
	)
	assert.DeepEqual(t, result, map[tspath.RootedDirectoryPath]bool{"c:/": false})
}

func TestGetWildcardDirectories_NonASCIICharacters(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name             string
		include          []string
		exclude          []string
		currentDirectory tspath.RootedDirectoryPath
		caseSensitivity  tspath.CaseSensitivity
	}{
		{
			name:             "Norwegian character æ in path",
			include:          []string{"src/**/*.test.ts", "src/**/*.stories.ts", "src/**/*.mdx"},
			exclude:          []string{"node_modules"},
			currentDirectory: "C:/Users/TobiasLægreid/dev/app/frontend/packages/react",
			caseSensitivity:  tspath.CaseInsensitive,
		},
		{
			name:             "Japanese characters in path",
			include:          []string{"src/**/*.ts"},
			exclude:          []string{"テスト"},
			currentDirectory: "/Users/ユーザー/プロジェクト",
			caseSensitivity:  tspath.CaseSensitive,
		},
		{
			name:             "Chinese characters in path",
			include:          []string{"源代码/**/*.js"},
			exclude:          []string{"节点模块"},
			currentDirectory: "/home/用户/项目",
			caseSensitivity:  tspath.CaseSensitive,
		},
		{
			name:             "Various Unicode characters",
			include:          []string{"src/**/*.ts"},
			exclude:          []string{"node_modules"},
			currentDirectory: "/Users/Müller/café/naïve/résumé",
			caseSensitivity:  tspath.CaseInsensitive,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			result := getWildcardDirectories(tt.include, tt.exclude, tt.currentDirectory, tt.caseSensitivity)

			if result == nil {
				t.Fatalf("expected non-nil result")
			}
		})
	}
}
