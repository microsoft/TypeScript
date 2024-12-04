package tsoptions

import "strings"

func GetNameMapFromList(optDecls []*CommandLineOption) *NameMap {
	optionsNames := map[string]*CommandLineOption{}
	shortOptionNames := map[string]string{}
	for _, option := range optDecls {
		optionsNames[strings.ToLower(option.Name)] = option
		if option.shortName != "" {
			shortOptionNames[option.shortName] = option.Name
		}
	}
	return &NameMap{
		optionsNames:     optionsNames,
		shortOptionNames: shortOptionNames,
	}
}

type NameMap struct {
	optionsNames     map[string]*CommandLineOption
	shortOptionNames map[string]string
}

func (nm *NameMap) Get(name string) *CommandLineOption {
	return nm.optionsNames[strings.ToLower(name)]
}

func (nm *NameMap) GetFromShort(shortName string) *CommandLineOption {
	// returns option only if shortName is a valid short option
	name, ok := nm.shortOptionNames[shortName]
	if !ok {
		return nil
	}
	return nm.Get(name)
}

func (nm *NameMap) GetOptionDeclarationFromName(optionName string, allowShort bool) *CommandLineOption {
	// Try to translate short option names to their full equivalents.
	if allowShort {
		short := nm.shortOptionNames[optionName]
		if short != "" {
			optionName = short
		}
	}
	return nm.Get(optionName)
}
