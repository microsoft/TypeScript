package api

import (
	"context"
	"encoding/base64"
	"errors"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestHandleBatchRequests(t *testing.T) {
	t.Parallel()

	session := &Session{}
	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{
			{Method: "ping", Params: json.Value{}},
			{Method: "unknown", Params: json.Value{}},
		},
	})

	assert.NilError(t, err)
	assert.Equal(t, len(response.Results), 2)
	assert.Equal(t, response.Results[0], "pong")
	requestErr := response.Errors[1]
	assert.Assert(t, strings.Contains(requestErr, "unknown API method"))

	encoded, err := json.Marshal(response)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(string(encoded), `"errors":{"1":"api: invalid request: unknown API method \"unknown\""}`))
}

func TestHandleGroupedBatchRequests(t *testing.T) {
	t.Parallel()

	response, err := (&Session{}).HandleRequest(context.Background(), string(MethodBatchRequests), json.Value(`{
		"groups":[
			{"method":"echo","base":{"group":"a"},"count":2,"requests":[{"value":1},{"value":3}]},
			{"method":"echo","base":{"group":"b"},"count":1,"requests":[{"value":2}]}
		],
		"groupOrder":[0,1,0]
	}`))
	assert.NilError(t, err)
	encoded, err := json.Marshal(response)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{"results":[{"group":"a","value":1},{"group":"b","value":2},{"group":"a","value":3}]}`)
}

func TestHandleSingleGroupedBatchRequestsInfersOrder(t *testing.T) {
	t.Parallel()

	response, err := (&Session{}).HandleRequest(context.Background(), string(MethodBatchRequests), json.Value(`{
		"groups":[
			{"method":"echo","base":{"group":"a"},"count":3,"requests":[{"value":1},{"value":2},{"value":3}]}
		]
	}`))
	assert.NilError(t, err)
	encoded, err := json.Marshal(response)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{"results":[{"group":"a","value":1},{"group":"a","value":2},{"group":"a","value":3}]}`)
}

func TestHandleGroupedBatchRequestsDecodesRowParams(t *testing.T) {
	t.Parallel()

	response, err := (&Session{}).HandleRequest(context.Background(), string(MethodBatchRequests), json.Value(`{
		"groups":[
			{"method":"transpileModule","count":1,"requests":[{"input":"const value: number = 1;","options":{}}]}
		]
	}`))
	assert.NilError(t, err)
	assert.Equal(t, len(response.(*BatchRequestsResponse).Results), 1)
	assert.Equal(t, len(response.(*BatchRequestsResponse).Errors), 0)
}

func TestGroupedBatchSourceFileResponses(t *testing.T) {
	t.Parallel()

	for _, binary := range []bool{false, true} {
		name := "json"
		if binary {
			name = "binary"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			projectSession, _ := projecttestutil.Setup(map[string]any{})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, &SessionOptions{UseBinaryResponses: binary})
			defer session.Close()

			params := json.Value(`{"fileName":"/index.ts","sourceText":"export const value = 1;"}`)
			regular, err := session.handleBatchRequests(t.Context(), &BatchRequestsParams{
				Requests: []BatchRequest{{Method: MethodCreateSourceFile, Params: params}},
			})
			assert.NilError(t, err)
			assert.Equal(t, len(regular.Errors), 0)
			expected, ok := regular.Results[0].(*SourceFileResponse)
			assert.Assert(t, ok, "regular batch returned %T", regular.Results[0])
			decoded, err := base64.StdEncoding.DecodeString(expected.Data)
			assert.NilError(t, err)
			assert.Assert(t, len(decoded) > 0)

			grouped, err := session.handleBatchRequests(t.Context(), &BatchRequestsParams{
				Groups: []BatchRequestGroup{{
					Method: MethodCreateSourceFile,
					Base:   json.Value(`{"fileName":"/index.ts"}`),
					Count:  4,
					Fields: json.Value(`{"sourceText":["export const value = 1;","export const value = 1;","export const value = 1;","export const value = 1;"]}`),
				}},
			})
			assert.NilError(t, err)
			assert.Equal(t, len(grouped.Errors), 0)
			assert.Equal(t, len(grouped.Results), 4)
			for _, result := range grouped.Results {
				actual, ok := result.(*SourceFileResponse)
				assert.Assert(t, ok, "columnar batch returned %T", result)
				assert.DeepEqual(t, actual, expected)
			}
		})
	}
}

