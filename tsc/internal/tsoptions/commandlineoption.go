package tsoptions

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
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
	Name, shortName string
	Kind            CommandLineOptionKind

	// used in parsing
	isFilePath        bool
	isTSConfigOnly    bool
	IsCommandLineOnly bool

	// used in output
	description              *diagnostics.Message
	defaultValueDescription  any
	showInSimplifiedHelpView bool

	// used in output in serializing and generate tsconfig
	category *diagnostics.Message

	// defined once
	extraValidation func(value CompilerOptionsValue) (d *diagnostics.Message, args []string)

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
	ElementOptions map[string]*CommandLineOption
}

func (o *CommandLineOption) DeprecatedKeys() *core.Set[string] {
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

// CommandLineOption.Elements()
var commandLineOptionElements = map[string]*CommandLineOption{
	"lib": {
		Name:                    "lib",
		Kind:                    CommandLineOptionTypeEnum, // libMap,
		defaultValueDescription: core.TSUnknown,
	},
	"rootDirs": {
		Name:       "rootDirs",
		Kind:       CommandLineOptionTypeString,
		isFilePath: true,
	},
	"typeRoots": {
		Name:       "typeRoots",
		Kind:       CommandLineOptionTypeString,
		isFilePath: true,
	},
	"types": {
		Name: "types",
		Kind: CommandLineOptionTypeString,
	},
	"moduleSuffixes": {
		Name: "suffix",
		Kind: CommandLineOptionTypeString,
	},
	"customConditions": {
		Name: "condition",
		Kind: CommandLineOptionTypeString,
	},
	"plugins": {
		Name: "plugin",
		Kind: CommandLineOptionTypeObject,
	},
	// For tsconfig root options
	"references": {
		Name: "references",
		Kind: CommandLineOptionTypeObject,
	},
	"files": {
		Name: "files",
		Kind: CommandLineOptionTypeString,
	},
	"include": {
		Name: "include",
		Kind: CommandLineOptionTypeString,
	},
	"exclude": {
		Name: "exclude",
		Kind: CommandLineOptionTypeString,
	},
	"extends": {
		Name: "extends",
		Kind: CommandLineOptionTypeString,
	},
}

// CommandLineOption.EnumMap()
var commandLineOptionEnumMap = map[string]*collections.OrderedMap[string, any]{
	"lib":              libMap,
	"moduleResolution": moduleResolutionOptionMap,
	"module":           moduleOptionMap,
	"target":           targetOptionMap,
	"moduleDetection":  moduleDetectionOptionMap,
	"jsx":              jsxOptionMap,
	"newLine":          newLineOptionMap,
}

// CommandLineOption.DeprecatedKeys()
var commandLineOptionDeprecated = map[string]*core.Set[string]{
	"moduleResolution": core.NewSetFromItems[string]("node"),
	"target":           core.NewSetFromItems[string]("es3"),
}

// todo: revisit to see if this can be improved
type CompilerOptionsValue any
