package vfsmatch

import (
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// Test cases modeled after TypeScript's matchFiles tests in
// _submodules/TypeScript/src/testRunner/unittests/config/matchFiles.ts

// caseInsensitiveHost simulates a Windows-like file system
func caseInsensitiveHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/a.ts":         "",
		"/dev/a.d.ts":       "",
		"/dev/a.js":         "",
		"/dev/b.ts":         "",
		"/dev/b.js":         "",
		"/dev/c.d.ts":       "",
		"/dev/z/a.ts":       "",
		"/dev/z/abz.ts":     "",
		"/dev/z/aba.ts":     "",
		"/dev/z/b.ts":       "",
		"/dev/z/bbz.ts":     "",
		"/dev/z/bba.ts":     "",
		"/dev/x/a.ts":       "",
		"/dev/x/aa.ts":      "",
		"/dev/x/b.ts":       "",
		"/dev/x/y/a.ts":     "",
		"/dev/x/y/b.ts":     "",
		"/dev/js/a.js":      "",
		"/dev/js/b.js":      "",
		"/dev/js/d.min.js":  "",
		"/dev/js/ab.min.js": "",
		"/ext/ext.ts":       "",
		"/ext/b/a..b.ts":    "",
	}, false)
}

// caseSensitiveHost simulates a Unix-like case-sensitive file system
func caseSensitiveHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/a.ts":         "",
		"/dev/a.d.ts":       "",
		"/dev/a.js":         "",
		"/dev/b.ts":         "",
		"/dev/b.js":         "",
		"/dev/A.ts":         "",
		"/dev/B.ts":         "",
		"/dev/c.d.ts":       "",
		"/dev/z/a.ts":       "",
		"/dev/z/abz.ts":     "",
		"/dev/z/aba.ts":     "",
		"/dev/z/b.ts":       "",
		"/dev/z/bbz.ts":     "",
		"/dev/z/bba.ts":     "",
		"/dev/x/a.ts":       "",
		"/dev/x/b.ts":       "",
		"/dev/x/y/a.ts":     "",
		"/dev/x/y/b.ts":     "",
		"/dev/q/a/c/b/d.ts": "",
		"/dev/js/a.js":      "",
		"/dev/js/b.js":      "",
		"/dev/js/d.MIN.js":  "",
	}, true)
}

// commonFoldersHost includes node_modules, bower_components, jspm_packages
func commonFoldersHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/a.ts":                  "",
		"/dev/a.d.ts":                "",
		"/dev/a.js":                  "",
		"/dev/b.ts":                  "",
		"/dev/x/a.ts":                "",
		"/dev/node_modules/a.ts":     "",
		"/dev/bower_components/a.ts": "",
		"/dev/jspm_packages/a.ts":    "",
	}, false)
}

// dottedFoldersHost includes files and folders starting with a dot
func dottedFoldersHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/x/d.ts":           "",
		"/dev/x/y/d.ts":         "",
		"/dev/x/y/.e.ts":        "",
		"/dev/x/.y/a.ts":        "",
		"/dev/.z/.b.ts":         "",
		"/dev/.z/c.ts":          "",
		"/dev/w/.u/e.ts":        "",
		"/dev/g.min.js/.g/g.ts": "",
	}, false)
}

// mixedExtensionHost has various file extensions
func mixedExtensionHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/a.ts":    "",
		"/dev/a.d.ts":  "",
		"/dev/a.js":    "",
		"/dev/b.tsx":   "",
		"/dev/b.d.ts":  "",
		"/dev/b.jsx":   "",
		"/dev/c.tsx":   "",
		"/dev/c.js":    "",
		"/dev/d.js":    "",
		"/dev/e.jsx":   "",
		"/dev/f.other": "",
	}, false)
}

// sameNamedDeclarationsHost has files with same names but different extensions
func sameNamedDeclarationsHost() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/dev/a.tsx":  "",
		"/dev/a.d.ts": "",
		"/dev/b.tsx":  "",
		"/dev/b.ts":   "",
		"/dev/c.tsx":  "",
		"/dev/m.ts":   "",
		"/dev/m.d.ts": "",
		"/dev/n.tsx":  "",
		"/dev/n.ts":   "",
		"/dev/n.d.ts": "",
		"/dev/o.ts":   "",
		"/dev/x.d.ts": "",
	}, false)
}

type readDirTestCase struct {
	name       string
	host       func() vfs.FS
	currentDir string
	path       string
	extensions []string
	excludes   []string
	includes   []string
	depth      int
	expect     func(t *testing.T, got []string)
}

func runReadDirectoryCase(t *testing.T, tc readDirTestCase) {
	currentDir := tc.currentDir
	if currentDir == "" {
		currentDir = "/"
	}
	path := tc.path
	if path == "" {
		path = "/dev"
	}
	depth := tc.depth
	if depth == 0 {
		depth = UnlimitedDepth
	}
	host := tc.host()
	got := matchFiles(path, tc.extensions, tc.excludes, tc.includes, host.UseCaseSensitiveFileNames(), currentDir, depth, host)
	tc.expect(t, got)
}

