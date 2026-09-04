package module

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestNormalizePathForCJSResolutionPreservesDirectoryIntent(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name                string
		containingDirectory string
		moduleName          string
		path                tspath.RootedFilePath
		text                string
		directoryOnly       bool
	}{
		{name: "file", containingDirectory: "/project", moduleName: "file", path: "/project/file", text: "/project/file"},
		{name: "trailing separator", containingDirectory: "/project", moduleName: "directory/", path: "/project/directory", text: "/project/directory/", directoryOnly: true},
		{name: "current directory", containingDirectory: "/project", moduleName: ".", path: "/project", text: "/project/", directoryOnly: true},
		{name: "current directory with backslash", containingDirectory: "/project", moduleName: ".\\", path: "/project", text: "/project/", directoryOnly: true},
		{name: "nested parent directory", containingDirectory: "/project/src", moduleName: "../lib/", path: "/project/lib", text: "/project/lib/", directoryOnly: true},
		{name: "nested parent directory with backslashes", containingDirectory: "/project/src", moduleName: "..\\lib\\", path: "/project/lib", text: "/project/lib/", directoryOnly: true},
		{name: "posix root", containingDirectory: "/project", moduleName: "..", path: "/", text: "/", directoryOnly: true},
		{name: "drive root", containingDirectory: "c:/project", moduleName: "..", path: "c:/", text: "c:/", directoryOnly: true},
		{name: "drive root without separator", containingDirectory: "/project", moduleName: "c:", path: "c:/", text: "c:/", directoryOnly: true},
		{name: "UNC root without separator", containingDirectory: "/project", moduleName: "//server", path: "//server/", text: "//server/", directoryOnly: true},
		{name: "URL root", containingDirectory: "file:///project", moduleName: "..", path: "file:///", text: "file:///", directoryOnly: true},
		{name: "URL authority root without separator", containingDirectory: "/project", moduleName: "file://server", path: "file://server/", text: "file://server/", directoryOnly: true},
		{
			name:                "dynamic reserved prefix",
			containingDirectory: "^/~ts-uri~/custom/ts-nul-authority/folder",
			moduleName:          "./~ts-uri-escape~file",
			path:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e66696c65~",
			text:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e66696c65~",
		},
		{
			name:                "dynamic reserved prefix with extension",
			containingDirectory: "^/~ts-uri~/custom/ts-nul-authority/folder",
			moduleName:          "./~ts-uri-escape~file.ts",
			path:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e66696c65~.ts",
			text:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e66696c65~.ts",
		},
		{
			name:                "dynamic reserved directory prefix",
			containingDirectory: "^/~ts-uri~/custom/ts-nul-authority/folder",
			moduleName:          "./~ts-uri-escape~dir/file",
			path:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e646972~/file",
			text:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e646972~/file",
		},
		{
			name:                "dynamic dotted directory intent",
			containingDirectory: "^/~ts-uri~/custom/ts-nul-authority/folder",
			moduleName:          "./~ts-uri-escape~dir.js/",
			path:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e6469722e6a73~",
			text:                "^/~ts-uri~/custom/ts-nul-authority/folder/~ts-uri-escape~7e74732d7572692d6573636170657e6469722e6a73~/",
			directoryOnly:       true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			candidate := normalizePathForCJSResolution(tspath.RootedDirectoryPathFromNormalized(test.containingDirectory), test.moduleName)
			if candidate.path != test.path.AsPath() {
				t.Errorf("path = %q, expected %q", candidate.path, test.path)
			}
			if candidate.directoryOnly != test.directoryOnly {
				t.Errorf("directoryOnly = %v, expected %v", candidate.directoryOnly, test.directoryOnly)
			}
			if candidate.AsString() != test.text {
				t.Errorf("AsString() = %q, expected %q", candidate.AsString(), test.text)
			}
			if candidate.HasTrailingDirectorySeparator() != test.directoryOnly {
				t.Errorf("HasTrailingDirectorySeparator() = %v, expected %v", candidate.HasTrailingDirectorySeparator(), test.directoryOnly)
			}
		})
	}
}

func TestPackageJSONPathWithTrailingSeparatorDoesNotResolveAsFile(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/project/index.d.ts": "export {};",
	}, tspath.CaseSensitive)
	state := &resolutionState{
		resolver:        &Resolver{fs: fs},
		compilerOptions: &core.CompilerOptions{},
	}

	candidate := resolveResolutionCandidate("/project", "index.d.ts/")
	if result := state.loadFileNameFromPackageJSONField(extensionsDeclaration, candidate, "./index.d.ts/"); !result.shouldContinueSearching() {
		t.Fatalf("directory-only candidate resolved as %q", result.path)
	}
}

func TestOutputDirectoriesRemoveTrailingSeparators(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{}, tspath.CaseSensitive)
	state := &resolutionState{
		resolver: &Resolver{fs: fs},
		compilerOptions: &core.CompilerOptions{
			DeclarationDir: tspath.RootedDirectoryPathFromAbsolute("/project/types/"),
			OutDir:         tspath.RootedDirectoryPathFromAbsolute("/project/dist/"),
		},
	}

	directories := state.getOutputDirectories()
	expected := []tspath.RootedDirectoryPath{"/project/types", "/project/dist"}
	if len(directories) != len(expected) {
		t.Fatalf("got %d output directories, expected %d", len(directories), len(expected))
	}
	for i, directory := range directories {
		if directory != expected[i] {
			t.Errorf("directory %d = %q, expected %q", i, directory, expected[i])
		}
	}
}