func TestBatchDecoderColumnLengths(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name    string
		fields  string
		count   int
		invalid bool
	}{
		{name: "omitted", fields: `{}`, count: 4},
		{name: "empty", fields: `{"position":[]}`, count: 4, invalid: true},
		{name: "short", fields: `{"position":[1]}`, count: 4, invalid: true},
		{name: "long", fields: `{"position":[1,2,3,4,5]}`, count: 4, invalid: true},
		{name: "exact", fields: `{"position":[1,2,3,4]}`, count: 4},
		{name: "zero count empty", fields: `{"position":[]}`, count: 0},
		{name: "zero count omitted", fields: `{}`, count: 0},
		{name: "zero count nonempty", fields: `{"position":[1]}`, count: 0, invalid: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			decoder, err := newGeneratedBatchRequestDecoder(MethodGetSymbolAtPosition, json.Value(`{}`), json.Value(test.fields), test.count)
			if test.invalid {
				assert.ErrorContains(t, err, "parameter \"position\"")
				responses, err := (&Session{}).handleBatchRequestGroups(t.Context(), []BatchRequestGroup{
					{Method: MethodGetSymbolAtPosition, Count: test.count, Fields: json.Value(test.fields)},
				}, nil)
				assert.Assert(t, errors.Is(err, ErrInvalidRequest))
				assert.Equal(t, len(responses), 0)
				return
			}
			assert.NilError(t, err)
			for index := range test.count {
				params := decoder.request(index).(*GetSymbolAtPositionParams)
				expected := uint32(0)
				if test.name == "exact" {
					expected = uint32(index + 1)
				}
				assert.Equal(t, params.Position, expected)
			}
		})
	}
}

func TestBatchDecoderPromotedSnapshotFields(t *testing.T) {
	t.Parallel()

	rows := []json.Value{
		json.Value(`{
			"openProjects":["/first/tsconfig.json"],
			"closeProjects":["/old/tsconfig.json"],
			"openFiles":["/first/index.ts"],
			"closeFiles":["/old/index.ts"],
			"createPrograms":[{"rootFiles":["/first/index.ts"],"compilerOptions":{}}],
			"reconfigurePrograms":[{"id":"/dev/null/synthetic/1","rootFiles":["/first/index.ts"],"compilerOptions":{}}],
			"removePrograms":["/dev/null/synthetic/2"],
			"ensurePrograms":true
		}`),
		json.Value(`{
			"openProjects":["/second/tsconfig.json"],
			"closeProjects":null,
			"openFiles":["/second/index.ts"],
			"closeFiles":null,
			"createPrograms":null,
			"reconfigurePrograms":null,
			"removePrograms":null,
			"ensurePrograms":null
		}`),
	}
	columns := make(map[string][]json.Value)
	for _, row := range rows {
		var fields map[string]json.Value
		assert.NilError(t, json.Unmarshal(row, &fields))
		for name, value := range fields {
			columns[name] = append(columns[name], value)
		}
	}
	fields, err := json.Marshal(columns)
	assert.NilError(t, err)
	base := json.Value(`{"fileNotifications":{"invalidateAll":true},"closeProjects":["/base/tsconfig.json"]}`)
	decoder, err := newGeneratedBatchRequestDecoder(MethodCreateSnapshot, base, fields, len(rows))
	assert.NilError(t, err)
	for index, row := range rows {
		var expected CreateSnapshotParams
		assert.NilError(t, json.Unmarshal(base, &expected))
		assert.NilError(t, json.Unmarshal(row, &expected))
		assert.DeepEqual(t, decoder.request(index).(*CreateSnapshotParams), &expected)
	}
	_, err = newGeneratedBatchRequestDecoder(MethodCreateSnapshot, nil, json.Value(`{"openProjects":[[]]}`), 2)
	assert.ErrorContains(t, err, "openProjects")
}

func TestHandleGroupedBatchRequestsReacquiresCheckerAfterInterleaving(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      `export const value = true;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshot, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	base, err := json.Marshal(map[string]any{
		"snapshot": snapshot.Snapshot,
		"project":  snapshot.Projects[0].Id,
		"file":     "/index.ts",
	})
	assert.NilError(t, err)

	responses, err := session.handleBatchRequestGroups(t.Context(), []BatchRequestGroup{
		{Method: MethodGetSymbolAtPosition, Base: base, Count: 2, Fields: json.Value(`{"position":[13,13]}`)},
		{Method: "echo", Count: 1, Requests: []json.Value{json.Value(`{"value":1}`)}},
	}, []uint32{0, 1, 0})
	assert.NilError(t, err)
	assert.Equal(t, responses[0].Error, "")
	assert.Equal(t, responses[1].Error, "")
	assert.Equal(t, responses[2].Error, "")
	first := responses[0].Result.(*SymbolResponse)
	last := responses[2].Result.(*SymbolResponse)
	assert.Equal(t, first.Id, last.Id)
}

func TestBatchCheckerCacheReusesProgramAcrossSnapshots(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      `export const value = true;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	updated, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	projectID := base.Projects[0].Id
	baseProgram, err := session.snapshots[base.Snapshot].getProgram(projectID)
	assert.NilError(t, err)
	updatedProgram, err := session.snapshots[updated.Snapshot].getProgram(projectID)
	assert.NilError(t, err)
	assert.Assert(t, baseProgram == updatedProgram)

	cache := &batchCheckerCache{}
	ctx := context.WithValue(t.Context(), batchCheckerCacheContextKey{}, cache)
	first, err := session.setupChecker(ctx, base.Snapshot, projectID)
	assert.NilError(t, err)
	defer cache.release()

	type setupResult struct {
		setup checkerSetup
		err   error
	}
	result := make(chan setupResult, 1)
	go func() {
		setup, setupErr := session.setupChecker(ctx, updated.Snapshot, projectID)
		result <- setupResult{setup: setup, err: setupErr}
	}()

	select {
	case second := <-result:
		assert.NilError(t, second.err)
		assert.Assert(t, first.checker == second.setup.checker)
		assert.Assert(t, first.sd != second.setup.sd)
	case <-time.After(time.Second):
		cache.release()
		<-result
		cache.release()
		t.Fatal("setupChecker blocked acquiring a checker already leased by the batch")
	}
}

