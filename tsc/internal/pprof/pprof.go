package pprof

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime/pprof"
)

type ProfileSession struct {
	cpuFilePath string
	memFilePath string
	cpuFile     *os.File
	memFile     *os.File
	logWriter   io.Writer
}

// BeginProfiling starts CPU and memory profiling, writing the profiles to the specified directory.
func BeginProfiling(profileDir string, logWriter io.Writer) *ProfileSession {
	if err := os.MkdirAll(profileDir, 0o755); err != nil {
		panic(err)
	}

	pid := os.Getpid()

	cpuProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-cpuprofile.pb.gz", pid))
	memProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-memprofile.pb.gz", pid))
	cpuFile, err := os.Create(cpuProfilePath)
	if err != nil {
		panic(err)
	}
	memFile, err := os.Create(memProfilePath)
	if err != nil {
		panic(err)
	}

	if err := pprof.StartCPUProfile(cpuFile); err != nil {
		panic(err)
	}

	return &ProfileSession{
		cpuFilePath: cpuProfilePath,
		memFilePath: memProfilePath,
		cpuFile:     cpuFile,
		memFile:     memFile,
		logWriter:   logWriter,
	}
}

func (p *ProfileSession) Stop() {
	pprof.StopCPUProfile()
	err := pprof.Lookup("allocs").WriteTo(p.memFile, 0)
	if err != nil {
		panic(err)
	}

	p.cpuFile.Close()
	p.memFile.Close()

	fmt.Fprintf(p.logWriter, "CPU profile: %v\n", p.cpuFilePath)
	fmt.Fprintf(p.logWriter, "Memory profile: %v\n", p.memFilePath)
}
