package pprof

import (
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"runtime/pprof"
	"sync"
	"time"
)

type ProfileSession struct {
	cpuFilePath string
	memFilePath string
	cpuFile     *os.File
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

	if err := pprof.StartCPUProfile(cpuFile); err != nil {
		panic(err)
	}

	return &ProfileSession{
		cpuFilePath: cpuProfilePath,
		memFilePath: memProfilePath,
		cpuFile:     cpuFile,
		logWriter:   logWriter,
	}
}

func (p *ProfileSession) Stop() {
	pprof.StopCPUProfile()
	p.cpuFile.Close()

	if p.memFilePath != "" {
		memFile, err := os.Create(p.memFilePath)
		if err != nil {
			panic(err)
		}
		if err := pprof.Lookup("allocs").WriteTo(memFile, 0); err != nil {
			panic(err)
		}
		memFile.Close()
		fmt.Fprintf(p.logWriter, "Memory profile: %v\n", p.memFilePath)
	}

	fmt.Fprintf(p.logWriter, "CPU profile: %v\n", p.cpuFilePath)
}

// CPUProfiler manages on-demand CPU profiling.
type CPUProfiler struct {
	mu      sync.Mutex
	session *ProfileSession
}

// StartCPUProfile starts CPU profiling, writing to the specified directory when stopped.
func (c *CPUProfiler) StartCPUProfile(profileDir string) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.session != nil {
		return errors.New("CPU profiling already in progress")
	}

	if err := os.MkdirAll(profileDir, 0o755); err != nil {
		return fmt.Errorf("failed to create profile directory: %w", err)
	}

	cpuProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-cpuprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
	cpuFile, err := os.Create(cpuProfilePath)
	if err != nil {
		return fmt.Errorf("failed to create CPU profile file: %w", err)
	}

	if err := pprof.StartCPUProfile(cpuFile); err != nil {
		cpuFile.Close()
		os.Remove(cpuProfilePath)
		return fmt.Errorf("failed to start CPU profile: %w", err)
	}

	c.session = &ProfileSession{
		cpuFilePath: cpuProfilePath,
		cpuFile:     cpuFile,
		logWriter:   io.Discard,
	}
	return nil
}

// StopCPUProfile stops CPU profiling and returns the path to the profile file.
func (c *CPUProfiler) StopCPUProfile() (string, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.session == nil {
		return "", errors.New("CPU profiling not in progress")
	}

	filePath := c.session.cpuFilePath
	c.session.Stop()
	c.session = nil

	return filePath, nil
}

// SaveHeapProfile saves a heap profile to the specified directory.
func SaveHeapProfile(profileDir string) (string, error) {
	if err := os.MkdirAll(profileDir, 0o755); err != nil {
		return "", fmt.Errorf("failed to create profile directory: %w", err)
	}

	heapProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-heapprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
	heapFile, err := os.Create(heapProfilePath)
	if err != nil {
		return "", fmt.Errorf("failed to create heap profile file: %w", err)
	}
	defer heapFile.Close()

	runtime.GC()
	if err := pprof.Lookup("heap").WriteTo(heapFile, 0); err != nil {
		os.Remove(heapProfilePath)
		return "", fmt.Errorf("failed to write heap profile: %w", err)
	}

	return heapProfilePath, nil
}

// SaveAllocProfile saves an allocation profile to the specified directory.
func SaveAllocProfile(profileDir string) (string, error) {
	if err := os.MkdirAll(profileDir, 0o755); err != nil {
		return "", fmt.Errorf("failed to create profile directory: %w", err)
	}

	allocProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-allocprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
	allocFile, err := os.Create(allocProfilePath)
	if err != nil {
		return "", fmt.Errorf("failed to create alloc profile file: %w", err)
	}
	defer allocFile.Close()

	if err := pprof.Lookup("allocs").WriteTo(allocFile, 0); err != nil {
		os.Remove(allocProfilePath)
		return "", fmt.Errorf("failed to write alloc profile: %w", err)
	}

	return allocProfilePath, nil
}

// RunGC triggers garbage collection.
func RunGC() {
	runtime.GC()
}
