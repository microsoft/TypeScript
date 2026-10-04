package tspath

import (
	"testing"
)

func TestStartsWithDirectory(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name            string
		fileName        string
		directoryName   string
		caseSensitivity CaseSensitivity
		expected        bool
	}{
		{
			name:            "exact match case sensitive",
			fileName:        "/project/src/file.ts",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "exact match case insensitive",
			fileName:        "/project/src/file.ts",
			directoryName:   "/PROJECT/SRC",
			caseSensitivity: CaseInsensitive,
			expected:        true,
		},
		{
			name:            "case sensitive mismatch",
			fileName:        "/project/src/file.ts",
			directoryName:   "/PROJECT/SRC",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "file not in directory",
			fileName:        "/project/lib/file.ts",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "file in subdirectory",
			fileName:        "/project/src/components/Button.tsx",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "file in parent directory",
			fileName:        "/project/file.ts",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "windows style separators",
			fileName:        "C:\\project\\src\\file.ts",
			directoryName:   "C:\\project\\src",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "mixed separators",
			fileName:        "/project/src/file.ts",
			directoryName:   "\\project\\src",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "empty directory name",
			fileName:        "/project/src/file.ts",
			directoryName:   "",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "empty file name",
			fileName:        "",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "identical paths",
			fileName:        "/project/src",
			directoryName:   "/project/src",
			caseSensitivity: CaseSensitive,
			expected:        false, // File name doesn't start with directory + separator
		},
		{
			name:            "directory with trailing separator",
			fileName:        "/project/src/file.ts",
			directoryName:   "/project/src/",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "unicode characters",
			fileName:        "/project/测试/file.ts",
			directoryName:   "/project/测试",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "unicode case insensitive",
			fileName:        "/project/测试/file.ts",
			directoryName:   "/PROJECT/测试",
			caseSensitivity: CaseInsensitive,
			expected:        true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := StartsWithDirectory(tt.fileName, tt.directoryName, tt.caseSensitivity)
			if result != tt.expected {
				t.Errorf("StartsWithDirectory(%q, %q, %v) = %v, expected %v",
					tt.fileName, tt.directoryName, tt.caseSensitivity, result, tt.expected)
			}
		})
	}
}

func TestStartsWithDirectoryEdgeCases(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name            string
		fileName        string
		directoryName   string
		caseSensitivity CaseSensitivity
		expected        bool
	}{
		{
			name:            "file name shorter than directory",
			fileName:        "/proj",
			directoryName:   "/project",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "file name starts with directory but no separator",
			fileName:        "/projectsrc/file.ts",
			directoryName:   "/project",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
		{
			name:            "relative paths",
			fileName:        "src/file.ts",
			directoryName:   "src",
			caseSensitivity: CaseSensitive,
			expected:        true,
		},
		{
			name:            "absolute vs relative",
			fileName:        "/project/src/file.ts",
			directoryName:   "project/src",
			caseSensitivity: CaseSensitive,
			expected:        false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := StartsWithDirectory(tt.fileName, tt.directoryName, tt.caseSensitivity)
			if result != tt.expected {
				t.Errorf("StartsWithDirectory(%q, %q, %v) = %v, expected %v",
					tt.fileName, tt.directoryName, tt.caseSensitivity, result, tt.expected)
			}
		})
	}
}