func TestHandleBatchRequestsRecoversPerRequestPanics(t *testing.T) {
	t.Parallel()

	var session *Session
	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{
			{Method: "ping", Params: json.Value{}},
			{Method: MethodGetAnyType, Params: json.Value(`{"snapshot":1,"project":"project"}`)},
			{Method: "ping", Params: json.Value{}},
		},
	})

	assert.NilError(t, err)
	assert.Equal(t, response.Results[0], "pong")
	assert.Assert(t, strings.Contains(response.Errors[1], "panic:"))
	assert.Equal(t, response.Results[2], "pong")
}

func TestHandleBatchRequestsPaginatesResponses(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	const maxResponseBytesPerPage = 150
	requests := make([]BatchRequest, 10)
	for i := range requests {
		requests[i] = BatchRequest{Method: "ping", Params: json.Value{}}
	}

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                requests,
		MaxResponseBytesPerPage: maxResponseBytesPerPage,
	})
	assert.NilError(t, err)
	var results []any
	for {
		encoded, err := json.Marshal(response)
		assert.NilError(t, err)
		assert.Assert(t, len(encoded) <= maxResponseBytesPerPage)
		var wireResponse BatchRequestsResponse
		assert.NilError(t, json.Unmarshal(encoded, &wireResponse))
		results = append(results, wireResponse.Results...)
		if wireResponse.ContinuationToken == "" {
			break
		}
		response, err = session.handleBatchRequests(context.Background(), &BatchRequestsParams{
			ContinuationToken:       wireResponse.ContinuationToken,
			MaxResponseBytesPerPage: maxResponseBytesPerPage,
		})
		assert.NilError(t, err)
	}

	assert.Equal(t, len(results), len(requests))
	for _, result := range results {
		assert.Equal(t, result, "pong")
	}
}

func TestHandleBatchRequestsPaginatesErrorsWithinLimit(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	session.id = "s"

	for maxResponseBytesPerPage := 127; maxResponseBytesPerPage <= 400; maxResponseBytesPerPage++ {
		session.nextBatchResponsePageID.Store(0)
		requests := make([]BatchRequest, 10)
		for i := range requests {
			requests[i] = BatchRequest{Method: "unknown", Params: json.Value{}}
		}

		response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
			Requests:                requests,
			MaxResponseBytesPerPage: maxResponseBytesPerPage,
		})
		assert.NilError(t, err)
		resultCount := 0
		for {
			encoded, err := json.Marshal(response)
			assert.NilError(t, err)
			assert.Assert(t, len(encoded) <= maxResponseBytesPerPage, "encoded page has %d bytes with limit %d", len(encoded), maxResponseBytesPerPage)
			var wireResponse BatchRequestsResponse
			assert.NilError(t, json.Unmarshal(encoded, &wireResponse))
			resultCount += len(wireResponse.Results)
			if wireResponse.ContinuationToken == "" {
				break
			}
			response, err = session.handleBatchRequests(context.Background(), &BatchRequestsParams{
				ContinuationToken:       wireResponse.ContinuationToken,
				MaxResponseBytesPerPage: maxResponseBytesPerPage,
			})
			assert.NilError(t, err)
		}
		assert.Equal(t, resultCount, len(requests))
	}
}

func TestHandleBatchRequestsAllowsOversizedSingleResponse(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                []BatchRequest{{Method: "ping", Params: json.Value{}}},
		MaxResponseBytesPerPage: 1,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Results), 1)
	assert.Equal(t, response.ContinuationToken, "")
}

func TestHandleBatchRequestsPageLimitIsRequestScoped(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	requests := []BatchRequest{
		{Method: "ping", Params: json.Value{}},
		{Method: "ping", Params: json.Value{}},
	}

	limited, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests:                requests,
		MaxResponseBytesPerPage: 1,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(limited.Results), 1)
	assert.Assert(t, limited.ContinuationToken != "")

	unlimited, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{Requests: requests})
	assert.NilError(t, err)
	assert.Equal(t, len(unlimited.Results), len(requests))
	assert.Equal(t, unlimited.ContinuationToken, "")
}

func TestHandleBatchRequestsRejectsInvalidContinuationToken(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	_, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{ContinuationToken: "invalid"})
	assert.ErrorContains(t, err, "invalid batch continuation token")
}

func TestHandleBatchRequestsRejectsNestedBatch(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleBatchRequests(context.Background(), &BatchRequestsParams{
		Requests: []BatchRequest{{Method: MethodBatchRequests, Params: json.Value(`{"requests":[]}`)}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Results), 1)
	assert.Assert(t, strings.Contains(response.Errors[0], "batchRequests cannot be nested"))
}
