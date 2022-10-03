// overloading on arity not allowed
interface C {
   f<T>(): string;
   f<T, U>(): string; 
 
   <T>(): string;
   <T, U>(): string; 
 
  new <T>(): string;
  new <T, U>(): string; 
}
