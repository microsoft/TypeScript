package tspath

import (
	"encoding/hex"
	"strings"
	"unicode/utf8"
)

const (
	DynamicURIFileNamePrefix              = "^/~ts-uri-v2~/"
	dynamicURIPathSegmentEscapePrefix     = "~ts-uri~v2~"
	dynamicURIModuleSpecifierEscapePrefix = "~ts-uri-spec~v2~"
	dynamicURINoPathEscapePrefix          = "~ts-uri-no-path~v2~"
)

func IsEncodedDynamicFileName(path string) bool {
	return strings.HasPrefix(path, DynamicURIFileNamePrefix)
}

func canonicalDynamicURIPath(path string) string {
	if IsEncodedDynamicFileName(path) &&
		GetRootLength(path) == len(path) &&
		!HasTrailingDirectorySeparator(path) {
		return path + string(DirectorySeparator)
	}
	return path
}

func EncodeDynamicURIPath(path string) string {
	return encodeDynamicURIPathRootAware(path, true)
}

func EncodeDynamicURIPathWithSuffix(path string, suffix string) string {
	if suffix == "" {
		return EncodeDynamicURIPath(path)
	}
	slash := strings.LastIndexByte(path, '/')
	var before string
	if slash != -1 {
		before = EncodeDynamicURIDirectoryPath(path[:slash]) + "/"
	}
	return before + forceEncodeDynamicURIPathSegmentWithSuffix(path[slash+1:], suffix)
}

func EncodeDynamicURIDirectoryPath(path string) string {
	return encodeDynamicURIPathRootAware(path, false)
}

func encodeDynamicURIPathRootAware(path string, preserveFinalExtension bool) string {
	encoded := encodeDynamicURIPath(path, preserveFinalExtension)
	if !PathIsAbsolute(encoded) {
		return encoded
	}
	first, rest, found := strings.Cut(encoded, "/")
	if !found {
		return forceEncodeDynamicURIPathSegment(first, preserveFinalExtension)
	}
	return forceEncodeDynamicURIPathSegment(first, false) + "/" + rest
}

func EncodeDynamicRelativeURIPath(path string) string {
	return encodeDynamicRelativeURIPath(path, true)
}

func EncodeDynamicRelativeURIDirectoryPath(path string) string {
	return encodeDynamicRelativeURIPath(path, false)
}

func encodeDynamicRelativeURIPath(path string, preserveFinalExtension bool) string {
	return encodeDynamicURIPathRootAware(path, preserveFinalExtension)
}

func encodeDynamicURIPath(path string, preserveFinalExtension bool) string {
	if !dynamicURIPathNeedsEncoding(path) {
		return path
	}

	var result strings.Builder
	result.Grow(len(path) + len(dynamicURIPathSegmentEscapePrefix))
	for {
		segment, rest, found := strings.Cut(path, "/")
		result.WriteString(encodeDynamicURIPathSegment(segment, preserveFinalExtension && !found))
		if !found {
			return result.String()
		}
		result.WriteByte('/')
		path = rest
	}
}

func ForceEncodeDynamicURIPathSegment(segment string, preserveExtension bool) string {
	return forceEncodeDynamicURIPathSegment(segment, preserveExtension)
}

func EncodeDynamicModuleSpecifier(specifier string) string {
	return encodeDynamicModuleSpecifier(specifier, true)
}

func EncodeDynamicDirectorySpecifier(specifier string) string {
	return encodeDynamicModuleSpecifier(specifier, false)
}

