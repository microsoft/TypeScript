package contentmappertest

import (
	"context"
	"io"
	"net"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
)

// Serve drives the transforming mapper over the connection until it closes or ctx is cancelled.
func Serve(ctx context.Context, rwc io.ReadWriteCloser) error {
	return ipc.NewAsyncConn(rwc, staticProjectHandler{Handler: &Handler{}}).Run(ctx)
}

// NewSpawner returns an in-process spawner for the test mapper implementations.
func NewSpawner() contentmapper.Spawner {
	return spawner{}
}

// NewSpawnerWithProjectLifecycle returns an in-process spawner that records project protocol calls.
func NewSpawnerWithProjectLifecycle(lifecycle *ProjectLifecycle) contentmapper.Spawner {
	return spawner{lifecycle: lifecycle}
}

type spawner struct {
	lifecycle *ProjectLifecycle
}

func (s spawner) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	handler, err := handlerForMapper(command, s.lifecycle)
	if err != nil {
		return nil, err
	}
	if command[0] != DynamicVerbatimMapper {
		handler = staticProjectHandler{Handler: handler}
	}
	client, server := net.Pipe()
	go func() { _ = ipc.NewAsyncConn(server, handler).Run(context.Background()) }()
	return client, nil
}
