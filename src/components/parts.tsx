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
  let bar = Observable.create((observer: any) => {
    // hope this works!
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
