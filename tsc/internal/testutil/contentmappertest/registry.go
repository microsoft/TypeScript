package contentmappertest

import (
	"errors"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/ipc"
)

const (
	TransformingMapper            = "compiler-test-mapper"
	VerbatimMapper                = "verbatim-mapper"
	ModuleVerbatimMapper          = "module-verbatim-mapper"
	DynamicVerbatimMapper         = "dynamic-verbatim-mapper"
	DiagnosticCodeCollisionMapper = "diagnostic-code-collision-mapper"
	FailingMapper                 = "failing-mapper"
	SynthesizingMapper            = "synthesizing-mapper"
	ComponentMapper               = "component-mapper"
	DuplicateMapper               = "duplicate-mapper"
	LispMapper                    = "lisp-mapper"
	SupplementalMapper            = "supplemental-mapper"
	SupplementalDiagnosticsMapper = "supplemental-diagnostics-mapper"
	SupplementalGlobalsMapper     = "supplemental-globals-mapper"
	SupplementalModuleMapper      = "supplemental-module-mapper"
	PrefixedSupplementalMapper    = "prefixed-supplemental-mapper"
	UnmappedFoldingMapper         = "unmapped-folding-mapper"
	HoistingMapper                = "hoisting-mapper"
	DuplicateProjectionMapper     = "duplicate-projection-mapper"
)

type handlerConstructor func(*ProjectLifecycle) ipc.Handler

var mapperHandlers = map[string]handlerConstructor{
	TransformingMapper:            func(*ProjectLifecycle) ipc.Handler { return &Handler{} },
	VerbatimMapper:                func(*ProjectLifecycle) ipc.Handler { return verbatimHandler{} },
	ModuleVerbatimMapper:          func(*ProjectLifecycle) ipc.Handler { return moduleVerbatimHandler{} },
	DynamicVerbatimMapper:         func(lifecycle *ProjectLifecycle) ipc.Handler { return dynamicVerbatimHandler{lifecycle: lifecycle} },
	DiagnosticCodeCollisionMapper: func(*ProjectLifecycle) ipc.Handler { return diagnosticCodeCollisionHandler{} },
	FailingMapper:                 func(*ProjectLifecycle) ipc.Handler { return failingHandler{} },
	SynthesizingMapper:            func(*ProjectLifecycle) ipc.Handler { return synthesizingHandler{} },
	ComponentMapper:               func(*ProjectLifecycle) ipc.Handler { return componentHandler{} },
	DuplicateMapper:               func(*ProjectLifecycle) ipc.Handler { return duplicateHandler{} },
	LispMapper:                    func(*ProjectLifecycle) ipc.Handler { return lispHandler{} },
	SupplementalMapper:            func(*ProjectLifecycle) ipc.Handler { return supplementalHandler{} },
	SupplementalDiagnosticsMapper: func(*ProjectLifecycle) ipc.Handler { return supplementalDiagnosticsHandler{} },
	SupplementalGlobalsMapper:     func(*ProjectLifecycle) ipc.Handler { return supplementalGlobalsHandler{} },
	SupplementalModuleMapper:      func(*ProjectLifecycle) ipc.Handler { return supplementalModuleHandler{} },
	PrefixedSupplementalMapper:    func(*ProjectLifecycle) ipc.Handler { return prefixedSupplementalHandler{} },
	UnmappedFoldingMapper:         func(*ProjectLifecycle) ipc.Handler { return unmappedFoldingHandler{} },
	HoistingMapper:                func(*ProjectLifecycle) ipc.Handler { return hoistingHandler{} },
	DuplicateProjectionMapper:     func(*ProjectLifecycle) ipc.Handler { return duplicateProjectionHandler{} },
}

func handlerForMapper(command []string, lifecycle *ProjectLifecycle) (ipc.Handler, error) {
	if len(command) == 0 {
		return nil, errors.New("contentmappertest: empty mapper command")
	}
	constructor, ok := mapperHandlers[command[0]]
	if !ok {
		return nil, fmt.Errorf("contentmappertest: unknown mapper command %v", command)
	}
	return constructor(lifecycle), nil
}
