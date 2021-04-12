import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  Observable,
  of,
  from,
  fromEvent,
  empty,
  never,
  interval,
  timer
} from "rxjs";

export const Part02 = () => {
  let bar = Observable.create((observer: any) => {
    console.log("Hello");
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(() => {
      observer.next(300);
    }, 1000);
  });

  const onClick = () => {
    bar.subscribe((x: any) => console.log(x));
  };

  return (
    <div>
      <h5>Return multiple values from Observables in RxJS</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part03 = () => {
  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    console.log("Hello");
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(() => {
      observer.next(300);
    }, 1000);
  });

  // Generator (PULL)
  function* baz() {
    console.log("Hello");
    yield 42;
    yield 100;
    yield 200;
  }

  const onClick = () => {
    // Generator consumer determines when values are sent.
    let iterator = baz();
    console.log(iterator.next().value);
    console.log(iterator.next().value);
    console.log(iterator.next().value);
  };

  return (
    <div>
      <h5>Push Values from Observables in RxJS</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part04 = () => {
  const title = "Throw Errors with RxJS Observables";

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    try {
      console.log("Hello");
      observer.next(42);
      observer.next(100);
      observer.next("error incoming");
      observer.error(new Error("bad"));
      setTimeout(() => {
        observer.next(300);
      }, 1000);
    } catch (err) {
      observer.error(err);
    }
  });

  const onClick = () => {
    bar.subscribe(
      (x: any) => {
        console.log(x);
      },
      (err: any) => {
        console.error("Something went wrong: " + err);
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part05 = () => {
  const title = "Perform an Action on Completion with RxJS Observables";

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    try {
      console.log("Hello");
      observer.next(42);
      observer.next(100);
      setTimeout(() => {
        observer.next(300);
        observer.complete();
      }, 1000);
    } catch (err) {
      observer.error(err);
    }
  });

  const onClick = () => {
    bar.subscribe(
      (x: any) => {
        console.log(x);
      },
      (err: any) => {
        console.error("Something went wrong: " + err);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part06 = () => {
  const title = "Deliver Synchronous Values with the RxJS of() Operator";

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    observer.next(42);
    observer.next(100);
    observer.next(100);
    observer.complete(200);
  });

  // less boilerplate
  let foo = of(42, 100, 200);

  const onClick = () => {
    foo.subscribe(
      (x: any) => {
        console.log(x);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part07 = () => {
  const title = "Convert JavaScript Values to RxJS Observables";

  let arr = [42, 100, 200];
  let foo = from(arr); // Observable.from is deprecated

  const onClick = () => {
    foo.subscribe(
      (x: any) => {
        console.log(x);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part08 = () => {
  const title =
    "Convert DOM and Node.js Streams to RxJS Observables with fromEvent";

  let arr = [42, 100, 200];
  // let foo = from(arr); // Observable.from is deprecated

  const addEventHandler = (handler) => {
    document.addEventListener("click", handler);
  };

  const removeEventHandler = (handler) => {
    document.removeEventListener("click", handler);
  };

  // let foo = fromEventPattern(addEventHandler, removeEventHandler);
  let foo = fromEvent(document, "click");

  const onClick = () => {
    foo.subscribe(
      (x: any) => {
        console.log("next " + x);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part09 = () => {
  const title =
    "Combine empty, never, and throw Operators with Observables in RxJS";

  let foo = empty();
  // let foo = never();
  // let foo = throw();

  const onClick = () => {
    foo.subscribe(
      (x: any) => {
        console.log("next " + x);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part10 = () => {
  const title = "Set Intervals with RxJS interval and timer Operators";

  var date = new Date(new Date().getTime() + 6000);
  let foo = interval(1000);
  let foo2 = timer(date, 1000);

  const onClick = (observable: any, name: any) => {
    observable.subscribe(
      (x: any) => {
        console.log(`next ${name} ${x}`);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={() => onClick(foo, "a")}>
        Open console and click this
      </Button>
      <Button onClick={() => onClick(foo, "b")} variant="danger">
        Then click this
      </Button>
      <Button onClick={() => onClick(foo2, "c")} variant="success">
        then this
      </Button>
    </div>
  );
};

export const Part11 = () => {
  const title = "Understand the RxJS create Operator";

  function subscribe(observer: any) {
    observer.next(42);
    observer.next(100);
    observer.next(200);
    observer.complete();
  }

  let foo = new Observable(subscribe);

  let observer = {
    next: (x: any) => {
      console.log(`next ${x}`);
    },
    error: (err: any) => {
      console.error(`error: ${err}`);
    },
    complete: () => {
      console.log(`done`);
    }
  };

  const onClick = () => {
    foo.subscribe(observer);
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={() => onClick()}>Open console and click this</Button>
    </div>
  );
};

export const Part12 = () => {
  const title = "Return Subscriptions from the Subscribe Function in RxJs";

  let foo = new Observable((observer: any) => {
    const id = setInterval(() => {
      observer.next("hi");
    }, 1000);
    return function unsubscribe() {
      clearInterval(id);
    };
  });

  const onClick = (observable: any, name: any) => {
    let subscription = observable.subscribe(
      (x: any) => {
        console.log(`next [${name}]: ${x}`);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
    setTimeout(() => subscription.unsubscribe(), 4500);
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={() => onClick(foo, "4-second sub")}>
        Open console and click this
      </Button>
    </div>
  );
};
