package api

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
)

func (s *Session) encodeCheckerNode(node *ast.Node) (any, error) {
	if node == nil {
		if s.useBinaryResponses {
			return RawBinary(nil), nil
		}
		return nil, nil
	}
	data, _, err := encoder.EncodeNode(node, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to encode checker node: %w", err)
	}
	if s.useBinaryResponses {
		return RawBinary(data), nil
	}
	return &SourceFileResponse{Data: base64.StdEncoding.EncodeToString(data)}, nil
}

// @gen-proto-result: SourceFileResponse
// @gen-proto-nullable
func (s *Session) handleSymbolToEntityName(ctx context.Context, params *SymbolToNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}

	defer setup.done()
	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	return s.encodeCheckerNode(setup.checker.SymbolToEntityName(symbol, ast.SymbolFlags(params.Meaning), location, nodebuilder.Flags(params.Flags)))
}

// @gen-proto-result: SourceFileResponse
// @gen-proto-nullable
func (s *Session) handleSymbolToExpression(ctx context.Context, params *SymbolToNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()
	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	return s.encodeCheckerNode(setup.checker.SymbolToExpression(symbol, ast.SymbolFlags(params.Meaning), location, nodebuilder.Flags(params.Flags)))
}

// @gen-proto-result: SourceFileResponse
// @gen-proto-nullable
func (s *Session) handleSymbolToParameterDeclaration(ctx context.Context, params *SymbolToDeclarationParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()
	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	return s.encodeCheckerNode(setup.checker.SymbolToParameterDeclaration(symbol, location, nodebuilder.Flags(params.Flags)))
}

// @gen-proto-nullable
func (s *Session) handleSymbolToTypeParameterDeclarations(ctx context.Context, params *SymbolToDeclarationParams) ([]*SourceFileResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()
	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	nodes := setup.checker.SymbolToTypeParameterDeclarations(symbol, location, nodebuilder.Flags(params.Flags))
	if len(nodes) == 0 {
		return nil, nil
	}
	result := make([]*SourceFileResponse, len(nodes))
	for i, node := range nodes {
		data, _, err := encoder.EncodeNode(node, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to encode type parameter declaration: %w", err)
		}
		result[i] = &SourceFileResponse{Data: base64.StdEncoding.EncodeToString(data)}
	}
	return result, nil
}
