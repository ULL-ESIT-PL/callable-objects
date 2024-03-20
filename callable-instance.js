
var CallableInstance = require("callable-instance");
 
class ArrayFunction extends CallableInstance {
  constructor(...a) {
    // CallableInstance accepts the name of the property to use as the callable
    // method.
    super("instanceMethod");
    this.array = a;
  }
 
  instanceMethod(arg) {
    let result = this.array[arg];
    //console.log(arg)
    //console.log(this.array);

    if (result?.constructor?.name === 'Function') {
        return result.bind(this.array);
    }
    return (typeof result == undefined)? null : result;
  }
}
 
var test = new ArrayFunction(0,1,2);
// Invoke the method normally
let r = test.instanceMethod(1);
console.log(r);
// Call the instance itself, redirects to instanceMethod
r = test(0);
console.log(r);
// The instance is actually a closure bound to itself and can be used like a
// normal function.
r = test.apply(null, [2]);
console.log(r);

r = test("length");
console.log(r);

r  = test("concat")(9, 5, 7);
console.log(r);