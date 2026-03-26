package vfsmatch

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

// Benchmark test cases using the same hosts as the unit tests

func BenchmarkReadDirectory(b *testing.B) {
	benchCases := []struct {
		name       string
		host       func() vfs.FS
		path       string
		extensions []string
		excludes   []string
		includes   []string
	}{
		{
			name:       "LiteralIncludes",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"a.ts", "b.ts"},
		},
		{
			name:       "WildcardIncludes",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z/*.ts", "x/*.ts"},
		},
		{
			name:       "RecursiveWildcard",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
		},
		{
			name:       "RecursiveWithExcludes",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/b.ts"},
			includes:   []string{"**/*.ts"},
		},
		{
			name:       "ComplexPattern",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"*.ts", "z/??z.ts", "*/b.ts"},
			includes:   []string{"a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"},
		},
		{
			name:       "DottedFolders",
			host:       dottedFoldersHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/.*/*"},
		},
		{
			name:       "CommonPackageFolders",
			host:       commonFoldersHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
		},
		{
			name:       "NoIncludes",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
		},
		{
			name:       "MultipleRecursive",
			host:       caseInsensitiveHost,
			path:       "/dev",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/x/**/*"},
		},
		{
			name:       "LargeFileSystem",
			host:       largeFileSystemHost,
			path:       "/project",
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"src/**/*.ts"},
			excludes:   []string{"**/node_modules/**", "**/*.test.ts"},
		},
		{
			name:       "LargeAllFiles",
			host:       largeFileSystemHost,
			path:       "/project",
			extensions: []string{".ts", ".tsx", ".js"},
			excludes:   []string{"**/node_modules/**"},
			includes:   []string{"**/*"},
		},
	}

	for _, bc := range benchCases {
		b.Run(bc.name, func(b *testing.B) {
			host := cachedvfs.From(bc.host())
			b.ReportAllocs()
			for b.Loop() {
				matchFiles(bc.path, bc.extensions, bc.excludes, bc.includes, host.UseCaseSensitiveFileNames(), "/", UnlimitedDepth, host)
			}
		})
	}
}

// largeFileSystemHost creates a more realistic file system with many files
func largeFileSystemHost() vfs.FS {
	files := make(map[string]string)

	// Create a realistic project structure
	dirs := []string{
		"/project/src",
		"/project/src/components",
		"/project/src/utils",
		"/project/src/services",
		"/project/src/models",
		"/project/src/hooks",
		"/project/test",
		"/project/node_modules/react",
		"/project/node_modules/typescript",
		"/project/node_modules/@types/node",
	}

	// Add files to each directory
	for _, dir := range dirs {
		for j := range 20 {
			files[dir+"/file"+string(rune('a'+j))+".ts"] = ""
			files[dir+"/file"+string(rune('a'+j))+".test.ts"] = ""
		}
	}

	// Add some dotted directories
	files["/project/src/.hidden/secret.ts"] = ""
	files["/project/.config/settings.ts"] = ""

	return vfstest.FromMap(files, false)
}

// BenchmarkPatternCompilation benchmarks the pattern compilation step
func BenchmarkPatternCompilation(b *testing.B) {
	patterns := []struct {
		name string
		spec string
	}{
		{"Literal", "src/file.ts"},
		{"SingleWildcard", "src/*.ts"},
		{"QuestionMark", "src/?.ts"},
		{"DoubleAsterisk", "**/file.ts"},
		{"Complex", "src/**/components/*.tsx"},
		{"DottedPattern", "**/.*/*"},
	}

	for _, p := range patterns {
		b.Run(p.name, func(b *testing.B) {
			for b.Loop() {
				_, _ = compileGlobPattern(p.spec, "/project", UsageFiles, true)
			}
		})
	}
}

// BenchmarkPatternMatching benchmarks pattern matching against paths
func BenchmarkPatternMatching(b *testing.B) {
	testCases := []struct {
		name  string
		spec  string
		paths []string
	}{
		{
			name: "LiteralMatch",
			spec: "src/file.ts",
			paths: []string{
				"/project/src/file.ts",
				"/project/src/other.ts",
				"/project/lib/file.ts",
			},
		},
		{
			name: "WildcardMatch",
			spec: "src/*.ts",
			paths: []string{
				"/project/src/file.ts",
				"/project/src/component.ts",
				"/project/src/deep/file.ts",
				"/project/lib/file.ts",
			},
		},
		{
			name: "RecursiveMatch",
			spec: "**/file.ts",
			paths: []string{
				"/project/file.ts",
				"/project/src/file.ts",
				"/project/src/deep/nested/file.ts",
				"/project/src/other.ts",
			},
		},
		{
			name: "ComplexMatch",
			spec: "src/**/components/*.tsx",
			paths: []string{
				"/project/src/components/Button.tsx",
				"/project/src/features/auth/components/Login.tsx",
				"/project/src/components/Button.ts",
				"/project/lib/components/Button.tsx",
			},
		},
	}

	for _, tc := range testCases {
		pattern, ok := compileGlobPattern(tc.spec, "/project", UsageFiles, true)
		if !ok {
			continue
		}

		b.Run(tc.name, func(b *testing.B) {
			for b.Loop() {
				for _, path := range tc.paths {
					pattern.matches(path)
				}
			}
		})
	}
}
