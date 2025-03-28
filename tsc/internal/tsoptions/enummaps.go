package tsoptions

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var libMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	// JavaScript only
	{Key: "es5", Value: "lib.es5.d.ts"},
	{Key: "es6", Value: "lib.es2015.d.ts"},
	{Key: "es2015", Value: "lib.es2015.d.ts"},
	{Key: "es7", Value: "lib.es2016.d.ts"},
	{Key: "es2016", Value: "lib.es2016.d.ts"},
	{Key: "es2017", Value: "lib.es2017.d.ts"},
	{Key: "es2018", Value: "lib.es2018.d.ts"},
	{Key: "es2019", Value: "lib.es2019.d.ts"},
	{Key: "es2020", Value: "lib.es2020.d.ts"},
	{Key: "es2021", Value: "lib.es2021.d.ts"},
	{Key: "es2022", Value: "lib.es2022.d.ts"},
	{Key: "es2023", Value: "lib.es2023.d.ts"},
	{Key: "es2024", Value: "lib.es2024.d.ts"},
	{Key: "esnext", Value: "lib.esnext.d.ts"},
	// Host only
	{Key: "dom", Value: "lib.dom.d.ts"},
	{Key: "dom.iterable", Value: "lib.dom.iterable.d.ts"},
	{Key: "dom.asynciterable", Value: "lib.dom.asynciterable.d.ts"},
	{Key: "webworker", Value: "lib.webworker.d.ts"},
	{Key: "webworker.importscripts", Value: "lib.webworker.importscripts.d.ts"},
	{Key: "webworker.iterable", Value: "lib.webworker.iterable.d.ts"},
	{Key: "webworker.asynciterable", Value: "lib.webworker.asynciterable.d.ts"},
	{Key: "scripthost", Value: "lib.scripthost.d.ts"},
	// ES2015 Or ESNext By-feature options
	{Key: "es2015.core", Value: "lib.es2015.core.d.ts"},
	{Key: "es2015.collection", Value: "lib.es2015.collection.d.ts"},
	{Key: "es2015.generator", Value: "lib.es2015.generator.d.ts"},
	{Key: "es2015.iterable", Value: "lib.es2015.iterable.d.ts"},
	{Key: "es2015.promise", Value: "lib.es2015.promise.d.ts"},
	{Key: "es2015.proxy", Value: "lib.es2015.proxy.d.ts"},
	{Key: "es2015.reflect", Value: "lib.es2015.reflect.d.ts"},
	{Key: "es2015.symbol", Value: "lib.es2015.symbol.d.ts"},
	{Key: "es2015.symbol.wellknown", Value: "lib.es2015.symbol.wellknown.d.ts"},
	{Key: "es2016.array.include", Value: "lib.es2016.array.include.d.ts"},
	{Key: "es2016.intl", Value: "lib.es2016.intl.d.ts"},
	{Key: "es2017.arraybuffer", Value: "lib.es2017.arraybuffer.d.ts"},
	{Key: "es2017.date", Value: "lib.es2017.date.d.ts"},
	{Key: "es2017.object", Value: "lib.es2017.object.d.ts"},
	{Key: "es2017.sharedmemory", Value: "lib.es2017.sharedmemory.d.ts"},
	{Key: "es2017.string", Value: "lib.es2017.string.d.ts"},
	{Key: "es2017.intl", Value: "lib.es2017.intl.d.ts"},
	{Key: "es2017.typedarrays", Value: "lib.es2017.typedarrays.d.ts"},
	{Key: "es2018.asyncgenerator", Value: "lib.es2018.asyncgenerator.d.ts"},
	{Key: "es2018.asynciterable", Value: "lib.es2018.asynciterable.d.ts"},
	{Key: "es2018.intl", Value: "lib.es2018.intl.d.ts"},
	{Key: "es2018.promise", Value: "lib.es2018.promise.d.ts"},
	{Key: "es2018.regexp", Value: "lib.es2018.regexp.d.ts"},
	{Key: "es2019.array", Value: "lib.es2019.array.d.ts"},
	{Key: "es2019.object", Value: "lib.es2019.object.d.ts"},
	{Key: "es2019.string", Value: "lib.es2019.string.d.ts"},
	{Key: "es2019.symbol", Value: "lib.es2019.symbol.d.ts"},
	{Key: "es2019.intl", Value: "lib.es2019.intl.d.ts"},
	{Key: "es2020.bigint", Value: "lib.es2020.bigint.d.ts"},
	{Key: "es2020.date", Value: "lib.es2020.date.d.ts"},
	{Key: "es2020.promise", Value: "lib.es2020.promise.d.ts"},
	{Key: "es2020.sharedmemory", Value: "lib.es2020.sharedmemory.d.ts"},
	{Key: "es2020.string", Value: "lib.es2020.string.d.ts"},
	{Key: "es2020.symbol.wellknown", Value: "lib.es2020.symbol.wellknown.d.ts"},
	{Key: "es2020.intl", Value: "lib.es2020.intl.d.ts"},
	{Key: "es2020.number", Value: "lib.es2020.number.d.ts"},
	{Key: "es2021.promise", Value: "lib.es2021.promise.d.ts"},
	{Key: "es2021.string", Value: "lib.es2021.string.d.ts"},
	{Key: "es2021.weakref", Value: "lib.es2021.weakref.d.ts"},
	{Key: "es2021.intl", Value: "lib.es2021.intl.d.ts"},
	{Key: "es2022.array", Value: "lib.es2022.array.d.ts"},
	{Key: "es2022.error", Value: "lib.es2022.error.d.ts"},
	{Key: "es2022.intl", Value: "lib.es2022.intl.d.ts"},
	{Key: "es2022.object", Value: "lib.es2022.object.d.ts"},
	{Key: "es2022.string", Value: "lib.es2022.string.d.ts"},
	{Key: "es2022.regexp", Value: "lib.es2022.regexp.d.ts"},
	{Key: "es2023.array", Value: "lib.es2023.array.d.ts"},
	{Key: "es2023.collection", Value: "lib.es2023.collection.d.ts"},
	{Key: "es2023.intl", Value: "lib.es2023.intl.d.ts"},
	{Key: "es2024.arraybuffer", Value: "lib.es2024.arraybuffer.d.ts"},
	{Key: "es2024.collection", Value: "lib.es2024.collection.d.ts"},
	{Key: "es2024.object", Value: "lib.es2024.object.d.ts"},
	{Key: "es2024.promise", Value: "lib.es2024.promise.d.ts"},
	{Key: "es2024.regexp", Value: "lib.es2024.regexp.d.ts"},
	{Key: "es2024.sharedmemory", Value: "lib.es2024.sharedmemory.d.ts"},
	{Key: "es2024.string", Value: "lib.es2024.string.d.ts"},
	{Key: "esnext.array", Value: "lib.es2023.array.d.ts"},
	{Key: "esnext.collection", Value: "lib.esnext.collection.d.ts"},
	{Key: "esnext.symbol", Value: "lib.es2019.symbol.d.ts"},
	{Key: "esnext.asynciterable", Value: "lib.es2018.asynciterable.d.ts"},
	{Key: "esnext.intl", Value: "lib.esnext.intl.d.ts"},
	{Key: "esnext.disposable", Value: "lib.esnext.disposable.d.ts"},
	{Key: "esnext.bigint", Value: "lib.es2020.bigint.d.ts"},
	{Key: "esnext.string", Value: "lib.es2022.string.d.ts"},
	{Key: "esnext.promise", Value: "lib.es2024.promise.d.ts"},
	{Key: "esnext.weakref", Value: "lib.es2021.weakref.d.ts"},
	{Key: "esnext.decorators", Value: "lib.esnext.decorators.d.ts"},
	{Key: "esnext.object", Value: "lib.es2024.object.d.ts"},
	{Key: "esnext.array", Value: "lib.esnext.array.d.ts"},
	{Key: "esnext.regexp", Value: "lib.es2024.regexp.d.ts"},
	{Key: "esnext.string", Value: "lib.es2024.string.d.ts"},
	{Key: "esnext.iterator", Value: "lib.esnext.iterator.d.ts"},
	{Key: "decorators", Value: "lib.decorators.d.ts"},
	{Key: "decorators.legacy", Value: "lib.decorators.legacy.d.ts"},
})

