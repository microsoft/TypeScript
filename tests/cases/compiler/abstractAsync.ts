// @lib: es2015
abstract class ShouldFailClass {
  async abstract badMethod(): Promise<number>;
}