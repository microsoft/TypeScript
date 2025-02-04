package main

import (
	"errors"
	"flag"
	"fmt"
	"io"
	"os"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func runLSP(args []string) int {
	flag := flag.NewFlagSet("lsp", flag.ContinueOnError)
	stdio := flag.Bool("stdio", false, "use stdio for communication")
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

	fs := bundled.WrapFS(vfs.FromOS())
	defaultLibraryPath := bundled.LibPath()

	s := lsp.NewServer(&lsp.ServerOptions{
		In:                 os.Stdin,
		Out:                os.Stdout,
		Err:                os.Stderr,
		FS:                 fs,
		DefaultLibraryPath: defaultLibraryPath,
	})

	if err := s.Run(); err != nil && !errors.Is(err, io.EOF) {
		return 1
	}
	return 0
}
