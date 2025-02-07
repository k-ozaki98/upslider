import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/style.scss';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();
const mvProduct = document.querySelector("#mv-img-product");
const mvCopy = document.querySelector("#mv-img-copy");
const mvTitle = document.querySelector("#mv-title");
const mvSubTitle = document.querySelector("#mv-subtitle");
const mvLader = document.querySelector("#mv-lader");


document.addEventListener('DOMContentLoaded', () => {

    gsap.utils.toArray('.product').forEach((product, i) => {
        gsap.set(product, {
            opacity: 0,
            y: 50
        });
        ScrollTrigger.create({
            trigger: product,
            start: 'top 80%',
            once: true,
            markers: true,
            onEnter: () => {
                gsap.to(product, {
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out'
                });
            }
        });
    });

    // MVアニメーション
    tl.from(mvCopy, { opacity: 0, x: -10, duration: .2 });
    tl.from(mvTitle, { opacity: 0, x: -10, duration: .2 });
    tl.from(mvSubTitle, { height: 0, duration: .2, });
    tl.from(mvLader, { opacity: 0 });

    tl.add(() => mvProduct.classList.add("is-active"), 0)
        .to(mvCopy, { opacity: 1, x: 0 }, "-=0.5")
        .to(mvTitle, { opacity: 1, x: 0 }, "-=0.3")
        .to(mvSubTitle, { height: "auto", ease: "expo.in" }, "-=0.5")
        .to(mvLader, { opacity: 1, duration: .3 }, "-=0.1")


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
                'onError': function (event) {
                    console.error('YouTube Playerエラー:', event);
                }
            }
        });
    }

    // APIの準備完了時のコールバック
    window.onYouTubeIframeAPIReady = initYouTubePlayer;

    // 初期化
    loadYouTubeAPI();






    // ページトップ
    document.getElementById("scrollToTop").addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});