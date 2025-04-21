package module

import (
	"fmt"
	"math/bits"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ResolutionHost interface {
	FS() vfs.FS
	GetCurrentDirectory() string
	Trace(msg string)
}

type ModeAwareCacheKey struct {
	Name string
	Mode core.ResolutionMode
}

type ResolvedProjectReference struct {
	CommandLine core.ParsedOptions
	SourceFile  *ast.SourceFile
	References  []*ResolvedProjectReference
}

type NodeResolutionFeatures int32

const (
	NodeResolutionFeaturesImports NodeResolutionFeatures = 1 << iota
	NodeResolutionFeaturesSelfName
	NodeResolutionFeaturesExports
	NodeResolutionFeaturesExportsPatternTrailers

	NodeResolutionFeaturesNone            NodeResolutionFeatures = 0
	NodeResolutionFeaturesAll                                    = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
	NodeResolutionFeaturesNode16Default                          = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
	NodeResolutionFeaturesNodeNextDefault                        = NodeResolutionFeaturesAll
	NodeResolutionFeaturesBundlerDefault                         = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
)

type PackageId struct {
	Name             string
	SubModuleName    string
	Version          string
	PeerDependencies string
}

func (p *PackageId) String() string {
	return fmt.Sprintf("%s@%s%s", p.Name, p.Version, p.PeerDependencies)
}

func (p *PackageId) PackageName() string {
	if p.SubModuleName != "" {
		return p.Name + "/" + p.SubModuleName
	}
	return p.Name
}

type LookupLocations struct {
	FailedLookupLocations []string
	AffectingLocations    []string
	ResolutionDiagnostics []ast.Diagnostic
}

type ResolvedModule struct {
	LookupLocations
	ResolvedFileName         string
	OriginalPath             string
	Extension                string
	ResolvedUsingTsExtension bool
	PackageId                PackageId
	IsExternalLibraryImport  bool
	AlternateResult          string
}

func (r *ResolvedModule) IsResolved() bool {
	return r.ResolvedFileName != ""
}

type ResolvedTypeReferenceDirective struct {
	LookupLocations
	Primary                 bool
	ResolvedFileName        string
	OriginalPath            string
	PackageId               PackageId
	IsExternalLibraryImport bool
}

func (r *ResolvedTypeReferenceDirective) IsResolved() bool {
	return r.ResolvedFileName != ""
}

type extensions int32

const (
	extensionsTypeScript extensions = 1 << iota
	extensionsJavaScript
	extensionsDeclaration
	extensionsJson

	extensionsImplementationFiles = extensionsTypeScript | extensionsJavaScript
)

func (e extensions) String() string {
	result := make([]string, 0, bits.OnesCount(uint(e)))
	if e&extensionsTypeScript != 0 {
		result = append(result, "TypeScript")
	}
	if e&extensionsJavaScript != 0 {
		result = append(result, "JavaScript")
	}
	if e&extensionsDeclaration != 0 {
		result = append(result, "Declaration")
	}
	if e&extensionsJson != 0 {
		result = append(result, "JSON")
	}
	return strings.Join(result, ", ")
}

func (e extensions) Array() []string {
	result := []string{}
	if e&extensionsTypeScript != 0 {
		result = append(result, tspath.ExtensionTs, tspath.ExtensionTsx)
	}
	if e&extensionsJavaScript != 0 {
		result = append(result, tspath.ExtensionJs, tspath.ExtensionJsx)
	}
	if e&extensionsDeclaration != 0 {
		result = append(result, tspath.ExtensionDts)
	}
	if e&extensionsJson != 0 {
		result = append(result, tspath.ExtensionJson)
	}
	return result
}
