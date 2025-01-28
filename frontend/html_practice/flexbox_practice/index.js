
var flag = true
var a = document.getElementsByTagName("ul")

window.addEventListener("resize", function() {
   
 if(window.screen.width > 700 && flag) {
         a[0].classList = ['navbar-menu']
         flag = false
         console.log(a[0].classList)
         return
     }
});

function Click(){
     
     
    // Smaller screens if clicked nav content on and off 
     if(a[0].classList == 'navbar-menu'){
         a[0].classList = 'navbar-menu-mobile'
         flag = true
        

     } else {
         a[0].classList = ['navbar-menu']
       

     }       

  

     return

     

     
     // if(a[0].style.visibility){
     //     a[0].style.visibility = ""
     // } else {
     //     a[0].style.visibility = "visible"
     // }

     // return

 }