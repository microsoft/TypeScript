package tsoptions

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
)

var (
	CompilerNameMap = GetNameMapFromList(OptionsDeclarations)
	BuildNameMap    = GetNameMapFromList(BuildOpts)
	WatchNameMap    = GetNameMapFromList(optionsForWatch)
)

func GetNameMapFromList(optDecls []*CommandLineOption) *NameMap {
	optionsNames := collections.NewOrderedMapWithSizeHint[string, *CommandLineOption](len(optDecls))
	shortOptionNames := map[string]string{}
	for _, option := range optDecls {
		optionsNames.Set(strings.ToLower(option.Name), option)
		if option.ShortName != "" {
			shortOptionNames[option.ShortName] = option.Name
		}
	}
	return &NameMap{
		optionsNames:     optionsNames,
		shortOptionNames: shortOptionNames,
	}
}

type NameMap struct {
	optionsNames     *collections.OrderedMap[string, *CommandLineOption]
	shortOptionNames map[string]string
}

func (nm *NameMap) Get(name string) *CommandLineOption {
	return nm.optionsNames.GetOrZero(strings.ToLower(name))
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
	optionName = strings.ToLower(optionName)
	// Try to translate short option names to their full equivalents.
	if allowShort {
		short := nm.shortOptionNames[optionName]
		if short != "" {
			optionName = short
		}
	}
	return nm.Get(optionName)
}
