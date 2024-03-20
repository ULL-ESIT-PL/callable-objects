
var CallableInstance = require("callable-instance");
 
class ArrayFunction extends CallableInstance {
  constructor(...a) {
    // CallableInstance accepts the name of the property to use as the callable
    // method.
    super("_call");
    this.array = a;
  }
 
  _call(arg) {
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
let r = test._call(1);
console.log("test._call(1) = ",r);
// Call the instance itself, redirects to _call
r = test(0);
console.log("test(0)=", r);
// The instance is actually a closure bound to itself and can be used like a
// normal function.
r = test.apply(null, [2]);
console.log("test.apply(null, [2]) = ",r);

r = test("length");
console.log('test("length") = ', r);

r  = test("concat")(9, 5, 7);
console.log('test("concat")(9, 5, 7) = ',r);