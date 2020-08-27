var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var PORT = 3000
var app = express()
app.use(cors())
var jsonParser = bodyParser.json()
//function to check if borrowing is taking place
function checkNum(a,b) {
    let arr1 = a.toString().split('')
    let arr2 = b.toString().split('')
    if (arr2.length > arr1.length) return false
    for(i = 0; i<arr2.length; i++) {
        if(parseInt(arr2[arr2.length-i-1])>parseInt(arr1[arr1.length-i-1])) {
            return false
        } 

    }
    return true


}
// function to generate random numbers
function  generateNum(n) {
    var minm = Math.pow(10,n-1); 
    var maxm = Math.pow(10,n)-1; 
    return (
        Math.floor(Math .random() * (maxm - minm + 1)) + minm
        ); 
}



app.post('/subtract',jsonParser,(req,res)=>{
    // req.body ={"question":num,"min":num,"sub":num,"boolFlag":boolean}
    let reqObj = req.body;
    let min = generateNum(reqObj['min'])
    let sub = generateNum(reqObj['sub'])
    let bool = reqObj['boolFlag']
    let diff = min-sub
    let diffArr = diff.toString().split('')
    let opt1= parseInt(diffArr[0]+generateNum(diffArr.length-1).toString())
    let opt2= parseInt(diffArr[0]+generateNum(diffArr.length-1).toString())
    let opt3= parseInt(diffArr[0]+generateNum(diffArr.length-1).toString())

    let options = [diff, opt1,opt2,opt3]
    function result(){
        if(min<sub) return 'Invalid computation, minuend<subtrahend'
        if (min>sub) {
            if(bool ==true) {
            return {min,sub,diff,options}
            } else {
                if(checkNum(min,sub)) {
                    return {min,sub,diff,options}
                } else {
                    return 'Invalid Computation : boolean flag is false'
                }
            }
        }
    }
    console.log(result())
    res.send(result());
    
    
})


app.listen(PORT, ()=> {
    console.log('listening to server on port: ' + PORT)
})
