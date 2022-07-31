function sum(nums) {
    let result = 0;
    for (let i = 0; i <= nums; i++) {
        result += i;
    }
    return result;
}

Array.prototype.doFilter = function (callback) {
    if (typeof (callback) != "function") {
        return "is not function";
    }
    result = [];
    for (let item of this) {
        if (callback(item)) {
            result.doPush(item);
            // console.log(result);
        }
    }
    return result;
};

Array.prototype.doPush = function (...items) {
    for (let item of items) {
        this[this.length] = item;
    }
};

Array.prototype.doFind = function (callback) {
    if (typeof (callback) != "function") {
        return "is not function";
    }
    for (let item of this) {
        // console.log(callback(item));
        if (callback(item)) {
            return item;
        }
    }

};

Array.prototype.doMap = function (callback) {
    if (typeof (callback) != "function") {
        return "is not function";
    }
    let result = [];
    for (let item of this) {
        // console.log(callback(item));
        result.doPush(callback(item));
    }
    return result;
}

Array.prototype.doReduce = function (callback, initVal = 0) {
    if (typeof (callback) != "function") {
        return "is not function";
    }
    let result = initVal;
    for (let item of this) {
        if (result == 0) {
            result = item;
            continue;
        }
        result = callback(result, item, item, this);
        // console.log(result);
    }
    return result;
}

Array.prototype.doConcat = function (...items) {
    let result = this;

    for (let item of items) {
        if (typeof (item) != "object")
            result.doPush(item);

        for (let i of item) {
            result.doPush(i);
        }
    }
    return result;
}



let arr = [
    {
        id: 1,
        type: 'A',
        price: 100,
    },
    {
        id: 2,
        type: 'B',
        price: 200,
    },
    {
        id: 5,
        type: 'A',
        price: 150,
    },
    {
        id: 6,
        type: 'D',
        price: 250,
    },
];
console.log('doFilter:');
console.log(arr.doFilter(item => item.type == 'A'));
console.log('filter:');
console.log(arr.filter(item => item.type == 'A'));

console.log();

console.log('[3,5,6].opush(0)');
console.log('answer:');
let arr2 = [3, 5, 6];
arr2.doPush(0);
console.log(arr2);


console.log();

console.log('doFind:');
console.log(arr.doFind(item => item.price > 180));
console.log('find:');
console.log(arr.find(item => item.price > 180));

console.log();

console.log('doMap:')
console.log(arr.doMap(item => item.price * 10));
console.log('map:')
console.log(arr.map(item => item.price * 10));

console.log();

console.log('doReduce:');
console.log(arr2.doReduce((start, next, index, a) => start + next));
console.log('reduce:');
console.log(arr2.reduce((start, next) => start + next));

console.log();


let test = [9, 10, 11, 12];
console.log('doConcat:');
console.log(arr2.doConcat(test));
console.log('concate:');
console.log(arr2.concat(test));

