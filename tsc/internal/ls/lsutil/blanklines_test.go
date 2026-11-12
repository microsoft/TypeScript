package lsutil

import (
	"math"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"gotest.tools/v3/assert"
)

func TestBlankLinePreferences(t *testing.T) {
	for _, value := range []any{0, 1, 2, float64(0), float64(2)} {
		prefs := NewDefaultUserPreferences().withConfig(map[string]any{
			"format": map[string]any{
				"maxConsecutiveBlankLines":           value,
				"removeBlankLinesBeforeClosingBrace": true,
			},
		})
		assert.Assert(t, prefs.MaxConsecutiveBlankLines != nil)
		assert.Equal(t, prefs.RemoveBlankLinesBeforeClosingBrace, core.TSTrue)
		encoded, err := json.Marshal(&prefs)
		assert.NilError(t, err)
		var decoded UserPreferences
		assert.NilError(t, json.Unmarshal(encoded, &decoded))
		assert.DeepEqual(t, prefs, decoded)
	}
	base := NewDefaultUserPreferences()
	assert.Assert(t, base.MaxConsecutiveBlankLines == nil)
	assert.Assert(t, !base.RemoveBlankLinesBeforeClosingBrace.IsTrue())
	one := 1
	base.MaxConsecutiveBlankLines = &one
	for _, value := range []any{nil, -1, -1.0, 0.5, "1", true, math.NaN(), math.Inf(1), float64(1 << 63)} {
		for _, config := range []map[string]any{
			{"maxConsecutiveBlankLines": value},
			{"format.maxConsecutiveBlankLines": value},
			{"format": map[string]any{"maxConsecutiveBlankLines": value}},
		} {
			assert.DeepEqual(t, base.withConfig(config), base)
		}
	}
	// A language-specific zero must override an earlier nonzero value, and
	// serialization must retain that zero when configuration is sent over LSP.
	prefs := ParseUserPreferences(map[string]any{
		"javascript": map[string]any{"format": map[string]any{"maxConsecutiveBlankLines": 2}},
		"typescript": map[string]any{"format": map[string]any{"maxConsecutiveBlankLines": 0}},
	})
	assert.Assert(t, prefs.MaxConsecutiveBlankLines != nil)
	assert.Equal(t, *prefs.MaxConsecutiveBlankLines, 0)
	assert.Equal(t, *base.MaxConsecutiveBlankLines, 1, "overlays must not mutate their base")
	options := FromLSFormatOptions(prefs.FormatCodeSettings, prefs.FormatCodeSettings.ToLSFormatOptions())
	assert.DeepEqual(t, options.MaxConsecutiveBlankLines, prefs.MaxConsecutiveBlankLines)
}
