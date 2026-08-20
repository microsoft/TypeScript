// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61351

export type State = {
  a: number;
  b: string;
};

export class Test {
  setState(state: State) {}
  test = (e: any) => {
    for (const [key, value] of Object.entries(e)) {
      this.setState({
        [key]: value,
      });
    }
  };
}
