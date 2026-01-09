package autoimport

import (
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/core"
)

// Named is a constraint for types that can provide their name.
type Named interface {
	Name() string
}

// Index stores entries with an index mapping uppercase letters to entries whose name
// starts with that letter, and lowercase letters to entries whose name contains a
// word starting with that letter.
type Index[T Named] struct {
	entries []T
	index   map[rune][]int
}

func (idx *Index[T]) Find(name string, caseSensitive bool) []T {
	if len(idx.entries) == 0 || len(name) == 0 {
		return nil
	}
	firstRune := core.FirstResult(utf8.DecodeRuneInString(name))
	if firstRune == utf8.RuneError {
		return nil
	}
	firstRuneUpper := unicode.ToUpper(firstRune)
	candidates, ok := idx.index[firstRuneUpper]
	if !ok {
		return nil
	}

	var results []T
	for _, entryIndex := range candidates {
		entry := idx.entries[entryIndex]
		entryName := entry.Name()
		if (caseSensitive && entryName == name) || (!caseSensitive && strings.EqualFold(entryName, name)) {
			results = append(results, entry)
		}
	}

	return results
}

// SearchWordPrefix returns each entry whose name contains a word beginning with
// the first character of 'prefix', and whose name contains all characters
// of 'prefix' in order (case-insensitive). If 'filter' is provided, only entries
// for which filter(entry) returns true are included.
func (idx *Index[T]) SearchWordPrefix(prefix string) []T {
	if len(idx.entries) == 0 {
		return nil
	}

	if len(prefix) == 0 {
		return idx.entries
	}

	prefix = strings.ToLower(prefix)
	firstRune, _ := utf8.DecodeRuneInString(prefix)
	if firstRune == utf8.RuneError {
		return nil
	}

	firstRuneUpper := unicode.ToUpper(firstRune)
	firstRuneLower := unicode.ToLower(firstRune)

	// Look up entries that have words starting with this letter
	var wordStarts []int
	nameStarts, _ := idx.index[firstRuneUpper]
	if firstRuneUpper != firstRuneLower {
		wordStarts, _ = idx.index[firstRuneLower]
	}
	count := len(nameStarts) + len(wordStarts)
	if count == 0 {
		return nil
	}

	// Filter entries by checking if they contain all characters in order
	results := make([]T, 0, count)
	for _, starts := range [][]int{nameStarts, wordStarts} {
		for _, i := range starts {
			entry := idx.entries[i]
			if containsCharsInOrder(entry.Name(), prefix) {
				results = append(results, entry)
			}
		}
	}
	return results
}

// containsCharsInOrder checks if str contains all characters from pattern in order (case-insensitive).
func containsCharsInOrder(str, pattern string) bool {
	str = strings.ToLower(str)
	pattern = strings.ToLower(pattern)

	patternIdx := 0
	for _, ch := range str {
		if patternIdx < len(pattern) {
			patternRune, size := utf8.DecodeRuneInString(pattern[patternIdx:])
			if ch == patternRune {
				patternIdx += size
			}
		}
	}
	return patternIdx == len(pattern)
}

// insertAsWords adds a value to the index keyed by the first letter of each word in its name.
func (idx *Index[T]) insertAsWords(value T) {
	if idx.index == nil {
		idx.index = make(map[rune][]int)
	}

	name := value.Name()
	if len(name) == 0 {
		panic("Cannot index entry with empty name")
	}
	entryIndex := len(idx.entries)
	idx.entries = append(idx.entries, value)

	indices := wordIndices(name)
	seenRunes := make(map[rune]bool)

	for i, start := range indices {
		substr := name[start:]
		firstRune, _ := utf8.DecodeRuneInString(substr)
		if firstRune == utf8.RuneError {
			continue
		}
		if i == 0 {
			// Name start keyed by uppercase
			firstRune = unicode.ToUpper(firstRune)
			idx.index[firstRune] = append(idx.index[firstRune], entryIndex)
			seenRunes[firstRune] = true // (Still set seenRunes in case first character is non-alphabetic)
		} else {
			// Subsequent word starts keyed by lowercase
			firstRune = unicode.ToLower(firstRune)
			if !seenRunes[firstRune] {
				idx.index[firstRune] = append(idx.index[firstRune], entryIndex)
				seenRunes[firstRune] = true
			}
		}
	}
}

// Clone creates a new Index containing only entries for which filter returns true.
func (idx *Index[T]) Clone(filter func(T) bool) *Index[T] {
	if idx == nil {
		return nil
	}

	newIdx := &Index[T]{
		entries: make([]T, 0, len(idx.entries)),
		index:   make(map[rune][]int, len(idx.index)),
	}

	// Build mapping from old index to new index for filtered entries
	oldToNew := make(map[int]int, len(idx.entries))
	for oldIndex, entry := range idx.entries {
		if filter(entry) {
			newIndex := len(newIdx.entries)
			newIdx.entries = append(newIdx.entries, entry)
			oldToNew[oldIndex] = newIndex
		}
	}

	// Rebuild the index with remapped indices
	for r, oldIndices := range idx.index {
		newIndices := make([]int, 0, len(oldIndices))
		for _, oldIndex := range oldIndices {
			if newIndex, ok := oldToNew[oldIndex]; ok {
				newIndices = append(newIndices, newIndex)
			}
		}
		if len(newIndices) > 0 {
			newIdx.index[r] = newIndices
		}
	}

	return newIdx
}
