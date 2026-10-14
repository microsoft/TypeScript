package checker

import (
	"strconv"
	"testing"

	"gotest.tools/v3/assert"
)

func TestSubtypeRelationImplications(t *testing.T) {
	t.Parallel()

	subtype, strictSubtype, _, _, _ := newRelations()
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

	subtype, strictSubtype, _, _, _ := newRelations()
	key := CacheHashKey{Lo: 1}

	strictSubtype.set(key, RelationComparisonResultSucceeded)
	subtype.set(key, RelationComparisonResultFailed)

	assert.Equal(t, subtype.get(key), RelationComparisonResultFailed)
	assert.Equal(t, strictSubtype.get(key), RelationComparisonResultSucceeded)
}

func TestPackedRelationImplicationsAreLazy(t *testing.T) {
	t.Parallel()

	t.Run("success", func(t *testing.T) {
		t.Parallel()

		subtype, strictSubtype, assignable, comparableRelation, identity := newRelations()
		key := CacheHashKey{Lo: 1}
		result := RelationComparisonResultSucceeded | RelationComparisonResultReportsUnreliable

		identity.set(key, result)
		assert.Equal(t, identity.size(), 1)
		assert.Equal(t, strictSubtype.size(), 0)
		assert.Equal(t, subtype.size(), 0)
		assert.Equal(t, assignable.size(), 0)
		assert.Equal(t, comparableRelation.size(), 0)

		assert.Equal(t, assignable.get(key), result)
		assert.Equal(t, identity.size(), 1)
		assert.Equal(t, strictSubtype.size(), 0)
		assert.Equal(t, subtype.size(), 0)
		assert.Equal(t, assignable.size(), 1)
		assert.Equal(t, comparableRelation.size(), 0)

		assert.Equal(t, assignable.get(key), result)
		assert.Equal(t, assignable.size(), 1)
	})

	t.Run("failure", func(t *testing.T) {
		t.Parallel()

		subtype, strictSubtype, assignable, comparableRelation, identity := newRelations()
		key := CacheHashKey{Lo: 1}
		result := RelationComparisonResultFailed | RelationComparisonResultReportsUnmeasurable

		comparableRelation.set(key, result)
		assert.Equal(t, identity.size(), 0)
		assert.Equal(t, strictSubtype.size(), 0)
		assert.Equal(t, subtype.size(), 0)
		assert.Equal(t, assignable.size(), 0)
		assert.Equal(t, comparableRelation.size(), 1)

		assert.Equal(t, strictSubtype.get(key), result)
		assert.Equal(t, identity.size(), 0)
		assert.Equal(t, strictSubtype.size(), 1)
		assert.Equal(t, subtype.size(), 0)
		assert.Equal(t, assignable.size(), 0)
		assert.Equal(t, comparableRelation.size(), 1)

		assert.Equal(t, strictSubtype.get(key), result)
		assert.Equal(t, strictSubtype.size(), 1)
	})
}

func TestIdentityRelationDoesNotCountDirectionalImplication(t *testing.T) {
	t.Parallel()

	_, _, assignable, _, identity := newRelations()
	lowerId := &Type{id: 1}
	higherId := &Type{id: 2}
	directionalKey, _ := getRelationKey(higherId, lowerId, IntersectionStateNone, false, false)
	identityKey, _ := getRelationKey(higherId, lowerId, IntersectionStateNone, true, false)

	assert.Assert(t, directionalKey != identityKey)
	assignable.set(directionalKey, RelationComparisonResultFailed)

	assert.Equal(t, identity.size(), 0)
	assert.Equal(t, identity.get(identityKey), RelationComparisonResultNone)
	assert.Equal(t, identity.size(), 0)
}

func TestIndependentRelationCache(t *testing.T) {
	t.Parallel()

	relation, _, _, _, _ := newRelations()
	key := CacheHashKey{Lo: 1}

	relation.set(key, RelationComparisonResultSucceeded)
	assert.Equal(t, relation.get(key), RelationComparisonResultSucceeded)
	assert.Equal(t, relation.size(), 1)
}

func TestPackedRelationSlots(t *testing.T) {
	t.Parallel()

	subtype, strictSubtype, assignable, comparableRelation, identity := newRelations()
	key := CacheHashKey{Lo: 1}
	relations := []*Relation{subtype, strictSubtype, assignable, comparableRelation, identity}
	results := []RelationComparisonResult{
		RelationComparisonResultSucceeded,
		RelationComparisonResultFailed,
		RelationComparisonResultSucceeded | RelationComparisonResultReportsUnmeasurable,
		RelationComparisonResultFailed | RelationComparisonResultReportsUnreliable,
		RelationComparisonResultFailed | RelationComparisonResultComplexityOverflow,
	}

	for index, relation := range relations {
		relation.set(key, results[index])
	}
	for index, relation := range relations {
		assert.Equal(t, relation.get(key), results[index])
		assert.Equal(t, relation.size(), 1)
	}
	assert.Equal(t, len(subtype.packedResults.results), 1)
}

func TestPackedRelationImplications(t *testing.T) {
	t.Parallel()

	for sourceRank := range packedRelationCount {
		t.Run("success/"+strconv.Itoa(sourceRank), func(t *testing.T) {
			t.Parallel()

			subtype, strictSubtype, assignable, comparableRelation, identity := newRelations()
			relations := []*Relation{identity, strictSubtype, subtype, assignable, comparableRelation}
			key := CacheHashKey{Lo: 1}
			result := RelationComparisonResultSucceeded | RelationComparisonResultReportsUnreliable
			relations[sourceRank].set(key, result)
			for rank, relation := range relations {
				expected := RelationComparisonResultNone
				if rank >= sourceRank {
					expected = result
				}
				assert.Equal(t, relation.get(key), expected)
			}
		})

		t.Run("failure/"+strconv.Itoa(sourceRank), func(t *testing.T) {
			t.Parallel()

			subtype, strictSubtype, assignable, comparableRelation, identity := newRelations()
			relations := []*Relation{identity, strictSubtype, subtype, assignable, comparableRelation}
			key := CacheHashKey{Lo: 1}
			result := RelationComparisonResultFailed | RelationComparisonResultReportsUnmeasurable
			relations[sourceRank].set(key, result)
			for rank, relation := range relations {
				expected := RelationComparisonResultNone
				if rank <= sourceRank {
					expected = result
				}
				assert.Equal(t, relation.get(key), expected)
			}
		})
	}
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
			new: func() (*Relation, *Relation) {
				subtype, _, _, _, _ := newRelations()
				strictSubtype, _, _, _, _ := newRelations()
				return subtype, strictSubtype
			},
		},
		{
			name: "packed",
			new: func() (*Relation, *Relation) {
				subtype, strictSubtype, _, _, _ := newRelations()
				return subtype, strictSubtype
			},
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
