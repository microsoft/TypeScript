package diagnostics

import (
	"bytes"
	"compress/gzip"
	"io"
	"maps"
	"os"
	"os/exec"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"golang.org/x/text/language"
	"gotest.tools/v3/assert"
)

func TestLocalize(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		message  *Message
		locale   locale.Locale
		args     []any
		expected string
	}{
		{
			name:     "english default",
			message:  Identifier_expected,
			locale:   locale.Locale(language.English),
			expected: "Identifier expected.",
		},
		{
			name:     "undefined locale uses english",
			message:  Identifier_expected,
			locale:   locale.Locale(language.Und),
			expected: "Identifier expected.",
		},
		{
			name:     "with single argument",
			message:  X_0_expected,
			locale:   locale.Locale(language.English),
			args:     []any{")"},
			expected: "')' expected.",
		},
		{
			name:     "with multiple arguments",
			message:  The_parser_expected_to_find_a_1_to_match_the_0_token_here,
			locale:   locale.Locale(language.English),
			args:     []any{"{", "}"},
			expected: "The parser expected to find a '}' to match the '{' token here.",
		},
		{
			name:     "fallback to english for unknown locale",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("af-ZA")),
			expected: "Identifier expected.",
		},
		{
			name:     "german",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("de-DE")),
			expected: "Es wurde ein Bezeichner erwartet.",
		},
		{
			name:     "french",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("fr-FR")),
			expected: "Identificateur attendu.",
		},
		{
			name:     "spanish",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("es-ES")),
			expected: "Se esperaba un identificador.",
		},
		{
			name:     "japanese",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ja-JP")),
			expected: "識別子が必要です。",
		},
		{
			name:     "chinese simplified",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("zh-CN")),
			expected: "应为标识符。",
		},
		{
			name:     "korean",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ko-KR")),
			expected: "식별자가 필요합니다.",
		},
		{
			name:     "russian",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ru-RU")),
			expected: "Ожидался идентификатор.",
		},
		{
			name:     "german with args",
			message:  X_0_expected,
			locale:   locale.Locale(language.MustParse("de-DE")),
			args:     []any{")"},
			expected: "\")\" wurde erwartet.",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := tt.message.Localize(tt.locale, tt.args...)
			assert.Equal(t, result, tt.expected)
		})
	}
}

func TestLocalize_ByKey(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		key      Key
		locale   locale.Locale
		args     []string
		expected string
	}{
		{
			name:     "by key without args",
			key:      "Identifier_expected_1003",
			locale:   locale.Locale(language.English),
			expected: "Identifier expected.",
		},
		{
			name:     "by key with args",
			key:      "_0_expected_1005",
			locale:   locale.Locale(language.English),
			args:     []string{")"},
			expected: "')' expected.",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := Localize(tt.locale, nil, tt.key, tt.args...)
			assert.Equal(t, result, tt.expected)
		})
	}
}

func TestLocaleFiles(t *testing.T) {
	t.Parallel()

	files, err := filepath.Glob("loc/*.generated.json")
	assert.NilError(t, err)
	assert.Assert(t, len(files) > 0)

	for _, path := range files {
		localeName := strings.TrimSuffix(filepath.Base(path), ".generated.json")
		t.Run(localeName, func(t *testing.T) {
			t.Parallel()

			data, readErr := os.ReadFile(path)
			assert.NilError(t, readErr)

			validateLocaleFile(t, data, getLocalizedMessages(language.MustParse(localeName)))
		})
	}
}

func validateLocaleFile(t *testing.T, data []byte, runtimeMessages map[Key]string) {
	t.Helper()
	var handback map[Key]string
	assert.NilError(t, json.Unmarshal(data, &handback))
	validateLocalizedMessages(t, handback)

	var orderedMessages collections.OrderedMap[Key, string]
	activeMessages := make(map[Key]string)
	for _, key := range slices.Sorted(maps.Keys(handback)) {
		orderedMessages.Set(key, handback[key])
		if keyToMessage(key) != nil {
			activeMessages[key] = handback[key]
		}
	}
	expected, err := json.MarshalIndent(&orderedMessages, "", "  ")
	assert.NilError(t, err)
	expected = bytes.ReplaceAll(expected, []byte("\n"), []byte("\r\n"))
	assert.Equal(t, string(data), string(expected), "handback must use sorted keys and canonical formatting")

	if len(activeMessages) == 0 {
		assert.Equal(t, len(runtimeMessages), 0)
	} else {
		assert.DeepEqual(t, runtimeMessages, activeMessages)
	}
}

func TestLocaleFilesIgnoreStaleDiagnostics(t *testing.T) {
	t.Parallel()
	data := []byte("{\r\n" +
		"  \"Identifier_expected_1003\": \"Known translation.\",\r\n" +
		"  \"Removed_diagnostic_99999\": \"Stale translation.\"\r\n" +
		"}")
	validateLocaleFile(t, data, map[Key]string{
		"Identifier_expected_1003": "Known translation.",
	})
	validateLocaleFile(t, []byte("{\r\n  \"Removed_diagnostic_99999\": \"Stale translation.\"\r\n}"), nil)
}

