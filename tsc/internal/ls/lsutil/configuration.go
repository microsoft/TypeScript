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

func ParseNewUserConfig(items []any) *UserConfig {
	defaultPref := NewUserConfig(NewDefaultUserPreferences())
	c := &UserConfig{}
	for i, item := range items {
		if item == nil {
			// continue
		} else if config, ok := item.(map[string]any); ok {
			switch i {
			case 0:
				// if provided, parse and set "js/ts" as base config
				defaultPref = NewUserConfig(defaultPref.ts.ParseWorker(config))
				c = defaultPref.Copy()
				continue
			case 1:
				// typescript
				c.ts = defaultPref.ts.ParseWorker(config)
			case 2:
				// javascript
				c.js = defaultPref.js.ParseWorker(config)
			}
		} else if item, ok := item.(*UserPreferences); ok {
			// case for fourslash -- fourslash sends the entire userPreferences over
			// !!! support format and js/ts distinction?
			return NewUserConfig(item)
		}
	}
	return c
}
