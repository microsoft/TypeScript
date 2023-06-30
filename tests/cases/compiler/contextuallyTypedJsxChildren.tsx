// @strict: true
// @jsx: react
// @esModuleInterop: true
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

// repro from https://github.com/microsoft/TypeScript/issues/53941
declare namespace DropdownMenu {
  interface BaseProps {
    icon: string;
    label: string;
  }
  interface PropsWithChildren extends BaseProps {
    children(props: { onClose: () => void }): JSX.Element;
    controls?: never | undefined;
  }
  interface PropsWithControls extends BaseProps {
    controls: Control[];
    children?: never | undefined;
  }
  interface Control {
    title: string;
  }
  type Props = PropsWithChildren | PropsWithControls;
}
declare const DropdownMenu: React.ComponentType<DropdownMenu.Props>;

<DropdownMenu icon="move" label="Select a direction">
  {({ onClose }) => (
    <div>
      <button onClick={onClose}>Click me</button>
    </div>
  )}
</DropdownMenu>;

<DropdownMenu
  icon="move"
  label="Select a direction"
  children={({ onClose }) => (
    <div>
      <button onClick={onClose}>Click me</button>
    </div>
  )}
/>;
