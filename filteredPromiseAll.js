/*customized promise.all
added filter

input :[{
    needWait:Boolean,
    promise: ()=>Promise,
}]
*/
// 天才
function filteredPormiseAll(inputList, optionalData) {
    //check the number of promises needs to wait
    let waitCount = 0;
    let crucialResult = [];
    inputList.forEach(ele => {
        if (ele.needWait) waitCount++;
    });
    // sending promises
    const mainPromise = new Promise((resolve, reject) => {
        inputList.forEach(ele => {
            ele.promise().then(
                res => {
                    if (ele.needWait) {
                        crucialResult.push(res);
                        if (--waitCount === 0) {
                            resolve(crucialResult);
                        }
                    } else {
                        optionalData.push(res);
                    }
                }
            ).catch(
                err => {
                    if (ele.needWait) reject(err);
                    //optional error can add a error array;
                    else;
                }
            )
        })
    })
    return mainPromise;
}

module.exports.filteredPormiseAll = filteredPormiseAll;