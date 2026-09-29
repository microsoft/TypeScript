package project

import (
	"encoding/binary"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/zeebo/xxh3"
)

type ParseCacheKey struct {
	ast.SourceFileParseOptions
	ScriptKind core.ScriptKind
	Hash       xxh3.Uint128
}

func NewParseCacheKey(
	options ast.SourceFileParseOptions,
	hash xxh3.Uint128,
	scriptKind core.ScriptKind,
) ParseCacheKey {
	if scriptKind == core.ScriptKindUnknown {
		scriptKind = core.EnsureScriptKindFromFileName(options.FileName)
	}
	return ParseCacheKey{
		SourceFileParseOptions: options,
		Hash:                   hash,
		ScriptKind:             scriptKind,
	}
}

// ContentMappedParseCacheKey identifies the complete output bundle for one mapped input. Hash folds the
// original content, mapper transform identity, and diagnostic locale together.
type ContentMappedParseCacheKey struct {
	ast.SourceFileParseOptions
	Hash xxh3.Uint128
}

func contentMappedParseCacheKey(options ast.SourceFileParseOptions, rawHash, transformIdentity xxh3.Uint128, diagnosticLocale locale.Locale) ContentMappedParseCacheKey {
	buf := make([]byte, 32, 32+len(diagnosticLocale.String()))
	binary.LittleEndian.PutUint64(buf[0:8], rawHash.Hi)
	binary.LittleEndian.PutUint64(buf[8:16], rawHash.Lo)
	binary.LittleEndian.PutUint64(buf[16:24], transformIdentity.Hi)
	binary.LittleEndian.PutUint64(buf[24:32], transformIdentity.Lo)
	buf = append(buf, diagnosticLocale.String()...)
	return ContentMappedParseCacheKey{SourceFileParseOptions: options, Hash: xxh3.Hash128(buf)}
}

// parseCacheKeyForFile reconstructs the ordinary parse-cache key for a source file held by a program.
func parseCacheKeyForFile(file *ast.SourceFile) ParseCacheKey {
	return NewParseCacheKey(file.ParseOptions(), file.Hash, file.ScriptKind)
}

func contentMappedParseCacheKeyForFile(file *ast.SourceFile) ContentMappedParseCacheKey {
	return ContentMappedParseCacheKey{SourceFileParseOptions: file.ContentMapperParseOptions(), Hash: file.Hash}
}

// parseCacheKeyForDuplicate reconstructs an ordinary parse-cache key for a deduplicated source file.
func parseCacheKeyForDuplicate(file *compiler.DuplicateSourceFile) ParseCacheKey {
	return NewParseCacheKey(file.ParseOptions, file.Hash, file.ScriptKind)
}

func contentMappedParseCacheKeyForDuplicate(file *compiler.DuplicateSourceFile) ContentMappedParseCacheKey {
	return ContentMappedParseCacheKey{SourceFileParseOptions: file.ContentMapperParseOptions, Hash: file.Hash}
}

type ParseCache = RefCountCache[ParseCacheKey, *ast.SourceFile, FileHandle]

func NewParseCache(options RefCountCacheOptions) *ParseCache {
	return NewRefCountCache(
		options,
		func(key ParseCacheKey, fh FileHandle) *ast.SourceFile {
			file := parser.ParseSourceFile(key.SourceFileParseOptions, fh.Content(), key.ScriptKind)
			file.Hash = fh.Hash()
			binder.BindSourceFile(file)
			return file
		},
	)
}

type ContentMappedParseCache struct {
	// One reference owns the canonical file and all supplemental files as a bundle. Callers ref and
	// deref the canonical file only.
	*RefCountCache[ContentMappedParseCacheKey, contentmapper.SourceFiles, struct{}]
}

func NewContentMappedParseCache(options RefCountCacheOptions) *ContentMappedParseCache {
	return &ContentMappedParseCache{RefCountCache: NewRefCountCache(options, func(ContentMappedParseCacheKey, struct{}) contentmapper.SourceFiles {
		panic("content-mapped source files must be produced with AcquireOrError")
	})}
}
