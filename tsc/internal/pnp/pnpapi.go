package pnp

/*
 * Yarn Plug'n'Play (generally referred to as Yarn PnP) is the default installation strategy in modern releases of Yarn.
 * Yarn PnP generates a single Node.js loader file in place of the typical node_modules folder.
 * This loader file, named .pnp.cjs, contains all information about your project's dependency tree, informing your tools as to
 * the location of the packages on the disk and letting them know how to resolve require and import calls.
 *
 * The full specification is available at https://yarnpkg.com/advanced/pnp-spec
 */
import (
	"errors"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type PnpApi struct {
	fs       vfs.FS
	url      string
	manifest *PnpManifestData
}

func isNodeJSBuiltin(name string) bool {
	return core.NodeCoreModules()[name]
}

func isDependencyTreeRoot(m *PnpManifestData, loc *Locator) bool {
	return slices.Contains(m.dependencyTreeRoots, *loc)
}

func viaSuffix(specifier string, ident string) string {
	if ident != specifier {
		return ident + " (via \"" + specifier + "\")"
	}
	return ""
}

// TODO: implement this from yarn sourcecode
// https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-pnp/sources/loader/makeApi.ts#L458
func findBrokenPeerDependencies(specifier string, parent *Locator) []Locator {
	return []Locator{}
}

func (p *PnpApi) GetManifestPath() string {
	if p.manifest == nil {
		return ""
	}
	return tspath.CombinePaths(p.manifest.dirPath, ".pnp.cjs")
}

func (p *PnpApi) RefreshManifest() error {
	var newData *PnpManifestData
	var err error

	if p.manifest == nil {
		newData, err = p.findClosestPnpManifest()
	} else {
		newData, err = parseManifestFromPath(p.fs, p.manifest.dirPath)
	}

	if err != nil {
		return err
	}

	p.manifest = newData
	return nil
}

type PnpError struct {
	Message *diagnostics.Message
	Args    []any
}

func (p *PnpApi) ResolveToUnqualified(specifier string, parentPath string) (string, *PnpError) {
	if p.manifest == nil {
		panic("ResolveToUnqualified called with no PnP manifest available")
	}

	ident, modulePath, err := p.ParseBareIdentifier(specifier)
	if err != nil {
		// Skipping resolution
		return "", err
	}

	// Return empty string if the parent path is ignored
	if p.IsPathIgnored(parentPath) {
		return "", nil
	}

	parentLocator, err := p.FindLocator(parentPath)
	if err != nil || parentLocator == nil {
		// Skipping resolution
		return "", err
	}

	parentPkg := p.GetPackage(parentLocator)

	var referenceOrAlias *PackageDependency
	for _, dep := range parentPkg.PackageDependencies {
		if dep.Ident == ident {
			referenceOrAlias = &dep
			break
		}
	}

	// If not found, try fallback if enabled
	if referenceOrAlias == nil {
		if p.manifest.enableTopLevelFallback {
			excluded := false
			if exclusion, ok := p.manifest.fallbackExclusionMap[parentLocator.Name]; ok {
				if slices.Contains(exclusion.Entries, parentLocator.Reference) {
					excluded = true
				}
			}
			if !excluded {
				fallback := p.ResolveViaFallback(ident)
				if fallback != nil {
					referenceOrAlias = fallback
				}
			}
		}
	}

	if referenceOrAlias == nil {
		if isNodeJSBuiltin(specifier) {
			if isDependencyTreeRoot(p.manifest, parentLocator) {
				return "", &PnpError{Message: diagnostics.Your_application_tried_to_access_0_While_this_module_is_usually_interpreted_as_a_Node_builtin_your_resolver_is_running_inside_a_non_Node_resolution_context_where_such_builtins_are_ignored_Since_0_isn_t_otherwise_declared_in_your_dependencies_this_makes_the_require_call_ambiguous_and_unsound_Required_package_Colon_0_1_Required_by_Colon_2, Args: []any{ident, ident, viaSuffix(specifier, ident), parentPath}}
			}
			return "", &PnpError{Message: diagnostics.X_0_tried_to_access_1_While_this_module_is_usually_interpreted_as_a_Node_builtin_your_resolver_is_running_inside_a_non_Node_resolution_context_where_such_builtins_are_ignored_Since_1_isn_t_otherwise_declared_in_0_s_dependencies_this_makes_the_require_call_ambiguous_and_unsound_Required_package_Colon_1_2_Required_by_Colon_3, Args: []any{parentLocator.Name, ident, ident, parentLocator.Name, ident, viaSuffix(specifier, ident), parentPath}}
		}

		if isDependencyTreeRoot(p.manifest, parentLocator) {
			return "", &PnpError{Message: diagnostics.Your_application_tried_to_access_0_but_it_isn_t_declared_in_your_dependencies_this_makes_the_require_call_ambiguous_and_unsound_Required_package_Colon_0_1_Required_by_Colon_2, Args: []any{ident, ident, viaSuffix(specifier, ident), parentPath}}
		}

		brokenAncestors := findBrokenPeerDependencies(specifier, parentLocator)
		allBrokenAreRoots := len(brokenAncestors) > 0
		if allBrokenAreRoots {
			for _, brokenAncestor := range brokenAncestors {
				if !isDependencyTreeRoot(p.manifest, &brokenAncestor) {
					allBrokenAreRoots = false
					break
				}
			}
		}

		if len(brokenAncestors) > 0 && allBrokenAreRoots {
			return "", &PnpError{Message: diagnostics.Your_application_tried_to_access_0_a_peer_dependency_this_isn_t_allowed_as_there_is_no_ancestor_to_satisfy_the_requirement_Use_a_devDependency_if_needed_Required_package_Colon_0_Required_by_Colon_1, Args: []any{ident, ident, parentPath}}
		} else {
			return "", &PnpError{Message: diagnostics.X_0_tried_to_access_1_a_peer_dependency_but_it_isn_t_provided_by_its_ancestors_Slashyour_application_this_makes_the_require_call_ambiguous_and_unsound_Required_package_Colon_1_Required_by_Colon_2, Args: []any{parentLocator.Name, ident, ident, parentPath}}
		}
	}

	dependencyLocator := referenceOrAlias.Locator()
	dependencyPkg := p.GetPackage(&dependencyLocator)

	resolvedPath := tspath.ResolvePath(p.manifest.dirPath, dependencyPkg.PackageLocation)
	if modulePath != "" {
		// ParseBareIdentifier returns modulePath with a leading slash. Keep it
		// relative to the package location instead of letting ResolvePath treat
		// it as an absolute path.
		resolvedPath = tspath.ResolvePath(resolvedPath, "."+modulePath)
	}
	return tspath.RemoveTrailingDirectorySeparators(resolvedPath), nil
}

func (p *PnpApi) findClosestPnpManifest() (*PnpManifestData, error) {
	directoryPath := tspath.GetNormalizedAbsolutePath(p.url, "/")

	for {
		pnpPath := tspath.CombinePaths(directoryPath, ".pnp.cjs")
		if p.fs.FileExists(pnpPath) {
			return parseManifestFromPath(p.fs, directoryPath)
		}

		if tspath.IsDiskPathRoot(directoryPath) {
			return nil, errors.New("no PnP manifest found")
		}

		directoryPath = tspath.GetDirectoryPath(directoryPath)
	}
}

func (p *PnpApi) GetPackage(locator *Locator) *PackageInfo {
	packageRegistryMap := p.manifest.packageRegistryMap
	packageInfo, ok := packageRegistryMap[locator.Name][locator.Reference]
	if !ok {
		panic(locator.Name + " should have an entry in the package registry")
	}

	return packageInfo
}

// IsPathIgnored reports whether path is covered by the manifest's
// ignorePatternData, i.e. it is not managed by PnP and should resolve through the
// classic algorithm.
func (p *PnpApi) IsPathIgnored(path string) bool {
	if p.manifest == nil || p.manifest.ignorePatternData == nil || path == "" {
		return false
	}
	relativePath := tspath.GetRelativePathFromDirectory(p.manifest.dirPath, path,
		tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true})
	return p.manifest.ignorePatternData.MatchString(relativePath)
}