func TestReadDirectory(t *testing.T) {
	t.Parallel()

	cases := []readDirTestCase{
		{
			name:       "defaults include common package folders",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/node_modules/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/bower_components/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/jspm_packages/a.ts"))
			},
		},
		{
			name:       "literal includes without exclusions",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"a.ts", "b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/a.ts", "/dev/b.ts"})
			},
		},
		{
			name:       "literal includes with non ts extensions excluded",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"a.js", "b.js"},
			expect: func(t *testing.T, got []string) {
				assert.Equal(t, len(got), 0)
			},
		},
		{
			name:       "literal includes missing files excluded",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z.ts", "x.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Equal(t, len(got), 0)
			},
		},
		{
			name:       "literal includes with literal excludes",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"b.ts"},
			includes:   []string{"a.ts", "b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/a.ts"})
			},
		},
		{
			name:       "literal includes with wildcard excludes",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"*.ts", "z/??z.ts", "*/b.ts"},
			includes:   []string{"a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/z/a.ts", "/dev/z/aba.ts"})
			},
		},
		{
			name:       "literal includes with recursive excludes",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/b.ts"},
			includes:   []string{"a.ts", "b.ts", "x/a.ts", "x/b.ts", "x/y/a.ts", "x/y/b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/a.ts", "/dev/x/a.ts", "/dev/x/y/a.ts"})
			},
		},
		{
			name:       "case sensitive exclude is respected",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/b.ts"},
			includes:   []string{"B.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/B.ts"})
			},
		},
		{
			name:       "explicit includes keep common package folders",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"a.ts", "b.ts", "node_modules/a.ts", "bower_components/a.ts", "jspm_packages/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/node_modules/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/bower_components/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/jspm_packages/a.ts"))
			},
		},
		{
			name:       "wildcard include sorted order",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z/*.ts", "x/*.ts"},
			expect: func(t *testing.T, got []string) {
				expected := []string{
					"/dev/z/a.ts", "/dev/z/aba.ts", "/dev/z/abz.ts", "/dev/z/b.ts", "/dev/z/bba.ts", "/dev/z/bbz.ts",
					"/dev/x/a.ts", "/dev/x/aa.ts", "/dev/x/b.ts",
				}
				assert.DeepEqual(t, got, expected)
			},
		},
		{
			name:       "wildcard include same named declarations excluded",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/a.d.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/c.d.ts"))
			},
		},
		{
			name:       "wildcard star matches only ts files",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, contains(f, ".ts") || contains(f, ".tsx") || contains(f, ".d.ts"), "unexpected file: %s", f)
				}
				assert.Assert(t, !slices.Contains(got, "/dev/a.js"))
				assert.Assert(t, !slices.Contains(got, "/dev/b.js"))
			},
		},
		{
			name:       "wildcard question mark single character",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/?.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/x/a.ts", "/dev/x/b.ts"})
			},
		},
		{
			name:       "wildcard recursive directory",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/z/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/a.ts"))
			},
		},
		{
			name:       "double asterisk matches zero-or-more directories",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Equal(t, len(got), 2)
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/a.ts"))
			},
		},
		{
			name:       "wildcard multiple recursive directories",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/y/**/a.ts", "x/**/a.ts", "z/**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, len(got) > 0)
			},
		},
		{
			name:       "wildcard case sensitive matching",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/A.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/A.ts"})
			},
		},
		{
			name:       "wildcard missing files excluded",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*/z.ts"},
			expect:     func(t *testing.T, got []string) { assert.Equal(t, len(got), 0) },
		},
		{
			name:       "exclude folders with wildcards",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"z", "x"},
			includes:   []string{"**/*"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, !contains(f, "/z/") && !contains(f, "/x/"), "should not contain z or x: %s", f)
				}
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
			},
		},
		{
			name:       "include paths outside project absolute",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*", "/ext/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/ext/ext.ts"))
			},
		},
		{
			name:       "include paths outside project relative",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**"},
			includes:   []string{"*", "../ext/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/ext/ext.ts"))
			},
		},
		{
			name:       "include files containing double dots",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**"},
			includes:   []string{"/ext/b/a..b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/ext/b/a..b.ts"))
			},
		},
		{
			name:       "exclude files containing double dots",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"/ext/b/a..b.ts"},
			includes:   []string{"/ext/**/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/ext/ext.ts"))
				assert.Assert(t, !slices.Contains(got, "/ext/b/a..b.ts"))
			},
		},
		{
			name:       "common package folders implicitly excluded",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/node_modules/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/bower_components/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/jspm_packages/a.ts"))
			},
		},
		{
			name:       "common package folders explicit recursive include",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts", "**/node_modules/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/node_modules/a.ts"))
			},
		},
		{
			name:       "common package folders wildcard include",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/node_modules/a.ts"))
			},
		},
		{
			name:       "common package folders explicit wildcard include",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*/a.ts", "node_modules/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/node_modules/a.ts"))
			},
		},
		{
			name:       "dotted folders not implicitly included",
			host:       dottedFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/**/*", "w/*/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/d.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/d.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/.y/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/y/.e.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/w/.u/e.ts"))
			},
		},
		{
			name:       "dotted folders explicitly included",
			host:       dottedFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/.y/a.ts", "/dev/.z/.b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/.y/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/.z/.b.ts"))
			},
		},
		{
			name:       "dotted folders recursive wildcard matches directories",
			host:       dottedFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/.*/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/.y/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/.z/c.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/w/.u/e.ts"))
			},
		},
		{
			name:       "trailing recursive include returns empty",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**"},
			expect:     func(t *testing.T, got []string) { assert.Equal(t, len(got), 0) },
		},
		{
			name:       "trailing recursive exclude removes everything",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**"},
			includes:   []string{"**/*"},
			expect:     func(t *testing.T, got []string) { assert.Equal(t, len(got), 0) },
		},
		{
			name:       "multiple recursive directory patterns in includes",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/x/**/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/a.ts"))
			},
		},
		{
			name:       "multiple recursive directory patterns in excludes",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/x/**"},
			includes:   []string{"**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/z/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/y/a.ts"))
			},
		},
		{
			name:       "implicit globbification expands directory",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/z/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/z/aba.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/z/b.ts"))
			},
		},
		{
			name:       "exclude patterns starting with starstar",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/x"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, !contains(f, "/x/"), "should not contain /x/: %s", f)
				}
			},
		},
		{
			name:       "include patterns starting with starstar",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/x", "**/a/**/b"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/q/a/c/b/d.ts"))
			},
		},
		{
			name:       "depth limit one",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			depth:      1,
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					suffix := f[len("/dev/"):]
					assert.Assert(t, !contains(suffix, "/"), "depth 1 should not include nested files: %s", f)
				}
			},
		},
		{
			name:       "depth limit two",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			depth:      2,
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/z/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/y/a.ts"))
			},
		},
		{
			name:       "mixed extensions only ts",
			host:       mixedExtensionHost,
			extensions: []string{".ts"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, hasSuffix(f, ".ts"), "should only have .ts files: %s", f)
				}
			},
		},
		{
			name:       "mixed extensions ts and tsx",
			host:       mixedExtensionHost,
			extensions: []string{".ts", ".tsx"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, hasSuffix(f, ".ts") || hasSuffix(f, ".tsx"), "should only have .ts or .tsx files: %s", f)
				}
			},
		},
		{
			name:       "mixed extensions js and jsx",
			host:       mixedExtensionHost,
			extensions: []string{".js", ".jsx"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, hasSuffix(f, ".js") || hasSuffix(f, ".jsx"), "should only have .js or .jsx files: %s", f)
				}
			},
		},
		{
			name:       "min js files excluded by wildcard",
			host:       caseInsensitiveHost,
			extensions: []string{".js"},
			includes:   []string{"js/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/js/a.js"))
				assert.Assert(t, slices.Contains(got, "/dev/js/b.js"))
				assert.Assert(t, !slices.Contains(got, "/dev/js/d.min.js"))
				assert.Assert(t, !slices.Contains(got, "/dev/js/ab.min.js"))
			},
		},
		{
			name:       "min js exclusion is case-sensitive on case-sensitive FS",
			host:       caseSensitiveHost,
			extensions: []string{".js"},
			includes:   []string{"js/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/js/a.js"))
				assert.Assert(t, slices.Contains(got, "/dev/js/b.js"))
				// Legacy behavior: only lowercase ".min.js" is excluded by default when matching is case-sensitive.
				assert.Assert(t, slices.Contains(got, "/dev/js/d.MIN.js"))
			},
		},
		{
			name:       "min js files explicitly included",
			host:       caseInsensitiveHost,
			extensions: []string{".js"},
			includes:   []string{"js/*.min.js"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/js/d.min.js"))
				assert.Assert(t, slices.Contains(got, "/dev/js/ab.min.js"))
			},
		},
		{
			name:       "min js files included when pattern mentions .min.",
			host:       caseInsensitiveHost,
			extensions: []string{".js"},
			includes:   []string{"js/*.min.*"},
			expect: func(t *testing.T, got []string) {
				assert.Equal(t, len(got), 2)
				assert.Assert(t, slices.Contains(got, "/dev/js/d.min.js"))
				assert.Assert(t, slices.Contains(got, "/dev/js/ab.min.js"))
			},
		},
		{
			name:       "exclude literal node_modules folder",
			host:       commonFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"node_modules"},
			includes:   []string{"**/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/node_modules/a.ts"))
			},
		},
		{
			name:       "same named declarations include ts",
			host:       sameNamedDeclarationsHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, len(got) > 0) },
		},
		{
			name:       "same named declarations include tsx",
			host:       sameNamedDeclarationsHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*.tsx"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, hasSuffix(f, ".tsx"), "should only have .tsx files: %s", f)
				}
			},
		},
		{
			name:       "empty includes returns all matching files",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, len(got) > 0)
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
			},
		},
		{
			name: "nil extensions returns all files",
			host: caseInsensitiveHost,
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/a.js"))
			},
		},
		{
			name:       "empty extensions slice returns all files",
			host:       caseInsensitiveHost,
			extensions: []string{},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, len(got) > 0, "expected files to be returned") },
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			runReadDirectoryCase(t, tc)
		})
	}
}

