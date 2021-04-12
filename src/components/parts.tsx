import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Markdown, compiler as markdownCompiler } from "markdown-to-jsx";
import { Observable, of, interval, concat } from "rxjs";
import {
  filter,
  first,
  last,
  map,
  mapTo,
  skip,
  skipLast,
  startWith,
  take,
  takeLast,
  tap
} from "rxjs/operators";

export const Part01 = () => {
  const title = "Understand RxJS Operators";

  let foo = of(1, 2, 3, 4, 5);

  function multiplyBy(number: any) {
    const result = function (source: any) {
      return new Observable((observer) => {
        return source.subscribe({
          next(x: any) {
            observer.next(x * number);
          },
          error(err: any) {
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

const subscribeAndLog = (dest: Observable<any>, destName: string) => {
  dest.subscribe(
    (x: any) => console.log(`[${destName}] next: ${x}`),
    (err: any) => console.log(`[${destName}] error: [${err}] `),
    () => console.log(`[${destName}] done`)
  );
};

export const Part04 = () => {
  const title = "Inspect the Behavior of Operators with RxJS tap";

  let foo: Observable<number> = interval(1000);

  var bar = foo.pipe(
    tap((x) => console.log("before " + x)),
    map((x) => x * 2),
    tap((x) => console.log("after " + x))
  );

  const onClick = () => {
    subscribeAndLog(bar, "bar");
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part05 = () => {
  const title = "Filter Events Based on a Predicate with RxJS filter";

  let foo: Observable<number> = interval(1000);

  var even = foo.pipe(filter((x) => x % 2 === 0));
  var odd = foo.pipe(filter((x) => x % 2 !== 0));

  const onClick = () => {
    subscribeAndLog(even, "even");
    subscribeAndLog(odd, "odd");
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part06 = () => {
  const title = "Filter Events with RxJS Operators take, first, and skip";

  let source: Observable<number> = interval(1000);

  var take5 = source.pipe(take(5));
  var take1 = source.pipe(take(1));
  var f1rst = source.pipe(first());
  var skip5 = source.pipe(skip(5));

  const onClick = () => {
    subscribeAndLog(take5, "take5");
    subscribeAndLog(take1, "take1");
    subscribeAndLog(f1rst, "first");
    subscribeAndLog(skip5, "skip5");
  };

  const md = `
  - Use \`take\` to only get the first N events.
  - Use \`first\` to only get the first event.
  - Use \`skip\` to ignore the first N events.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part07 = () => {
  const title = "Filter Events with RxJS Operators takeLast and last";

  let source: Observable<number> = interval(1000).pipe(take(5));

  var takeLast2 = source.pipe(takeLast(2));
  var skipLast3 = source.pipe(skipLast(3));
  var l4st = source.pipe(last());

  const onClick = () => {
    subscribeAndLog(takeLast2, "takeLast2");
    subscribeAndLog(skipLast3, "skipLast3");
    subscribeAndLog(l4st, "last");
  };

  const md = `
  - Use **takeLast** to take the last N events.
    - It will wait until the stream is completed, as it can't know a priori.
  - Use **last** to take the last event.
    - This is usually the most common one to use.
  - Use **skipLast** to skip the last N events.

  All of these will only work on a stream that finishes.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part08 = () => {
  const title = "Prepend/Append Data with RxJS Operators concat and startWith";

  let source: Observable<number> = interval(1000).pipe(take(4));
  let more: Observable<number> = of(4, 5, 6);

  var _concat = concat(source, more);
  var _startWith = source.pipe(startWith(-1));

  const onClick = () => {
    subscribeAndLog(_concat, "concat");
    subscribeAndLog(_startWith, "startWith");
  };

  const md = `
  - We can append more values using **concat**.
    - Notice it is done synchronously, independent of the source's interval.
  - We can prepend a single value using **startWith**.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part09 = () => {};
export const Part10 = () => {};
export const Part11 = () => {};
export const Part12 = () => {};
export const Part13 = () => {};
export const Part14 = () => {};
export const Part15 = () => {};
export const Part16 = () => {};
export const Part17 = () => {};
export const Part18 = () => {};
export const Part19 = () => {};
export const Part20 = () => {};
export const Part21 = () => {};
export const Part22 = () => {};
