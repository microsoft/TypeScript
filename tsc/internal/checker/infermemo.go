package checker

import (
	"encoding/binary"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// The inference walk memo.
//
// Some walks at the top of inferTypes are long and are repeated with the same inputs, for example
// inferring from a schema constraint type to the return type of a schema combinator, once per
// call to that combinator. When every inference info is still in its initial state, a walk's
// inputs are just the source, the target, the priority, the contravariance and the type
// parameters, and its outcome is the candidates, priority and topLevel it writes to each info.
//
// A walk's outcome is stored only when the walk computed nothing new and read no transient
// state: it created no type, symbol or signature, instantiated nothing, added no diagnostic,
// observed no in-progress resolution, signature resolution, flow loop or flow type cache entry,
// and did not start inside an instantiation or variance computation. Such a walk read only
// finished values besides its inputs, so the same inputs take the same path again and write
// the same outcome. Walks shorter than inferMemoMinSteps are cheaper to repeat than to store.

const inferMemoMinSteps = 16

type inferMemoOutcome struct {
	candidates       []*Type
	contraCandidates []*Type
	priority         InferencePriority
	topLevel         bool
}

type inferMemo struct {
	entries map[string][]inferMemoOutcome
	key     []byte
	steps   uint32
}

// The checker state a walk must leave alone to be stored.
type inferMemoEffects struct {
	created                 uint32
	instantiationCount      uint32
	totalInstantiationCount uint32
	diagnostics             uint32
	transientReads          uint32
	instantiationCountReset uint32
}

func (c *Checker) inferMemoEffects() inferMemoEffects {
	return inferMemoEffects{
		created:                 c.TypeCount + c.SymbolCount + c.SignatureCount,
		instantiationCount:      c.instantiationCount,
		totalInstantiationCount: c.TotalInstantiationCount,
		diagnostics:             c.diagnosticAdds,
		transientReads:          c.transientReads,
		instantiationCountReset: c.instantiationCountResets,
	}
}

// Records that the current computation observed state that is only valid for the moment, such
// as an in-progress resolution. Results computed with such reads must not be memoized.
func (c *Checker) noteTransientRead() {
	c.transientReads++
}

func (c *Checker) inferFromTypesMemo(n *InferenceState, source *Type, target *Type) {
	m := &c.inferMemo
	// Relations made inside a variance computation report reliability to it.
	if len(c.varianceStack) != 0 || c.skipDirectInferenceNodes.Len() != 0 ||
		!core.Every(n.inferences, isInitialInferenceInfo) {
		c.inferFromTypes(n, source, target)
		return
	}
	m.key = binary.LittleEndian.AppendUint32(m.key[:0], uint32(source.id))
	m.key = binary.LittleEndian.AppendUint32(m.key, uint32(target.id))
	m.key = binary.LittleEndian.AppendUint32(m.key, uint32(n.priority))
	if n.contravariant {
		m.key = append(m.key, 1)
	} else {
		m.key = append(m.key, 0)
	}
	for _, info := range n.inferences {
		m.key = binary.LittleEndian.AppendUint32(m.key, uint32(info.typeParameter.id))
	}
	if outcomes, ok := m.entries[string(m.key)]; ok {
		changed := false
		for i, info := range n.inferences {
			outcome := &outcomes[i]
			if outcome.candidates != nil || outcome.contraCandidates != nil ||
				outcome.priority != info.priority || outcome.topLevel != info.topLevel {
				changed = true
			}
			info.candidates = outcome.candidates
			info.contraCandidates = outcome.contraCandidates
			info.priority = outcome.priority
			info.topLevel = outcome.topLevel
		}
		if changed {
			clearCachedInferences(n.inferences)
		}
		return
	}
	// The walk may infer into nested calls that reuse the key buffer.
	key := string(m.key)
	// Inside an instantiation the walk may take cached instantiations without counting them,
	// while the same walk elsewhere would make and count them.
	inInstantiation := len(c.activeMappers) != 0
	before := c.inferMemoEffects()
	stepsBefore := m.steps
	c.inferFromTypes(n, source, target)
	if m.steps-stepsBefore < inferMemoMinSteps || inInstantiation || c.inferMemoEffects() != before {
		return
	}
	outcomes := make([]inferMemoOutcome, len(n.inferences))
	for i, info := range n.inferences {
		outcomes[i] = inferMemoOutcome{
			candidates:       slices.Clip(slices.Clone(info.candidates)),
			contraCandidates: slices.Clip(slices.Clone(info.contraCandidates)),
			priority:         info.priority,
			topLevel:         info.topLevel,
		}
	}
	if m.entries == nil {
		m.entries = make(map[string][]inferMemoOutcome)
	}
	m.entries[key] = outcomes
}

func isInitialInferenceInfo(info *InferenceInfo) bool {
	return info.typeParameter != nil && info.candidates == nil && info.contraCandidates == nil && !info.isFixed &&
		info.priority == InferencePriorityMaxValue && info.topLevel && info.impliedArity == -1
}