func encodeDynamicModuleSpecifier(specifier string, preserveFinalExtension bool) string {
	if !strings.Contains(specifier, dynamicURIPathSegmentEscapePrefix) &&
		!strings.Contains(specifier, dynamicURIModuleSpecifierEscapePrefix) {
		return specifier
	}

	var result strings.Builder
	result.Grow(len(specifier) + len(dynamicURIPathSegmentEscapePrefix))
	for {
		separator := strings.IndexAny(specifier, `/\`)
		if separator == -1 {
			result.WriteString(encodeDynamicModuleSpecifierSegment(specifier, preserveFinalExtension))
			return result.String()
		}
		result.WriteString(encodeDynamicModuleSpecifierSegment(specifier[:separator], false))
		result.WriteByte(specifier[separator])
		specifier = specifier[separator+1:]
	}
}

func encodeDynamicModuleSpecifierSegment(segment string, preserveExtension bool) string {
	if encoded, ok := strings.CutPrefix(segment, dynamicURIModuleSpecifierEscapePrefix); ok {
		physical := dynamicURIPathSegmentEscapePrefix + encoded
		if DecodeDynamicURIPathSegment(physical) != physical {
			return physical
		}
	}
	if strings.HasPrefix(segment, dynamicURIPathSegmentEscapePrefix) {
		return forceEncodeDynamicURIPathSegment(segment, preserveExtension)
	}
	return segment
}

func DynamicURIPathToModuleSpecifier(path string) string {
	if !strings.Contains(path, dynamicURIPathSegmentEscapePrefix) {
		return path
	}
	segments := strings.Split(path, "/")
	for i, segment := range segments {
		if strings.HasPrefix(segment, dynamicURIPathSegmentEscapePrefix) &&
			DecodeDynamicURIPathSegment(segment) != segment {
			segments[i] = dynamicURIModuleSpecifierEscapePrefix +
				strings.TrimPrefix(segment, dynamicURIPathSegmentEscapePrefix)
		}
	}
	return strings.Join(segments, "/")
}

func EncodeDynamicLogicalModuleSpecifier(specifier string) string {
	if specifier == "" {
		return ""
	}
	trailingSeparator := HasTrailingDirectorySeparator(specifier)
	if trailingSeparator {
		specifier = RemoveTrailingDirectorySeparator(specifier)
	}
	encoded := DynamicURIPathToModuleSpecifier(EncodeDynamicRelativeURIPath(specifier))
	if trailingSeparator {
		encoded += string(DirectorySeparator)
	}
	return encoded
}

func dynamicURIPathNeedsEncoding(path string) bool {
	for {
		segment, rest, found := strings.Cut(path, "/")
		if dynamicURIPathSegmentNeedsEncoding(segment) {
			return true
		}
		if !found {
			return false
		}
		path = rest
	}
}

func encodeDynamicURIPathSegment(segment string, preserveExtension bool) string {
	if dynamicURIPathSegmentNeedsEncoding(segment) {
		return forceEncodeDynamicURIPathSegment(segment, preserveExtension)
	}
	return segment
}

func dynamicURIPathSegmentNeedsEncoding(segment string) bool {
	return segment == "" ||
		segment == "." ||
		segment == ".." ||
		strings.HasPrefix(segment, dynamicURIPathSegmentEscapePrefix) ||
		strings.HasPrefix(segment, dynamicURIModuleSpecifierEscapePrefix) ||
		strings.HasPrefix(segment, dynamicURINoPathEscapePrefix) ||
		strings.IndexByte(segment, '\\') != -1
}

func EncodeDynamicURINoPath(suffix string) string {
	return dynamicURINoPathEscapePrefix + hex.EncodeToString([]byte(suffix)) + "~"
}

func DecodeDynamicURINoPath(path string) (string, bool) {
	encoded, ok := strings.CutPrefix(path, dynamicURINoPathEscapePrefix)
	if !ok {
		return "", false
	}
	encoded, rest, ok := strings.Cut(encoded, "~")
	if !ok || rest != "" {
		return "", false
	}
	decoded, err := hex.DecodeString(encoded)
	if err != nil || !utf8.Valid(decoded) {
		return "", false
	}
	return string(decoded), true
}

func forceEncodeDynamicURIPathSegment(segment string, preserveExtension bool) string {
	var extension string
	if preserveExtension && segment != "." && segment != ".." {
		segment, extension = splitDynamicURIFileExtension(segment)
	}
	return dynamicURIPathSegmentEscapePrefix + hex.EncodeToString([]byte(segment)) + "~" + extension
}

func forceEncodeDynamicURIPathSegmentWithSuffix(segment string, suffix string) string {
	segment, extension := splitDynamicURIFileExtension(segment)
	payload := segment + "\x00" + suffix
	return dynamicURIPathSegmentEscapePrefix + hex.EncodeToString([]byte(payload)) + "~" + extension
}

func splitDynamicURIFileExtension(segment string) (base string, extension string) {
	baseName := segment[strings.LastIndexByte(segment, '\\')+1:]
	extension = GetDeclarationFileExtension(baseName)
	if extension == "" {
		extension = GetAnyExtensionFromPath(baseName, nil, CaseSensitive)
	}
	if extension != "" {
		segment = segment[:len(segment)-len(extension)]
	}
	return segment, extension
}

func DecodeDynamicURIPath(path string) string {
	if !strings.Contains(path, dynamicURIPathSegmentEscapePrefix) {
		return path
	}
	segments := strings.Split(path, "/")
	for i, segment := range segments {
		segments[i] = DecodeDynamicURIPathSegment(segment)
	}
	return strings.Join(segments, "/")
}

func DecodeDynamicURIPathForDisk(path string) (string, bool) {
	decoded := DecodeDynamicURIPath(path)
	if PathIsAbsolute(decoded) {
		return "", false
	}
	remaining := decoded
	for {
		segment, rest, found := strings.Cut(remaining, "/")
		if segment == "" {
			if !found {
				return decoded, true
			}
			return "", false
		}
		if segment == "." || segment == ".." || strings.IndexByte(segment, '\\') != -1 {
			return "", false
		}
		if !found {
			return decoded, true
		}
		remaining = rest
	}
}

func DecodeDynamicURIPathSegment(segment string) string {
	encoded, ok := strings.CutPrefix(segment, dynamicURIPathSegmentEscapePrefix)
	if !ok {
		return segment
	}
	encoded, extension, ok := strings.Cut(encoded, "~")
	if !ok {
		return segment
	}
	decoded, err := hex.DecodeString(encoded)
	if err != nil || !utf8.Valid(decoded) {
		return segment
	}
	if base, suffix, ok := strings.Cut(string(decoded), "\x00"); ok {
		return base + extension + suffix
	}
	return string(decoded) + extension
}
