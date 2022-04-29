// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

const Tag = (x: {}) => <div></div>;

// OK
const k1 = <Tag />;
const k2 = <Tag></Tag>;

// Not OK (excess children)
const k3 = <Tag children={<div></div>} />;
const k4 = <Tag key="1"><div></div></Tag>;
const k5 = <Tag key="1"><div></div><div></div></Tag>;
