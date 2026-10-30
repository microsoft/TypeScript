package checker

import (
	"math/bits"
	"math/rand/v2"
	"testing"

	"gotest.tools/v3/assert"
)

func instantiationCountRegistersOf(s *instantiationCount) [instantiationCountRegisters]uint8 {
	var registers [instantiationCountRegisters]uint8
	if s.dense != nil {
		return *s.dense
	}
	for _, e := range s.sparse {
		if e != 0 {
			registers[e>>8] = uint8(e)
		}
	}
	return registers
}

func TestInstantiationCountIndependentOfOrder(t *testing.T) {
	t.Parallel()
	rng := rand.New(rand.NewPCG(1, 2))
	for _, n := range []int{0, 1, 2, 5, instantiationCountSparse, instantiationCountSparse + 1, 20, 200, 5000} {
		hashes := make([]uint64, n)
		for i := range hashes {
			hashes[i] = rng.Uint64()
		}
		var want [instantiationCountRegisters]uint8
		wantInverse := uint64(0)
		for _, h := range hashes {
			i := h >> (64 - instantiationCountIndexBits)
			want[i] = max(want[i], min(uint8(bits.LeadingZeros64(h<<instantiationCountIndexBits|1<<(instantiationCountIndexBits-1))+1), instantiationCountMaxRank))
		}
		for _, r := range want {
			wantInverse += 1 << (instantiationCountMaxRank - r)
		}
		for range 4 {
			rng.Shuffle(len(hashes), func(i, j int) { hashes[i], hashes[j] = hashes[j], hashes[i] })
			// Split the additions between two counts and merge them, so
			// merging sparse and dense counts both ways is covered.
			split := rng.IntN(n + 1)
			a, b := newInstantiationCount(), newInstantiationCount()
			for _, h := range hashes[:split] {
				a.add(h)
			}
			for _, h := range hashes[split:] {
				b.add(h)
			}
			c := a.clone()
			c.merge(b)
			b.merge(a)
			for _, s := range []*instantiationCount{b, c} {
				assert.Equal(t, instantiationCountRegistersOf(s), want)
				assert.Equal(t, s.inverse, wantInverse)
			}
		}
	}
}
