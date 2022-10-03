// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface IUser {
    Name: string;
}

interface IFetchUserProps {
    children: (user: IUser) => JSX.Element;
}

class FetchUser extends React.Component<IFetchUserProps, any> {
    render() {
        return this.state
            ? this.props.children(this.state.result)
            : null;
    }
}

// Error
function UserName() {
    return (
        <FetchUser>
            { user => (
                <h1>{ user.NAme }</h1>
            ) }
        </FetchUser>
    );
}

function UserName1() {
    return (
        <FetchUser>


            
            { user => (
                <h1>{ user.Name }</h1>
            ) }
            { user => (
                <h1>{ user.Name }</h1>
            ) }
        </FetchUser>
    );
}