func (p *PnpApi) FindLocator(parentPath string) (*Locator, *PnpError) {
	if parentPath == "" {
		return nil, nil
	}

	if p.IsPathIgnored(parentPath) {
		return nil, nil
	}

	relativePath := tspath.GetRelativePathFromDirectory(p.manifest.dirPath, parentPath,
		tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true})

	var relativePathWithDot string
	if strings.HasPrefix(relativePath, "../") {
		relativePathWithDot = relativePath
	} else {
		relativePathWithDot = "./" + relativePath
	}

	var bestLength int
	var bestLocator *Locator
	pathSegments := strings.Split(relativePathWithDot, "/")
	currentTrie := p.manifest.packageRegistryTrie

	// Go down the trie, looking for the latest defined packageInfo that matches the path
	for index, segment := range pathSegments {
		currentTrie = currentTrie.childrenPathSegments[segment]

		if currentTrie == nil || currentTrie.childrenPathSegments == nil {
			break
		}

		if currentTrie.packageData != nil && !currentTrie.packageData.info.DiscardFromLookup && index >= bestLength {
			bestLength = index
			bestLocator = &Locator{Name: currentTrie.packageData.ident, Reference: currentTrie.packageData.reference}
		}
	}

	if bestLocator == nil {
		return nil, &PnpError{Message: diagnostics.X_no_package_found_for_path_0, Args: []any{relativePath}}
	}

	return bestLocator, nil
}

