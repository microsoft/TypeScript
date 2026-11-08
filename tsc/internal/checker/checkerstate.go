package checker

import (
	"fmt"
	"reflect"
)

// checkerProgressFields are the fields of Checker holding the state of the
// computations in progress. Between requests it is at rest, as the next
// request would read anything one request left there. See
// TestCachedStateIsMemoized for the other fields of Checker.
var checkerProgressFields = []string{
	"activeMappers",
	"activeTypeMappersCaches",
	"antecedentTypes",
	"baseConstraintWalk",
	"checking",
	"circularityMark",
	"circularityStart",
	"conditionalConstraintDepth",
	"contextualInfos",
	"contextualParameterAssignments",
	"ctx",
	"currentNode",
	"currentNodeErrorCollectors",
	"currentNodeErrors",
	"currentNodeErrorsCyclic",
	"currentNodeResolution",
	"cycleParticipants",
	"cycleYields",
	"deferredAttach",
	"discardLog",
	"discardLogFloor",
	"effectsMarkDepth",
	"flowLoopStack",
	"flowTypeCache",
	"inferenceContextInfos",
	"inlineLevel",
	"innerCycles",
	"instantiationStack",
	"markingForEmit",
	"memoTop",
	"observedHead",
	"observingMemos",
	"parametersAssigning",
	"queryRoot",
	"querySave",
	"recordingFromCheck",
	"reliabilityFlags",
	"request",
	"resolutionStart",
	"resolutions",
	"resolving",
	"resolvingObjectTypeStack",
	"reverseExpandingFlags",
	"reverseMappedSourceStack",
	"reverseMappedStart",
	"reverseMappedTargetStack",
	"serializationLevel",
	"sharedFlows",
	"signaturesResolving",
	"typeResolutionTop",
	"varianceCycleRoot",
	"varianceProvisional",
	"varianceStack",
	"varianceSuperseded",
	"varianceTypeParameter",
	"visibleSignatures",
	"visibleStart",
	"withinUnreachableCode",
}

// AssertAtRest panics if the state of the computations in progress is not at
// rest, as it must be between requests.
func (c *Checker) AssertAtRest() {
	v := reflect.ValueOf(c).Elem()
	for _, name := range checkerProgressFields {
		f := v.FieldByName(name)
		var rest bool
		switch name {
		case "resolutions":
			// The root resolution, for work outside any computation.
			rest = f.Len() == 1
		case "resolving":
			rest = c.resolving.count == 0
		case "observingMemos":
			rest = f.Bool() == (!c.checking || c.memoPendingCount != 0)
		default:
			switch f.Kind() {
			case reflect.Slice, reflect.Map:
				rest = f.Len() == 0
			default:
				rest = f.IsZero()
			}
		}
		if !rest {
			panic(fmt.Sprintf("checker state %s is not at rest between requests", name))
		}
	}
}
