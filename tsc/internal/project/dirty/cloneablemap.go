package dirty

import "maps"

type CloneableMap[K comparable, V any] map[K]V

func (m CloneableMap[K, V]) Clone() CloneableMap[K, V] {
	return maps.Clone(m)
}
