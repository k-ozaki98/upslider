import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/style.scss';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // YouTubeのIframe API の読み込み
  function loadYouTubeAPI() {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // YouTube Playerの初期化
  function initYouTubePlayer() {
      const movieWrap = document.querySelector('.movie-wrap');
      if (!movieWrap) {
          console.log('Movie wrap not found');
          return;
      }

      const videoId = movieWrap.dataset.youtubeId;
      if (!videoId) {
          console.log('Video ID not found');
          return;
      }

      console.log('Creating player with video ID:', videoId);

      // プレイヤーの作成
      new YT.Player(movieWrap, {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: {
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              playsinline: 1
          },
          events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange,
              'onError': function(event) {
                  console.error('YouTube Player Error:', event);
              }
          }
      });
  }

  // プレイヤーの準備完了時
  function onPlayerReady(event) {
      console.log('Player is ready');
  }

  // プレイヤーの状態変更時
  function onPlayerStateChange(event) {
      console.log('Player state changed:', event.data);
  }

  // APIの準備完了時のコールバック
  window.onYouTubeIframeAPIReady = initYouTubePlayer;

  // 初期化
  loadYouTubeAPI();


  



  // ページトップ
  document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});
});