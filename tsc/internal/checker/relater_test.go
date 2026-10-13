package checker

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestSubtypeRelationImplications(t *testing.T) {
	t.Parallel()

	subtype, strictSubtype := newSubtypeRelationPair()
	strictSuccessKey := CacheHashKey{Lo: 1}
	strictFailureKey := CacheHashKey{Lo: 2}
	subtypeSuccessKey := CacheHashKey{Lo: 3}
	subtypeFailureKey := CacheHashKey{Lo: 4}
	subtypeOverflowKey := CacheHashKey{Lo: 5}

	strictSubtype.set(strictSuccessKey, RelationComparisonResultSucceeded|RelationComparisonResultReportsUnreliable)
	strictSubtype.set(strictFailureKey, RelationComparisonResultFailed)
	subtype.set(subtypeSuccessKey, RelationComparisonResultSucceeded)
	subtype.set(subtypeFailureKey, RelationComparisonResultFailed|RelationComparisonResultReportsUnmeasurable)
	subtype.set(subtypeOverflowKey, RelationComparisonResultFailed|RelationComparisonResultComplexityOverflow)

	assert.Equal(t, subtype.get(strictSuccessKey), RelationComparisonResultSucceeded|RelationComparisonResultReportsUnreliable)
	assert.Equal(t, subtype.get(strictFailureKey), RelationComparisonResultNone)
	assert.Equal(t, strictSubtype.get(subtypeSuccessKey), RelationComparisonResultNone)
	assert.Equal(t, strictSubtype.get(subtypeFailureKey), RelationComparisonResultFailed|RelationComparisonResultReportsUnmeasurable)
	assert.Equal(t, strictSubtype.get(subtypeOverflowKey), RelationComparisonResultNone)
	assert.Equal(t, subtype.size(), 4)
	assert.Equal(t, strictSubtype.size(), 3)
	assert.Equal(t, len(subtype.packedResults.results), 5)
}

func TestSubtypeRelationLocalResultTakesPrecedence(t *testing.T) {
	t.Parallel()

	subtype, strictSubtype := newSubtypeRelationPair()
	key := CacheHashKey{Lo: 1}

	strictSubtype.set(key, RelationComparisonResultSucceeded)
	subtype.set(key, RelationComparisonResultFailed)

	assert.Equal(t, subtype.get(key), RelationComparisonResultFailed)
	assert.Equal(t, strictSubtype.get(key), RelationComparisonResultSucceeded)
}

func TestIndependentRelationCache(t *testing.T) {
	t.Parallel()

	relation := &Relation{}
	key := CacheHashKey{Lo: 1}

	relation.set(key, RelationComparisonResultSucceeded)
	assert.Equal(t, relation.get(key), RelationComparisonResultSucceeded)
	assert.Equal(t, relation.size(), 1)
}

func BenchmarkSubtypeRelationCacheStorage(b *testing.B) {
	const (
		subtypeSize       = 277_973
		strictSubtypeSize = 262_657
		intersection      = 90_772
		differingResults  = 333
	)

	for _, test := range []struct {
		name string
		new  func() (*Relation, *Relation)
	}{
		{
			name: "independent",
			new:  func() (*Relation, *Relation) { return &Relation{}, &Relation{} },
		},
		{
			name: "packed",
			new:  newSubtypeRelationPair,
		},
	} {
		b.Run(test.name, func(b *testing.B) {
			b.ReportAllocs()
			for b.Loop() {
				subtype, strictSubtype := test.new()
				for i := range subtypeSize {
					subtype.set(CacheHashKey{Lo: uint64(i)}, RelationComparisonResultFailed)
				}
				for i := range intersection {
					result := RelationComparisonResultFailed
					if i < differingResults {
						result = RelationComparisonResultSucceeded
					}
					strictSubtype.set(CacheHashKey{Lo: uint64(i)}, result)
				}
				for i := intersection; i < strictSubtypeSize; i++ {
					strictSubtype.set(CacheHashKey{Lo: uint64(subtypeSize + i - intersection)}, RelationComparisonResultFailed)
				}
			}
		})
	}
}
