interface ErrorOptions {
  cause?: Error;
}

interface ErrorConstructor {
  new(message?: string, options?: ErrorOptions): Error;
  (message?: string, options?: ErrorOptions): Error;
}
