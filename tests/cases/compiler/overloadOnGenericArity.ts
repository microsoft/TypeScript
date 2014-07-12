interface Test {
    then<U>(p: string): string;
    then(p: string): Date; // Error: Overloads cannot differ only by return type
}
  
