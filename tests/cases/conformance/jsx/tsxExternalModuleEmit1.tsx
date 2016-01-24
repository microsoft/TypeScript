//@jsx: preserve
//@module: commonjs

//@filename: react.d.ts
declare module 'react' {
	class Component<T, U> { }
}

//@filename: app.tsx
import * as React from 'react';

// Should see var button_1 = require('./button') here
import { Button } from './button';

export class App extends React.Component<any, any> {

    render() {
        return <Button />;
    }

}

//@filename: button.tsx
import * as React from 'react';

export class Button extends React.Component<any, any> {

    render() {
        return <button>Some button</button>;
    }

}