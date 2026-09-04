package tsoptions_test

import (
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
)

func TestCompilerOptionsDeclaration(t *testing.T) {
	t.Parallel()

	decls := make(map[string]*tsoptions.CommandLineOption)

	for _, decl := range tsoptions.OptionsDeclarations {
		decls[strings.ToLower(decl.Name)] = decl
	}

	internalOptions := []string{
		"allowNonTsExtensions",
		"build",
		"configFilePath",
		"noDtsResolution",
		"noEmitForJsFiles",
		"pathsBasePath",
		"suppressOutputPathCheck",
		"build",
	}

	internalOptionsMap := make(map[string]string)
	for _, opt := range internalOptions {
		internalOptionsMap[strings.ToLower(opt)] = opt
	}

	compilerOptionsType := reflect.TypeFor[core.CompilerOptions]()
	for field := range compilerOptionsType.Fields() {
		if !field.IsExported() {
			continue
		}

		lowerName := strings.ToLower(field.Name)

		decl := decls[lowerName]
		if decl == nil {
			if name, ok := internalOptionsMap[lowerName]; ok {
				checkCompilerOptionJsonTagName(t, field, name)
				continue
			}
			t.Errorf("CompilerOptions.%s has no options declaration", field.Name)
			continue
		}
		delete(decls, lowerName)

		checkCompilerOptionJsonTagName(t, field, decl.Name)
	}

	skippedOptions := []string{
		"plugins",
	}

	for _, opt := range skippedOptions {
		delete(decls, strings.ToLower(opt))
	}

	for _, decl := range decls {
		t.Errorf("Option declaration %s is not present in CompilerOptions", decl.Name)
	}
}

func TestCommandLineOptionPathKinds(t *testing.T) {
	t.Parallel()

	expected := map[string]tsoptions.CommandLineOptionPathKind{
		"baseUrl":            tsoptions.CommandLineOptionPathKindDirectory,
		"declarationDir":     tsoptions.CommandLineOptionPathKindDirectory,
		"generateCpuProfile": tsoptions.CommandLineOptionPathKindFile,
		"generateTrace":      tsoptions.CommandLineOptionPathKindDirectory,
		"mapRoot":            tsoptions.CommandLineOptionPathKindSourceMapLocation,
		"outDir":             tsoptions.CommandLineOptionPathKindDirectory,
		"outFile":            tsoptions.CommandLineOptionPathKindFile,
		"pprofDir":           tsoptions.CommandLineOptionPathKindDirectory,
		"project":            tsoptions.CommandLineOptionPathKindFileOrDirectory,
		"rootDir":            tsoptions.CommandLineOptionPathKindDirectory,
		"sourceRoot":         tsoptions.CommandLineOptionPathKindSourceMapLocation,
		"tsBuildInfoFile":    tsoptions.CommandLineOptionPathKindFile,
	}

	for _, option := range tsoptions.OptionsDeclarations {
		pathKind, ok := expected[option.Name]
		if !ok {
			if option.PathKind != tsoptions.CommandLineOptionPathKindNone {
				t.Errorf("%s has unexpected path kind %d", option.Name, option.PathKind)
			}
			continue
		}
		if option.PathKind != pathKind {
			t.Errorf("%s has path kind %d, want %d", option.Name, option.PathKind, pathKind)
		}
		delete(expected, option.Name)
	}
	for optionName := range expected {
		t.Errorf("%s was not found in option declarations", optionName)
	}

	for _, optionName := range []string{"rootDirs", "typeRoots"} {
		option := tsoptions.CompilerNameMap.GetOptionDeclarationFromName(optionName, false)
		if option == nil || option.Elements().PathKind != tsoptions.CommandLineOptionPathKindDirectory {
			t.Errorf("%s element is not classified as a directory", optionName)
		}
	}
	for _, optionName := range []string{"excludeDirectories", "excludeFiles"} {
		option := tsoptions.WatchNameMap.GetOptionDeclarationFromName(optionName, false)
		if option == nil || option.Elements().PathKind != tsoptions.CommandLineOptionPathKindResolvedPathPattern {
			t.Errorf("%s element is not classified as a resolved path pattern", optionName)
		}
	}
}

func checkCompilerOptionJsonTagName(t *testing.T, field reflect.StructField, name string) {
	t.Helper()
	want := name + ",omitzero"
	got := field.Tag.Get("json")
	if got != want {
		t.Errorf("Field %s has json tag %s, but the option declaration has name %s", field.Name, got, want)
	}
}
