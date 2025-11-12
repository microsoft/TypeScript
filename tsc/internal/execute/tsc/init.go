package tsc

import (
	"fmt"
	"reflect"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/jsonutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func WriteConfigFile(sys System, reportDiagnostic DiagnosticReporter, options *collections.OrderedMap[string, any]) {
	getCurrentDirectory := sys.GetCurrentDirectory()
	file := tspath.NormalizePath(tspath.CombinePaths(getCurrentDirectory, "tsconfig.json"))
	if sys.FS().FileExists(file) {
		reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file))
	} else {
		_ = sys.FS().WriteFile(file, generateTSConfig(options), false)
		output := []string{"\n"}
		output = append(output, getHeader(sys, "Created a new tsconfig.json")...)
		output = append(output, "You can learn more at https://aka.ms/tsconfig", "\n")
		fmt.Fprint(sys.Writer(), strings.Join(output, ""))
	}
}

func generateTSConfig(options *collections.OrderedMap[string, any]) string {
	const tab = "  "
	var result []string

	allSetOptions := make([]string, 0, options.Size())
	for k := range options.Keys() {
		if k != "init" && k != "help" && k != "watch" {
			allSetOptions = append(allSetOptions, k)
		}
	}

	// !!! locale getLocaleSpecificMessage
	emitHeader := func(header *diagnostics.Message) {
		result = append(result, tab+tab+"// "+header.Format())
	}
	newline := func() {
		result = append(result, "")
	}
	push := func(args ...string) {
		result = append(result, args...)
	}

	formatSingleValue := func(value any, enumMap *collections.OrderedMap[string, any]) string {
		if enumMap != nil {
			var found bool
			for k, v := range enumMap.Entries() {
				if value == v {
					value = k
					found = true
					break
				}
			}
			if !found {
				panic(fmt.Sprintf("No matching value of %v", value))
			}
		}

		b, err := jsonutil.MarshalIndent(value, "", "")
		if err != nil {
			panic(fmt.Sprintf("should not happen: %v", err))
		}
		return string(b)
	}

	formatValueOrArray := func(settingName string, value any) string {
		var option *tsoptions.CommandLineOption
		for _, decl := range tsoptions.OptionsDeclarations {
			if decl.Name == settingName {
				option = decl
			}
		}
		if option == nil {
			panic(`No option named ` + settingName)
		}

		rval := reflect.ValueOf(value)
		if rval.Kind() == reflect.Slice {
			var enumMap *collections.OrderedMap[string, any]
			if elemOption := option.Elements(); elemOption != nil {
				enumMap = elemOption.EnumMap()
			}

			var elems []string
			for i := range rval.Len() {
				elems = append(elems, formatSingleValue(rval.Index(i).Interface(), enumMap))
			}
			return `[` + strings.Join(elems, ", ") + `]`
		} else {
			return formatSingleValue(value, option.EnumMap())
		}
	}

	// commentedNever': Never comment this out
	// commentedAlways': Always comment this out, even if it's on commandline
	// commentedOptional': Comment out unless it's on commandline
	type commented int
	const (
		commentedNever commented = iota
		commentedAlways
		commentedOptional
	)
	emitOption := func(setting string, defaultValue any, commented commented) {
		if commented > 2 {
			panic("should not happen: invalid `commented`, must be a bug.")
		}

		existingOptionIndex := slices.Index(allSetOptions, setting)
		if existingOptionIndex >= 0 {
			allSetOptions = slices.Delete(allSetOptions, existingOptionIndex, existingOptionIndex+1)
		}

		var comment bool
		switch commented {
		case commentedAlways:
			comment = true
		case commentedNever:
			comment = false
		default:
			comment = !options.Has(setting)
		}

		value, ok := options.Get(setting)
		if !ok {
			value = defaultValue
		}

		if comment {
			push(tab + tab + `// "` + setting + `": ` + formatValueOrArray(setting, value) + `,`)
		} else {
			push(tab + tab + `"` + setting + `": ` + formatValueOrArray(setting, value) + `,`)
		}
	}

	push("{")
	// !!! locale getLocaleSpecificMessage
	push(tab + `// ` + diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file.Format())
	push(tab + `"compilerOptions": {`)

	emitHeader(diagnostics.File_Layout)
	emitOption("rootDir", "./src", commentedOptional)
	emitOption("outDir", "./dist", commentedOptional)

	newline()

	emitHeader(diagnostics.Environment_Settings)
	emitHeader(diagnostics.See_also_https_Colon_Slash_Slashaka_ms_Slashtsconfig_Slashmodule)
	emitOption("module", core.ModuleKindNodeNext, commentedNever)
	emitOption("target", core.ScriptTargetESNext, commentedNever)
	emitOption("types", []any{}, commentedNever)
	if lib, ok := options.Get("lib"); ok {
		emitOption("lib", lib, commentedNever)
	}
	emitHeader(diagnostics.For_nodejs_Colon)
	push(tab + tab + `// "lib": ["esnext"],`)
	push(tab + tab + `// "types": ["node"],`)
	emitHeader(diagnostics.X_and_npm_install_D_types_Slashnode)

	newline()

	emitHeader(diagnostics.Other_Outputs)
	emitOption("sourceMap" /*defaultValue*/, true, commentedNever)
	emitOption("declaration" /*defaultValue*/, true, commentedNever)
	emitOption("declarationMap" /*defaultValue*/, true, commentedNever)

	newline()

	emitHeader(diagnostics.Stricter_Typechecking_Options)
	emitOption("noUncheckedIndexedAccess" /*defaultValue*/, true, commentedNever)
	emitOption("exactOptionalPropertyTypes" /*defaultValue*/, true, commentedNever)

	newline()

	emitHeader(diagnostics.Style_Options)
	emitOption("noImplicitReturns" /*defaultValue*/, true, commentedOptional)
	emitOption("noImplicitOverride" /*defaultValue*/, true, commentedOptional)
	emitOption("noUnusedLocals" /*defaultValue*/, true, commentedOptional)
	emitOption("noUnusedParameters" /*defaultValue*/, true, commentedOptional)
	emitOption("noFallthroughCasesInSwitch" /*defaultValue*/, true, commentedOptional)
	emitOption("noPropertyAccessFromIndexSignature" /*defaultValue*/, true, commentedOptional)

	newline()

	emitHeader(diagnostics.Recommended_Options)
	emitOption("strict" /*defaultValue*/, true, commentedNever)
	emitOption("jsx", core.JsxEmitReactJSX, commentedNever)
	emitOption("verbatimModuleSyntax" /*defaultValue*/, true, commentedNever)
	emitOption("isolatedModules" /*defaultValue*/, true, commentedNever)
	emitOption("noUncheckedSideEffectImports" /*defaultValue*/, true, commentedNever)
	emitOption("moduleDetection", core.ModuleDetectionKindForce, commentedNever)
	emitOption("skipLibCheck" /*defaultValue*/, true, commentedNever)

	// Write any user-provided options we haven't already
	if len(allSetOptions) > 0 {
		newline()
		for len(allSetOptions) > 0 {
			emitOption(allSetOptions[0], options.GetOrZero(allSetOptions[0]), commentedNever)
		}
	}

	push(tab + "}")
	push(`}`)
	push(``)

	return strings.Join(result, "\n")
}
