package tsoptions

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
)

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
