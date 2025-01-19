console.log("Welcome to KAMUSIC");

let songIndex = 0;
let audioElement = new Audio("1.mp3");

let masterPlay = document.getElementById("masterPlay");
let myprogressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Intezaar Tera", filePath: "1.mp3", coverPath: "sc1.jpg" },
    { songName: "Desert Sun", filePath: "2.mp3", coverPath: "2.jpg" },
    { songName: "Forever You ", filePath: "3.mp3", coverPath: "3.jpg" },
    { songName: "First Love", filePath: "4.mp3", coverPath: "4.jpg" },
    { songName: "Feeling Love", filePath: "5.mp3", coverPath: "5.jpg" },
    { songName: "Birthday", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Wedding", filePath: "7.mp3", coverPath: "7.jpg" },
    { songName: "Nature", filePath: "8.mp3", coverPath: "8.jpg" },
];

// Update song list UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
    // Update progress bar
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressBar.value = progress;
});

// Seek functionality
myprogressBar.addEventListener("change", () => {
    audioElement.currentTime = (myprogressBar.value * audioElement.duration) / 100;
});

// Add click event to play specific songs
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", () => {
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    });
});

let nextButton = document.querySelector(".fa-forward"); // Forward button
let prevButton = document.querySelector(".fa-backward"); // Backward button

// Forward Button Functionality
nextButton.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length; // Move to the next song in a circular way
    audioElement.src = songs[songIndex].filePath; // Set the new audio file
    audioElement.currentTime = 0; // Reset current time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;

    // Update the UI
    updateSongDetails();
});

// Backward Button Functionality
prevButton.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Move to the previous song in a circular way
    audioElement.src = songs[songIndex].filePath; // Set the new audio file
    audioElement.currentTime = 0; // Reset current time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;

    // Update the UI
    updateSongDetails();
});

let currentTimeDisplay = document.getElementById("currentTime"); // Select the timestamp element

// Format time helper function
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = `0${secs}`; // Add leading zero to seconds
    return `${mins}:${secs}`;
}

// Update timestamp on timeupdate event
audioElement.addEventListener("timeupdate", () => {
    let current = formatTime(audioElement.currentTime); // Current time of the audio
    let duration = formatTime(audioElement.duration || 0); // Total duration of the audio
    currentTimeDisplay.innerText = `${current} / ${duration}`; // Update timestamp
});

// Ensure the duration is displayed when the metadata is loaded
audioElement.addEventListener("loadedmetadata", () => {
    let duration = formatTime(audioElement.duration || 0);
    currentTimeDisplay.innerText = `0:00 / ${duration}`; // Set initial timestamp
});

