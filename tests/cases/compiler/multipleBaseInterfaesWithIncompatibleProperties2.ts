// @strict: true
// @noEmit: true
// @exactOptionalPropertyTypes: true, false

// https://github.com/microsoft/TypeScript/issues/62569

namespace http {
  export interface TcpSocketConnectOpts {
    port: number;
  }

  export interface AgentOptions extends Partial<TcpSocketConnectOpts> {
    keepAlive?: boolean | undefined;
  }
}

namespace tls {
  export interface ConnectionOptions {
    port?: number | undefined;
  }
}

interface AgentOptions extends http.AgentOptions, tls.ConnectionOptions { // error under exactOptionalPropertyTypes
  maxCachedSessions?: number | undefined;
}
