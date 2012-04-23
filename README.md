[setZeroTimeout](http://shahyar.github.com/setZeroTimeout-js/) is a simple utility function allowing you to use a sub-10ms (near-instantaneous, in most cases) asynchronous setTimeout analogue. This is performed using the browser's messaging system. In simpler terms: 0ms setTimeout.

Its usage is simple: `setZeroTimeout(Function, 0);`

It uses setTimeout syntax, because in unsupporting browsers (FF<3, IE<8, SF<5, O<10), `setZeroTimeout` is actually a reference to `setTimeout`. Therefore, the second parameter of timeout is _mandatory_. On most old browsers, the actual minimum for setTimeout is ~10ms. setZeroTimeout usually runs much under 1ms.

While other setZeroTimeout implementations exist, this particular one continues to throw valid `Error`s inside a closure, without breaking the timeout queue nor severely hindering JavaScript debuggability.

Licensed freely under CC 3.0: http://creativecommons.org/licenses/by/3.0/

--SG
