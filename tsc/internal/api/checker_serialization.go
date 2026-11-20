package api

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
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

func (s *Session) handleTypePredicateToString(ctx context.Context, params *TypePredicateToStringParams) (string, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return "", err
	}
	defer setup.done()
	kind := checker.TypePredicateKind(params.Kind)
	if kind < checker.TypePredicateKindThis || kind > checker.TypePredicateKindAssertsIdentifier {
		return "", fmt.Errorf("%w: invalid type predicate kind", ErrClientError)
	}
	if (kind == checker.TypePredicateKindIdentifier || kind == checker.TypePredicateKindAssertsIdentifier) && params.ParameterName == "" {
		return "", fmt.Errorf("%w: identifier type predicate requires a parameter name", ErrClientError)
	}
	var t *checker.Type
	if params.Type != 0 {
		t, err = setup.resolveTypeHandle(params.Type)
		if err != nil {
			return "", err
		}
	} else if kind == checker.TypePredicateKindThis || kind == checker.TypePredicateKindIdentifier {
		return "", fmt.Errorf("%w: non-assertion type predicate requires a type", ErrClientError)
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return "", err
	}
	flags := checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope
	if params.Flags != nil {
		flags = checker.TypeFormatFlags(*params.Flags)
	}
	predicate := checker.NewTypePredicate(kind, params.ParameterName, params.ParameterIndex, t)
	return setup.checker.TypePredicateToStringEx(predicate, location, flags), nil
}

// @gen-proto-result: SourceFileResponse
// @gen-proto-nullable
func (s *Session) handleIndexInfoToIndexSignatureDeclaration(ctx context.Context, params *IndexInfoToIndexSignatureDeclarationParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()
	keyType, err := setup.resolveTypeHandle(params.KeyType)
	if err != nil {
		return nil, err
	}
	valueType, err := setup.resolveTypeHandle(params.ValueType)
	if err != nil {
		return nil, err
	}
	declaration, err := setup.resolveLocation(params.Declaration, nil, nil)
	if err != nil {
		return nil, err
	}
	if declaration != nil && (!ast.IsIndexSignatureDeclaration(declaration) || len(declaration.Parameters()) != 1) {
		return nil, fmt.Errorf("%w: expected an index signature declaration with one parameter", ErrClientError)
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	info := checker.NewIndexInfo(keyType, valueType, params.IsReadonly, declaration)
	return s.encodeCheckerNode(setup.checker.IndexInfoToIndexSignatureDeclaration(info, location, nodebuilder.Flags(params.Flags)))
}

// @gen-proto-result: SourceFileResponse
// @gen-proto-nullable
func (s *Session) handleTypeParameterToDeclaration(ctx context.Context, params *TypeToTypeNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()
	parameter, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}
	if parameter.Flags()&checker.TypeFlagsTypeParameter == 0 {
		return nil, fmt.Errorf("%w: expected a type parameter", ErrClientError)
	}
	location, err := setup.resolveLocation(params.Location, nil, nil)
	if err != nil {
		return nil, err
	}
	return s.encodeCheckerNode(setup.checker.TypeParameterToDeclaration(parameter, location, nodebuilder.Flags(params.Flags)))
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
