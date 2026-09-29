package pnp

import (
	"errors"
	"fmt"
	"regexp"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/json"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

var manifestRegex = regexp.MustCompile(`(const[ \r\n]+RAW_RUNTIME_STATE[ \r\n]*=[ \r\n]*|hydrateRuntimeState\(JSON\.parse\()'`)

type LinkType string

const (
	LinkTypeSoft LinkType = "SOFT"
	LinkTypeHard LinkType = "HARD"
)

type PackageDependency struct {
	Ident     string
	Reference string // Either the direct reference or alias reference
	AliasName string // Empty if not an alias
}

func (pd PackageDependency) IsAlias() bool {
	return pd.AliasName != ""
}

func (pd PackageDependency) Locator() Locator {
	name := pd.Ident
	if pd.IsAlias() {
		name = pd.AliasName
	}
	return Locator{Name: name, Reference: pd.Reference}
}

type PackageInfo struct {
	PackageLocation     string              `json:"packageLocation"`
	PackageDependencies []PackageDependency `json:"packageDependencies,omitempty"`
	LinkType            LinkType            `json:"linkType,omitempty"`
	DiscardFromLookup   bool                `json:"discardFromLookup,omitempty"`
	PackagePeers        []string            `json:"packagePeers,omitempty"`
}

type Locator struct {
	Name      string `json:"name"`
	Reference string `json:"reference"`
}

type FallbackExclusion struct {
	Name    string   `json:"name"`
	Entries []string `json:"entries"`
}

type PackageTrieData struct {
	ident     string
	reference string
	info      *PackageInfo
}

type PackageRegistryTrie struct {
	pathSegment          string
	childrenPathSegments map[string]*PackageRegistryTrie
	packageData          *PackageTrieData
}

type PnpManifestData struct {
	dirPath string

	ignorePatternData      *regexp.Regexp
	enableTopLevelFallback bool

	fallbackPool         []PackageDependency
	fallbackExclusionMap map[string]*FallbackExclusion

	dependencyTreeRoots []Locator

	// Nested maps for package registry (ident -> reference -> PackageInfo)
	packageRegistryMap  map[string]map[string]*PackageInfo
	packageRegistryTrie *PackageRegistryTrie
}

func parseManifestFromPath(fs vfs.FS, manifestDir string) (*PnpManifestData, error) {
	pnpDataString := ""

	data, ok := fs.ReadFile(tspath.CombinePaths(manifestDir, ".pnp.data.json"))
	if ok {
		pnpDataString = data
	} else {
		dataString, err := extractPnpDataStringFromPath(fs, tspath.CombinePaths(manifestDir, ".pnp.cjs"))
		if err != nil {
			return nil, err
		}
		pnpDataString = dataString
	}

	return parseManifestFromData(pnpDataString, manifestDir)
}

func extractPnpDataStringFromPath(fs vfs.FS, path string) (string, error) {
	pnpScriptString, ok := fs.ReadFile(path)
	if !ok {
		return "", errors.New("failed to read file: " + path)
	}
	loc := manifestRegex.FindStringIndex(pnpScriptString)
	if loc == nil {
		return "", errors.New("we failed to locate the PnP data payload inside its manifest file. Did you manually edit the file?")
	}

	start := loc[1]
	var b strings.Builder
	b.Grow(len(pnpScriptString))
	for i := start; i < len(pnpScriptString); i++ {
		if pnpScriptString[i] == '\'' {
			break
		}

		if pnpScriptString[i] != '\\' {
			b.WriteByte(pnpScriptString[i])
		}
	}
	return b.String(), nil
}

func parseManifestFromData(pnpDataString string, manifestDir string) (*PnpManifestData, error) {
	var rawData map[string]any
	if err := json.Unmarshal([]byte(pnpDataString), &rawData); err != nil {
		return nil, fmt.Errorf("failed to parse JSON PnP data: %w", err)
	}

	pnpData, err := parsePnpManifest(rawData, manifestDir)
	if err != nil {
		return nil, fmt.Errorf("failed to parse PnP data: %w", err)
	}

	return pnpData, nil
}

// TODO add error handling for corrupted data
func parsePnpManifest(rawData map[string]any, manifestDir string) (*PnpManifestData, error) {
	data := &PnpManifestData{dirPath: manifestDir}

	if roots, ok := rawData["dependencyTreeRoots"].([]any); ok {
		for _, root := range roots {
			if rootMap, ok := root.(map[string]any); ok {
				data.dependencyTreeRoots = append(data.dependencyTreeRoots, Locator{
					Name:      getField(rootMap, "name", parseString),
					Reference: getField(rootMap, "reference", parseString),
				})
			}
		}
	}

	ignorePatternData := getField(rawData, "ignorePatternData", parseString)
	if ignorePatternData != "" {
		ignorePatternDataRegexp, err := regexp.Compile(ignorePatternData)
		// Skipping ignorePatternData if the regex is invalid, which can happen if the regex is not go-compatible
		if err == nil {
			data.ignorePatternData = ignorePatternDataRegexp
		}
	}

	data.enableTopLevelFallback = getField(rawData, "enableTopLevelFallback", parseBool)

	data.fallbackPool = getField(rawData, "fallbackPool", parsePackageDependencies)

	data.fallbackExclusionMap = make(map[string]*FallbackExclusion)

	if exclusions, ok := rawData["fallbackExclusionList"].([]any); ok {
		for _, exclusion := range exclusions {
			if exclusionArr, ok := exclusion.([]any); ok && len(exclusionArr) == 2 {
				name := parseString(exclusionArr[0])
				entries := parseStringArray(exclusionArr[1])
				exclusionEntry := &FallbackExclusion{
					Name:    name,
					Entries: entries,
				}
				data.fallbackExclusionMap[exclusionEntry.Name] = exclusionEntry
			}
		}
	}

	data.packageRegistryMap = make(map[string]map[string]*PackageInfo)

	if registryData, ok := rawData["packageRegistryData"].([]any); ok {
		for _, entry := range registryData {
			if entryArr, ok := entry.([]any); ok && len(entryArr) == 2 {
				ident := parseString(entryArr[0])

				if data.packageRegistryMap[ident] == nil {
					data.packageRegistryMap[ident] = make(map[string]*PackageInfo)
				}

				if versions, ok := entryArr[1].([]any); ok {
					for _, version := range versions {
						if versionArr, ok := version.([]any); ok && len(versionArr) == 2 {
							reference := parseString(versionArr[0])

							if infoMap, ok := versionArr[1].(map[string]any); ok {
								packageInfo := &PackageInfo{
									PackageLocation:     getField(infoMap, "packageLocation", parseString),
									PackageDependencies: getField(infoMap, "packageDependencies", parsePackageDependencies),
									LinkType:            LinkType(getField(infoMap, "linkType", parseString)),
									DiscardFromLookup:   getField(infoMap, "discardFromLookup", parseBool),
									PackagePeers:        getField(infoMap, "packagePeers", parseStringArray),
								}

								data.packageRegistryMap[ident][reference] = packageInfo
								data.addPackageToTrie(ident, reference, packageInfo)
							}
						}
					}
				}
			}
		}
	}

	return data, nil
}

func (data *PnpManifestData) addPackageToTrie(ident string, reference string, packageInfo *PackageInfo) {
	if data.packageRegistryTrie == nil {
		data.packageRegistryTrie = &PackageRegistryTrie{
			pathSegment:          "",
			childrenPathSegments: make(map[string]*PackageRegistryTrie),
			packageData:          nil,
		}
	}

	packageData := &PackageTrieData{
		ident:     ident,
		reference: reference,
		info:      packageInfo,
	}

	packagePath := tspath.RemoveTrailingDirectorySeparator(packageInfo.PackageLocation)
	packagePathSegments := strings.Split(packagePath, "/")

	currentTrie := data.packageRegistryTrie

	for _, segment := range packagePathSegments {
		if currentTrie.childrenPathSegments[segment] == nil {
			currentTrie.childrenPathSegments[segment] = &PackageRegistryTrie{
				pathSegment:          segment,
				childrenPathSegments: make(map[string]*PackageRegistryTrie),
				packageData:          nil,
			}
		}

		currentTrie = currentTrie.childrenPathSegments[segment]
	}

	currentTrie.packageData = packageData
}

// Helper functions for parsing JSON values - following patterns from tsoptions.parseString, etc.
func parseString(value any) string {
	if str, ok := value.(string); ok {
		return str
	}
	return ""
}

func parseBool(value any) bool {
	if val, ok := value.(bool); ok {
		return val
	}
	return false
}

func parseStringArray(value any) []string {
	if arr, ok := value.([]any); ok {
		if arr == nil {
			return nil
		}
		result := make([]string, 0, len(arr))
		for _, v := range arr {
			if str, ok := v.(string); ok {
				result = append(result, str)
			}
		}
		return result
	}
	return nil
}

func parsePackageDependencies(value any) []PackageDependency {
	var result []PackageDependency
	if arr, ok := value.([]any); ok {
		for _, item := range arr {
			if pair, ok := item.([]any); ok && len(pair) == 2 {
				ident := parseString(pair[0])

				// Check if second element is string (simple reference) or array (alias)
				if str, ok := pair[1].(string); ok {
					result = append(result, PackageDependency{
						Ident:     ident,
						Reference: str,
						AliasName: "",
					})
				} else if aliasPair, ok := pair[1].([]any); ok && len(aliasPair) == 2 {
					result = append(result, PackageDependency{
						Ident:     ident,
						Reference: parseString(aliasPair[1]),
						AliasName: parseString(aliasPair[0]),
					})
				}
			}
		}
	}
	return result
}

func getField[T any](m map[string]any, key string, parser func(any) T) T {
	if val, exists := m[key]; exists {
		return parser(val)
	}
	var zero T
	return zero
}
