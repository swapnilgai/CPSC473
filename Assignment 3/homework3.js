function exercise1(nums) {
    var totalSum = 0;
    var average = 0;

    for (i = 0; i < nums.length; i++) {
        totalSum = totalSum + nums[i];
    }

    average = totalSum / (nums.length);
    return average;

}


function exercise2(nums) {

    var maxNo = nums[0];

    for (i = 0; i < nums.length; i++) {
        if (nums[i] > maxNo) {
            maxNo = nums[i];
        }
    }
    return maxNo;

}


function exercise3(nums) {

    var evenNo = false;

    for (i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            evenNo = true;
            return evenNo;
        }
    }
    return evenNo;
}


function exercise4(nums) {

    var evenNo = false;

    for (i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            evenNo = true;
        }else{
            evenNo = false;
            return evenNo;
        }
    }
    return evenNo;
}


function arrayContains(strArray, str) {

    var stringFound = false;

    for (i = 0; i < strArray.length; i++) {
        if (strArray[i] === str) {
             stringFound = true;
             return stringFound;
        }
    }
    return stringFound;
}


function arrayContainsTwo(strArray, str) {

    var stringFound = false;
    var k = 0;

    for (i = 0; i < strArray.length; i++) {
        if (strArray[i] === str) {
            k = k + 1;
            if(k === 2){
                 stringFound = true;
                 return stringFound;
            }
        }
    }
    return stringFound;
}


function arrayContainsThree(strArray, str) {

    var stringFound = false;
    var k = 0;

    for (i = 0; i < strArray.length; i++) {
        if (strArray[i] === str) {
            k = k + 1;
            if(k === 3){
                 stringFound = true;
                 return stringFound;
            }
        }
    }
    return stringFound;
}


function arrayContainsNTimes(strArray, str, count) {

    var stringFound = false;
    var k = 0;

    for (i = 0; i < strArray.length; i++) {
        if (strArray[i] === str) {
            k = k + 1;
            if(k === count){
                 stringFound = true;
                 return stringFound;
            }
        }
    }
    return stringFound;
}


// With underscore.js


document.write('<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>');

//Question 1

function findMax(array1)
{
   return _.max(array1)
}

//Question 2
//ref : http://eureka.ykyuen.info/2015/02/17/javascript-get-average-value-of-a-numeric-array-using-underscore/
function arrayAverage(array1) {
     return _.reduce(array1, function(memo, num) {

       return memo + num;
     }, 0) / (array1.length === 0 ? 1 : array1.length);
   }



//Question 3 : even no
   function arrayEven(array1) {
  var flag =0;
    var count = _.reduce(array1, function(memo, num)
     {
          if (num !=0 && num % 2==0) {
              flag = flag+1;
            }
            return flag;
     }, 0);

     if(flag>0)
         return true;
         return false;

      }

//Question 4 : every even
function everyEven(array1) {

var flag =0 ;
var num =  _.reduce(array1, function(memo, num) {
  if (num !=0 && num % 2==0) {
   flag =flag+1;
  }
}, 0);

if(flag==array1.length)
  return true;
  return false;
 }

//Question 5
function objContain(array2, charToSearch)
{
  return _.contains(array2,charToSearch);
}

//Question 6
function multipleOccerance(array2, charToSearch){
   var indexLast = _.lastIndexOf(array2, charToSearch);
   var indexFirst = _.indexOf(array2, charToSearch);
   if (indexLast-indexFirst!=0) {
     return true;
   }
   return false;
}
