package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func TestImportLocalization(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	source := filepath.Join(dir, "source.json")
	handback := filepath.Join(dir, "handback.json")
	output := filepath.Join(dir, "loc", "ko-KR.generated.json")
	assert.NilError(t, os.WriteFile(source, []byte(`{
		"Updated": "Current English.",
		"New": "New English.",
		"StaleEnglish": "Changed English.",
		"Translated": "Source [text].",
		"SameAsEnglish": "English.",
		"ExistingOnly": "Existing source."
	}`), 0o644))
	assert.NilError(t, os.WriteFile(handback, []byte(`{
		"Updated": "Current English.",
		"New": "New English.",
		"StaleEnglish": "Old English.",
		"Translated": "새 번역]",
		"SameAsEnglish": "English.",
		"Removed": "Obsolete translation."
	}`), 0o644))
	assert.NilError(t, os.WriteFile(handback+".lct", []byte(`<?xml version="1.0"?>
	<LCX xmlns="http://schemas.microsoft.com/locstudio/2006/6/lcx">
		<Item ItemId=";String Table"><Item ItemId=";Strings">
			<Item ItemId=";Updated"><Str><Val>Current English.</Val><Tgt Stat="Update"><Val>Current English.</Val></Tgt></Str></Item>
			<Item ItemId=";New"><Str><Val>New English.</Val><Tgt><Val>New English.</Val></Tgt></Str></Item>
			<Item ItemId=";StaleEnglish"><Str><Val>Changed English.</Val><Tgt><Val>Old English.</Val></Tgt></Str></Item>
			<Item ItemId=";Translated"><Str><Val>Source [text]5D;.</Val><Tgt Stat="Loc"><Val>새 번역]5D;</Val></Tgt></Str></Item>
			<Item ItemId=";SameAsEnglish"><Str><Val>English.</Val><Tgt Stat="Loc"><Val>English.</Val></Tgt></Str></Item>
		</Item></Item>
	</LCX>`), 0o644))
	assert.NilError(t, os.MkdirAll(filepath.Dir(output), 0o755))
	assert.NilError(t, os.WriteFile(output, []byte(`{
		"Updated": "이전 번역",
		"StaleEnglish": "기존 번역",
		"Translated": "Previous translation.",
		"ExistingOnly": "Keep this translation.",
		"Removed": "Remove this translation."
	}`), 0o644))

	assert.NilError(t, importLocalization(source, handback, output))
	data, err := os.ReadFile(output)
	assert.NilError(t, err)
	assert.Equal(t, string(data), "{\r\n"+
		"  \"ExistingOnly\": \"Keep this translation.\",\r\n"+
		"  \"SameAsEnglish\": \"English.\",\r\n"+
		"  \"StaleEnglish\": \"기존 번역\",\r\n"+
		"  \"Translated\": \"새 번역]\",\r\n"+
		"  \"Updated\": \"이전 번역\"\r\n"+
		"}")
	assert.NilError(t, importLocalization(source, handback, output))
	again, err := os.ReadFile(output)
	assert.NilError(t, err)
	assert.DeepEqual(t, again, data)

	newOutput := filepath.Join(dir, "new-locale", "generated.json")
	assert.NilError(t, importLocalization(source, handback, newOutput))
	messages, err := readMessages(newOutput)
	assert.NilError(t, err)
	assert.DeepEqual(t, messages, map[string]string{"SameAsEnglish": "English.", "Translated": "새 번역]"})
}

func TestImportLocalizationRejectsInvalidMetadata(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		metadata string
		error    string
	}{
		{name: "missing resource", metadata: "<LCX/>", error: "missing localization metadata"},
		{name: "missing target", metadata: `<LCX><Item ItemId=";Key"><Str><Val>English.</Val></Str></Item></LCX>`, error: "missing localization metadata"},
		{name: "malformed XML", metadata: "<LCX>", error: "decode"},
		{name: "unknown status", metadata: `<LCX><Item ItemId=";Key"><Str><Val>English.</Val><Tgt Stat="Unexpected"><Val>Translation.</Val></Tgt></Str></Item></LCX>`, error: "unknown localization status"},
		{name: "unconfirmed New status", metadata: `<LCX><Item ItemId=";Key"><Str><Val>English.</Val><Tgt Stat="New"><Val>Translation.</Val></Tgt></Str></Item></LCX>`, error: "unknown localization status"},
		{name: "duplicate resource", metadata: `<LCX><Item ItemId=";Key"><Str/></Item><Item ItemId=";Key"><Str/></Item></LCX>`, error: "duplicate resource ID"},
		{name: "invalid resource ID", metadata: `<LCX><Item ItemId="Key"><Str/></Item></LCX>`, error: "invalid resource ID"},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			dir := t.TempDir()
			source := filepath.Join(dir, "source.json")
			handback := filepath.Join(dir, "handback.json")
			output := filepath.Join(dir, "output.json")
			assert.NilError(t, os.WriteFile(source, []byte(`{"Key":"English."}`), 0o644))
			assert.NilError(t, os.WriteFile(handback, []byte(`{"Key":"Translation."}`), 0o644))
			assert.NilError(t, os.WriteFile(handback+".lct", []byte(test.metadata), 0o644))
			existing := []byte(`{"Key":"Existing translation."}`)
			assert.NilError(t, os.WriteFile(output, existing, 0o644))
			err := importLocalization(source, handback, output)
			assert.Assert(t, err != nil)
			assert.Assert(t, strings.Contains(err.Error(), test.error), "%v", err)
			data, readErr := os.ReadFile(output)
			assert.NilError(t, readErr)
			assert.DeepEqual(t, data, existing)
		})
	}
}
