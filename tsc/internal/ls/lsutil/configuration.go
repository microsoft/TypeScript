package lsutil

import (
	"github.com/microsoft/typescript-go/internal/tspath"
)

type UserConfig struct {
	js *UserPreferences
	ts *UserPreferences
}

// if `userPreferences` is nil, this function will return a config with default userPreferences
func NewUserConfig(userPreferences *UserPreferences) *UserConfig {
	return &UserConfig{
		js: userPreferences.Copy(),
		ts: userPreferences.Copy(),
	}
}

func (c *UserConfig) Copy() *UserConfig {
	return &UserConfig{
		ts: c.ts.Copy(),
		js: c.js.Copy(),
	}
}

// any non-nil field in b is copied into a
func (a *UserConfig) Merge(b *UserConfig) *UserConfig {
	newUserConfig := &UserConfig{}

	if b.ts != nil {
		newUserConfig.ts = b.ts
	} else {
		newUserConfig.ts = a.ts
	}

	if b.js != nil {
		newUserConfig.js = b.js
	} else {
		newUserConfig.js = a.js
	}

	return newUserConfig
}

func (c *UserConfig) TS() *UserPreferences {
	if c.ts != nil {
		return c.ts
	} else if c.js != nil {
		return c.js
	}
	return NewDefaultUserPreferences()
}

func (c *UserConfig) JS() *UserPreferences {
	if c.js != nil {
		return c.js
	} else if c.ts != nil {
		return c.ts
	}
	return NewDefaultUserPreferences()
}

func (c *UserConfig) GetPreferences(activeFile string) *UserPreferences {
	if activeFile == "" || tspath.ExtensionIsTs(tspath.GetAnyExtensionFromPath(activeFile, nil, true)) {
		if c.ts != nil {
			return c.ts
		} else if c.js != nil {
			return c.js
		}
	} else {
		if c.js != nil {
			return c.js
		} else if c.ts != nil {
			return c.ts
		}
	}
	return NewDefaultUserPreferences()
}

func ParseNewUserConfig(items map[string]any) *UserConfig {
	defaultPref := NewDefaultUserPreferences()
	if editorItem, ok := items["editor"]; ok && editorItem != nil {
		if editorSettings, ok := editorItem.(map[string]any); ok {
			defaultPref.FormatCodeSettings = defaultPref.FormatCodeSettings.ParseEditorSettings(editorSettings)
		}
	}
	if jsTsItem, ok := items["js/ts"]; ok && jsTsItem != nil {
		// if "js/ts" is provided, we assume they are already resolved and merged
		switch jsTsSettings := jsTsItem.(type) {
		case map[string]any:
			return NewUserConfig(defaultPref.ParseWorker(jsTsSettings))
		case *UserPreferences:
			// case for fourslash -- fourslash sends the entire userPreferences over in "js/ts"
			return NewUserConfig(jsTsSettings)
		}
	}

	// set typescript and javascript preferences separately
	c := &UserConfig{}
	if tsItem, ok := items["typescript"]; ok && tsItem != nil {
		switch tsSettings := tsItem.(type) {
		case map[string]any:
			c.ts = defaultPref.Copy().ParseWorker(tsSettings)
		case *UserPreferences:
			c.ts = tsSettings
		}
	}

	if jsItem, ok := items["javascript"]; ok && jsItem != nil {
		switch jsSettings := jsItem.(type) {
		case map[string]any:
			c.js = defaultPref.Copy().ParseWorker(jsSettings)
		case *UserPreferences:
			c.js = jsSettings
		}
	}

	return c
}