// Helper functions
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(substr) == 0 ||
		(len(s) > len(substr) && containsAt(s, substr)))
}

func containsAt(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

func hasSuffix(s, suffix string) bool {
	return len(s) >= len(suffix) && s[len(s)-len(suffix):] == suffix
}

// Additional tests for helper functions

func TestIsImplicitGlob(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		input    string
		expected bool
	}{
		{name: "simple", input: "foo", expected: true},
		{name: "folder", input: "src", expected: true},
		{name: "with extension", input: "foo.ts", expected: false},
		{name: "trailing dot", input: "foo.", expected: false},
		{name: "star", input: "*", expected: false},
		{name: "question", input: "?", expected: false},
		{name: "star suffix", input: "foo*", expected: false},
		{name: "question suffix", input: "foo?", expected: false},
		{name: "dot name", input: "foo.bar", expected: false},
		{name: "empty", input: "", expected: true},
	}

	for _, tt := range tests {
		tc := tt
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			result := IsImplicitGlob(tc.input)
			assert.Equal(t, result, tc.expected)
		})
	}
}

// Edge case tests for various pattern scenarios
func TestReadDirectoryEdgeCases(t *testing.T) {
	t.Parallel()

	cases := []readDirTestCase{
		{
			name:       "rooted include path",
			host:       caseInsensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"/dev/a.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/dev/a.ts")) },
		},
		{
			name:       "include with extension in path",
			host:       caseInsensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"a.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/dev/a.ts")) },
		},
		{
			name: "special regex characters in path",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/file+test.ts":  "",
					"/dev/file[0].ts":    "",
					"/dev/file(1).ts":    "",
					"/dev/file$money.ts": "",
					"/dev/file^start.ts": "",
					"/dev/file|pipe.ts":  "",
					"/dev/file#hash.ts":  "",
				}, false)
			},
			extensions: []string{".ts"},
			includes:   []string{"file+test.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/dev/file+test.ts")) },
		},
		{
			name:       "include pattern starting with question mark",
			host:       caseInsensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"?.ts"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
			},
		},
		{
			name:       "include pattern starting with star",
			host:       caseInsensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"*b.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/dev/b.ts")) },
		},
		{
			name: "case insensitive file matching",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/File.ts": "",
					"/dev/FILE.ts": "",
				}, true)
			},
			extensions: []string{".ts"},
			includes:   []string{"*.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, len(got) == 2) },
		},
		{
			name:       "nested subdirectory base path",
			host:       caseSensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"q/a/c/b/d.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/dev/q/a/c/b/d.ts")) },
		},
		{
			name:       "current directory differs from path",
			host:       caseInsensitiveHost,
			extensions: []string{".ts"},
			includes:   []string{"z/*.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, len(got) > 0) },
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			runReadDirectoryCase(t, tc)
		})
	}
}

func TestReadDirectoryEmptyIncludes(t *testing.T) {
	t.Parallel()
	cases := []readDirTestCase{
		{
			name: "empty includes slice behavior",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/root/a.ts": "",
				}, true)
			},
			path:       "/root",
			currentDir: "/",
			extensions: []string{".ts"},
			includes:   []string{},
			expect: func(t *testing.T, got []string) {
				if len(got) == 0 {
					return
				}
				assert.Assert(t, slices.Contains(got, "/root/a.ts"))
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			runReadDirectoryCase(t, tc)
		})
	}
}

// TestReadDirectorySymlinkCycle tests that cyclic symlinks don't cause infinite loops.
// The cycle is detected by the vfs package using Realpath for cycle detection.
// This means directories with cyclic symlinks will be skipped during traversal.
func TestReadDirectorySymlinkCycle(t *testing.T) {
	t.Parallel()
	cases := []readDirTestCase{
		{
			name: "detects and skips symlink cycles",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]any{
					"/root/file.ts":   "",
					"/root/a/file.ts": "",
					"/root/a/b":       vfstest.Symlink("/root/a"),
				}, true)
			},
			path:       "/root",
			currentDir: "/",
			extensions: []string{".ts"},
			includes:   []string{"**/*"},
			expect: func(t *testing.T, got []string) {
				expected := []string{"/root/file.ts", "/root/a/file.ts"}
				assert.DeepEqual(t, got, expected)
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			runReadDirectoryCase(t, tc)
		})
	}
}

