package lsp_test

import (
	"bufio"
	"flag"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

var (
	replay      = flag.String("replay", "", "Path to replay file")
	testDir     = flag.String("testDir", "", "Path to project directory")
	simple      = flag.Bool("simple", false, "Replay only file opening and closing, plus the final request")
	superSimple = flag.Bool("superSimple", false, "Replay only the final file opening and the final request")
)

type initialArguments struct {
	RootDirUriPlaceholder string `json:"rootDirUriPlaceholder"`
	RootDirPlaceholder    string `json:"rootDirPlaceholder"`
}

type rawMessage struct {
	Kind   string     `json:"kind"`
	Method string     `json:"method"`
	Params json.Value `json:"params"`
}

func TestReplay(t *testing.T) {
	t.Parallel()
	if replay == nil || *replay == "" {
		t.Skip("no replay file specified")
	}
	if testDir == nil || *testDir == "" {
		t.Fatal("testDir must be specified")
	}
	testDirUri := lsconv.FileNameToDocumentURI(*testDir)

	fs := bundled.WrapFS(osvfs.FS())
	defaultLibraryPath := bundled.LibPath()
	typingsLocation := osvfs.GetGlobalTypingsCacheLocation()
	serverOpts := lsp.ServerOptions{
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
	}

	client, closeClient := lsptestutil.NewLSPClient(t, serverOpts, nil)
	defer func() {
		err := closeClient()
		if err != nil {
			t.Errorf("goroutine error: %v", err)
		}
	}()

	f, err := os.Open(*replay)
	if err != nil {
		t.Fatalf("failed to read replay file: %v", err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)

	if !scanner.Scan() {
		t.Fatalf("replay file is empty")
	}

	rootDirPlaceholder := "@PROJECT_ROOT@"
	rootDirUriPlaceholder := "@PROJECT_ROOT_URI@"
	firstLine := scanner.Bytes()
	var initObj initialArguments
	err = json.Unmarshal(firstLine, &initObj)
	if err != nil {
		t.Fatalf("failed to parse initial arguments: %v", err)
	}

	if initObj.RootDirPlaceholder != "" {
		rootDirPlaceholder = initObj.RootDirPlaceholder
	}
	if initObj.RootDirUriPlaceholder != "" {
		rootDirUriPlaceholder = initObj.RootDirUriPlaceholder
	}

	rootDirReplacer := strings.NewReplacer(
		rootDirPlaceholder, *testDir,
		rootDirUriPlaceholder, string(testDirUri),
	)

	var messages []*rawMessage
	for scanner.Scan() {
		line := scanner.Text()
		line = rootDirReplacer.Replace(line)
		var rawMsg rawMessage
		err := json.Unmarshal([]byte(line), &rawMsg)
		if err != nil {
			t.Fatalf("failed to parse message: %v", err)
		}
		messages = append(messages, &rawMsg)
	}
	if err := scanner.Err(); err != nil {
		t.Fatalf("error scanning replay file: %v", err)
	}

	if simple != nil && *simple {
		// Include only initialization, file opening/changing/closing, and shutdown messages, plus the final request.
		var newMessages []*rawMessage
		var i int
		for i = 0; i < len(messages) && isInitializationMessage(messages[i]); i++ {
			newMessages = append(newMessages, messages[i])
		}
		var j int
		for j = len(messages) - 1; j >= 0 && isExitMessage(messages[j]); j-- {
		}
		for k := i; k <= j; k++ {
			msg := messages[k]
			if msg.Method == "textDocument/didOpen" || msg.Method == "textDocument/didChange" || msg.Method == "textDocument/didClose" {
				newMessages = append(newMessages, msg)
			}
		}
		for k := max(i, j); k < len(messages); k++ {
			newMessages = append(newMessages, messages[k])
		}
		messages = newMessages
	} else if superSimple != nil && *superSimple {
		// Include only initialization, shutdown, the last file open and the final request.
		// We assume here the final request will be for the file that was opened last.
		var newMessages []*rawMessage
		var i int
		for i = 0; i < len(messages) && isInitializationMessage(messages[i]); i++ {
			newMessages = append(newMessages, messages[i])
		}

		var j int
		for j = len(messages) - 1; j >= 0 && isExitMessage(messages[j]); j-- {
		}
		var openIdx int
		for openIdx = j; openIdx >= i; openIdx-- {
			msg := messages[openIdx]
			if msg.Method == "textDocument/didOpen" {
				newMessages = append(newMessages, msg)
				break
			}
		}
		for k := max(openIdx+1, j); k < len(messages); k++ {
			newMessages = append(newMessages, messages[k])
		}
		messages = newMessages
	}

	for _, rawMsg := range messages {
		var kind jsonrpc.MessageKind
		var reqID *jsonrpc.ID
		switch rawMsg.Kind {
		case "request":
			kind = jsonrpc.MessageKindRequest
			reqID = lsproto.NewID(lsproto.IntegerOrString{Integer: new(client.NextID())})
		case "notification":
			kind = jsonrpc.MessageKindNotification
		default:
			t.Fatalf("unknown message kind: %s", rawMsg.Kind)
		}

		var rpcMsg struct {
			JSONRPC string      `json:"jsonrpc"`
			ID      *jsonrpc.ID `json:"id"`
			Method  string      `json:"method"`
			Params  json.Value  `json:"params"`
		}
		rpcMsg.JSONRPC = "2.0"
		rpcMsg.ID = reqID
		rpcMsg.Method = rawMsg.Method
		rpcMsg.Params = rawMsg.Params
		rpcData, err := json.Marshal(rpcMsg)
		if err != nil {
			t.Fatalf("failed to marshal rpc message: %v", err)
		}

		var msg lsproto.Message
		err = json.Unmarshal(rpcData, &msg)
		if err != nil {
			t.Fatalf("failed to unmarshal rpc message into lsproto.Message: %v", err)
		}

		switch kind {
		case jsonrpc.MessageKindRequest:
			response, ok := client.SendRequestWorker(t, msg.AsRequest(), reqID)
			if !ok {
				t.Fatalf("failed to send request for method %s", rawMsg.Method)
			}
			if response.Error != nil {
				t.Fatalf("server returned error for method %s params %s:\n%v", rawMsg.Method, rawMsg.Params, response.Error)
			}
		case jsonrpc.MessageKindNotification:
			client.WriteMsg(t, &msg)
		default:
			t.Fatalf("unknown message kind: %s", rawMsg.Kind)
		}
	}
}

func isInitializationMessage(msg *rawMessage) bool {
	return msg.Method == "initialize" || msg.Method == "initialized"
}

func isExitMessage(msg *rawMessage) bool {
	return msg.Method == "exit" || msg.Method == "shutdown"
}
