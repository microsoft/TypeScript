package tsoptions

import (
	"reflect"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

var OptionsDeclarations = slices.Concat(commonOptionsWithBuild, optionsForCompiler)

var BuildOpts = slices.Concat(commonOptionsWithBuild, OptionsForBuild)

var optionsType = reflect.TypeFor[core.CompilerOptions]()

func optionsHaveChanges(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions, declFilter func(*CommandLineOption) bool) bool {
	if oldOptions == newOptions {
		return false
	}
	if oldOptions == nil || newOptions == nil {
		return true
	}
	oldOptionsValue := reflect.ValueOf(oldOptions).Elem()
	return ForEachCompilerOptionValue(newOptions, declFilter, func(option *CommandLineOption, value reflect.Value, i int) bool {
		newValue := value.Interface()
		oldValue := oldOptionsValue.Field(i).Interface()
		if option.strictFlag {
			return oldOptions.GetStrictOptionValue(oldValue.(core.Tristate)) != newOptions.GetStrictOptionValue(newValue.(core.Tristate))
		}
		if option.allowJsFlag {
			return oldOptions.GetAllowJS() != newOptions.GetAllowJS()
		}
		return !reflect.DeepEqual(newValue, oldValue)
	})
}

func ForEachCompilerOptionValue(options *core.CompilerOptions, declFilter func(*CommandLineOption) bool, fn func(option *CommandLineOption, value reflect.Value, i int) bool) bool {
	optionsValue := reflect.ValueOf(options).Elem()
	for i := range optionsValue.NumField() {
		field := optionsType.Field(i)
		if !field.IsExported() {
			continue
		}
		if optionDeclaration := CommandLineCompilerOptionsMap.Get(field.Name); optionDeclaration != nil && declFilter(optionDeclaration) {
			if fn(optionDeclaration, optionsValue.Field(i), i) {
				return true
			}
		}
	}
	return false
}

func CompilerOptionsAffectSemanticDiagnostics(
	oldOptions *core.CompilerOptions,
	newOptions *core.CompilerOptions,
) bool {
	return optionsHaveChanges(oldOptions, newOptions, func(option *CommandLineOption) bool {
		return option.AffectsSemanticDiagnostics
	})
}

func CompilerOptionsAffectDeclarationPath(
	oldOptions *core.CompilerOptions,
	newOptions *core.CompilerOptions,
) bool {
	return optionsHaveChanges(oldOptions, newOptions, func(option *CommandLineOption) bool {
		return option.AffectsDeclarationPath
	})
}

func CompilerOptionsAffectEmit(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) bool {
	return optionsHaveChanges(oldOptions, newOptions, func(option *CommandLineOption) bool {
		return option.AffectsEmit
	})
}
