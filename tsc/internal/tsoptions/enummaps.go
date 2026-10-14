package tsoptions

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

var (
	Libs        = slices.Collect(LibMap.Keys())
	LibFilesSet = collections.NewSetFromItems(core.Map(slices.Collect(LibMap.Values()), func(s any) string { return s.(string) })...)
)

func GetLibFileName(libName string) (string, bool) {
	// checks if the libName is a valid lib name or file name and converts the lib name to the filename if needed
	libName = tspath.ToFileNameLowerCase(libName)
	if LibFilesSet.Has(libName) {
		return libName, true
	}
	lib, ok := LibMap.Get(libName)
	if !ok {
		return "", false
	}
	return lib.(string), true
}

func TargetToLibMap() map[core.ScriptTarget]string {
	return targetToLibMap
}

func GetDefaultLibFileName(options *core.CompilerOptions) string {
	name, ok := targetToLibMap[options.GetEmitScriptTarget()]
	if !ok {
		return "lib.d.ts"
	}
	return name
}
