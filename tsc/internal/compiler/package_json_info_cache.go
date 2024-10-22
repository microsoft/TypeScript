package compiler

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
	cache                map[Path]PackageJsonInfoCacheEntry
	currentDirectory     string
	getCanonicalFileName func(string) string
	isReadonly           bool
}

func NewPackageJsonInfoCache(currentDirectory string, getCanonicalFileName func(string) string) *PackageJsonInfoCache {
	return &PackageJsonInfoCache{
		currentDirectory:     currentDirectory,
		getCanonicalFileName: getCanonicalFileName,
	}
}

func (p *PackageJsonInfoCache) getPackageJsonInfo(packageJsonPath string) *PackageJsonInfoCacheEntry {
	key := toPath(packageJsonPath, p.currentDirectory, p.getCanonicalFileName)
	if p.cache == nil {
		p.cache = make(map[Path]PackageJsonInfoCacheEntry)
		return nil
	}
	entry, ok := p.cache[key]
	if !ok {
		return nil
	}
	return &entry
}

func (p *PackageJsonInfoCache) setPackageJsonInfo(packageJsonPath string, info *PackageJsonInfoCacheEntry) {
	key := toPath(packageJsonPath, p.currentDirectory, p.getCanonicalFileName)
	if p.cache == nil {
		p.cache = make(map[Path]PackageJsonInfoCacheEntry)
	}
	p.cache[key] = *info
}
