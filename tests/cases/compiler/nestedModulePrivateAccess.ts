module a{
       var x:number;
       module b{
               var y = x; // should not be an error
       }
}