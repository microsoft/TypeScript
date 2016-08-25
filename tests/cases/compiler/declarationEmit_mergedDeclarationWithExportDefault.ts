// @declaration: true

class Logger {
  public logLevel = Logger.LogLevel.Info;
}

namespace Logger {
  export enum LogLevel {
    Verbose,
    Info
  }
}


export default Logger;
