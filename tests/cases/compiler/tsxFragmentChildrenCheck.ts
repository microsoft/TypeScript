// @target: es2015
// @jsx: react
// @noUnusedLocals: true
// @skipLibCheck: true

// @Filename: my-component.tsx
/// <reference path="/.lib/react.d.ts" />
declare var React: any;

export function MyComponent(props: any) {
    return <span>my component</span>;
}

// @Filename: file1.tsx

import * as React from 'react'
import { MyComponent } from './my-component'

const MY_STRING: string = 'Ceci n\'est pas une string.'
const MY_CLASSNAME: string = 'jeclass'

class RenderString extends React.PureComponent<any, any> {
  render() {
    return (
      <>
        <MyComponent />
        <span>{ MY_STRING }</span>
        <span className={ MY_CLASSNAME } />
      </>
    )
  }
}

export default RenderString