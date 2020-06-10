'use strict';

let arr = ['456135', '546843', '236236', '8965823', '346347', '431287', '3468'];

for(let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    }
}

nextPrime:
for(let i = 2; i <= 100; i++) {
    for(let j = 2; j < i; j++) {
        if( i % j === 0 ) {
            continue nextPrime;
        }
    }
    console.log(i + 'делитель числа ' + i + ': 1 и ' + i);
}
