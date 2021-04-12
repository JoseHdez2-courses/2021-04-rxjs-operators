import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Observable, of, interval } from "rxjs";
import { map, mapTo } from "rxjs/operators";

export const Part01 = () => {
  const title = "Understand RxJS Operators";

  let foo = of(1, 2, 3, 4, 5);

  function multiplyBy(number) {
    const result = function (source) {
      return new Observable((observer) => {
        return source.subscribe({
          next(x) {
            observer.next(x * number);
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            observer.complete();
          }
        });
      });
    };

    return result;
  }

  let bar = foo.pipe(multiplyBy(100));
  const onClick = () => {
    bar.subscribe(
      (x) => console.log("next " + x),
      (err) => console.log("error " + err),
      () => console.log("done")
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part02 = () => {
  const title = "Use Marble Diagrams to Understand RxJS Operators";

  return (
    <div>
      <h5>{title}</h5>
    </div>
  );
};

export const Part03 = () => {
  const title =
    "Use RxJS mapTo and map to Transform Values Emitted by Observables";

  let foo: Observable<number> = interval(1000);

  var bar = foo.pipe(map((val) => val + 10));
  var barMapTo = foo.pipe(mapTo(42));

  const subscribeWithTitle = (dest: Observable<any>, destName: string) => {
    dest.subscribe(
      (x: any) => console.log(`[${destName}] next: ${x}`),
      (err: any) => console.log(`[${destName}] error: [${err}] `),
      () => console.log(`[${destName}] done`)
    );
  };

  const onClick = () => {
    subscribeWithTitle(bar, "bar");
    subscribeWithTitle(barMapTo, "barMapTo");
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};
