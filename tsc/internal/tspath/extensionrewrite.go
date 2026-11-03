package tspath

type ExtensionRewrite struct {
	Source string
	Target string
}

func getExtensionRewrite(path string, rewrites []ExtensionRewrite, caseSensitivity CaseSensitivity) (ExtensionRewrite, bool) {
	equal := caseSensitivity.getEqualityComparer()
	for _, rewrite := range rewrites {
		if len(path) <= len(rewrite.Source) {
			continue
		}
		if equal(path[len(path)-len(rewrite.Source):], rewrite.Source) {
			return rewrite, true
		}
	}
	return ExtensionRewrite{}, false
}

func (f RootedFilePath) RewriteExtension(rewrites []ExtensionRewrite, caseSensitivity CaseSensitivity) (RootedFilePath, bool) {
	rewrite, ok := getExtensionRewrite(f.AsString(), rewrites, caseSensitivity)
	if !ok {
		return f, false
	}
	suffix := f.AsString()[len(f.AsString())-len(rewrite.Source):]
	return f.RemoveExtension(suffix).AppendSuffix(rewrite.Target), true
}

func (s ModuleSpecifier) RewriteExtension(rewrites []ExtensionRewrite, caseSensitivity CaseSensitivity) (ModuleSpecifier, bool) {
	rewrite, ok := getExtensionRewrite(s.AsString(), rewrites, caseSensitivity)
	if !ok {
		return s, false
	}
	return ToModuleSpecifier(s.AsString()[:len(s.AsString())-len(rewrite.Source)] + rewrite.Target), true
}

func (s ModuleSpecifier) ShouldRewriteExtension(rewrites []ExtensionRewrite, caseSensitivity CaseSensitivity) bool {
	if !s.IsRelative() || IsDeclarationFileName(s.AsString()) {
		return false
	}
	_, ok := getExtensionRewrite(s.AsString(), rewrites, caseSensitivity)
	return ok || HasTSFileExtension(s.AsString())
}
