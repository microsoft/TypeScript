package tsoptions_test

import (
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
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
	for i := range compilerOptionsType.NumField() {
		field := compilerOptionsType.Field(i)
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
		"charset",
		"noImplicitUseStrict",
		"noStrictGenericChecks",
		"plugins",
		"preserveValueImports",
		"suppressExcessPropertyErrors",
		"suppressImplicitAnyIndexErrors",
	}

	for _, opt := range skippedOptions {
		delete(decls, strings.ToLower(opt))
	}

	for _, decl := range decls {
		t.Errorf("Option declaration %s is not present in CompilerOptions", decl.Name)
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
