import { combineLatest, fromEvent } from 'rxjs';
import { calculateMortgage } from './calculate';
import { debounceTime, map } from 'rxjs/operators';
const loanInterest = <HTMLInputElement>document.getElementById('loanInterest');
const loanAmount = <HTMLInputElement>document.getElementById('loanAmount');
const loanLength = <HTMLInputElement>document.getElementById('loanLength');

const stream1$ = fromEvent(loanInterest, 'input').pipe(
  map(e => (<HTMLInputElement>e.target).value),
  debounceTime(1000)
);

const stream2$ = fromEvent(loanAmount, 'input').pipe(
  map(e => (<HTMLInputElement>e.target).value),
  debounceTime(1000)
);

const stream3$ = fromEvent(loanLength, 'input').pipe(
  map(e => (<HTMLInputElement>e.target).value)
);

const result = combineLatest([stream1$, stream2$, stream3$]).pipe(
  map(([a, b, c]) => calculateMortgage(+a, +b, +c))
);

result.subscribe(
  res => (document.getElementById('result').innerHTML = res.toString())
);