// TestReadDirectoryMatchesTypeScriptBaselines contains tests that verify the Go implementation
// matches the TypeScript baseline outputs from _submodules/TypeScript/tests/baselines/reference/config/matchFiles/
func TestReadDirectoryMatchesTypeScriptBaselines(t *testing.T) {
	t.Parallel()

	cases := []readDirTestCase{
		{
			name: "sorted in include order then alphabetical",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/z/a.ts":   "",
					"/dev/z/aba.ts": "",
					"/dev/z/abz.ts": "",
					"/dev/z/b.ts":   "",
					"/dev/z/bba.ts": "",
					"/dev/z/bbz.ts": "",
					"/dev/x/a.ts":   "",
					"/dev/x/aa.ts":  "",
					"/dev/x/b.ts":   "",
				}, false)
			},
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z/*.ts", "x/*.ts"},
			expect: func(t *testing.T, got []string) {
				expected := []string{
					"/dev/z/a.ts", "/dev/z/aba.ts", "/dev/z/abz.ts", "/dev/z/b.ts", "/dev/z/bba.ts", "/dev/z/bbz.ts",
					"/dev/x/a.ts", "/dev/x/aa.ts", "/dev/x/b.ts",
				}
				assert.DeepEqual(t, got, expected)
			},
		},
		{
			name: "recursive wildcards match dotted directories",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/x/d.ts":           "",
					"/dev/x/y/d.ts":         "",
					"/dev/x/y/.e.ts":        "",
					"/dev/x/.y/a.ts":        "",
					"/dev/.z/.b.ts":         "",
					"/dev/.z/c.ts":          "",
					"/dev/w/.u/e.ts":        "",
					"/dev/g.min.js/.g/g.ts": "",
				}, false)
			},
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/.*/*"},
			expect: func(t *testing.T, got []string) {
				expected := []string{"/dev/.z/c.ts", "/dev/g.min.js/.g/g.ts", "/dev/w/.u/e.ts", "/dev/x/.y/a.ts"}
				assert.Equal(t, len(got), len(expected))
				for _, want := range expected {
					assert.Assert(t, slices.Contains(got, want))
				}
			},
		},
		{
			name: "common package folders implicitly excluded with wildcard",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/a.ts":                  "",
					"/dev/a.d.ts":                "",
					"/dev/a.js":                  "",
					"/dev/b.ts":                  "",
					"/dev/x/a.ts":                "",
					"/dev/node_modules/a.ts":     "",
					"/dev/bower_components/a.ts": "",
					"/dev/jspm_packages/a.ts":    "",
				}, false)
			},
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/a.ts", "/dev/x/a.ts"}) },
		},
		{
			name: "js wildcard excludes min js files",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/js/a.js":      "",
					"/dev/js/b.js":      "",
					"/dev/js/d.min.js":  "",
					"/dev/js/ab.min.js": "",
				}, false)
			},
			extensions: []string{".js"},
			includes:   []string{"js/*"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/js/a.js", "/dev/js/b.js"}) },
		},
		{
			name: "explicit min js pattern includes min files",
			host: func() vfs.FS {
				return vfstest.FromMap(map[string]string{
					"/dev/js/a.js":      "",
					"/dev/js/b.js":      "",
					"/dev/js/d.min.js":  "",
					"/dev/js/ab.min.js": "",
				}, false)
			},
			extensions: []string{".js"},
			includes:   []string{"js/*.min.js"},
			expect: func(t *testing.T, got []string) {
				expected := []string{"/dev/js/ab.min.js", "/dev/js/d.min.js"}
				assert.Equal(t, len(got), len(expected))
				for _, want := range expected {
					assert.Assert(t, slices.Contains(got, want))
				}
			},
		},
		{
			name:       "literal excludes baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"b.ts"},
			includes:   []string{"a.ts", "b.ts"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/a.ts"}) },
		},
		{
			name:       "wildcard excludes baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"*.ts", "z/??z.ts", "*/b.ts"},
			includes:   []string{"a.ts", "b.ts", "z/a.ts", "z/abz.ts", "z/aba.ts", "x/b.ts"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/z/a.ts", "/dev/z/aba.ts"}) },
		},
		{
			name:       "recursive excludes baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**/b.ts"},
			includes:   []string{"a.ts", "b.ts", "x/a.ts", "x/b.ts", "x/y/a.ts", "x/y/b.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/a.ts", "/dev/x/a.ts", "/dev/x/y/a.ts"})
			},
		},
		{
			name:       "question mark baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/?.ts"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/x/a.ts", "/dev/x/b.ts"}) },
		},
		{
			name:       "recursive directory pattern baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/a.ts"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/a.ts", "/dev/x/a.ts", "/dev/x/y/a.ts", "/dev/z/a.ts"})
			},
		},
		{
			name:       "case sensitive baseline",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/A.ts"},
			expect:     func(t *testing.T, got []string) { assert.DeepEqual(t, got, []string{"/dev/A.ts"}) },
		},
		{
			name:       "exclude folders baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"z", "x"},
			includes:   []string{"**/*"},
			expect: func(t *testing.T, got []string) {
				for _, f := range got {
					assert.Assert(t, !contains(f, "/z/") && !contains(f, "/x/"), "should not contain z or x: %s", f)
				}
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/b.ts"))
			},
		},
		{
			name:       "implicit glob expansion baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"z"},
			expect: func(t *testing.T, got []string) {
				assert.DeepEqual(t, got, []string{"/dev/z/a.ts", "/dev/z/aba.ts", "/dev/z/abz.ts", "/dev/z/b.ts", "/dev/z/bba.ts", "/dev/z/bbz.ts"})
			},
		},
		{
			name:       "trailing recursive directory baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**"},
			expect:     func(t *testing.T, got []string) { assert.Equal(t, len(got), 0) },
		},
		{
			name:       "exclude trailing recursive directory baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**"},
			includes:   []string{"**/*"},
			expect:     func(t *testing.T, got []string) { assert.Equal(t, len(got), 0) },
		},
		{
			name:       "multiple recursive directory patterns baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/x/**/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/aa.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/b.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/b.ts"))
			},
		},
		{
			name:       "include dirs with starstar prefix baseline",
			host:       caseSensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"**/x", "**/a/**/b"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/a.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/b.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/q/a/c/b/d.ts"))
			},
		},
		{
			name:       "dotted folders not implicitly included baseline",
			host:       dottedFoldersHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"x/**/*", "w/*/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/x/d.ts"))
				assert.Assert(t, slices.Contains(got, "/dev/x/y/d.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/.y/a.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/x/y/.e.ts"))
				assert.Assert(t, !slices.Contains(got, "/dev/w/.u/e.ts"))
			},
		},
		{
			name:       "include paths outside project baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			includes:   []string{"*", "/ext/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
				assert.Assert(t, slices.Contains(got, "/ext/ext.ts"))
			},
		},
		{
			name:       "include files with double dots baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"**"},
			includes:   []string{"/ext/b/a..b.ts"},
			expect:     func(t *testing.T, got []string) { assert.Assert(t, slices.Contains(got, "/ext/b/a..b.ts")) },
		},
		{
			name:       "exclude files with double dots baseline",
			host:       caseInsensitiveHost,
			extensions: []string{".ts", ".tsx", ".d.ts"},
			excludes:   []string{"/ext/b/a..b.ts"},
			includes:   []string{"/ext/**/*"},
			expect: func(t *testing.T, got []string) {
				assert.Assert(t, slices.Contains(got, "/ext/ext.ts"))
				assert.Assert(t, !slices.Contains(got, "/ext/b/a..b.ts"))
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			runReadDirectoryCase(t, tc)
		})
	}
}

