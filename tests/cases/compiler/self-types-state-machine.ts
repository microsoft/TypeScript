type StateMachine =
  { [S in keyof self]: { [E in keyof self[S]]: keyof self } }

let trafficLights: StateMachine = {
  off: {
    ON: "red"
  },
  red: {
    TICK: "yellow",
    OFF: "off"
  },
  yellow: {
    TICK: "green",
    OFF: "off"
  },
  green: {
    TICK: "reddd",
    OFF: "off"
  }
}