// @strict: true
// @noEmit: true

interface ClientSource {
  type: "client";
}

interface ServiceSource {
  type: "service";
}

function isDisplaySource(source: ClientSource | ServiceSource | undefined): boolean {
  switch (source?.type) {
    case "client":
      return true;
    case "service":
      return false;
    case undefined:
      return false;
    default:
      neverReached(source);
      return false;
  }
}

function neverReached(_v: never): void {}
