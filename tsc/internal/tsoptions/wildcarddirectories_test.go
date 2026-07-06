package tsoptions

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetWildcardDirectories_DotPrefixedIncludeWithDotDirExclude(t *testing.T) {
	t.Parallel()

	// https://github.com/microsoft/typescript-go/issues/3733
	// "./"-prefixed include specs must be fully normalized before being tested
	// against exclude patterns; otherwise the leftover literal "." path segment
	// matches dot-directory excludes like "**/.*/", silently dropping every
	// wildcard directory (and with them, root file watching for the config).
	result := getWildcardDirectories(
		[]string{"./app/**/*.ts", "./app/**/*.tsx"},
		[]string{"**/node_modules", "**/.*/", "./build"},
		tspath.ComparePathsOptions{
			CurrentDirectory:          "/home/projects/monorepo/apps/web",
			UseCaseSensitiveFileNames: true,
		},
	)
	assert.DeepEqual(t, result, map[string]bool{"/home/projects/monorepo/apps/web/app": true})
}

func TestGetWildcardDirectories_NonASCIICharacters(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name                      string
		include                   []string
		exclude                   []string
		currentDirectory          string
		useCaseSensitiveFileNames bool
	}{
		{
			name:                      "Norwegian character æ in path",
			include:                   []string{"src/**/*.test.ts", "src/**/*.stories.ts", "src/**/*.mdx"},
			exclude:                   []string{"node_modules"},
			currentDirectory:          "C:/Users/TobiasLægreid/dev/app/frontend/packages/react",
			useCaseSensitiveFileNames: false,
		},
		{
			name:                      "Japanese characters in path",
			include:                   []string{"src/**/*.ts"},
			exclude:                   []string{"テスト"},
			currentDirectory:          "/Users/ユーザー/プロジェクト",
			useCaseSensitiveFileNames: true,
		},
		{
			name:                      "Chinese characters in path",
			include:                   []string{"源代码/**/*.js"},
			exclude:                   []string{"节点模块"},
			currentDirectory:          "/home/用户/项目",
			useCaseSensitiveFileNames: true,
		},
		{
			name:                      "Various Unicode characters",
			include:                   []string{"src/**/*.ts"},
			exclude:                   []string{"node_modules"},
			currentDirectory:          "/Users/Müller/café/naïve/résumé",
			useCaseSensitiveFileNames: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			comparePathsOptions := tspath.ComparePathsOptions{
				CurrentDirectory:          tt.currentDirectory,
				UseCaseSensitiveFileNames: tt.useCaseSensitiveFileNames,
			}

			result := getWildcardDirectories(tt.include, tt.exclude, comparePathsOptions)

			if result == nil {
				t.Fatalf("expected non-nil result")
			}
		})
	}
}
