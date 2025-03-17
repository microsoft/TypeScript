package main

import (
	"errors"
	"flag"
	"fmt"
	"io"
	"os"

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

	s := lsp.NewServer(&lsp.ServerOptions{
		In:                 os.Stdin,
		Out:                os.Stdout,
		Err:                os.Stderr,
		Cwd:                core.Must(os.Getwd()),
		FS:                 fs,
		DefaultLibraryPath: defaultLibraryPath,
	})

	if err := s.Run(); err != nil && !errors.Is(err, io.EOF) {
		return 1
	}
	return 0
}