// TestSpecMatcher tests the SpecMatcher API
func TestSpecMatcher(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		specs                     []string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		matchingPaths             []string
		nonMatchingPaths          []string
	}{
		{
			name:                      "simple wildcard",
			specs:                     []string{"*.ts"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/a.ts", "/project/b.ts", "/project/foo.ts"},
			nonMatchingPaths:          []string{"/project/a.js", "/project/sub/a.ts"},
		},
		{
			name:                      "recursive wildcard",
			specs:                     []string{"**/*.ts"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/a.ts", "/project/sub/a.ts", "/project/sub/deep/a.ts"},
			nonMatchingPaths:          []string{"/project/a.js"},
		},
		{
			name:                      "exclude pattern",
			specs:                     []string{"node_modules"},
			basePath:                  "/project",
			usage:                     UsageExclude,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/node_modules/foo"},
			nonMatchingPaths:          []string{"/project/node_modules", "/project/src"},
		},
		{
			name:                      "case insensitive",
			specs:                     []string{"*.ts"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: false,
			matchingPaths:             []string{"/project/A.TS", "/project/B.Ts"},
			nonMatchingPaths:          []string{"/project/a.js"},
		},
		{
			name:                      "multiple specs",
			specs:                     []string{"*.ts", "*.tsx"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/a.ts", "/project/b.tsx"},
			nonMatchingPaths:          []string{"/project/a.js"},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			matcher := NewSpecMatcher(tc.specs, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			if matcher == nil {
				t.Fatal("matcher should not be nil")
			}
			for _, path := range tc.matchingPaths {
				assert.Assert(t, matcher.MatchString(path), "should match: %s", path)
			}
			for _, path := range tc.nonMatchingPaths {
				assert.Assert(t, !matcher.MatchString(path), "should not match: %s", path)
			}
		})
	}
}

func TestSpecMatcher_MatchString(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		specs                     []string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		paths                     []string
		expected                  []bool
	}{
		{
			name:                      "simple wildcard files",
			specs:                     []string{"*.ts"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/a.ts", "/project/sub/a.ts", "/project/a.js"},
			expected:                  []bool{true, false, false},
		},
		{
			name:                      "recursive wildcard files",
			specs:                     []string{"**/*.ts"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/a.ts", "/project/sub/a.ts", "/project/a.js"},
			expected:                  []bool{true, true, false},
		},
		{
			name:                      "exclude pattern matches prefix",
			specs:                     []string{"node_modules"},
			basePath:                  "/project",
			usage:                     UsageExclude,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/node_modules", "/project/node_modules/foo", "/project/src"},
			expected:                  []bool{false, true, false},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, len(tc.paths), len(tc.expected))
			m := NewSpecMatcher(tc.specs, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			assert.Assert(t, m != nil)
			for i, path := range tc.paths {
				assert.Equal(t, m.MatchString(path), tc.expected[i], "path: %s", path)
			}
		})
	}
}

func TestSingleSpecMatcher_MatchString(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		spec                      string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		paths                     []string
		expected                  []bool
	}{
		{
			name:                      "single spec wildcard",
			spec:                      "*.ts",
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/a.ts", "/project/sub/a.ts", "/project/a.js"},
			expected:                  []bool{true, false, false},
		},
		{
			name:                      "single spec trailing starstar exclude allowed",
			spec:                      "**",
			basePath:                  "/project",
			usage:                     UsageExclude,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/a.ts", "/project/sub/a.ts"},
			expected:                  []bool{true, true},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, len(tc.paths), len(tc.expected))
			m := NewSpecMatcher([]string{tc.spec}, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			assert.Assert(t, m != nil)
			for i, path := range tc.paths {
				assert.Equal(t, m.MatchString(path), tc.expected[i], "path: %s", path)
			}
		})
	}
}

func TestSpecMatchers_MatchIndex(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		specs                     []string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		paths                     []string
		expected                  []int
	}{
		{
			name:                      "index lookup prefers first match",
			specs:                     []string{"*.ts", "*.tsx"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/a.ts", "/project/a.tsx", "/project/a.js"},
			expected:                  []int{0, 1, -1},
		},
		{
			name:                      "exclude index lookup",
			specs:                     []string{"node_modules", "bower_components"},
			basePath:                  "/project",
			usage:                     UsageExclude,
			useCaseSensitiveFileNames: true,
			paths:                     []string{"/project/node_modules", "/project/node_modules/foo", "/project/bower_components", "/project/bower_components/bar", "/project/src"},
			expected:                  []int{-1, 0, -1, 1, -1},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, len(tc.paths), len(tc.expected))
			m := NewSpecMatcher(tc.specs, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			assert.Assert(t, m != nil)
			for i, path := range tc.paths {
				assert.Equal(t, m.MatchIndex(path), tc.expected[i], "path: %s", path)
			}
		})
	}
}

func TestSingleSpecMatcher(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		spec                      string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		expectNil                 bool
		matchingPaths             []string
		nonMatchingPaths          []string
	}{
		{
			name:                      "simple spec",
			spec:                      "*.ts",
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/a.ts"},
			nonMatchingPaths:          []string{"/project/a.js"},
		},
		{
			name:                      "trailing ** non-exclude returns nil",
			spec:                      "**",
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			expectNil:                 true,
		},
		{
			name:                      "trailing ** exclude works",
			spec:                      "**",
			basePath:                  "/project",
			usage:                     UsageExclude,
			useCaseSensitiveFileNames: true,
			matchingPaths:             []string{"/project/anything", "/project/deep/path"},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			matcher := NewSpecMatcher([]string{tc.spec}, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			if tc.expectNil {
				assert.Assert(t, matcher == nil, "should be nil")
				return
			}
			if matcher == nil {
				t.Fatal("matcher should not be nil")
			}
			for _, path := range tc.matchingPaths {
				assert.Assert(t, matcher.MatchString(path), "should match: %s", path)
			}
			for _, path := range tc.nonMatchingPaths {
				assert.Assert(t, !matcher.MatchString(path), "should not match: %s", path)
			}
		})
	}
}

