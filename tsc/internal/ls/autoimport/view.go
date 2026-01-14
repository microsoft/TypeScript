package autoimport

import (
	"context"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type View struct {
	registry      *Registry
	importingFile *ast.SourceFile
	program       *compiler.Program
	preferences   modulespecifiers.UserPreferences
	projectKey    tspath.Path

	allowedEndings                   []modulespecifiers.ModuleSpecifierEnding
	conditions                       *collections.Set[string]
	shouldUseUriStyleNodeCoreModules core.Tristate
	existingImports                  *collections.MultiMap[ModuleID, existingImport]
	shouldUseRequireForFixes         *bool
}

func NewView(registry *Registry, importingFile *ast.SourceFile, projectKey tspath.Path, program *compiler.Program, preferences modulespecifiers.UserPreferences) *View {
	return &View{
		registry:      registry,
		importingFile: importingFile,
		program:       program,
		projectKey:    projectKey,
		preferences:   preferences,
		conditions: collections.NewSetFromItems(
			module.GetConditions(program.Options(),
				program.GetDefaultResolutionModeForFile(importingFile))...,
		),
		shouldUseUriStyleNodeCoreModules: lsutil.ShouldUseUriStyleNodeCoreModules(importingFile, program),
	}
}

func (v *View) getAllowedEndings() []modulespecifiers.ModuleSpecifierEnding {
	if v.allowedEndings == nil {
		resolutionMode := v.program.GetDefaultResolutionModeForFile(v.importingFile)
		v.allowedEndings = modulespecifiers.GetAllowedEndingsInPreferredOrder(
			v.preferences,
			v.program,
			v.program.Options(),
			v.importingFile,
			"",
			resolutionMode,
		)
	}
	return v.allowedEndings
}

type QueryKind int

const (
	QueryKindWordPrefix QueryKind = iota
	QueryKindExactMatch
	QueryKindCaseInsensitiveMatch
)

func (v *View) Search(query string, kind QueryKind) []*Export {
	searchFn := func(bucket *RegistryBucket) []*Export {
		switch kind {
		case QueryKindWordPrefix:
			return bucket.Index.SearchWordPrefix(query)
		case QueryKindExactMatch:
			return bucket.Index.Find(query, true)
		case QueryKindCaseInsensitiveMatch:
			return bucket.Index.Find(query, false)
		default:
			panic("unreachable")
		}
	}

	return v.search(searchFn)
}

func (v *View) SearchByExportID(id ExportID) []*Export {
	search := func(bucket *RegistryBucket) []*Export {
		return core.Filter(bucket.Index.entries, func(e *Export) bool {
			return e.ExportID == id
		})
	}

	return v.search(search)
}

func (v *View) search(searchFn func(*RegistryBucket) []*Export) []*Export {
	var results []*Export

	if bucket, ok := v.registry.projects[v.projectKey]; ok {
		exports := searchFn(bucket)
		results = slices.Grow(results, len(exports))
		for _, e := range exports {
			if string(e.ModuleID) == string(v.importingFile.Path()) {
				// Don't auto-import from the importing file itself
				continue
			}
			results = append(results, e)
		}
	}

	// Compute the set of packages accessible to the importing file.
	// This includes packages from package.json dependencies (aggregated from ancestor directories)
	// plus packages that are directly imported by the project's program files.
	// If no package.json is found, allowedPackages remains nil and all packages are allowed.
	var allowedPackages *collections.Set[string]
	tspath.ForEachAncestorDirectoryPath(v.importingFile.Path().GetDirectoryPath(), func(dirPath tspath.Path) (result any, stop bool) {
		if dir, ok := v.registry.directories[dirPath]; ok {
			if pj := dir.packageJson; pj.Exists() && pj.Contents.Parseable {
				// Initialize to empty set if this is the first package.json we've seen
				if allowedPackages == nil {
					allowedPackages = &collections.Set[string]{}
				}
				addPackageJsonDependencies(pj.Contents, allowedPackages)
			}
		}
		return nil, false
	})
	// If we found at least one package.json, also include packages directly imported by the project
	if allowedPackages != nil {
		if bucket, ok := v.registry.projects[v.projectKey]; ok {
			allowedPackages = allowedPackages.UnionedWith(bucket.ResolvedPackageNames)
		}
	}

	excludePackages := &collections.Set[string]{}
	tspath.ForEachAncestorDirectoryPath(v.importingFile.Path().GetDirectoryPath(), func(dirPath tspath.Path) (result any, stop bool) {
		if nodeModulesBucket, ok := v.registry.nodeModules[dirPath]; ok {
			exports := searchFn(nodeModulesBucket)
			results = slices.Grow(results, len(exports))
			for _, e := range exports {
				// Exclude packages found in lower node_modules (shadowing)
				if excludePackages.Has(e.PackageName) {
					continue
				}
				// If allowedPackages is nil, no package.json was found, so include all packages.
				// Otherwise, only include packages that are dependencies or directly imported.
				if allowedPackages != nil && !allowedPackages.Has(e.PackageName) {
					continue
				}
				results = append(results, e)
			}

			// As we go up the directory tree, exclude packages found in lower node_modules
			for pkgName := range nodeModulesBucket.PackageFiles {
				excludePackages.Add(pkgName)
			}
		}
		return nil, false
	})
	return results
}

type FixAndExport struct {
	Fix    *Fix
	Export *Export
}

func (v *View) GetCompletions(ctx context.Context, prefix string, position lsproto.Position, forJSX bool, isTypeOnlyLocation bool) []*FixAndExport {
	results := v.Search(prefix, QueryKindWordPrefix)

	type exportGroupKey struct {
		target                     ExportID
		name                       string
		ambientModuleOrPackageName string
	}
	grouped := make(map[exportGroupKey][]*Export, len(results))
outer:
	for _, e := range results {
		name := e.Name()
		if forJSX && !(unicode.IsUpper(rune(name[0])) || e.IsRenameable()) {
			continue
		}
		target := e.ExportID
		if e.Target != (ExportID{}) {
			target = e.Target
		}
		key := exportGroupKey{
			target:                     target,
			name:                       name,
			ambientModuleOrPackageName: core.FirstNonZero(e.AmbientModuleName(), e.PackageName),
		}
		if e.PackageName == "@types/node" || strings.Contains(string(e.Path), "/node_modules/@types/node/") {
			if _, ok := core.UnprefixedNodeCoreModules[key.ambientModuleOrPackageName]; ok {
				// Group URI-style and non-URI style node core modules together so the ranking logic
				// is allowed to drop one if an explicit preference is detected.
				key.ambientModuleOrPackageName = "node:" + key.ambientModuleOrPackageName
			}
		}
		if existing, ok := grouped[key]; ok {
			for i, ex := range existing {
				if e.ExportID == ex.ExportID {
					grouped[key] = slices.Replace(existing, i, i+1, &Export{
						ExportID:                   e.ExportID,
						ModuleFileName:             e.ModuleFileName,
						Syntax:                     min(e.Syntax, ex.Syntax),
						Flags:                      e.Flags | ex.Flags,
						ScriptElementKind:          min(e.ScriptElementKind, ex.ScriptElementKind),
						ScriptElementKindModifiers: *e.ScriptElementKindModifiers.UnionedWith(&ex.ScriptElementKindModifiers),
						localName:                  e.localName,
						Target:                     e.Target,
						Path:                       e.Path,
						NodeModulesDirectory:       e.NodeModulesDirectory,
					})
					continue outer
				}
			}
		}
		grouped[key] = append(grouped[key], e)
	}

	fixes := make([]*FixAndExport, 0, len(results))
	compareFixes := func(a, b *FixAndExport) int {
		return v.CompareFixesForRanking(a.Fix, b.Fix)
	}

	for _, exps := range grouped {
		fixesForGroup := make([]*FixAndExport, 0, len(exps))
		for _, e := range exps {
			for _, fix := range v.GetFixes(ctx, e, forJSX, isTypeOnlyLocation, &position) {
				fixesForGroup = append(fixesForGroup, &FixAndExport{
					Fix:    fix,
					Export: e,
				})
			}
		}
		fixes = append(fixes, core.MinAllFunc(fixesForGroup, compareFixes)...)
	}

	// The client will do additional sorting by SortText and Label, so we don't
	// need to consider the name in our sorting here; we only need to produce a
	// stable relative ordering between completions that the client will consider
	// equivalent.
	slices.SortFunc(fixes, func(a, b *FixAndExport) int {
		return v.CompareFixesForSorting(a.Fix, b.Fix)
	})

	return fixes
}
