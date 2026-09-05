package tspath

// ModuleSpecifier is source text that identifies a module. It is a semantic tag,
// not a filesystem path invariant, and is intentionally outside the typed-path
// conversion lattice described in doc.go.
type ModuleSpecifier string

func ToModuleSpecifier(specifier string) ModuleSpecifier {
	return ModuleSpecifier(specifier)
}

func (s ModuleSpecifier) AsString() string {
	return string(s)
}

func (s ModuleSpecifier) IsAbsolute() bool {
	return PathIsAbsolute(string(s))
}

func (s ModuleSpecifier) IsRelative() bool {
	return PathIsRelative(string(s))
}

func (s ModuleSpecifier) Resolve(parts ...string) ModuleSpecifier {
	return ModuleSpecifier(ResolvePathWithoutTrailingDirectorySeparator(string(s), parts...))
}

func (s ModuleSpecifier) ResolveRelative(path RelativePath) ModuleSpecifier {
	return s.Resolve(path.AsString())
}

func (s ModuleSpecifier) CombineRelative(path RelativePath) ModuleSpecifier {
	return ModuleSpecifier(CombinePaths(string(s), path.AsString()))
}

func (s ModuleSpecifier) RemoveFileExtension() ModuleSpecifier {
	return ModuleSpecifier(RemoveFileExtension(string(s)))
}
