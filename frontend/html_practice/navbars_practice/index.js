
var flag = true
let a = document.getElementsByClassName("navbar-contents")
console.log(a)

window.addEventListener("resize", function() {
   
    if(window.screen.width > 700 && flag) {
            a[0].classList = ['navbar-contents']
            flag = false
            console.log(a[0].classList)
            return
        }
   });
function hamburger(){
    
    

    if(a[0].classList == 'navbar-contents' && flag){
        a[0].classList = 'navbar-contents-mobile'
        flag=true
       
    } else {
        a[0].classList = 'navbar-contents'
    }  

    return
}