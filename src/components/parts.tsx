import React from "react";
import { Button } from "react-bootstrap";
import { compiler as markdownCompiler } from "markdown-to-jsx";
import {
  Observable,
  of,
  interval,
  concat,
  merge,
  combineLatest,
  zip,
  empty
} from "rxjs";
import {
  buffer,
  bufferCount,
  bufferTime,
  catchError,
  debounceTime,
  delay,
  delayWhen,
  distinct,
  filter,
  first,
  last,
  map,
  mapTo,
  retry,
  retryWhen,
  scan,
  skip,
  skipLast,
  startWith,
  take,
  takeLast,
  tap,
  throttleTime,
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

export const Part12 = () => {};

export const Part13 = () => {
  const title = "Combine Values of One Observable with RxJS scan";

  let hello = of(...Array.from("Hello"));
  let bar: Observable<number> = interval(600).pipe(take(5));
  let _zip = zip(hello, bar, (x, y) => x);

  let _scan = _zip.pipe(scan((acc, x) => acc + x, ""));

  const onClick = () => {
    subscribeAndLog(_scan, "scan");
  };

  const md = `
  - Use \`scan\` to combine values horizontally.
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

export const Part14 = () => {
  const title = "Group Consecutive Values Together with RxJS Operator buffer";

  let hello = of(...Array.from("Hello"));
  let bar: Observable<number> = interval(600).pipe(take(5));

  let _zip = zip(hello, bar, (x, y) => x);
  let _bufferCount = _zip.pipe(bufferCount(2));
  let _bufferTime = _zip.pipe(bufferTime(900));

  let closing: Observable<number> = interval(900).pipe(take(3));
  let _bufferCustom = _zip.pipe(buffer(closing));

  const onClick = () => {
    // subscribeAndLog(_bufferCount, "scan");
  };

  const md = `
  - Use \`buffer\` to combine values horizontally.
    - \`bufferCount(N)\` groups together N values.
    - \`bufferTime(N)\` groups together each N milliseconds.
    - \`buffer(O)\` takes another observable as guide for grouping values.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(_bufferCount, "bufferCount")}>
        bufferCount
      </Button>
      <Button onClick={() => subscribeAndLog(_bufferTime, "bufferTime")}>
        bufferTime
      </Button>
      <Button onClick={() => subscribeAndLog(_bufferCustom, "bufferCustom")}>
        buffer (custom)
      </Button>
    </div>
  );
};

export const Part15 = () => {
  const title = "Delay the Emission of Values from an RxJS Observable";

  let source: Observable<number> = interval(100).pipe(take(5));

  let _delay = source.pipe(delay(500));
  let _delayWhen = source.pipe(
    delayWhen((x) => interval(x * x * 1000).pipe(take(1)))
  );

  const md = `
  - Use \`delay\` to delay execution in milliseconds.
  - Use \`delayWhen\` to delay execution in a variable amount.
  - Useful for UI animations and server communications.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(_delay, "delay")}>delay</Button>
      <Button onClick={() => subscribeAndLog(_delayWhen, "delayWhen")}>
        delayWhen
      </Button>
    </div>
  );
};

export const Part16 = () => {
  const title = "Drop and Delay Observable Emissions with RxJS debounce";

  let source: Observable<number> = interval(100).pipe(take(5));

  let _delay = source.pipe(delay(1000));
  let _debounceTime = source.pipe(debounceTime(1000));

  const md = `
  - \`debounceTime\` waits for N milliseconds of event silence.
  - Useful for waiting for user to finish typing stuff before sending to server.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(_delay, "delay")}>delay</Button>
      <Button onClick={() => subscribeAndLog(_debounceTime, "debounceTime")}>
        debounceTime
      </Button>
    </div>
  );
};

export const Part17 = () => {
  const title =
    "Limit the Rate of Emissions from Observables with throttle in RxJS";

  let source: Observable<number> = interval(500).pipe(take(5));

  let _delay = source.pipe(delay(1000));
  let _throttleTime = source.pipe(throttleTime(1000));

  const md = `
  - \`throttle\` first emits, then causes N milliseconds of silence.
    - It works like _debounce_, but "backwards".
  - Other rate-limiting strategies include _auditTime_.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(source, "source")}>source</Button>
      <Button onClick={() => subscribeAndLog(_throttleTime, "throttleTime")}>
        throttleTime
      </Button>
    </div>
  );
};

export const Part18 = () => {
  const title = "Filter Redundant Observable Emissions with RxJS distinct";

  let hello = of(...Array.from("abacb"));
  let bar: Observable<number> = interval(600).pipe(take(5));
  let source = zip(hello, bar, (x, y) => x);

  let _distinct = source.pipe(distinct());

  let hello2 = of(...Array.from("abAcb"));
  let source2 = zip(hello2, bar, (x, y) => x);
  let _distinct2wrong = source2.pipe(distinct());
  let _distinct2 = source2.pipe(distinct((x) => x.toLowerCase()));

  const md = `
  - \`distinct\` filters redundant emissions.
    - It can take a comparison function as parameter.
    - It keeps a registry to check for duplicate values.
    - It can take a "flusher" function to decide when to reset the registry.
  - \`distinctUntilChanged\` only compares with the immediately preceding emission.
    - This is usually more useful.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(source, "source")}>source</Button>
      <Button onClick={() => subscribeAndLog(_distinct, "distinct")}>
        distinct
      </Button>
      <hr />
      <Button onClick={() => subscribeAndLog(source2, "source2")}>
        source 2
      </Button>
      <Button
        onClick={() => subscribeAndLog(_distinct2wrong, "distinct2wrong")}
      >
        distinct 2 (wrong)
      </Button>
      <Button onClick={() => subscribeAndLog(_distinct2, "distinct2")}>
        distinct 2 (custom compare)
      </Button>
    </div>
  );
};

export const Part19 = () => {
  const title = "Handle Errors with RxJS catch";

  let letters = of(...[...Array.from("abcd"), 2]);
  let bar: Observable<number> = interval(600).pipe(take(5));
  let source = zip(letters, bar, (x, y) => x);
  let toUpper = source.pipe(map((x: any) => x.toUpperCase()));

  let _catchError = toUpper.pipe(catchError((e, outputObs) => empty()));
  let retryError = toUpper.pipe(catchError((e, outputObs) => outputObs));

  let foo = interval(500).pipe(map(() => Math.random()));

  let source2 = foo.pipe(
    map((x) => {
      if (x < 0.5) {
        return x;
      } else {
        throw new Error("Number too large");
      }
    })
  );

  let retryError2 = source2.pipe(catchError((e, outputObs) => outputObs));

  const md = `
  - \`catchError\` allows us to replace an error with an Observable.
    - Not only useful for replacing with another Observable, but also to resubscribe.
  `;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(toUpper, "toUpper")}>
        toUpper
      </Button>
      <Button onClick={() => subscribeAndLog(_catchError, "catchError")}>
        catchError
      </Button>
      <Button onClick={() => subscribeAndLog(retryError, "retryError")}>
        retry error
      </Button>
      <hr />
      <Button onClick={() => subscribeAndLog(source2, "source 2")}>
        numbers
      </Button>
      <Button onClick={() => subscribeAndLog(retryError2, "retryError 2")}>
        retry error 2
      </Button>
    </div>
  );
};

export const Part20 = () => {
  const title = "Resubscribe to an Observable on Error with RxJS retry";

  let letters = of(...[...Array.from("abcd"), 2]);
  let bar: Observable<number> = interval(600).pipe(take(5));
  let source = zip(letters, bar, (x, y) => x);
  let toUpper = source.pipe(map((x: any) => x.toUpperCase()));

  let retryTwice = toUpper.pipe(retry(2));

  let retryAfter3s = toUpper.pipe(
    retryWhen((errorObs) => errorObs.pipe(delay(3000)))
  );

  const md = `
- \`retry\` retries N number of times.
  - Useful for HTTP requests.
- \`retryWhen\` takes another Observable as guide for when to resubscribe.
`;

  return (
    <div>
      <h5>{title}</h5>
      {markdownCompiler(md)}
      <Button onClick={() => subscribeAndLog(toUpper, "toUpper")}>
        toUpper
      </Button>
      <Button onClick={() => subscribeAndLog(retryTwice, "retry")}>
        retry twice
      </Button>
      <Button onClick={() => subscribeAndLog(retryAfter3s, "retryAfter3s")}>
        retry after 3s
      </Button>
    </div>
  );
};

export const Part21 = () => {};
export const Part22 = () => {};
