// @declaration:true
// @stripInternal:true

export interface FindOptions {
  /** Ports to avoid */
  avoids?: readonly number[] | undefined;
  /**
   * Minimum port.
   * @default 8000
   */
  min?: number | undefined;
  /**
   * Maximum port.
   * @default 10000
   */
  max?: number | undefined;
  /**
   * @internal
   * The current port to check.
   * This is an internal value, initialized and incremented
   * while {@link find} is run, and starts at {@link min} if unspecified.
   * It is unlikely that this needs to be set manually
   */
  port?: number | undefined;
}