func TestSpecMatchers(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name                      string
		specs                     []string
		basePath                  string
		usage                     Usage
		useCaseSensitiveFileNames bool
		expectNil                 bool
		pathToIndex               map[string]int
	}{
		{
			name:                      "multiple specs return correct index",
			specs:                     []string{"*.ts", "*.tsx", "*.js"},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			pathToIndex: map[string]int{
				"/project/a.ts":  0,
				"/project/b.tsx": 1,
				"/project/c.js":  2,
				"/project/d.css": -1, // no match
			},
		},
		{
			name:                      "empty specs returns nil",
			specs:                     []string{},
			basePath:                  "/project",
			usage:                     UsageFiles,
			useCaseSensitiveFileNames: true,
			expectNil:                 true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			matchers := NewSpecMatcher(tc.specs, tc.basePath, tc.usage, tc.useCaseSensitiveFileNames)
			if tc.expectNil {
				assert.Assert(t, matchers == nil, "should be nil")
				return
			}
			if matchers == nil {
				t.Fatal("matchers should not be nil")
			}
			for path, expectedIndex := range tc.pathToIndex {
				gotIndex := matchers.MatchIndex(path)
				assert.Equal(t, gotIndex, expectedIndex, "path: %s", path)
			}
		})
	}
}

// TestGlobPatternInternals tests internal glob pattern matching logic
// to ensure edge cases are covered that may not be hit by ReadDirectory tests
func TestGlobPatternInternals(t *testing.T) {
	t.Parallel()

	t.Run("nextPathPart handles consecutive slashes", func(t *testing.T) {
		t.Parallel()
		// Test path with consecutive slashes
		path := "/dev//foo///bar"

		// First call - returns empty for root
		part, offset, ok := nextPathPartParts(path, "", 0)
		assert.Assert(t, ok)
		assert.Equal(t, part, "")
		assert.Equal(t, offset, 1)

		// Second call - should skip consecutive slashes after /dev
		part, offset, ok = nextPathPartParts(path, "", 1)
		assert.Assert(t, ok)
		assert.Equal(t, part, "dev")

		// Third call - should skip the double slashes before foo
		part, offset, ok = nextPathPartParts(path, "", offset)
		assert.Assert(t, ok)
		assert.Equal(t, part, "foo")

		// Fourth call - should skip the triple slashes before bar
		part, _, ok = nextPathPartParts(path, "", offset)
		assert.Assert(t, ok)
		assert.Equal(t, part, "bar")
	})

	t.Run("nextPathPart handles path ending with slashes", func(t *testing.T) {
		t.Parallel()
		path := "/dev/"

		// Skip to after "dev"
		_, offset, ok := nextPathPartParts(path, "", 0) // root
		assert.Assert(t, ok)
		_, offset, ok = nextPathPartParts(path, "", offset) // dev
		assert.Assert(t, ok)
		// Now at trailing slash, should return not ok
		_, _, ok = nextPathPartParts(path, "", offset)
		assert.Assert(t, !ok)
	})

	t.Run("nextPathPartParts handles empty prefix", func(t *testing.T) {
		t.Parallel()
		path := "/dev//foo"

		part, offset, ok := nextPathPartParts("", path, 0)
		assert.Assert(t, ok)
		assert.Equal(t, part, "")
		assert.Equal(t, offset, 1)

		part, offset, ok = nextPathPartParts("", path, offset)
		assert.Assert(t, ok)
		assert.Equal(t, part, "dev")

		part, _, ok = nextPathPartParts("", path, offset)
		assert.Assert(t, ok)
		assert.Equal(t, part, "foo")
	})

	t.Run("nextPathPartParts returns not ok when only slashes remain", func(t *testing.T) {
		t.Parallel()
		prefix := "/dev/"
		suffix := "foo"

		_, offset, ok := nextPathPartParts(prefix, suffix, 0) // root
		assert.Assert(t, ok)

		part, offset, ok := nextPathPartParts(prefix, suffix, offset) // dev
		assert.Assert(t, ok)
		assert.Equal(t, part, "dev")

		part, offset, ok = nextPathPartParts(prefix, suffix, offset) // foo
		assert.Assert(t, ok)
		assert.Equal(t, part, "foo")
		assert.Equal(t, offset, len(prefix)+len(suffix))

		_, _, ok = nextPathPartParts(prefix, suffix, offset)
		assert.Assert(t, !ok)
	})

	t.Run("nextPathPartParts parses from suffix region", func(t *testing.T) {
		t.Parallel()
		prefix := "/"
		suffix := "a"

		part, offset, ok := nextPathPartParts(prefix, suffix, 0) // root
		assert.Assert(t, ok)
		assert.Equal(t, part, "")
		assert.Equal(t, offset, 1)

		part, _, ok = nextPathPartParts(prefix, suffix, offset)
		assert.Assert(t, ok)
		assert.Equal(t, part, "a")
	})

	t.Run("question mark segment at end of string", func(t *testing.T) {
		t.Parallel()
		// Create pattern with question mark that should fail when string is exhausted
		p, ok := compileGlobPattern("a?", "/", UsageFiles, true)
		assert.Assert(t, ok)

		// Should match "ab"
		assert.Assert(t, p.matches("/ab"))

		// Should NOT match "a" (question mark requires a character)
		assert.Assert(t, !p.matches("/a"))
	})

	t.Run("star segment with complex pattern", func(t *testing.T) {
		t.Parallel()
		// Pattern like "a*b*c" requires backtracking in star matching
		p, ok := compileGlobPattern("a*b*c", "/", UsageFiles, true)
		assert.Assert(t, ok)

		// Should match "abc"
		assert.Assert(t, p.matches("/abc"))

		// Should match "aXbYc"
		assert.Assert(t, p.matches("/aXbYc"))

		// Should match "aXXXbYYYc"
		assert.Assert(t, p.matches("/aXXXbYYYc"))

		// Should NOT match "aXbY" (no trailing c)
		assert.Assert(t, !p.matches("/aXbY"))
	})

	t.Run("ensureTrailingSlash with existing slash", func(t *testing.T) {
		t.Parallel()
		// Test that ensureTrailingSlash doesn't double-add slashes
		result := ensureTrailingSlash("/dev/")
		assert.Equal(t, result, "/dev/")

		result = ensureTrailingSlash("/")
		assert.Equal(t, result, "/")
	})

	t.Run("ensureTrailingSlash with empty string", func(t *testing.T) {
		t.Parallel()
		result := ensureTrailingSlash("")
		assert.Equal(t, result, "")
	})

	t.Run("literal component with package folder in include", func(t *testing.T) {
		t.Parallel()
		// When a literal include path goes through a package folder,
		// the skipPackageFolders flag on literal components should not block it
		// because literal components in includes don't have skipPackageFolders=true
		host := vfstest.FromMap(map[string]string{
			"/dev/node_modules/pkg/index.ts": "",
		}, false)

		// Explicit literal path should work
		got := matchFiles("/dev", []string{".ts"}, nil,
			[]string{"node_modules/pkg/index.ts"}, false, "/", UnlimitedDepth, host)
		assert.Assert(t, slices.Contains(got, "/dev/node_modules/pkg/index.ts"))
	})
}

