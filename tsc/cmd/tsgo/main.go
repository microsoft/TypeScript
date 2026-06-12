package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute"
)

func main() {
	os.Exit(runMain())
}

func runMain() int {
	core.ApplyDebugStackLimit()
	args := os.Args[1:]
	if len(args) > 0 {
		switch args[0] {
		case "--lsp":
			return runLSP(args[1:])
		case "--api":
			return runAPI(args[1:])
		}
	}
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()
	result := execute.CommandLine(ctx, newSystem(), args, nil)
	return int(result.Status)
}