func TestGenerateLocalizations(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	locDir := filepath.Join(dir, "loc")
	projectDir := filepath.Join(dir, "tools")
	assert.NilError(t, os.MkdirAll(locDir, 0o755))
	assert.NilError(t, os.MkdirAll(projectDir, 0o755))
	project := filepath.Join(projectDir, "LocProject.json")
	assert.NilError(t, os.WriteFile(project, []byte(`{
		"Projects": [{"LocItems": [{
			"SourceFile": "source.json",
			"Languages": "de-DE;cs-CZ;fr-FR"
		}]}]
	}`), 0o644))
	germanHandback := []byte(`{
		"Unterminated_string_literal_1002": "Zeichenfolge nicht abgeschlossen.",
		"Removed_diagnostic_99999": "Obsolete translation.",
		"Identifier_expected_1003": "Identifier expected.",
		"A_label_is_not_allowed_here_1344": "Hier ist keine Bezeichnung erlaubt."
	}`)
	assert.NilError(t, os.WriteFile(filepath.Join(locDir, "de-DE.generated.json"), germanHandback, 0o644))
	assert.NilError(t, os.WriteFile(filepath.Join(locDir, "cs-CZ.generated.json"), []byte(`{
		"Identifier_expected_1003": "Identifier expected."
	}`), 0o644))
	assert.NilError(t, os.WriteFile(filepath.Join(locDir, "fr-FR.generated.json"), []byte("{}"), 0o644))
	assert.NilError(t, os.WriteFile(filepath.Join(locDir, "obsolete.json.gz"), []byte("stale archive"), 0o644))

	generate := func() {
		t.Helper()
		command := exec.Command("go", "run", "generate.go",
			"-diagnostics", filepath.Join(dir, "diagnostics_generated.go"),
			"-loc", filepath.Join(dir, "loc_generated.go"),
			"-locdir", locDir,
			"-locproject", project,
			"-locsource", filepath.Join(dir, "source.json"))
		output, err := command.CombinedOutput()
		assert.NilError(t, err, "%s", output)
	}
	generate()

	data, err := os.ReadFile(filepath.Join(locDir, "de-DE.generated.json"))
	assert.NilError(t, err)
	assert.DeepEqual(t, data, germanHandback)

	archive, err := os.ReadFile(filepath.Join(locDir, "de-DE.json.gz"))
	assert.NilError(t, err)
	reader, err := gzip.NewReader(bytes.NewReader(archive))
	assert.NilError(t, err)
	defer reader.Close()
	runtimeData, err := io.ReadAll(reader)
	assert.NilError(t, err)
	var runtimeMessages map[Key]string
	assert.NilError(t, json.Unmarshal(runtimeData, &runtimeMessages))
	assert.DeepEqual(t, runtimeMessages, map[Key]string{
		"A_label_is_not_allowed_here_1344": "Hier ist keine Bezeichnung erlaubt.",
		"Identifier_expected_1003":         "Identifier expected.",
		"Unterminated_string_literal_1002": "Zeichenfolge nicht abgeschlossen.",
	})

	_, err = os.Stat(filepath.Join(locDir, "cs-CZ.json.gz"))
	assert.NilError(t, err)
	empty, err := os.ReadFile(filepath.Join(locDir, "fr-FR.generated.json"))
	assert.NilError(t, err)
	assert.Equal(t, string(empty), "{}")
	_, err = os.Stat(filepath.Join(locDir, "fr-FR.json.gz"))
	assert.Assert(t, os.IsNotExist(err))
	_, err = os.Stat(filepath.Join(locDir, "obsolete.json.gz"))
	assert.Assert(t, os.IsNotExist(err))

	generate()
	regenerated, err := os.ReadFile(filepath.Join(locDir, "de-DE.generated.json"))
	assert.NilError(t, err)
	assert.DeepEqual(t, regenerated, data)
	regeneratedArchive, err := os.ReadFile(filepath.Join(locDir, "de-DE.json.gz"))
	assert.NilError(t, err)
	assert.DeepEqual(t, regeneratedArchive, archive)
}

func validateLocalizedMessages(t *testing.T, localizedMessages map[Key]string) {
	t.Helper()
	for key, localizedText := range localizedMessages {
		message := keyToMessage(key)
		if message == nil {
			continue
		}
		localizedPlaceholders := placeholderSet(localizedText)
		englishPlaceholders := placeholderSet(message.text)
		assert.Equal(t, len(localizedPlaceholders), len(englishPlaceholders), "placeholder mismatch for %q", key)
		for placeholder := range englishPlaceholders {
			assert.Assert(t, localizedPlaceholders[placeholder], "localized diagnostic %q is missing placeholder %s", key, placeholder)
		}
	}
}

func placeholderSet(text string) map[string]bool {
	result := map[string]bool{}
	for _, placeholder := range placeholderRegexp.FindAllString(text, -1) {
		result[placeholder] = true
	}
	return result
}
