package main

import (
	"context"
	"os"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/osutil"
)

func main() {
	os.Exit(runMain())
}

func runMain() int {
	core.ApplyDebugStackLimit()
	args := osutil.Args()[1:]
	if len(args) > 0 {
		switch args[0] {
		case "--lsp":
			return runLSP(args[1:])
		case "--api":
			return runAPI(args[1:])
		}
	}
	result := execute.CommandLineWithOptions(context.Background(), newSystem(), args, nil, execute.CommandLineOptions{
		WatchContext: osutil.NotifyTerminationContext,
	})
	return int(result.Status)
}
