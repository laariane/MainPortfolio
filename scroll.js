document.querySelectorAll('a').forEach(link=>{
  link.addEventListener("click",function(e){
    e.preventDefault();
    const target = this.getAttribute('href')
    document.querySelector(target).scrollIntoView({
      behavior:"smooth"
    })
  })
})