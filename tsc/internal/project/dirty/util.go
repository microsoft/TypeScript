package dirty

import "maps"

func CloneMapIfNil[K comparable, V any, T any](dirty *T, original *T, getMap func(*T) map[K]V) map[K]V {
	dirtyMap := getMap(dirty)
	if dirtyMap == nil {
		if original == nil {
			return make(map[K]V)
		}
		originalMap := getMap(original)
		if originalMap == nil {
			return make(map[K]V)
		}
		return maps.Clone(originalMap)
	}
	return dirtyMap
}
