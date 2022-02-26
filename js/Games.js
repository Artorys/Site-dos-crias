const abagame = window.document.getElementsByTagName("a")[0]
const mainGame = window.document.querySelector(".games")
function Clique()
{
    const hamburguer = window.document.querySelector(".hamburguer")
    console.log(getComputedStyle(hamburguer).getPropertyValue('color')); 
    const sidebar = window.document.querySelector(".sidebar")
    const span1 = window.document.querySelector(".span1")
    const span2 = window.document.querySelector(".span2")
    const span3 = window.document.querySelector(".span3")
    const span4 = window.document.querySelector(".span4")
    hamburguer.addEventListener("click",function()
    {
        hamburguer.classList.toggle("on")
        if(hamburguer.classList.contains("on") == true)
        {

            sidebar.style.left = "-300px"
            span1.style.display = "none"
            span2.style.display = "none"
            span3.style.display = "none"
        }
        else
        {
            span1.style.display = "inline"
            span2.style.display = "inline"
            span3.style.display = "inline"
            sidebar.style.left = "0px"
        }

    })

}
function Carrosel()
{
    const bolinha1 = window.document.getElementsByTagName("label")[0]
    const bolinha2 = window.document.getElementsByTagName("label")[1]
    const bolinha3 = window.document.getElementsByTagName("label")[2]
    const label1 = window.document.getElementsByTagName("input")[0]
    label1.addEventListener("click", function()
    {
        label1.classList.toggle("checked1")
        if(label1.classList.contains("checked1"))
        {
            bolinha1.style.backgroundColor = "#01BED0"
        }
    })
    const label2 = window.document.getElementsByTagName("input")[1]
    label2.addEventListener("click",function()
    {
        label2.classList.toggle("checked2")
        if(label2.classList.contains("checked2"))
        {
            bolinha2.style.backgroundColor = "#8E1509"
        }
    })
    const label3 = window.document.getElementsByTagName("input")[2]
    label3.addEventListener("click", function()
    {
        label3.classList.toggle("checked3")
        if(label3.classList.contains("checked3"))
        {
            bolinha3.style.backgroundColor = "#FFDFA4"
        }
    })
}
function Games()
{
    const ValorAnimator = getComputedStyle(mainGame).getPropertyValue("animation")
    console.log(ValorAnimator)
    
    abagame.addEventListener("click",function()
    {
        abagame.classList.toggle("ongame")
        if(abagame.classList.contains("ongame"))
        {
            musicBtn.classList.remove("onmusic")
            music.style.display = "none"
            mainGame.style.display = "flex"
            mainGame.style.animation = "opa"
            mainGame.style.animationDuration = "3s"
        }
        else
        {
            setTimeout(function()
            {
                mainGame.style.display = "none"
            },1000)
    
                mainGame.style.animation = "opa2"
                mainGame.style.animationDuration = "1s"
        }
 
    })
}
Games()
Clique()
Carrosel()