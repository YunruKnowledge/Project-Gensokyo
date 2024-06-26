



"use strict";


// Audio
let audioArray = []

// Minor Yes
function playAudioYes() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `select00.wav`;
        audio.volume = 1 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Yes
function playAudioYes2() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `ok00.wav`;
        audio.volume = 1 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// No
function playAudioNo() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `cancel00.wav`;
        audio.volume = 0.25 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Warning
function playAudioWarning() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `timeout.wav`;
        audio.volume = 0.45 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Attack sound
function playAudioAttack() {
    const attackAudioRandom = Math.random()*2 + 1;
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `tan0${parseInt(attackAudioRandom)}.wav`;
        audio.volume = 0.15 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    })
}

// Attack Explosion
function playAudioExplosion() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `tan00.wav`;
        audio.volume = 0.15 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Player Death
function playAudioPlayerDeath() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `pldead00.wav`;
        audio.volume = 0.3 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Graze/Player Near Death
function playAudioGraze() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `graze.wav`;
        audio.volume = 0.05 * (gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}

// Audio Testing for setting section
function playAudioSettingTestSFX() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `select00.wav`;
        audio.volume = 1 * (temp_gameRule_SFX_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}
function playAudioSettingTestBGM() {
    audioArray.push(new Audio())
    audioArray.forEach((audio, audioIndex)=> {
        audio.src = `select00.wav`;
        audio.volume = 1 * (temp_gameRule_BGM_Vol / 100)
        audio.play()
        audioArray.splice(audioIndex, 1)
    });
}
