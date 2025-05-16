// @strict: true
// @noEmit: true

type Payload =
  | { _tag: "auth"; username: string; password: string }
  | { _tag: "cart"; items: Array<{ id: string; quantity: number }> }
  | { _tag: "person"; name: string; age: number };

type PayloadContent = {
  [P in Payload as P["_tag"]]: Omit<P, "_tag">;
};

// ok, exhaustive cases and default case with throw
function mockPayload<P_TAG extends Payload["_tag"]>(
  str: P_TAG,
): PayloadContent[P_TAG] {
  switch (str) {
    case "auth":
      return { username: "test", password: "admin" };
    case "cart":
      return { items: [{ id: "123", quantity: 123 }] };
    case "person":
      return { name: "andrea", age: 27 };
    default:
      throw new Error("unknown tag");
  }
}

// ok, non-exhaustive cases but default case with throw
function mockPayload2<P_TAG extends Payload["_tag"]>(
  str: P_TAG,
): PayloadContent[P_TAG] {
  switch (str) {
    case "auth":
      return { username: "test", password: "admin" };
    case "cart":
      return { items: [{ id: "123", quantity: 123 }] };
    default:
      throw new Error("unhandled tag");
  }
}

// ok, exhaustive cases
function mockPayload3<P_TAG extends Payload["_tag"]>(
  str: P_TAG,
): PayloadContent[P_TAG] {
  switch (str) {
    case "auth":
      return { username: "test", password: "admin" };
    case "cart":
      return { items: [{ id: "123", quantity: 123 }] };
    case "person":
      return { name: "andrea", age: 27 };
  }
}

// error, non-exhaustive cases
function mockPayload4<P_TAG extends Payload["_tag"]>(
  str: P_TAG,
): PayloadContent[P_TAG] {
  switch (str) {
    case "auth":
      return { username: "test", password: "admin" };
    case "cart":
      return { items: [{ id: "123", quantity: 123 }] };
  }
}