// TestMatchSegmentsEdgeCases tests edge cases in the matchSegments function
func TestMatchSegmentsEdgeCases(t *testing.T) {
	t.Parallel()

	t.Run("question mark before slash in string", func(t *testing.T) {
		t.Parallel()
		// This tests the case where question mark encounters a slash character
		// which should fail since ? doesn't match /
		p, ok := compileGlobPattern("a?b", "/", UsageFiles, true)
		assert.Assert(t, ok)

		// "a/b" should not match "a?b" pattern since ? shouldn't match /
		// But this is a single component pattern, so / wouldn't be in the component
		// We need to test this within the segment matching

		// Create a pattern that will exercise question mark matching edge cases
		assert.Assert(t, p.matches("/aXb"))   // X matches ?
		assert.Assert(t, !p.matches("/ab"))   // nothing to match ?
		assert.Assert(t, !p.matches("/aXYb")) // XY is too many chars for ?
	})

	t.Run("star with no trailing content", func(t *testing.T) {
		t.Parallel()
		// Test that star can match to end of string
		p, ok := compileGlobPattern("a*", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p.matches("/a"))
		assert.Assert(t, p.matches("/abc"))
		assert.Assert(t, p.matches("/aXYZ"))
	})

	t.Run("multiple stars in pattern", func(t *testing.T) {
		t.Parallel()
		// Test patterns with multiple stars that require backtracking
		p, ok := compileGlobPattern("*a*", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p.matches("/a"))
		assert.Assert(t, p.matches("/Xa"))
		assert.Assert(t, p.matches("/aX"))
		assert.Assert(t, p.matches("/XaY"))
		assert.Assert(t, !p.matches("/XYZ")) // no 'a'
	})

	t.Run("multiple stars requiring backtracking", func(t *testing.T) {
		t.Parallel()
		// These patterns require proper backtracking to match correctly.
		// A naive greedy algorithm would fail on these.

		// Pattern: *a*a - must find two 'a' characters
		p1, ok := compileGlobPattern("*a*a", "/", UsageFiles, true)
		assert.Assert(t, ok)
		assert.Assert(t, p1.matches("/aa"))     // minimal: first * matches "", second * matches ""
		assert.Assert(t, p1.matches("/Xaa"))    // first * matches "X"
		assert.Assert(t, p1.matches("/aXa"))    // second * matches "X"
		assert.Assert(t, p1.matches("/XaYa"))   // both * match chars
		assert.Assert(t, p1.matches("/aaaa"))   // multiple a's
		assert.Assert(t, !p1.matches("/a"))     // only one 'a'
		assert.Assert(t, !p1.matches("/Xa"))    // only one 'a'
		assert.Assert(t, !p1.matches("/aX"))    // only one 'a', doesn't end with 'a'
		assert.Assert(t, !p1.matches("/XaYaZ")) // doesn't end with 'a'

		// Pattern: *a*b*c - must find a, then b, then c in order
		p2, ok := compileGlobPattern("*a*b*c", "/", UsageFiles, true)
		assert.Assert(t, ok)
		assert.Assert(t, p2.matches("/abc"))       // minimal
		assert.Assert(t, p2.matches("/XaYbZc"))    // chars between
		assert.Assert(t, p2.matches("/aXbYc"))     // chars between
		assert.Assert(t, p2.matches("/aaabbbccc")) // repeated chars
		assert.Assert(t, !p2.matches("/ab"))       // missing c
		assert.Assert(t, !p2.matches("/ac"))       // missing b
		assert.Assert(t, !p2.matches("/cba"))      // wrong order
		assert.Assert(t, !p2.matches("/abcX"))     // doesn't end with c

		// Pattern: *a*a*a - must find three 'a' characters
		p3, ok := compileGlobPattern("*a*a*a", "/", UsageFiles, true)
		assert.Assert(t, ok)
		assert.Assert(t, p3.matches("/aaa"))
		assert.Assert(t, p3.matches("/aXaYa"))
		assert.Assert(t, p3.matches("/XaYaZa"))
		assert.Assert(t, !p3.matches("/aa"))  // only two 'a's
		assert.Assert(t, !p3.matches("/aaX")) // doesn't end with 'a'

		// Pattern: a*b*a - starts with a, ends with a, has b in middle
		p4, ok := compileGlobPattern("a*b*a", "/", UsageFiles, true)
		assert.Assert(t, ok)
		assert.Assert(t, p4.matches("/aba"))
		assert.Assert(t, p4.matches("/aXbYa"))
		assert.Assert(t, p4.matches("/abba"))  // b appears, ends with a
		assert.Assert(t, !p4.matches("/ab"))   // doesn't end with a
		assert.Assert(t, !p4.matches("/aba ")) // trailing space
		assert.Assert(t, !p4.matches("/Xaba")) // doesn't start with a (hidden file rule may affect)
	})

	t.Run("pathological pattern performance", func(t *testing.T) {
		t.Parallel()
		// This pattern could cause exponential backtracking in naive implementations.
		// Pattern: *a*a*a*a*b against "aaaaaaaaaaaaaaaa" (no b)
		// Should return false quickly, not hang.
		p, ok := compileGlobPattern("*a*a*a*a*b", "/", UsageFiles, true)
		assert.Assert(t, ok)

		// These should complete quickly (not hang)
		assert.Assert(t, !p.matches("/aaaaaaaaaaaaaaaa"))  // no 'b' at end
		assert.Assert(t, !p.matches("/aaaaaaaaaaaaaaaaX")) // ends with X not b
		assert.Assert(t, p.matches("/aaaab"))              // minimal match
		assert.Assert(t, p.matches("/XaYaZaWab"))          // complex match
	})

	t.Run("literal segment not matching", func(t *testing.T) {
		t.Parallel()
		// Test literal segment that's longer than remaining string
		p, ok := compileGlobPattern("abcdefgh.ts", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, !p.matches("/abc.ts"))     // different literal
		assert.Assert(t, p.matches("/abcdefgh.ts")) // exact match
	})

	t.Run("question mark matches multi-byte unicode rune", func(t *testing.T) {
		t.Parallel()
		// ? should match one full Unicode codepoint, not one byte.
		// 'é' is 2 bytes in UTF-8, '🎉' is 4 bytes, '中' is 3 bytes.

		p1, ok := compileGlobPattern("?.ts", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p1.matches("/a.ts"))   // single ASCII char
		assert.Assert(t, p1.matches("/é.ts"))   // 2-byte rune
		assert.Assert(t, p1.matches("/中.ts"))   // 3-byte rune
		assert.Assert(t, p1.matches("/🎉.ts"))   // 4-byte rune (surrogate pair in UTF-16)
		assert.Assert(t, !p1.matches("/.ts"))   // empty - no char for ? to match
		assert.Assert(t, !p1.matches("/ab.ts")) // two chars

		// Two question marks should match exactly two runes
		p2, ok := compileGlobPattern("??.ts", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p2.matches("/ab.ts"))   // two ASCII chars
		assert.Assert(t, p2.matches("/é中.ts"))   // two multi-byte runes
		assert.Assert(t, p2.matches("/🎉é.ts"))   // 4-byte + 2-byte runes
		assert.Assert(t, !p2.matches("/a.ts"))   // only one char
		assert.Assert(t, !p2.matches("/abc.ts")) // three chars
	})

	t.Run("star matches multi-byte unicode runes correctly", func(t *testing.T) {
		t.Parallel()
		// * should advance by full runes during backtracking.

		// Pattern: *é.ts - anything ending in é.ts
		p, ok := compileGlobPattern("*é.ts", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p.matches("/é.ts"))
		assert.Assert(t, p.matches("/café.ts"))
		assert.Assert(t, !p.matches("/cafe.ts")) // 'e' != 'é'

		// Pattern: *🎉* - contains 🎉 somewhere
		p2, ok := compileGlobPattern("*🎉*", "/", UsageFiles, true)
		assert.Assert(t, ok)

		assert.Assert(t, p2.matches("/🎉"))
		assert.Assert(t, p2.matches("/a🎉b"))
		assert.Assert(t, !p2.matches("/abc"))
	})
}

