package tspath

// SourceMapLocation is a slash-normalized source-map location. It may be relative,
// rooted, or URL-like; the zero value means no map root was specified.
type SourceMapLocation string

func ToSourceMapLocation(path string) SourceMapLocation {
	return SourceMapLocation(NormalizeSlashes(path))
}

func (r *SourceMapLocation) UnmarshalText(text []byte) error {
	*r = ToSourceMapLocation(string(text))
	return nil
}

func (r SourceMapLocation) MarshalText() ([]byte, error) {
	return []byte(r), nil
}

func (r SourceMapLocation) AsString() string {
	return string(r)
}

func (r SourceMapLocation) IsRelative() bool {
	return GetRootLength(string(r)) == 0
}

func (r SourceMapLocation) ResolveDirectory(relativeBase RootedDirectoryPath, currentDirectory RootedDirectoryPath) RootedDirectoryPath {
	if r == "" {
		panic("cannot resolve an empty source map root")
	}
	if r.IsRelative() {
		return relativeBase.ResolveDirectory(string(r))
	}
	return ToRootedDirectoryPath(string(r), currentDirectory)
}
