// @sourcemap: true
// @target: es5
// @experimentaldecorators: true
declare function ClassDecorator1(target: Function): void;
declare function ClassDecorator2(x: number): (target: Function) => void;
declare function PropertyDecorator1(target: Object, key: string | symbol, descriptor?: PropertyDescriptor): void;
declare function PropertyDecorator2(x: number): (target: Object, key: string | symbol, descriptor?: PropertyDescriptor) => void;
declare function ParameterDecorator1(target: Object, key: string | symbol, paramIndex: number): void;
declare function ParameterDecorator2(x: number): (target: Object, key: string | symbol, paramIndex: number) => void;

@ClassDecorator1
@ClassDecorator2(10)
class Greeter {
    constructor(
      @ParameterDecorator1 
      @ParameterDecorator2(20) 
      public greeting: string, 
      
      @ParameterDecorator1 
      @ParameterDecorator2(30) 
      ...b: string[]) {
    }
    
    @PropertyDecorator1
    @PropertyDecorator2(40)
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }

    @PropertyDecorator1
    @PropertyDecorator2(50)
    private x: string;

    @PropertyDecorator1
    @PropertyDecorator2(60)
    private static x1: number = 10;
    
    private fn(
      @ParameterDecorator1 
      @ParameterDecorator2(70) 
      x: number) {
        return this.greeting;
    }

    @PropertyDecorator1
    @PropertyDecorator2(80)
    get greetings() {
        return this.greeting;
    }

    set greetings(
      @ParameterDecorator1 
      @ParameterDecorator2(90) 
      greetings: string) {
        this.greeting = greetings;
    }    
}