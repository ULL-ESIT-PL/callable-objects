# Creating Callable Objects in JavaScript

A callable object is a data structure that behaves as both an object and a function. 

You can 

- access and assign properties `obj.bar`, 
- call methods `obj.foo()`, but also 
- call the object directly `obj()`, as if it were a function.

The direct call is like calling a method of obj which has access to the object’s properties through its this context.

Callable Objects can also be thought of as **stateful functions**. 
Functions are inherently single instance, stateless procedures. 
Callable Objects are instantiated, stateful procedures.

See package [callable-object](https://www.npmjs.com/package/callable-object) for a simple implementation of a callable object in JavaScript. See also the example at [callable-instance.js](callable-instance.js).

## Goal

We want to create a Class/constructor that we can use to create callable objects that redirect their calls to a method named `_call`. 

We want this redirect so that we can inherit from our Class and easily override and extend the `_call` method with new functionality, 
without having to worry about the inner workings of the callable object.

To do this, we’re going to need to 
inherit from the `Function` constructor, 
which inherits from `Object`, and 
allows us to create both an object and a dynamic function.

*Our main hurdle is giving a function object a reference to itself*.

In order to have a reference to the `_call` method, 
the function part of our function object, generated by our `Callable` class/constructor, must have a reference to itself.

## The Solutions

We want to create an extensible `Callable` class that 
maintains proper and correct inheritance in JavaScript, and 
allows us to call the objects it constructs as functions, with a reference to themselves, 
redirecting those calls to an overridable method _call.

## References

1. [Creating Callable Objects in JavaScript](https://medium.com/@adrien.za/creating-callable-objects-in-javascript-fbf88db9904c) by Adrien. 2019.
2. [gist](https://gist.githubusercontent.com/arccoza/d6209b4c7317a22f0e929808640b40a5/raw/2e99d608329a75c17c38b6d4285492520c968a75/index.js)
3. [repl.it](https://replit.com/@arccoza/Javascript-Callable-Object-using-bind#index.js)