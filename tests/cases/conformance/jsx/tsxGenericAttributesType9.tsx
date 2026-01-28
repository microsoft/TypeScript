// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

export function makeP<P>(Ctor: React.ComponentClass<P>) {
	return class extends React.PureComponent<P, void> {
		public render(): JSX.Element {
			return (
				<Ctor {...this.props } />
			);
		}
	};
}

