const { type } = require("os");

function sum(nums) {
    let result = 0;
    for (let i = 0; i <= nums; i++) {
        result += i;
    }
    return result;
}

Array.prototype.doFilte = function (str) {
    result = [];
    for (let item of this) {
        if (item === str) {
            result.doPush(item);
            console.log(result)
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
        // console.log(callback(item))
        if (callback(item)) {
            return item
        }
    }

};
Array.prototype.doMap = function (callback) {
    if (typeof (callback) != "function") {
        return "is not function";
    }
    let result = [];
    for (let item of this) {
        // console.log(callback(item))
        result.doPush(callback(item));
    }
    return result;
}
Array.prototype.doReduce = function (callback, initVal = 0) {
    let result = initVal;
    for (let item of this) {
        result = callback(result, this[item], item, this);
        console.log(result)
    }
    // return result
}
Array.prototype.doConcat=function(arr2){
    let result=this;
    for(let item of arr2){
        result.doPush(item);
    }
    return result
}

let test = [1, 1, 2, 3]
let test2 = [1, 1, 2, 3,5,6]
let t = ["t", "d", "s"]
let newt=test.doConcat(test2)
console.log(test2)
// console.log(test)
// console.log(test2)
// console.log(test.doReduce((s,c) => s+c));
// console.log(test.concat(e => e < 2));


