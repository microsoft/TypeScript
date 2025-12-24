// @strict: true
// @noEmit: true
// @target: esnext

// https://github.com/microsoft/TypeScript/issues/60394

type State = { type: "running"; speed: number } | { type: "stopped" };

declare const initialState: State;

class Actor1 {
  private state;

  constructor() {
    this.state = initialState;

    const localRun = (speed: number) => {
      this.state = { type: "running", speed };
      this.state = { type: "runnnning", speed }; // error
    }
  }

  run(speed: number) {
    this.state = { type: "running", speed };
    this.state = { type: "runnnning", speed }; // error
  }
}

class Actor2 {
  accessor state;

  constructor() {
    this.state = initialState;

    const localRun = (speed: number) => {
      this.state = { type: "running", speed };
      this.state = { type: "runnnning", speed }; // error
    }
  }

  run(speed: number) {
    this.state = { type: "running", speed };
    this.state = { type: "runnnning", speed }; // error
  }
}
