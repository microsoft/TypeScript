//@jsx: react
//@module: amd

//@filename: react.d.ts
declare module "react" {

}

//@filename: file1.tsx
declare module JSX {
    interface Element { }
}
export class MyClass { }

//@filename: file2.tsx

// Should not elide React import
import * as React from 'react';
import {MyClass} from './file1';

<MyClass />;
