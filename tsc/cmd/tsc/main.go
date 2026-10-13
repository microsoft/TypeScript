package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/osutil"
)

func main() {
	os.Exit(runMain())
}

func runMain() int {
	core.ApplyDebugStackLimit()
	return runWithSignals(run)
}

// The first signal requests cancellation and waits for the command's cleanup,
// including profile flushing. A second signal terminates without waiting.
func runWithSignals(run func(context.Context) int) int {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	signals := make(chan os.Signal, 2)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)
	defer signal.Stop(signals)

	done := make(chan int, 1)
	go func() {
		done <- run(ctx)
	}()

	var interrupted os.Signal
	for {
		select {
		case sig := <-signals:
			if interrupted != nil {
				osutil.ExitWithSignal(sig)
			}
			interrupted = sig
			cancel()
		case status := <-done:
			cancel()
			signal.Stop(signals)
			if interrupted == nil {
				// Account for a signal queued as the command finished.
				select {
				case sig := <-signals:
					interrupted = sig
				default:
					return status
				}
			}
			osutil.ExitWithSignal(interrupted)
			return status
		}
	}
}

func run(ctx context.Context) int {
	args := osutil.Args()[1:]
	if len(args) > 0 {
		switch args[0] {
		case "--lsp":
			return runLSP(ctx, args[1:])
		case "--api":
			return runAPI(ctx, args[1:])
		}
	}
	result := execute.CommandLine(ctx, newSystem(), args, nil)
	return int(result.Status)
}
