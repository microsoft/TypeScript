package main

import (
	"bytes"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestGenerate(t *testing.T) {
	t.Parallel()
	path := filepath.Join("..", "userPreferences.schema.json")
	goOutput, tsOutput, err := generate(path)
	if err != nil {
		t.Fatal(err)
	}
	if _, parseErr := parser.ParseFile(token.NewFileSet(), "userpreferences_generated.go", goOutput, parser.AllErrors); parseErr != nil {
		t.Fatal(parseErr)
	}
	for _, expected := range []string{
		"type UserPreferences struct {",
		"CompletionPreferences",
		"InlayHintsPreferences",
		`json:"includeCompletionsForModuleExports,omitempty"`,
		`getPreferenceConfigValue(config, "suggest.autoImports")`,
		`getPreferenceConfigValue(config, "suggest.jsdoc.enabled", "suggest.completeJSDocs")`,
		"func (p UserPreferences) withConfig(config map[string]any) UserPreferences",
		"func (p *UserPreferences) MarshalJSONTo(enc *json.Encoder) error",
	} {
		if !strings.Contains(strings.Join(strings.Fields(string(goOutput)), " "), expected) {
			t.Errorf("Go output does not contain %q", expected)
		}
	}
	for _, expected := range []string{
		"export interface UserPreferences extends FormatCodeSettings, CompletionPreferences, InlayHintsPreferences, CodeLensUserPreferences",
		"includeCompletionsForModuleExports?: boolean | undefined;",
		`quotePreference?: "auto" | "double" | "single" | undefined;`,
		`importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js" | undefined;`,
	} {
		if !strings.Contains(string(tsOutput), expected) {
			t.Errorf("TypeScript output does not contain %q", expected)
		}
	}
	secondGo, secondTS, err := generate(path)
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.Equal(goOutput, secondGo) || !bytes.Equal(tsOutput, secondTS) {
		t.Error("generation is not deterministic")
	}
	if bytes.Contains(goOutput, []byte("reflect.")) {
		t.Error("generated preferences must use typed field access")
	}
	if bytes.Contains(goOutput, []byte("WithCompletionPreferences")) {
		t.Error("generated preferences must not provide per-call completion overrides")
	}
}

func TestInvalidSchema(t *testing.T) {
	t.Parallel()
	for name, input := range map[string]string{
		"unknown keyword":              `{"$ref":"#/$defs/UserPreferences","$defs":{"UserPreferences":{"type":"object","properties":{"value":{"type":"boolean","x-confgi":"suggest.autoImports"}}}}}`,
		"unknown reference":            `{"$ref":"#/$defs/UserPreferences","$defs":{"UserPreferences":{"type":"object","allOf":[{"$ref":"#/$defs/Missing"}]}}}`,
		"cycle":                        `{"$ref":"#/$defs/UserPreferences","$defs":{"UserPreferences":{"type":"object","allOf":[{"$ref":"#/$defs/UserPreferences"}]}}}`,
		"unsupported type":             `{"$ref":"#/$defs/UserPreferences","$defs":{"UserPreferences":{"type":"object","properties":{"value":{"type":"null"}}}}}`,
		"duplicate inherited property": `{"$ref":"#/$defs/UserPreferences","$defs":{"UserPreferences":{"type":"object","allOf":[{"$ref":"#/$defs/Base"}],"properties":{"value":{"type":"boolean"}}},"Base":{"type":"object","properties":{"value":{"type":"boolean"}}}}}`,
	} {
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			path := filepath.Join(t.TempDir(), "schema.json")
			if err := os.WriteFile(path, []byte(input), 0o644); err != nil {
				t.Fatal(err)
			}
			if _, _, err := generate(path); err == nil {
				t.Fatal("expected schema validation error")
			}
		})
	}
}
