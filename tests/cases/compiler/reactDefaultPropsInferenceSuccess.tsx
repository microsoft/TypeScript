// @jsx: react
// @strict: true
// @esModuleInterop: true
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

interface BaseProps {
  when?: ((value: string) => boolean) | "a" | "b";
  error?: boolean;
}

interface Props extends BaseProps {
}

class FieldFeedback<P extends Props = BaseProps> extends React.Component<P> {
  static defaultProps = {
    when: () => true
  };

  render() {
    return <div>Hello</div>;
  }
}

// OK
const Test1 = () => <FieldFeedback when={value => !!value} />;

// Error: Void not assignable to boolean
const Test2 = () => <FieldFeedback when={value => console.log(value)} />;

class FieldFeedbackBeta<P extends Props = BaseProps> extends React.Component<P> {
  static defaultProps: BaseProps = {
    when: () => true
  };

  render() {
    return <div>Hello</div>;
  }
}

// OK
const Test1a = () => <FieldFeedbackBeta when={value => !!value} error>Hah</FieldFeedbackBeta>;

// Error: Void not assignable to boolean
const Test2a = () => <FieldFeedbackBeta when={value => console.log(value)} error>Hah</FieldFeedbackBeta>;

interface MyPropsProps extends Props {
  when: (value: string) => boolean;
}

class FieldFeedback2<P extends MyPropsProps = MyPropsProps> extends FieldFeedback<P> {
  static defaultProps = {
    when: () => true
  };

  render() {
    this.props.when("now"); // OK, always defined
    return <div>Hello</div>;
  }
}

// OK
const Test3 = () => <FieldFeedback2 when={value => !!value} />;

// Error: Void not assignable to boolean
const Test4 = () => <FieldFeedback2 when={value => console.log(value)} />;

// OK
const Test5 = () => <FieldFeedback2 />;
