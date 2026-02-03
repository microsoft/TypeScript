package lsutil

import (
	"testing"
)

func TestUserConfig_GetPreferences(t *testing.T) {
	t.Parallel()
	defaultPref := NewDefaultUserPreferences()

	type expectedPreference int

	const (
		expectedPreferenceTS expectedPreference = iota
		expectedPreferenceJS
		expectedPreferenceDefault
	)

	doubleQuotePrefs := &UserPreferences{
		QuotePreference: "double",
	}
	singleQuotePrefs := &UserPreferences{
		QuotePreference: "single",
	}

	tsDoubleQuoteJsSingleQuoteConfig := &UserConfig{
		ts: doubleQuotePrefs,
		js: singleQuotePrefs,
	}
	tests := []struct {
		name         string
		config       *UserConfig
		activeFile   string
		expectedPref expectedPreference
	}{
		{
			name:         ".ts file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.ts",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".tsx file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.tsx",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".d.ts file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.d.ts",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".mts file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.mts",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".cts file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.cts",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".js file returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.js",
			expectedPref: expectedPreferenceJS,
		},
		{
			name:         ".jsx file returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.jsx",
			expectedPref: expectedPreferenceJS,
		},
		{
			name:         ".mjs file returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.mjs",
			expectedPref: expectedPreferenceJS,
		},
		{
			name:         ".cjs file returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.cjs",
			expectedPref: expectedPreferenceJS,
		},
		{
			name:         "Empty file returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         "Unknown file extension returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "file.py",
			expectedPref: expectedPreferenceJS,
		},
		{
			name: ".ts file with nil TS preferences falls back to JS",
			config: &UserConfig{
				ts: nil,
				js: singleQuotePrefs,
			},
			activeFile:   "file.ts",
			expectedPref: expectedPreferenceJS,
		},
		{
			name: ".js file with nil JS preferences falls back to TS",
			config: &UserConfig{
				ts: doubleQuotePrefs,
				js: nil,
			},
			activeFile:   "file.js",
			expectedPref: expectedPreferenceTS,
		},
		{
			name: ".ts file with both nil preferences returns default",
			config: &UserConfig{
				ts: nil,
				js: nil,
			},
			activeFile:   "file.ts",
			expectedPref: expectedPreferenceDefault,
		},
		{
			name: ".js file with both nil preferences returns default",
			config: &UserConfig{
				ts: nil,
				js: nil,
			},
			activeFile:   "file.js",
			expectedPref: expectedPreferenceDefault,
		},
		{
			name:         ".ts file with deeper path returns TS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "path/to/file.ts",
			expectedPref: expectedPreferenceTS,
		},
		{
			name:         ".js file with deeper path returns JS preferences",
			config:       tsDoubleQuoteJsSingleQuoteConfig,
			activeFile:   "path/to/file.js",
			expectedPref: expectedPreferenceJS,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := tt.config.GetPreferences(tt.activeFile)

			switch tt.expectedPref {
			case expectedPreferenceDefault:
				// Compare with default preferences
				if got.QuotePreference != defaultPref.QuotePreference {
					t.Errorf("GetPreferences().QuotePreference was '%v', expected default %v", got.QuotePreference, defaultPref.QuotePreference)
				}
			case expectedPreferenceTS:
				if got.QuotePreference != tt.config.ts.QuotePreference {
					t.Errorf("GetPreferences().QuotePreference was '%v', expected TS preference %v", got.QuotePreference, tt.config.ts.QuotePreference)
				}
			case expectedPreferenceJS:
				if got.QuotePreference != tt.config.js.QuotePreference {
					t.Errorf("GetPreferences().QuotePreference was '%v', expected JS preference %v", got.QuotePreference, tt.config.js.QuotePreference)
				}
			}
		})
	}
}

func TestUserConfig_GetPreferences_CodeLensAndInlayHints(t *testing.T) {
	t.Parallel()
	codeLensAndInlayHintsOn := &UserPreferences{
		CodeLens: CodeLensUserPreferences{
			ReferencesCodeLensEnabled: true,
		},
		InlayHints: InlayHintsPreferences{
			IncludeInlayVariableTypeHints: true,
		},
	}

	codeLensAndInlayHintsOff := &UserPreferences{
		CodeLens: CodeLensUserPreferences{
			ReferencesCodeLensEnabled: false,
		},
		InlayHints: InlayHintsPreferences{
			IncludeInlayVariableTypeHints: false,
		},
	}

	tests := []struct {
		name                   string
		config                 *UserConfig
		activeFile             string
		expectedLensesAndHints bool
	}{
		{
			name: ".ts file with CodeLens and InlayHints enabled",
			config: &UserConfig{
				ts: codeLensAndInlayHintsOn,
				js: codeLensAndInlayHintsOff,
			},
			activeFile:             "file.ts",
			expectedLensesAndHints: true,
		},
		{
			name: ".ts file with CodeLens and InlayHints disabled",
			config: &UserConfig{
				ts: codeLensAndInlayHintsOn,
				js: codeLensAndInlayHintsOff,
			},
			activeFile:             "file.js",
			expectedLensesAndHints: false,
		},
		{
			name: ".ts file with CodeLens and InlayHints disabled",
			config: &UserConfig{
				ts: codeLensAndInlayHintsOff,
				js: codeLensAndInlayHintsOn,
			},
			activeFile:             "file.ts",
			expectedLensesAndHints: false,
		},
		{
			name: ".js file with CodeLens and InlayHints disabled",
			config: &UserConfig{
				ts: codeLensAndInlayHintsOn,
				js: codeLensAndInlayHintsOff,
			},
			activeFile:             "file.js",
			expectedLensesAndHints: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := tt.config.GetPreferences(tt.activeFile)

			if got.CodeLens.ReferencesCodeLensEnabled != tt.expectedLensesAndHints {
				t.Errorf("GetPreferences().CodeLens.ReferencesCodeLensEnabled was '%v', expected '%v'", got.CodeLens.ReferencesCodeLensEnabled, tt.expectedLensesAndHints)
			}
			if got.InlayHints.IncludeInlayVariableTypeHints != tt.expectedLensesAndHints {
				t.Errorf("GetPreferences().InlayHints.IncludeInlayVariableTypeHints was '%v', expected '%v'", got.InlayHints.IncludeInlayVariableTypeHints, tt.expectedLensesAndHints)
			}
		})
	}
}
