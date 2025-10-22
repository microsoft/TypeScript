package packagejson

import (
	json "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

type HeaderFields struct {
	Name    Expected[string] `json:"name"`
	Version Expected[string] `json:"version"`
	Type    Expected[string] `json:"type"`
}

type PathFields struct {
	TSConfig      Expected[string] `json:"tsconfig"`
	Main          Expected[string] `json:"main"`
	Types         Expected[string] `json:"types"`
	Typings       Expected[string] `json:"typings"`
	TypesVersions JSONValue        `json:"typesVersions"`
	Imports       ExportsOrImports `json:"imports"`
	Exports       ExportsOrImports `json:"exports"`
}

type DependencyFields struct {
	Dependencies         Expected[map[string]string] `json:"dependencies"`
	DevDependencies      Expected[map[string]string] `json:"devDependencies"`
	PeerDependencies     Expected[map[string]string] `json:"peerDependencies"`
	OptionalDependencies Expected[map[string]string] `json:"optionalDependencies"`
}

// HasDependency returns true if the package.json has a dependency with the given name
// under any of the dependency fields (dependencies, devDependencies, peerDependencies,
// optionalDependencies).
func (df *DependencyFields) HasDependency(name string) bool {
	if deps, ok := df.Dependencies.GetValue(); ok {
		if _, ok := deps[name]; ok {
			return true
		}
	}
	if devDeps, ok := df.DevDependencies.GetValue(); ok {
		if _, ok := devDeps[name]; ok {
			return true
		}
	}
	if peerDeps, ok := df.PeerDependencies.GetValue(); ok {
		if _, ok := peerDeps[name]; ok {
			return true
		}
	}
	if optDeps, ok := df.OptionalDependencies.GetValue(); ok {
		if _, ok := optDeps[name]; ok {
			return true
		}
	}
	return false
}

type Fields struct {
	HeaderFields
	PathFields
	DependencyFields
}

func Parse(data []byte) (Fields, error) {
	var f Fields
	if err := json.Unmarshal(data, &f, jsontext.AllowDuplicateNames(true)); err != nil {
		return Fields{}, err
	}
	return f, nil
}
