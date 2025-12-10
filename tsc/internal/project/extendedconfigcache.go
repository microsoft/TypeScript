package project

import (
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/zeebo/xxh3"
)

type ExtendedConfigParseArgs struct {
	FileName        string
	Content         string
	FS              FileSource
	ResolutionStack []string
	Host            tsoptions.ParseConfigHost
	Cache           tsoptions.ExtendedConfigCache
}

type ExtendedConfigCacheEntry struct {
	*tsoptions.ExtendedConfigCacheEntry
	Hash xxh3.Uint128
}

type ExtendedConfigCache = RefCountCache[tspath.Path, *ExtendedConfigCacheEntry, ExtendedConfigParseArgs]

func NewExtendedConfigCache() *ExtendedConfigCache {
	return NewRefCountCache(
		RefCountCacheOptions{},
		func(path tspath.Path, args ExtendedConfigParseArgs) *ExtendedConfigCacheEntry {
			result := &ExtendedConfigCacheEntry{
				ExtendedConfigCacheEntry: tsoptions.ParseExtendedConfig(args.FileName, path, args.ResolutionStack, args.Host, args.Cache),
			}
			result.Hash = hash(result.ExtendedConfigCacheEntry, args)
			return result
		},
		func(path tspath.Path, entry *ExtendedConfigCacheEntry, args ExtendedConfigParseArgs) bool {
			return entry.Hash == xxh3.Uint128{} || entry.Hash != hash(entry.ExtendedConfigCacheEntry, args)
		},
	)
}

func hash(entry *tsoptions.ExtendedConfigCacheEntry, args ExtendedConfigParseArgs) xxh3.Uint128 {
	hasher := xxh3.New()
	_, _ = hasher.WriteString(args.Content)
	for _, fileName := range entry.ExtendedFileNames() {
		fh := args.FS.GetFile(fileName)
		if fh == nil {
			return xxh3.Uint128{}
		}
		_, _ = hasher.WriteString(fh.Content())
	}
	return hasher.Sum128()
}
