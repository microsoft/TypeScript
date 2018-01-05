// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /tsx.tsx

// @Filename: /jsx.jsx

// @Filename: /js.js

// @Filename: /a.ts
import tsx from "./tsx"; // Not allowed.
import jsx from "./jsx"; // Not allowed.
import js from "./js"; // OK because it's an untyped module.
