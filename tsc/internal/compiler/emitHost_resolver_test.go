package compiler

import (
	"runtime"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
)

func TestEmitHostResolverCache(t *testing.T) {
	t.Parallel()
	created := 0
	host := &emitHost{newEmitResolver: func(*printer.EmitContext) *checker.EmitResolver {
		created++
		return &checker.EmitResolver{}
	}}
	emitContext := printer.NewEmitContext()
	first := host.GetEmitResolver(emitContext)
	if host.GetEmitResolver(emitContext) != first || created != 1 {
		t.Fatal("expected repeated requests to reuse the resolver")
	}
	otherContext := printer.NewEmitContext()
	if host.GetEmitResolver(otherContext) == first || created != 2 {
		t.Fatal("expected distinct contexts to have distinct resolvers")
	}
	runtime.KeepAlive(first)
}

func TestEmitHostResolverCacheConcurrent(t *testing.T) {
	t.Parallel()
	host := &emitHost{newEmitResolver: func(*printer.EmitContext) *checker.EmitResolver {
		return &checker.EmitResolver{}
	}}
	emitContext := printer.NewEmitContext()
	const callers = 16
	start := make(chan struct{})
	results := make(chan printer.EmitResolver, callers)
	for range callers {
		go func() {
			<-start
			results <- host.GetEmitResolver(emitContext)
		}()
	}
	close(start)
	first := <-results
	for range callers - 1 {
		if result := <-results; result != first {
			t.Error("expected concurrent requests to reuse the same live resolver")
		}
	}
	runtime.KeepAlive(first)
}
