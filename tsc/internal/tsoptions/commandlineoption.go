package tsoptions

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type CommandLineOptionKind string

const (
	CommandLineOptionTypeString        CommandLineOptionKind = "string"
	CommandLineOptionTypeNumber        CommandLineOptionKind = "number"
	CommandLineOptionTypeBoolean       CommandLineOptionKind = "boolean"
	CommandLineOptionTypeObject        CommandLineOptionKind = "object"
	CommandLineOptionTypeList          CommandLineOptionKind = "list"
	CommandLineOptionTypeListOrElement CommandLineOptionKind = "listOrElement"
	CommandLineOptionTypeEnum          CommandLineOptionKind = "enum" // map
)

type CommandLineOptionPathKind uint8

const (
	CommandLineOptionPathKindNone CommandLineOptionPathKind = iota
	CommandLineOptionPathKindFile
	CommandLineOptionPathKindDirectory
	CommandLineOptionPathKindFileOrDirectory
	CommandLineOptionPathKindSourceMapLocation
	CommandLineOptionPathKindFileSpec
	CommandLineOptionPathKindPathPattern
	CommandLineOptionPathKindResolvedPathPattern
	CommandLineOptionPathKindConfigLocator
)

func (k CommandLineOptionPathKind) IsRooted() bool {
	switch k {
	case CommandLineOptionPathKindFile,
		CommandLineOptionPathKindDirectory,
		CommandLineOptionPathKindFileOrDirectory,
		CommandLineOptionPathKindResolvedPathPattern:
		return true
	default:
		return false
	}
}

func (k CommandLineOptionPathKind) IsFileSystemPath() bool {
	switch k {
	case CommandLineOptionPathKindFile,
		CommandLineOptionPathKindDirectory,
		CommandLineOptionPathKindFileOrDirectory:
		return true
	default:
		return false
	}
}

func PathValueAsString(value any) (string, bool) {
	switch value := value.(type) {
	case tspath.RootedFilePath:
		return value.AsString(), true
	case tspath.RootedDirectoryPath:
		return value.AsString(), true
	case tspath.RootedPath:
		return value.AsString(), true
	case tspath.SourceMapLocation:
		return value.AsString(), true
	default:
		return "", false
	}
}

func PathValuesAsStrings(value any) ([]string, bool) {
	switch value := value.(type) {
	case []tspath.RootedFilePath:
		return core.Map(value, func(path tspath.RootedFilePath) string { return path.AsString() }), true
	case []tspath.RootedDirectoryPath:
		return core.Map(value, func(path tspath.RootedDirectoryPath) string { return path.AsString() }), true
	default:
		return nil, false
	}
}

type CommandLineOption struct {
	Name, ShortName string
	Kind            CommandLineOptionKind

	// used in parsing
	PathKind          CommandLineOptionPathKind
	IsFilePath        bool
	IsTSConfigOnly    bool
	IsCommandLineOnly bool

	// used in output
	Description              *diagnostics.Message
	DefaultValueDescription  any
	ShowInSimplifiedHelpView bool

	// used in output in serializing and generate tsconfig
	Category *diagnostics.Message

	// What kind of extra validation `validateJsonOptionValue` should do
	extraValidation extraValidation

	// checks that option with number type has value >= minValue
	minValue int

	// used for CommandLineOptionTypeList
	listPreserveFalsyValues bool
	// used for compilerOptionsDeclaration
	ElementOptions CommandLineOptionNameMap
}

type extraValidation string

const extraValidationLocale extraValidation = "locale"

func (o *CommandLineOption) DeprecatedKeys() *collections.Set[string] {
	if o.Kind != CommandLineOptionTypeEnum {
		return nil
	}
	return commandLineOptionDeprecated[o.Name]
}

func (o *CommandLineOption) EnumMap() *collections.OrderedMap[string, any] {
	if o.Kind != CommandLineOptionTypeEnum {
		return nil
	}
	return commandLineOptionEnumMap[o.Name]
}

func (o *CommandLineOption) Elements() *CommandLineOption {
	if o.Kind != CommandLineOptionTypeList && o.Kind != CommandLineOptionTypeListOrElement {
		return nil
	}
	return commandLineOptionElements[o.Name]
}

func (o *CommandLineOption) DisallowNullOrUndefined() bool {
	return o.Name == "extends"
}

// todo: revisit to see if this can be improved
type CompilerOptionsValue any