var (
	Libs        = slices.Collect(libMap.Keys())
	LibFilesSet = core.NewSetFromItems(core.Map(slices.Collect(libMap.Values()), func(s any) string { return s.(string) })...)
)

func GetLibFileName(libName string) (string, bool) {
	// checks if the libName is a valid lib name or file name and converts the lib name to the filename if needed
	libName = tspath.ToFileNameLowerCase(libName)
	if LibFilesSet.Has(libName) {
		return libName, true
	}
	lib, ok := libMap.Get(libName)
	if !ok {
		return "", false
	}
	return lib.(string), true
}

var moduleResolutionOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "node16", Value: core.ModuleResolutionKindNode16},
	{Key: "nodenext", Value: core.ModuleResolutionKindNodeNext},
	{Key: "bundler", Value: core.ModuleResolutionKindBundler},
	{Key: "node", Value: core.ModuleResolutionKindBundler},    // TODO: remove when node is fully deprecated -- this is helpful for testing porting
	{Key: "classic", Value: core.ModuleResolutionKindBundler}, // TODO: remove when fully deprecated
	{Key: "node10", Value: core.ModuleResolutionKindBundler},  // TODO: remove when fully deprecated
})

var targetOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "es3", Value: core.ScriptTargetES3},
	{Key: "es5", Value: core.ScriptTargetES5},
	{Key: "es6", Value: core.ScriptTargetES2015},
	{Key: "es2015", Value: core.ScriptTargetES2015},
	{Key: "es2016", Value: core.ScriptTargetES2016},
	{Key: "es2017", Value: core.ScriptTargetES2017},
	{Key: "es2018", Value: core.ScriptTargetES2018},
	{Key: "es2019", Value: core.ScriptTargetES2019},
	{Key: "es2020", Value: core.ScriptTargetES2020},
	{Key: "es2021", Value: core.ScriptTargetES2021},
	{Key: "es2022", Value: core.ScriptTargetES2022},
	{Key: "es2023", Value: core.ScriptTargetES2023},
	{Key: "es2024", Value: core.ScriptTargetES2024},
	{Key: "esnext", Value: core.ScriptTargetESNext},
})

var moduleOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "none", Value: core.ModuleKindNone},
	{Key: "commonjs", Value: core.ModuleKindCommonJS},
	{Key: "amd", Value: core.ModuleKindAMD},
	{Key: "system", Value: core.ModuleKindSystem},
	{Key: "umd", Value: core.ModuleKindUMD},
	{Key: "es6", Value: core.ModuleKindES2015},
	{Key: "es2015", Value: core.ModuleKindES2015},
	{Key: "es2020", Value: core.ModuleKindES2020},
	{Key: "es2022", Value: core.ModuleKindES2022},
	{Key: "esnext", Value: core.ModuleKindESNext},
	{Key: "node16", Value: core.ModuleKindNode16},
	{Key: "nodenext", Value: core.ModuleKindNodeNext},
	{Key: "preserve", Value: core.ModuleKindPreserve},
})

var moduleDetectionOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "auto", Value: core.ModuleDetectionKindAuto},
	{Key: "legacy", Value: core.ModuleDetectionKindLegacy},
	{Key: "force", Value: core.ModuleDetectionKindForce},
})

var jsxOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "preserve", Value: core.JsxEmitPreserve},
	{Key: "react-native", Value: core.JsxEmitReactNative},
	{Key: "react", Value: core.JsxEmitReact},
	{Key: "react-jsx", Value: core.JsxEmitReactJSX},
	{Key: "react-jsxdev", Value: core.JsxEmitReactJSXDev},
})

var newLineOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "crlf", Value: core.NewLineKindCRLF},
	{Key: "lf", Value: core.NewLineKindLF},
})

var targetToLibMap = map[core.ScriptTarget]string{
	core.ScriptTargetESNext: "lib.esnext.full.d.ts",
	core.ScriptTargetES2024: "lib.es2024.full.d.ts",
	core.ScriptTargetES2023: "lib.es2023.full.d.ts",
	core.ScriptTargetES2022: "lib.es2022.full.d.ts",
	core.ScriptTargetES2021: "lib.es2021.full.d.ts",
	core.ScriptTargetES2020: "lib.es2020.full.d.ts",
	core.ScriptTargetES2019: "lib.es2019.full.d.ts",
	core.ScriptTargetES2018: "lib.es2018.full.d.ts",
	core.ScriptTargetES2017: "lib.es2017.full.d.ts",
	core.ScriptTargetES2016: "lib.es2016.full.d.ts",
	core.ScriptTargetES2015: "lib.es6.d.ts", // We don't use lib.es2015.full.d.ts due to breaking change.
}

func GetDefaultLibFileName(options *core.CompilerOptions) string {
	name, ok := targetToLibMap[options.GetEmitScriptTarget()]
	if !ok {
		return "lib.d.ts"
	}
	return name
}

var watchFileEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "fixedpollinginterval", Value: core.WatchFileKindFixedPollingInterval},
	{Key: "prioritypollinginterval", Value: core.WatchFileKindPriorityPollingInterval},
	{Key: "dynamicprioritypolling", Value: core.WatchFileKindDynamicPriorityPolling},
	{Key: "fixedchunksizepolling", Value: core.WatchFileKindFixedChunkSizePolling},
	{Key: "usefsevents", Value: core.WatchFileKindUseFsEvents},
	{Key: "usefseventsonparentdirectory", Value: core.WatchFileKindUseFsEventsOnParentDirectory},
})

var watchDirectoryEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "usefsevents", Value: core.WatchDirectoryKindUseFsEvents},
	{Key: "fixedpollinginterval", Value: core.WatchDirectoryKindFixedPollingInterval},
	{Key: "dynamicprioritypolling", Value: core.WatchDirectoryKindDynamicPriorityPolling},
	{Key: "fixedchunksizepolling", Value: core.WatchDirectoryKindFixedChunkSizePolling},
})

var fallbackEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
	{Key: "fixedinterval", Value: core.PollingKindFixedInterval},
	{Key: "priorityinterval", Value: core.PollingKindPriorityInterval},
	{Key: "dynamicpriority", Value: core.PollingKindDynamicPriority},
	{Key: "fixedchunksize", Value: core.PollingKindFixedChunkSize},
})
