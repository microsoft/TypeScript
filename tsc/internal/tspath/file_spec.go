package tspath

// FileSpec is a file name as written in a configuration file.
// It may be relative and may contain ${configDir}.
type FileSpec string

func ToFileSpec(value string) FileSpec {
	return FileSpec(value)
}

func (s FileSpec) AsString() string {
	return string(s)
}

// PathPattern is an include or exclude pattern as written in configuration.
// It may be relative, rooted, or contain wildcards and ${configDir}.
type PathPattern string

func ToPathPattern(value string) PathPattern {
	return PathPattern(value)
}

func (p PathPattern) AsString() string {
	return string(p)
}
