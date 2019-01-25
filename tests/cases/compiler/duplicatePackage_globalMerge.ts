// @noImplicitReferences: true

// @Filename: /src/index.ts
import * as React from 'react';
export var x = 1
// @Filename: /tests/index.ts
import * as React from 'react';
export var y = 2

// @Filename: /tests/node_modules/@types/react/package.json
{ "name": "@types/react", "version": "16.4.6" }
// @Filename: /tests/node_modules/@types/react/index.d.ts

// @Filename: /node_modules/@types/react/package.json
{ "name": "@types/react", "version": "16.4.6" }
// @Filename: /node_modules/@types/react/index.d.ts
declare global { }

// @Filename: /src/bug25410.ts
import { x } from './index'
import { y } from '../tests/index'
