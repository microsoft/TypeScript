// @jsx: react
// @strict: true
// @target: ES2017
// @module: ESNext
// @esModuleInterop: true
// @skipLibCheck: true


// @filename: index.tsx
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const a = (
  <main>
    {(<div />) as unknown}
    <span />
  </main>
);
