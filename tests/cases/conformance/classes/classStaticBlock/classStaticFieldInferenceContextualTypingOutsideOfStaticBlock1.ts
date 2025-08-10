// @strict: true
// @noEmit: true
// @target: esnext

type State = { type: "running"; speed: number } | { type: "stopped" };

declare const initialState: State;

class Actor1 {
  static initialState;

  static {
    this.initialState = initialState;

    const localSetAsInitiallyRunning = (speed: number) => {
      this.initialState = { type: "running", speed };
      this.initialState = { type: "runnnning", speed }; // error
    }
  }

  static setAsInitiallyRunning(speed: number) {
    this.initialState = { type: "running", speed };
    this.initialState = { type: "runnnning", speed }; // error
  }
}

class Actor2 {
  static accessor initialState;

  static {
    this.initialState = initialState;

    const localSetAsInitiallyRunning = (speed: number) => {
      this.initialState = { type: "running", speed };
      this.initialState = { type: "runnnning", speed }; // error
    }
  }

  static setAsInitiallyRunning(speed: number) {
    this.initialState = { type: "running", speed };
    this.initialState = { type: "runnnning", speed }; // error
  }
}
