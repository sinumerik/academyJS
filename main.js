'use strict';

let changeString = (data) => {
    if ( typeof(data) === 'string' ) {
        if (data.length <= 30) {
            return data.trim();
        } else {
            return (data.trim().substring(0, 31) + '...');
        }
    } else {
        return ('Передана не строка!');
    }
};

let string = '  Эта строка длиннее 30 символов, поэтому дочитать до конца не получится, и есть пробелы в начале и конце';

console.log(changeString(string));