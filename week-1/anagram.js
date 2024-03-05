function isAnagram(str1, str2) {
    return str1.toLowerCase().split('').sort().join() === str2.toLowerCase().split('').sort().join()
    
   }
   let a = isAnagram("sliete","listen")
   console.log(a)
   