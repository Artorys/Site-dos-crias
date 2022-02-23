const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
nextBtn = wrapper.querySelector("#next"),
prevBtn = wrapper.querySelector("#prev"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
music = document.querySelector(".section-music"),
icons = document.querySelector(".icons"),
musicBtn = icons.getElementsByTagName("a")[1]

musicBtn.addEventListener("click", ()=>
{
    musicBtn.classList.toggle("onmusic")
    if(musicBtn.classList.contains("onmusic"))
    {
        abagame.classList.remove("ongame")
        mainGame.style.display = "none"
        music.style.display = "flex"
        music.style.animation = "opa"
        music.style.animationDuration = "3s"
    }
    else
    {
        setTimeout(function()
        {
            music.style.display = "none"
        },1000)
        music.style.animation = "opa2"
        music.style.animationDuration = "1s"  
    }

})

let musicIndex = 1;

window.addEventListener("load", ()=>
{
    loadMusic(musicIndex); //calling load music function once window loaded
    console.log("opa")
})

//load music function
function loadMusic(indexNumb)
{
    musicName.innerText = allMusic[indexNumb -1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `js/images/${allMusic[indexNumb -1].img}`;
    mainAudio.src = `${allMusic[indexNumb -1].src}`
}
//play or music button event
function playMusic()
{
    wrapper.classList.add("paused");
    mainAudio.play();
    playPauseBtn.querySelector("i").innerText = "pause";
}
function pauseMusic()
{
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("i").innerText = "play_arrow";
}
//next music function
function nextMusic()
{
    //here we´ll just increment of index by 1
    musicIndex++;
    pauseMusic();
    // if musicIndex is greater than array length then musicIndex will be so the first song will play
    musicIndex >= allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
}
//prev music function
function PrevMusic()
{
    //here we´ll just decreament of index by 1
    musicIndex--;
    pauseMusic();
    // if musicIndex is less than 1 then musicIndex will be array length so the first song will play
    musicIndex  < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
}
//play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused")
    //if isMusiPause is true then call pauseMusic else call
    isMusicPaused ? pauseMusic() : playMusic();
});
//next music btn event
nextBtn.addEventListener("click",() =>
{
     nextMusic(); //calling next music function
})
//prev music btn event
prevBtn.addEventListener("click",() =>
{
    PrevMusic();
})
//update progress bar width according to music current time 
mainAudio.addEventListener("timeupdate", (e) =>
{
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration;//getting total duration of song
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", ()=>
    {

        //update song total duration
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10)
        {
            currentSec = `0${currentSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })
    //update playing song current time
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10)
    {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    
});
//let´s update playing song curremt time according to the progress bar width
progressArea.addEventListener("click", (e)=>
{
    let progressWidthval = progressArea.clientWidth;//getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration
    console.log(clickedOffSetX, songDuration, progressWidthval)
    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
})