package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

type apiFlags struct {
	cwd             string
	transport       string
	callbacks       string
	async           bool
	timing          bool
	runExternalCode bool
}

func parseAPIFlags(args []string) (apiFlags, error) {
	flags := flag.NewFlagSet("api", flag.ContinueOnError)
	result := apiFlags{}
	flags.StringVar(&result.cwd, "cwd", core.Must(os.Getwd()), "current working directory")
	flags.StringVar(&result.transport, "transport", "", "transport mechanism: stdio, pipe=<path>, sync=<path>")
	flags.StringVar(&result.callbacks, "callbacks", "", "comma-separated list of FS callbacks to enable (readFile,fileExists,directoryExists,getAccessibleEntries,realpath)")
	flags.BoolVar(&result.async, "async", false, "use JSON-RPC protocol instead of MessagePack (for async API)")
	flags.BoolVar(&result.timing, "timing", false, "collect per-request server processing time, folded into the client's timing snapshot")
	flags.BoolVar(&result.runExternalCode, "runExternalCode", false, "allow projects to execute configured external plugins")
	if err := flags.Parse(args); err != nil {
		return apiFlags{}, err
	}
	return result, nil
}

func runAPI(args []string) int {
	flags, err := parseAPIFlags(args)
	if err != nil {
		return 2
	}

	defaultLibraryPath := bundled.LibPath()

	// Parse callbacks list
	var callbacksList []string
	if flags.callbacks != "" {
		callbacksList = strings.Split(flags.callbacks, ",")
	}

	options := &api.ServerOptions{
		Cwd:                  flags.cwd,
		DefaultLibraryPath:   defaultLibraryPath,
		Transport:            flags.transport,
		Callbacks:            callbacksList,
		Async:                flags.async,
		CollectTiming:        flags.timing,
		RunExternalCode:      flags.runExternalCode,
		ContentMapperSpawner: newSystem(),
	}
	s := api.NewServer(options)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if err := s.Run(ctx); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return 1
	}
	return 0
}
