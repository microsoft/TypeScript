package compiler_test

import (
	"slices"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type projectReferenceAccessFS struct {
	vfs.FS
	mu             sync.Mutex
	outputAccesses []string
}

func (fs *projectReferenceAccessFS) record(operation, path string) {
	if strings.HasSuffix(path, "/lib/index.d.ts") || strings.HasSuffix(path, "/lib") {
		fs.mu.Lock()
		defer fs.mu.Unlock()
		fs.outputAccesses = append(fs.outputAccesses, operation+" "+path)
	}
}

func (fs *projectReferenceAccessFS) FileExists(path tspath.RootedFilePath) bool {
	fs.record("FileExists", path.AsString())
	return fs.FS.FileExists(path)
}

func (fs *projectReferenceAccessFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	fs.record("DirectoryExists", path.AsString())
	return fs.FS.DirectoryExists(path)
}

func (fs *projectReferenceAccessFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	fs.record("Realpath", path.AsString())
	return fs.FS.Realpath(path)
}

func TestProjectReferenceSourceRedirectOutputAccesses(t *testing.T) {
	t.Parallel()
	for _, tc := range []struct {
		name           string
		sourceExists   bool
		outputExists   bool
		directoryTypes bool
		outputLink     string
	}{
		{"built", true, true, false, ""},
		{"unbuilt", true, false, false, ""},
		{"source-missing", false, true, false, ""},
		{"missing", false, false, false, ""},
		{"built-directory", true, true, true, ""},
		{"unbuilt-directory", true, false, true, ""},
		{"source-missing-directory", false, true, true, ""},
		{"missing-directory", false, false, true, ""},
		// Outputs that link elsewhere still map to the referenced source.
		{"built-linked-file", true, true, false, "file"},
		{"built-linked-directory", true, true, true, "directory"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/workspace/app/tsconfig.json":                    `{"compilerOptions":{"noLib":true,"module":"commonjs","moduleResolution":"node"},"files":["index.ts"],"references":[{"path":"../dependency"}]}`,
				"/workspace/app/index.ts":                         `import { value } from "dependency"; import "external"; export { value };`,
				"/workspace/app/node_modules/dependency":          vfstest.Symlink("/workspace/dependency"),
				"/workspace/app/node_modules/external/index.d.ts": `export {};`,
				"/workspace/dependency/package.json":              `{"name":"dependency","types":"lib/index.d.ts"}`,
				"/workspace/dependency/tsconfig.json":             `{"compilerOptions":{"composite":true,"rootDir":"src","outDir":"lib"},"files":["src/index.ts"]}`,
			}
			if tc.directoryTypes {
				files["/workspace/dependency/package.json"] = `{"name":"dependency","types":"lib"}`
			}
			if tc.sourceExists {
				files["/workspace/dependency/src/index.ts"] = `export const value = 1;`
			}
			if tc.outputExists {
				switch tc.outputLink {
				case "file":
					files["/cache/index.d.ts"] = `export declare const value: number;`
					files["/workspace/dependency/lib/index.d.ts"] = vfstest.Symlink("/cache/index.d.ts")
				case "directory":
					files["/cache/lib/index.d.ts"] = `export declare const value: number;`
					files["/workspace/dependency/lib"] = vfstest.Symlink("/cache/lib")
				default:
					files["/workspace/dependency/lib/index.d.ts"] = `export declare const value: number;`
				}
			}
			fs := &projectReferenceAccessFS{FS: vfstest.FromMap(files, tspath.CaseSensitive)}
			host := compiler.NewCompilerHost(fs, "", nil, nil, nil)
			config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/workspace/app/tsconfig.json", nil, nil, fs, nil)
			assert.Equal(t, len(diagnostics), 0)
			program := compiler.NewProgram(compiler.ProgramOptions{
				Host:                        host,
				Config:                      config,
				UseSourceOfProjectReference: true,
				SingleThreaded:              core.TSTrue,
			})
			actualFiles := []string{}
			for _, file := range program.GetSourceFiles() {
				actualFiles = append(actualFiles, file.FileName().AsString())
			}
			slices.Sort(actualFiles)
			expectedFiles := []string{"/workspace/app/index.ts", "/workspace/app/node_modules/external/index.d.ts"}
			if tc.sourceExists {
				expectedFiles = append(expectedFiles, "/workspace/dependency/src/index.ts")
			}
			assert.DeepEqual(t, actualFiles, expectedFiles)
			main := program.GetSourceFile("/workspace/app/index.ts")
			resolved := program.GetResolvedModuleFromModuleSpecifier(main, main.Imports()[0])
			assert.Equal(t, resolved.IsResolved(), tc.sourceExists || tc.outputExists)
			t.Logf("declaration output accesses: %v", fs.outputAccesses)
			if tc.sourceExists {
				assert.Equal(t, len(fs.outputAccesses), 0)
			} else {
				// Missing sources must not suppress the real output existence check.
				assert.Assert(t, slices.Contains(fs.outputAccesses, "FileExists /workspace/app/node_modules/dependency/lib/index.d.ts"))
			}
		})
	}
}
