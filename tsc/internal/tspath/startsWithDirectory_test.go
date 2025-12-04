package tspath

import (
	"testing"
)

func TestStartsWithDirectory(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name                      string
		fileName                  string
		directoryName             string
		useCaseSensitiveFileNames bool
		expected                  bool
	}{
		{
			name:                      "exact match case sensitive",
			fileName:                  "/project/src/file.ts",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "exact match case insensitive",
			fileName:                  "/project/src/file.ts",
			directoryName:             "/PROJECT/SRC",
			useCaseSensitiveFileNames: false,
			expected:                  true,
		},
		{
			name:                      "case sensitive mismatch",
			fileName:                  "/project/src/file.ts",
			directoryName:             "/PROJECT/SRC",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "file not in directory",
			fileName:                  "/project/lib/file.ts",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "file in subdirectory",
			fileName:                  "/project/src/components/Button.tsx",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "file in parent directory",
			fileName:                  "/project/file.ts",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "windows style separators",
			fileName:                  "C:\\project\\src\\file.ts",
			directoryName:             "C:\\project\\src",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "mixed separators",
			fileName:                  "/project/src/file.ts",
			directoryName:             "\\project\\src",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "empty directory name",
			fileName:                  "/project/src/file.ts",
			directoryName:             "",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "empty file name",
			fileName:                  "",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "identical paths",
			fileName:                  "/project/src",
			directoryName:             "/project/src",
			useCaseSensitiveFileNames: true,
			expected:                  false, // File name doesn't start with directory + separator
		},
		{
			name:                      "directory with trailing separator",
			fileName:                  "/project/src/file.ts",
			directoryName:             "/project/src/",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "unicode characters",
			fileName:                  "/project/测试/file.ts",
			directoryName:             "/project/测试",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "unicode case insensitive",
			fileName:                  "/project/测试/file.ts",
			directoryName:             "/PROJECT/测试",
			useCaseSensitiveFileNames: false,
			expected:                  true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := StartsWithDirectory(tt.fileName, tt.directoryName, tt.useCaseSensitiveFileNames)
			if result != tt.expected {
				t.Errorf("StartsWithDirectory(%q, %q, %v) = %v, expected %v",
					tt.fileName, tt.directoryName, tt.useCaseSensitiveFileNames, result, tt.expected)
			}
		})
	}
}

func TestStartsWithDirectoryEdgeCases(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name                      string
		fileName                  string
		directoryName             string
		useCaseSensitiveFileNames bool
		expected                  bool
	}{
		{
			name:                      "file name shorter than directory",
			fileName:                  "/proj",
			directoryName:             "/project",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "file name starts with directory but no separator",
			fileName:                  "/projectsrc/file.ts",
			directoryName:             "/project",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
		{
			name:                      "relative paths",
			fileName:                  "src/file.ts",
			directoryName:             "src",
			useCaseSensitiveFileNames: true,
			expected:                  true,
		},
		{
			name:                      "absolute vs relative",
			fileName:                  "/project/src/file.ts",
			directoryName:             "project/src",
			useCaseSensitiveFileNames: true,
			expected:                  false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := StartsWithDirectory(tt.fileName, tt.directoryName, tt.useCaseSensitiveFileNames)
			if result != tt.expected {
				t.Errorf("StartsWithDirectory(%q, %q, %v) = %v, expected %v",
					tt.fileName, tt.directoryName, tt.useCaseSensitiveFileNames, result, tt.expected)
			}
		})
	}
}
