import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Markdown, compiler as markdownCompiler } from "markdown-to-jsx";
import {
  Observable,
  of,
  interval,
  concat,
  merge,
  combineLatest,
  zip
} from "rxjs";
import {
  filter,
  first,
  last,
  map,
  mapTo,
  scan,
  skip,
  skipLast,
  startWith,
  take,
  takeLast,
  tap,
  withLatestFrom
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
  - Use \`takeLast\` to take the last N events.
    - It will wait until the stream is completed, as it can't know a priori.
  - Use \`last\` to take the last event.
    - This is usually the most common one to use.
  - Use \`skipLast\` to skip the last N events.

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
  - We can append more values sequentially using \`concat\`.
    - Notice it is done synchronously, independent of the source's interval.
  - We can prepend a single value using \`startWith\`.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part09 = () => {
  const title = "Merge Values in Parallel with RxJS Operator merge";

  let clicksOnButton: Observable<number> = interval(500).pipe(take(4));
  let clicksOnThePage: Observable<number> = interval(300).pipe(take(5));

  let allClicks = merge(clicksOnButton, clicksOnThePage);

  const onClick = () => {
    subscribeAndLog(allClicks, "allClicks");
  };

  const md = `
  - Use \`merge\` to merge values in parallel.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part10 = () => {
  const title = "Merge Values in Parallel with RxJS Operator merge";

  let weight: Observable<number> = interval(500).pipe(take(4));
  let height: Observable<number> = interval(300).pipe(take(5));

  let bmi = combineLatest(weight, height, (w, h) => w + h);

  const onClick = () => {
    subscribeAndLog(bmi, "bmi");
  };

  const md = `
  - Use \`combineLatest\` to combine values using a combinator function.
    - Unlike *merge* which is an OR-style operator, this is an AND-style op.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part11 = () => {
  const title =
    "Control the Output of Values with RxJS Operator withLatestFrom";

  const foo = zip(interval(500), of("H", "e", "l", "l", "o"), (_, c) => c).pipe(
    take(5)
  );

  const bar = zip(interval(300), of(0, 1, 0, 1, 0, 1, 0), (_, n) => n).pipe(
    take(7)
  );

  let combined = foo.pipe(
    withLatestFrom(bar, (c, n) => (n === 1 ? c.toUpperCase() : c.toLowerCase()))
  );

  const onClick = () => {
    subscribeAndLog(combined, "combined");
  };

  const md = `
  - Use \`withLatestFrom\` to combine two streams with a map fn.
    - Not as used as _combineLatest_.

  \`\`\`
  (hello|)
  ----H----e----l----l----o|     (foo)
  --0--1--0--1--0--1--0|         (bar)
    withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
  ----h----e----l----L----o|
  \`\`\`
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

export const Part12 = () => {
  const title = "Combine Values of One Observable with RxJS scan";

  let hello = of(...Array.from("Hello"));
  let bar: Observable<number> = interval(1000).pipe(take(5));

  let _zip = zip(hello, bar, (x, y) => x);
  let _scan = _zip.pipe(scan((acc, x) => acc + x, ""));

  const onClick = () => {
    subscribeAndLog(_scan, "scan");
  };

  const md = `
  - Use \`scan\` to combine events horizontally.
    - Basically a _reduce_ function.
    - Useful to keep state, for example to count click events.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={onClick}>Open console and click this</Button>
    </div>
  );
};

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
