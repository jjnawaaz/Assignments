/* 
EXAMPLE TENES TRY OUT TENET
.toLowerCase() = Lowers the uppercase letters to lowercase                      ==   tenes
.split() = Splits the string into seperate letters into an array                ==   ['t','e','n','e','s']
.reverse() = reverses the array                                                 ==   ['s','e','n','e','t']
.join() = joins the elements of array but doesnt remove commas in between       ==   s,e,n,e,t 
.replace(/,/g, "") = replaces the , from the string after join() is used        ==   senet

*/
function isPalindrome(str){
    let str1 = str.toLowerCase().split("").reverse().join().replace(/,/g,"")
    if(str1 === str) {
        return true
    }
    else{
        return false
    }
}

let result = isPalindrome("tenet")
console.log(result)