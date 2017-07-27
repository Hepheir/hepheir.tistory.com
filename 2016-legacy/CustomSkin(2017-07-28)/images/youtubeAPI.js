'use strict';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;

var playerState;
var playlist = [
    'x9BvexMurlE',
    'AcX4db0NFwE',
    'u7AWqmEeaJk',
    'DfKdPR0yCsU',
    'BoIZOjkSqXU',
    '0ebG1A16m8c'
];
var playlistDesc = [
    '김광석X정인 - 잊어야 한다는 마음으로',
    '시간을 달리는 소녀 피아노 커버',
    '이누야샤 OST - 시대를 초월한 마음',
    '공의 경계 OST - Something and Nothing',
    '정준영 - 공감',
    '시대를 초월한 마음 피아노 커버'
];
var styleHighlight = document.querySelector('.youtubeAPI_highlighter');

var playlistIndex = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
          height: '180',
          width: '320',
          videoId: playlist[0],
          events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
          }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(1);
    styleHighlight.innerHTML = `<style>.playlist li:nth-child(${playlistIndex + 1}){color:#FFC107}</style>`
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    playerState = event.target.getPlayerState();
    if(playerState == 0) {
        playlistIndex++;
        
        //loop the playlist when reached the end
        playlistIndex = playlist[playlistIndex] == null ? 0 : playlistIndex;
        
        player.loadVideoById(playlist[playlistIndex], 0, "large");
        
        styleHighlight.innerHTML = `<style>.playlist li:nth-child(${playlistIndex + 1}){color:#FFC107}</style>`;
    }
}

//플레이 리스트 채우기
var djBox_playlist = document.querySelector('.playlist');
var list;

for (var i = 0; i < playlist.length; i++) {
    list = document.createElement('li');
    list.innerHTML = playlistDesc[i];
    list.classList.add(`${i}`);
    djBox_playlist.appendChild(list);
    
    list.addEventListener('click', () => {
        playlistIndex = Number(event.target.classList[0]);
        styleHighlight.innerHTML = `<style>.playlist li:nth-child(${playlistIndex + 1}){color:#FFC107}</style>`
        player.loadVideoById(playlist[playlistIndex], 0, "large");
    });
}
