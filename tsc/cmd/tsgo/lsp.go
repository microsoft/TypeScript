package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/exec"
	"os/signal"
	"syscall"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

func runLSP(args []string) int {
	flag := flag.NewFlagSet("lsp", flag.ContinueOnError)
	stdio := flag.Bool("stdio", false, "use stdio for communication")
	pprofDir := flag.String("pprofDir", "", "Generate pprof CPU/memory profiles to the given directory.")
	pipe := flag.String("pipe", "", "use named pipe for communication")
	_ = pipe
	socket := flag.String("socket", "", "use socket for communication")
	_ = socket
	if err := flag.Parse(args); err != nil {
		return 2
	}

	if !*stdio {
		fmt.Fprintln(os.Stderr, "only stdio is supported")
		return 1
	}

	if *pprofDir != "" {
		fmt.Fprintf(os.Stderr, "pprof profiles will be written to: %v\n", *pprofDir)
		profileSession := pprof.BeginProfiling(*pprofDir, os.Stderr)
		defer profileSession.Stop()
	}

	fs := bundled.WrapFS(osvfs.FS())
	defaultLibraryPath := bundled.LibPath()
	typingsLocation := osvfs.GetGlobalTypingsCacheLocation()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	s := lsp.NewServer(&lsp.ServerOptions{
		In:                 lsp.ToReader(os.Stdin),
		Out:                lsp.ToWriter(os.Stdout),
		Err:                os.Stderr,
		Cwd:                core.Must(os.Getwd()),
		FS:                 fs,
		DefaultLibraryPath: defaultLibraryPath,
		TypingsLocation:    typingsLocation,
		NpmInstall: func(cwd string, args []string) ([]byte, error) {
			cmd := exec.Command("npm", args...)
			cmd.Dir = cwd
			return cmd.Output()
		},
		ProgressDelay:      250 * time.Millisecond,
		SetParentProcessID: newParentProcessWatchdog(ctx, stop),
	})

	if err := s.Run(ctx); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return 1
	}
	return 0
}

// newParentProcessWatchdog returns a SetParentProcessID callback if the platform
// supports process-alive checking, or nil otherwise.
func newParentProcessWatchdog(ctx context.Context, stop context.CancelFunc) func(int) {
	if !processAliveSupported {
		return nil
	}
	return func(parentPID int) {
		startParentProcessWatchdog(ctx, stop, parentPID)
	}
}

// startParentProcessWatchdog starts a goroutine that monitors the parent process
// and cancels the context if the parent dies. This prevents orphaned language
// server processes when the editor crashes or is killed.
func startParentProcessWatchdog(ctx context.Context, stop context.CancelFunc, parentPID int) {
	if parentPID <= 0 {
		return
	}
	go func() {
		ticker := time.NewTicker(5 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				if !isProcessAlive(parentPID) {
					fmt.Fprintf(os.Stderr, "Parent process %d has exited, shutting down.\n", parentPID)
					stop()
					return
				}
			}
		}
	}()
}