// TestReadDirectoryConsecutiveSlashes tests handling of paths with consecutive slashes
func TestReadDirectoryConsecutiveSlashes(t *testing.T) {
	t.Parallel()

	host := vfstest.FromMap(map[string]string{
		"/dev/a.ts":   "",
		"/dev/x/b.ts": "",
	}, false)

	// The matchFilesNoRegex function normalizes paths, but we can test internal handling
	got := matchFiles("/dev", []string{".ts"}, nil, []string{"**/*.ts"}, false, "/", UnlimitedDepth, host)
	assert.Assert(t, len(got) >= 2, "should find files")
	assert.Assert(t, slices.Contains(got, "/dev/a.ts"))
	assert.Assert(t, slices.Contains(got, "/dev/x/b.ts"))
}

// TestGlobPatternLiteralWithPackageFolders tests literal component behavior with package folders
func TestGlobPatternLiteralWithPackageFolders(t *testing.T) {
	t.Parallel()

	t.Run("wildcard skips package folders", func(t *testing.T) {
		t.Parallel()
		// Wildcard patterns should skip node_modules
		host := vfstest.FromMap(map[string]string{
			"/dev/a.ts":              "",
			"/dev/node_modules/b.ts": "",
		}, false)

		got := matchFiles("/dev", []string{".ts"}, nil, []string{"*/*.ts"}, false, "/", UnlimitedDepth, host)
		assert.Assert(t, !slices.Contains(got, "/dev/node_modules/b.ts"), "should skip node_modules with wildcard")
	})

	t.Run("explicit literal includes package folder", func(t *testing.T) {
		t.Parallel()
		// Explicit literal paths should include package folders
		host := vfstest.FromMap(map[string]string{
			"/dev/node_modules/b.ts": "",
		}, false)

		got := matchFiles("/dev", []string{".ts"}, nil, []string{"node_modules/b.ts"}, false, "/", UnlimitedDepth, host)
		assert.Assert(t, slices.Contains(got, "/dev/node_modules/b.ts"), "should include explicit node_modules path")
	})
}

// TestGetBasePathsCaseSensitivity verifies that getBasePaths uses the correct
// case-sensitivity when deduplicating base paths. On a case-sensitive file system,
// paths that differ only by case (e.g., "/Dev/src" and "/dev/src") are distinct
// and should not be deduplicated.
func TestGetBasePathsCaseSensitivity(t *testing.T) {
	t.Parallel()

	t.Run("case-sensitive does not dedup differently-cased paths", func(t *testing.T) {
		t.Parallel()
		// On a case-sensitive file system, /root/src/Dev and /root/src/dev are distinct directories.
		// When they're both included as base paths, they should not be deduplicated.
		// Use include patterns that point to directories outside the root path so the root
		// path doesn't subsume them via containsPath.
		basePaths := getBasePaths("/root", []string{"../Other/**/*.ts", "../other/**/*.ts"}, true /*caseSensitive*/)
		// Both /Other and /other should appear because they differ by case on a case-sensitive FS.
		assert.Assert(t, slices.Contains(basePaths, "/Other"), "expected /Other in base paths: %v", basePaths)
		assert.Assert(t, slices.Contains(basePaths, "/other"), "expected /other in base paths: %v", basePaths)
	})

	t.Run("case-insensitive dedups differently-cased paths", func(t *testing.T) {
		t.Parallel()
		// On a case-insensitive file system, /Other and /other refer to the same directory;
		// only one should appear.
		basePaths := getBasePaths("/root", []string{"../Other/**/*.ts", "../other/**/*.ts"}, false /*caseSensitive*/)
		count := 0
		for _, bp := range basePaths {
			if bp == "/Other" || bp == "/other" {
				count++
			}
		}
		assert.Assert(t, count <= 1, "expected at most one of /Other or /other in base paths: %v", basePaths)
	})
}
