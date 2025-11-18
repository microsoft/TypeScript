# Tests

This directory contains tests for the TypeScript Refactoring Playbook tools and examples.

## Structure

```
tests/
├── tool-tests/          # Tests for TypeScript tools
│   ├── type-coverage-checker.test.ts
│   ├── schema-drift-detector.test.ts
│   └── migration-progress-tracker.test.ts
└── example-migrations/  # Validation tests for examples
    ├── supabase.test.ts
    ├── prisma.test.ts
    ├── kysely.test.ts
    └── drizzle.test.ts
```

## Running Tests

```bash
# Install dependencies
npm install --save-dev jest @types/jest ts-jest typescript

# Run all tests
npm test

# Run specific test file
npm test type-coverage-checker.test.ts

# Run with coverage
npm test -- --coverage
```

## Test Coverage Goals

- **Tools:** 80%+ coverage for critical paths
- **Examples:** Type checking and compilation validation
- **Scripts:** Integration tests with mocked commands

## Writing Tests

### Tool Tests

Tool tests verify that our migration utilities work correctly:

```typescript
import { checkTypeCoverage } from '../tools/type-coverage-checker';

describe('Type Coverage Checker', () => {
  it('should detect any types', () => {
    const result = checkTypeCoverage('./fixtures/with-any.ts');
    expect(result.anyCount).toBeGreaterThan(0);
  });
});
```

### Example Migration Tests

Example tests verify that examples compile and type-check correctly:

```typescript
describe('Supabase Migration Example', () => {
  it('after code should type-check without errors', () => {
    // Run tsc on after/ directory
    const result = execSync('tsc --noEmit', { cwd: './examples/supabase-migration/after' });
    expect(result).toBeTruthy();
  });
});
```

## Test Fixtures

Test fixtures are located in `tests/fixtures/` and include:

- Sample TypeScript files with various type patterns
- Mock database schemas
- Sample configuration files
- Expected output files

## CI/CD Integration

Tests run automatically on:

- Every pull request
- Every push to main
- Nightly builds

See `.github/workflows/test.yml` for CI configuration.

## Contributing Tests

When adding new features:

1. Write tests first (TDD)
2. Ensure existing tests pass
3. Add tests for edge cases
4. Update this README if needed

## Test Dependencies

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.3.2"
  }
}
```

## Future Test Plans

- [ ] Add integration tests for all setup scripts
- [ ] Add E2E tests for complete migration workflows
- [ ] Add performance benchmarks
- [ ] Add snapshot tests for generated code
- [ ] Add tests for CLI output formatting
