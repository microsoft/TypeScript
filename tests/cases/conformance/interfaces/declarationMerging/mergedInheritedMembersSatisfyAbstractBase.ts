abstract class BaseClass {
  abstract bar: number;
}

class Broken extends BaseClass {}

// declaration merging should satisfy abstract bar
interface IGetters {
  bar: number;
}
interface Broken extends IGetters {}

new Broken().bar

class IncorrectlyExtends extends BaseClass {}
interface IncorrectGetters {
  bar: string;
}
interface IncorrectlyExtends extends IncorrectGetters {}