func (p *PnpApi) ResolveViaFallback(name string) *PackageDependency {
	topLevelPkg := p.GetPackage(&Locator{Name: "", Reference: ""})

	if topLevelPkg != nil {
		for _, dep := range topLevelPkg.PackageDependencies {
			if dep.Ident == name {
				return &dep
			}
		}
	}

	for _, dep := range p.manifest.fallbackPool {
		if dep.Ident == name {
			return &dep
		}
	}

	return nil
}

func (p *PnpApi) ParseBareIdentifier(specifier string) (ident string, modulePath string, err *PnpError) {
	if len(specifier) == 0 {
		return "", "", &PnpError{Message: diagnostics.Empty_specifier_Colon_0, Args: []any{specifier}}
	}

	firstSlash := strings.Index(specifier, "/")

	if specifier[0] == '@' {
		if firstSlash == -1 {
			return "", "", &PnpError{Message: diagnostics.Invalid_specifier_Colon_0, Args: []any{specifier}}
		}

		secondSlash := strings.Index(specifier[firstSlash+1:], "/")

		if secondSlash == -1 {
			ident = specifier
		} else {
			ident = specifier[:firstSlash+1+secondSlash]
		}
	} else {
		beforeFirstSlash, _, found := strings.Cut(specifier, "/")

		if !found {
			ident = specifier
		} else {
			ident = beforeFirstSlash
		}
	}

	modulePath = specifier[len(ident):]

	return ident, modulePath, nil
}

func (p *PnpApi) GetPnpTypeRoots(currentDirectory string) []string {
	if p.manifest == nil {
		return []string{}
	}

	currentDirectory = tspath.NormalizePath(currentDirectory)

	currentPackage, err := p.FindLocator(currentDirectory)
	if err != nil {
		return []string{}
	}

	if currentPackage == nil {
		return []string{}
	}

	packageDependencies := p.GetPackage(currentPackage).PackageDependencies

	typeRoots := []string{}
	for _, dep := range packageDependencies {
		if strings.HasPrefix(dep.Ident, "@types/") && dep.Reference != "" {
			dependencyLocator := dep.Locator()
			packageInfo := p.GetPackage(&dependencyLocator)
			typeRoots = append(typeRoots, tspath.GetDirectoryPath(
				tspath.ResolvePath(p.manifest.dirPath, packageInfo.PackageLocation),
			))
		}
	}

	return typeRoots
}

func (p *PnpApi) IsImportable(fromFileName string, toFileName string) bool {
	fromLocator, errFromLocator := p.FindLocator(fromFileName)
	toLocator, errToLocator := p.FindLocator(toFileName)

	if fromLocator == nil || toLocator == nil || errFromLocator != nil || errToLocator != nil {
		return false
	}

	fromInfo := p.GetPackage(fromLocator)
	for _, dep := range fromInfo.PackageDependencies {
		if dep.Reference == toLocator.Reference {
			if dep.IsAlias() && dep.AliasName == toLocator.Name {
				return true
			}

			if dep.Ident == toLocator.Name {
				return true
			}
		}
	}

	return false
}

func (p *PnpApi) GetPackageLocationAbsolutePath(packageInfo *PackageInfo) string {
	if packageInfo == nil {
		return ""
	}

	packageLocation := packageInfo.PackageLocation
	return tspath.RemoveTrailingDirectorySeparators(tspath.ResolvePath(p.manifest.dirPath, packageLocation))
}

// Checks if toFileName is in a module defined in the dependencies of fromFileName
func (p *PnpApi) IsInPnpModule(toFileName string, fromFileName string) bool {
	fromLocator, _ := p.FindLocator(fromFileName)
	toLocator, _ := p.FindLocator(toFileName)

	if fromLocator != nil && toLocator != nil && fromLocator.Name != toLocator.Name {
		fromInfo := p.GetPackage(fromLocator)
		for _, dep := range fromInfo.PackageDependencies {
			if dep.Ident == toLocator.Name {
				return true
			}

			if dep.IsAlias() && dep.AliasName == toLocator.Name {
				return true
			}
		}
	}
	return false
}

func (p *PnpApi) AppendPnpTypeRoots(nmTypes []string, currentDirectory string, compilerOptions *core.CompilerOptions, nmFromConfig bool) ([]string, bool) {
	baseDir := compilerOptions.GetBaseDirFromOptions(currentDirectory)
	pnpTypes := p.GetPnpTypeRoots(baseDir)

	if len(nmTypes) > 0 {
		return append(nmTypes, pnpTypes...), nmFromConfig
	}

	if len(pnpTypes) > 0 {
		return pnpTypes, false
	}

	return nil, false
}
