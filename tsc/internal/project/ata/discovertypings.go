package ata

import (
	"fmt"
	"maps"
	"slices"
	"unicode/utf8"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func isTypingUpToDate(cachedTyping *CachedTyping, availableTypingVersions map[string]string) bool {
	useVersion, ok := availableTypingVersions["ts"+core.VersionMajorMinor()]
	if !ok {
		useVersion = availableTypingVersions["latest"]
	}
	availableVersion := semver.MustParse(useVersion)
	return availableVersion.Compare(cachedTyping.Version) <= 0
}

func DiscoverTypings(
	fs vfs.FS,
	logger logging.Logger,
	typingsInfo *TypingsInfo,
	fileNames []string,
	projectRootPath string,
	packageNameToTypingLocation *collections.SyncMap[string, *CachedTyping],
	typesRegistry map[string]map[string]string,
) (cachedTypingPaths []string, newTypingNames []string, filesToWatch []string) {
	// A typing name to typing file path mapping
	inferredTypings := map[string]string{}

	// Only infer typings for .js and .jsx files
	fileNames = core.Filter(fileNames, func(fileName string) bool {
		return tspath.HasJSFileExtension(fileName)
	})

	if typingsInfo.TypeAcquisition.Include != nil {
		addInferredTypings(fs, logger, inferredTypings, typingsInfo.TypeAcquisition.Include, "Explicitly included types")
	}
	exclude := typingsInfo.TypeAcquisition.Exclude

	// Directories to search for package.json, bower.json and other typing information
	if typingsInfo.CompilerOptions.Types == nil {
		possibleSearchDirs := map[string]bool{}
		for _, fileName := range fileNames {
			possibleSearchDirs[tspath.GetDirectoryPath(fileName)] = true
		}
		possibleSearchDirs[projectRootPath] = true
		for searchDir := range possibleSearchDirs {
			filesToWatch = addTypingNamesAndGetFilesToWatch(fs, logger, inferredTypings, filesToWatch, searchDir, "bower.json", "bower_components")
			filesToWatch = addTypingNamesAndGetFilesToWatch(fs, logger, inferredTypings, filesToWatch, searchDir, "package.json", "node_modules")
		}
	}

	if !typingsInfo.TypeAcquisition.DisableFilenameBasedTypeAcquisition.IsTrue() {
		getTypingNamesFromSourceFileNames(fs, logger, inferredTypings, fileNames)
	}

	// add typings for unresolved imports
	var modules []string
	if typingsInfo.UnresolvedImports != nil {
		modules = make([]string, 0, typingsInfo.UnresolvedImports.Len())
		for module := range typingsInfo.UnresolvedImports.Keys() {
			modules = append(modules, core.NonRelativeModuleNameForTypingCache(module))
		}
		slices.Sort(modules)
		modules = slices.Compact(modules)
	}
	addInferredTypings(fs, logger, inferredTypings, modules, "Inferred typings from unresolved imports")

	// Remove typings that the user has added to the exclude list
	for _, excludeTypingName := range exclude {
		delete(inferredTypings, excludeTypingName)
		logger.Log(fmt.Sprintf("ATA:: Typing for %s is in exclude list, will be ignored.", excludeTypingName))
	}

	// Add the cached typing locations for inferred typings that are already installed
	packageNameToTypingLocation.Range(func(name string, typing *CachedTyping) bool {
		registryEntry := typesRegistry[name]
		if inferredTypings[name] == "" && registryEntry != nil && isTypingUpToDate(typing, registryEntry) {
			inferredTypings[name] = typing.TypingsLocation
		}
		return true
	})

	for typing, inferred := range inferredTypings {
		if inferred != "" {
			cachedTypingPaths = append(cachedTypingPaths, inferred)
		} else {
			newTypingNames = append(newTypingNames, typing)
		}
	}
	logger.Log(fmt.Sprintf("ATA:: Finished typings discovery: cachedTypingsPaths: %v newTypingNames: %v, filesToWatch %v", cachedTypingPaths, newTypingNames, filesToWatch))
	return cachedTypingPaths, newTypingNames, filesToWatch
}

func addInferredTyping(inferredTypings map[string]string, typingName string) {
	if _, ok := inferredTypings[typingName]; !ok {
		inferredTypings[typingName] = ""
	}
}

func addInferredTypings(
	fs vfs.FS,
	logger logging.Logger,
	inferredTypings map[string]string,
	typingNames []string, message string,
) {
	logger.Log(fmt.Sprintf("ATA:: %s: %v", message, typingNames))
	for _, typingName := range typingNames {
		addInferredTyping(inferredTypings, typingName)
	}
}

/**
 * Infer typing names from given file names. For example, the file name "jquery-min.2.3.4.js"
 * should be inferred to the 'jquery' typing name; and "angular-route.1.2.3.js" should be inferred
 * to the 'angular-route' typing name.
 * @param fileNames are the names for source files in the project
 */
func getTypingNamesFromSourceFileNames(
	fs vfs.FS,
	logger logging.Logger,
	inferredTypings map[string]string,
	fileNames []string,
) {
	hasJsxFile := false
	var fromFileNames []string
	for _, fileName := range fileNames {
		hasJsxFile = hasJsxFile || tspath.FileExtensionIs(fileName, tspath.ExtensionJsx)
		inferredTypingName := tspath.RemoveFileExtension(tspath.ToFileNameLowerCase(tspath.GetBaseFileName(fileName)))
		cleanedTypingName := removeMinAndVersionNumbers(inferredTypingName)
		if typeName, ok := safeFileNameToTypeName[cleanedTypingName]; ok {
			fromFileNames = append(fromFileNames, typeName)
		}
	}
	if len(fromFileNames) > 0 {
		addInferredTypings(fs, logger, inferredTypings, fromFileNames, "Inferred typings from file names")
	}
	if hasJsxFile {
		logger.Log("ATA:: Inferred 'react' typings due to presence of '.jsx' extension")
		addInferredTyping(inferredTypings, "react")
	}
}

/**
 * Adds inferred typings from manifest/module pairs (think package.json + node_modules)
 *
 * @param projectRootPath is the path to the directory where to look for package.json, bower.json and other typing information
 * @param manifestName is the name of the manifest (package.json or bower.json)
 * @param modulesDirName is the directory name for modules (node_modules or bower_components). Should be lowercase!
 * @param filesToWatch are the files to watch for changes. We will push things into this array.
 */
func addTypingNamesAndGetFilesToWatch(
	fs vfs.FS,
	logger logging.Logger,
	inferredTypings map[string]string,
	filesToWatch []string,
	projectRootPath string,
	manifestName string,
	modulesDirName string,
) []string {
	// First, we check the manifests themselves. They're not
	// _required_, but they allow us to do some filtering when dealing
	// with big flat dep directories.
	manifestPath := tspath.CombinePaths(projectRootPath, manifestName)
	var manifestTypingNames []string
	manifestContents, ok := fs.ReadFile(manifestPath)
	if ok {
		var manifest packagejson.DependencyFields
		filesToWatch = append(filesToWatch, manifestPath)
		// var manifest map[string]any
		err := json.Unmarshal([]byte(manifestContents), &manifest)
		if err == nil {
			manifestTypingNames = slices.AppendSeq(manifestTypingNames, maps.Keys(manifest.Dependencies.Value))
			manifestTypingNames = slices.AppendSeq(manifestTypingNames, maps.Keys(manifest.DevDependencies.Value))
			manifestTypingNames = slices.AppendSeq(manifestTypingNames, maps.Keys(manifest.OptionalDependencies.Value))
			manifestTypingNames = slices.AppendSeq(manifestTypingNames, maps.Keys(manifest.PeerDependencies.Value))
			addInferredTypings(fs, logger, inferredTypings, manifestTypingNames, "Typing names in '"+manifestPath+"' dependencies")
		}
	}

	// Now we scan the directories for typing information in
	// already-installed dependencies (if present). Note that this
	// step happens regardless of whether a manifest was present,
	// which is certainly a valid configuration, if an unusual one.
	packagesFolderPath := tspath.CombinePaths(projectRootPath, modulesDirName)
	filesToWatch = append(filesToWatch, packagesFolderPath)
	if !fs.DirectoryExists(packagesFolderPath) {
		return filesToWatch
	}

	// There's two cases we have to take into account here:
	// 1. If manifest is undefined, then we're not using a manifest.
	//    That means that we should scan _all_ dependencies at the top
	//    level of the modulesDir.
	// 2. If manifest is defined, then we can do some special
	//    filtering to reduce the amount of scanning we need to do.
	//
	// Previous versions of this algorithm checked for a `_requiredBy`
	// field in the package.json, but that field is only present in
	// `npm@>=3 <7`.

	// Package names that do **not** provide their own typings, so
	// we'll look them up.
	var packageNames []string

	var dependencyManifestNames []string
	if len(manifestTypingNames) > 0 {
		// This is #1 described above.
		for _, typingName := range manifestTypingNames {
			dependencyManifestNames = append(dependencyManifestNames, tspath.CombinePaths(packagesFolderPath, typingName, manifestName))
		}
	} else {
		// And #2. Depth = 3 because scoped packages look like `node_modules/@foo/bar/package.json`
		depth := 3
		for _, manifestPath := range vfs.ReadDirectory(fs, projectRootPath, packagesFolderPath, []string{tspath.ExtensionJson}, nil, nil, &depth) {
			if tspath.GetBaseFileName(manifestPath) != manifestName {
				continue
			}

			// It's ok to treat
			// `node_modules/@foo/bar/package.json` as a manifest,
			// but not `node_modules/jquery/nested/package.json`.
			// We only assume depth 3 is ok for formally scoped
			// packages. So that needs this dance here.

			pathComponents := tspath.GetPathComponents(manifestPath, "")
			lenPathComponents := len(pathComponents)
			ch, _ := utf8.DecodeRuneInString(pathComponents[lenPathComponents-3])
			isScoped := ch == '@'

			if isScoped && tspath.ToFileNameLowerCase(pathComponents[lenPathComponents-4]) == modulesDirName || // `node_modules/@foo/bar`
				!isScoped && tspath.ToFileNameLowerCase(pathComponents[lenPathComponents-3]) == modulesDirName { // `node_modules/foo`
				dependencyManifestNames = append(dependencyManifestNames, manifestPath)
			}
		}

	}

	logger.Log(fmt.Sprintf("ATA:: Searching for typing names in %s; all files: %v", packagesFolderPath, dependencyManifestNames))

	// Once we have the names of things to look up, we iterate over
	// and either collect their included typings, or add them to the
	// list of typings we need to look up separately.
	for _, manifestPath := range dependencyManifestNames {
		manifestContents, ok := fs.ReadFile(manifestPath)
		if !ok {
			continue
		}
		manifest, err := packagejson.Parse([]byte(manifestContents))
		// If the package has its own d.ts typings, those will take precedence. Otherwise the package name will be used
		// to download d.ts files from DefinitelyTyped
		if err != nil || len(manifest.Name.Value) == 0 {
			continue
		}
		ownTypes := manifest.Types.Value
		if len(ownTypes) == 0 {
			ownTypes = manifest.Typings.Value
		}
		if len(ownTypes) != 0 {
			absolutePath := tspath.GetNormalizedAbsolutePath(ownTypes, tspath.GetDirectoryPath(manifestPath))
			if fs.FileExists(absolutePath) {
				logger.Log(fmt.Sprintf("ATA::     Package '%s' provides its own types.", manifest.Name.Value))
				inferredTypings[manifest.Name.Value] = absolutePath
			} else {
				logger.Log(fmt.Sprintf("ATA::     Package '%s' provides its own types but they are missing.", manifest.Name.Value))
			}
		} else {
			packageNames = append(packageNames, manifest.Name.Value)
		}
	}
	addInferredTypings(fs, logger, inferredTypings, packageNames, "    Found package names")
	return filesToWatch
}

/**
 * Takes a string like "jquery-min.4.2.3" and returns "jquery"
 *
 * @internal
 */
func removeMinAndVersionNumbers(fileName string) string {
	// We used to use the regex /[.-]((min)|(\d+(\.\d+)*))$/ and would just .replace it twice.
	// Unfortunately, that regex has O(n^2) performance because v8 doesn't match from the end of the string.
	// Instead, we now essentially scan the filename (backwards) ourselves.
	end := len(fileName)
	for pos := end; pos > 0; {
		ch, size := utf8.DecodeLastRuneInString(fileName[:pos])
		if ch >= '0' && ch <= '9' {
			// Match a \d+ segment
			for {
				pos -= size
				ch, size = utf8.DecodeLastRuneInString(fileName[:pos])
				if pos <= 0 || ch < '0' || ch > '9' {
					break
				}
			}
		} else if pos > 4 && (ch == 'n' || ch == 'N') {
			// Looking for "min" or "min"
			// Already matched the 'n'
			pos -= size
			ch, size = utf8.DecodeLastRuneInString(fileName[:pos])
			if ch != 'i' && ch != 'I' {
				break
			}
			pos -= size
			ch, size = utf8.DecodeLastRuneInString(fileName[:pos])
			if ch != 'm' && ch != 'M' {
				break
			}
			pos -= size
			ch, size = utf8.DecodeLastRuneInString(fileName[:pos])
		} else {
			// This character is not part of either suffix pattern
			break
		}

		if ch != '-' && ch != '.' {
			break
		}
		pos -= size
		end = pos
	}
	return fileName[0:end]
}
