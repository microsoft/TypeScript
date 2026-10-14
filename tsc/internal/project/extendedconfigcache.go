package project

import (
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/zeebo/xxh3"
)

type ExtendedConfigParseArgs struct {
	FileName        tspath.RootedFilePath
	Content         string
	FS              FileSource
	ConfigFS        vfs.FS
	ResolutionStack []tspath.PathKey
	Cache           tsoptions.ExtendedConfigCache
}

type ExtendedConfigCacheEntry struct {
	*tsoptions.ExtendedConfigCacheEntry
	Hash xxh3.Uint128
}

type ExtendedConfigCache = OwnerCache[tspath.PathKey, *ExtendedConfigCacheEntry, ExtendedConfigParseArgs]

func NewExtendedConfigCache() *ExtendedConfigCache {
	return NewOwnerCache(
		func(path tspath.PathKey, args ExtendedConfigParseArgs) *ExtendedConfigCacheEntry {
			result := &ExtendedConfigCacheEntry{
				ExtendedConfigCacheEntry: tsoptions.ParseExtendedConfig(args.FileName, path, args.ResolutionStack, args.ConfigFS, args.Cache),
			}
			result.Hash = hash(result.ExtendedConfigCacheEntry, args)
			return result
		},
		func(path tspath.PathKey, entry *ExtendedConfigCacheEntry, args ExtendedConfigParseArgs) bool {
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
