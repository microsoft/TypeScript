package compiler

import (
	"github.com/microsoft/typescript-go/internal/tspath"
)

type PackageJsonPathFields struct {
	typings              string
	types                string
	typesVersions        map[string]map[string][]string
	main                 string
	tsconfig             string
	typeField            string
	imports              interface{}
	exports              interface{}
	name                 string
	dependencies         map[string]string
	peerDependencies     map[string]string
	optionalDependencies map[string]string
}

type PackageJsonInfoContents struct {
	packageJsonContent PackageJsonPathFields
}

type PackageJsonInfoCacheEntry struct {
	packageDirectory string
	directoryExists  bool
	contents         *PackageJsonInfoContents
}

type PackageJsonInfoCache struct {
	cache                     map[tspath.Path]PackageJsonInfoCacheEntry
	currentDirectory          string
	useCaseSensitiveFileNames bool
	isReadonly                bool
}

func NewPackageJsonInfoCache(currentDirectory string, useCaseSensitiveFileNames bool) *PackageJsonInfoCache {
	return &PackageJsonInfoCache{
		currentDirectory:          currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
}

func (p *PackageJsonInfoCache) getPackageJsonInfo(packageJsonPath string) *PackageJsonInfoCacheEntry {
	key := tspath.ToPath(packageJsonPath, p.currentDirectory, p.useCaseSensitiveFileNames)
	if p.cache == nil {
		p.cache = make(map[tspath.Path]PackageJsonInfoCacheEntry)
		return nil
	}
	entry, ok := p.cache[key]
	if !ok {
		return nil
	}
	return &entry
}

func (p *PackageJsonInfoCache) setPackageJsonInfo(packageJsonPath string, info *PackageJsonInfoCacheEntry) {
	key := tspath.ToPath(packageJsonPath, p.currentDirectory, p.useCaseSensitiveFileNames)
	if p.cache == nil {
		p.cache = make(map[tspath.Path]PackageJsonInfoCacheEntry)
	}
	p.cache[key] = *info
}
