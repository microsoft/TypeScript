// @filename: aiDiagnosticsTypeCentralization.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

// BAD: Type defined outside central registry
interface Product { id: string; name: string; }

// GOOD: Type imported from central registry
// import { Product } from '../types/product';

const p: Product = { id: '1', name: 'Widget' };

// Expect AI diagnostic with:
// - why: explanation of type hygiene and centralization
// - suggestion: move type to central registry
// - highConfidenceFix: true (for move/refactor)
