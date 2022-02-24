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
musicBtn = icons.getElementsByTagName("a")[1],
showMusicBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = wrapper.querySelector("#close"),
musicList = wrapper.querySelector(".music-list")

showMusicBtn.addEventListener("click", () =>
{
    musicList.classList.toggle("show")
});

hideMusicBtn.addEventListener("click", ()=>
{
    showMusicBtn.click()
})


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
    playingNow()
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
    playMusic();
    playingNow();
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
    playMusic()
    playingNow();
}
//play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused")
    //if isMusiPause is true then call pauseMusic else call
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
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
const ulTag = wrapper.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].id}" class = "audio-duration"></span>
                <audio class="${allMusic[i].id}" src="${allMusic[i].src}"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag
  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].id}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].id}`);
  
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}
//lets work on play particular song om click
const allLiTags = ulTag.querySelectorAll("li");
function playingNow()
{
    for(let j = 0; j < allLiTags.length; j++)
{ 
    let audioTag = allLiTags[j].querySelector(".audio-duration")
    if(allLiTags[j].classList.contains("playing"))
    {
        allLiTags[j].classList.remove("playing")
        audioTag.innerText = "Tocando..."
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
    }

    if(allLiTags[j].getAttribute("li-index") == musicIndex)
    {
        allLiTags[j].classList.add("playing")
        audioTag.innerText = "Tocando..."
    }
    //adding onclick atribbute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)")
}
} 
function clicked(element)
{
    //getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index")
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
};
//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});
//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingNow();
      break;
  }
});