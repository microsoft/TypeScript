package tsoptions

import (
	"errors"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// RawCompilerOptions is the JSON/API representation of compiler options.
// Filesystem paths remain strings until Finalize resolves them against a base
// directory and constructs a CompilerOptions with typed path guarantees.
type RawCompilerOptions struct {
	values *collections.OrderedMap[string, any]
}

var (
	_ json.MarshalerTo     = (*RawCompilerOptions)(nil)
	_ json.UnmarshalerFrom = (*RawCompilerOptions)(nil)
)

func (o *RawCompilerOptions) MarshalJSONTo(enc *json.Encoder) error {
	if o == nil || o.values == nil {
		return collections.NewOrderedMapWithSizeHint[string, any](0).MarshalJSONTo(enc)
	}
	return o.values.MarshalJSONTo(enc)
}

func (o *RawCompilerOptions) UnmarshalJSONFrom(dec *json.Decoder) error {
	if o.values == nil {
		o.values = collections.NewOrderedMapWithSizeHint[string, any](0)
	}
	token, err := dec.ReadToken()
	if err != nil {
		return err
	}
	if token.Kind() == 'n' {
		return nil
	}
	if token.Kind() != '{' {
		return errors.New("cannot unmarshal non-object JSON value into RawCompilerOptions")
	}
	for dec.PeekKind() != '}' {
		var key string
		if decodeErr := json.UnmarshalDecode(dec, &key); decodeErr != nil {
			return decodeErr
		}
		var value any
		if key == "paths" && dec.PeekKind() == '{' {
			paths := collections.NewOrderedMapWithSizeHint[string, any](0)
			if decodeErr := json.UnmarshalDecode(dec, paths); decodeErr != nil {
				return decodeErr
			}
			value = paths
		} else if decodeErr := json.UnmarshalDecode(dec, &value); decodeErr != nil {
			return decodeErr
		}
		o.values.Set(key, value)
	}
	_, err = dec.ReadToken()
	return err
}

func (o *RawCompilerOptions) Finalize(basePath tspath.RootedDirectoryPath) (*core.CompilerOptions, []*ast.Diagnostic) {
	options := &core.CompilerOptions{}
	if o == nil || o.values == nil {
		return options, nil
	}
	var diagnostics []*ast.Diagnostic
	for key, value := range o.values.Entries() {
		option := CommandLineCompilerOptionsMap.Get(key)
		if option != nil && key != option.Name {
			continue
		}
		pathKind := CommandLineOptionPathKindNone
		if option != nil {
			pathKind = option.PathKind
			if option.Kind == CommandLineOptionTypeList {
				if element := option.Elements(); element != nil {
					pathKind = element.PathKind
				}
			}
		} else if key == "configFilePath" {
			pathKind = CommandLineOptionPathKindFile
		} else if key != "allowNonTsExtensions" && key != "suppressOutputPathCheck" {
			continue
		}
		if pathKind.IsRooted() {
			if option != nil && option.Kind == CommandLineOptionTypeList {
				value = core.Map(ParseStringArray(value), func(path string) any {
					if startsWithConfigDirTemplate(path) {
						return getSubstitutedPathWithConfigDirTemplate(path, basePath)
					}
					return tspath.GetNormalizedAbsolutePath(path, basePath)
				})
			} else if path, ok := value.(string); ok && path != "" {
				if startsWithConfigDirTemplate(path) {
					value = getSubstitutedPathWithConfigDirTemplate(path, basePath)
				} else {
					value = tspath.GetNormalizedAbsolutePath(path, basePath)
				}
			}
		}
		diagnostics = append(diagnostics, ParseCompilerOptions(key, value, options)...)
	}
	return options, diagnostics
}
