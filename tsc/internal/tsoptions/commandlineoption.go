package tsoptions

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
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

type CommandLineOption struct {
	Name, ShortName string
	Kind            CommandLineOptionKind

	// used in parsing
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

	// true or undefined
	// used for configDirTemplateSubstitutionOptions
	allowConfigDirTemplateSubstitution bool

	// used for filter in compilerrunner
	AffectsDeclarationPath     bool
	AffectsProgramStructure    bool
	AffectsSemanticDiagnostics bool
	AffectsBuildInfo           bool
	AffectsBindDiagnostics     bool
	AffectsSourceFile          bool
	AffectsModuleResolution    bool
	AffectsEmit                bool

	allowJsFlag bool
	strictFlag  bool

	// used in transpileoptions worker
	// todo: revisit to see if this can be reduced to boolean
	transpileOptionValue core.Tristate

	// used for CommandLineOptionTypeList
	listPreserveFalsyValues bool
	// used for compilerOptionsDeclaration
	ElementOptions CommandLineOptionNameMap
}

type extraValidation string

const (
	extraValidationNone   extraValidation = ""
	extraValidationSpec   extraValidation = "spec"
	extraValidationLocale extraValidation = "locale"
)

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
