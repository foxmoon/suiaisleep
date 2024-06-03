// pages/index.js
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './styles/App.css';
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { ConnectButton } from '@suiet/wallet-kit';
import CustomModal from './CustomModal'; // 请确保这个路径正确
import confetti from 'canvas-confetti';
export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [playlist, setPlaylist] = React.useState([]);
  const player = useRef(null);
  const [playPermission, setPlayPermission] = useState(false); // 新增播放许可状态
  const [showIframe, setShowIframe] = useState(false);

  function showNFTInfo(element) {
    // 在这里添加你想要执行的代码
    console.log("Mouse over", element);
    }
    
    function hideNFTInfo(element) {
    // 在这里添加你想要执行的代码
    console.log("Mouse out", element);
    }
  const completePlaylist = [
    { title: 'Starry Fantasy', artist: 'Artist 1', src: 'https://r2.erweima.ai/suno/7f30780a-1831-47c1-8bdd-fe3620bc21ab.mp3' },
    { title: 'Moonlit Melody', artist: 'Artist 2', src: 'https://r2.erweima.ai/suno/7e889a2a-cedc-41dc-9dbd-bc648331132b.mp3' },
    { title: 'Moonlit Melody 2', artist: 'Artist 3', src: 'https://r2.erweima.ai/suno/d87de23c-f4df-4ce8-b60d-9316bcae1e87.mp3' },
    { title: 'Starry Fantasy 2', artist: 'Artist 4', src: 'https://r2.erweima.ai/suno/429a08f6-a0b4-44bd-bbd0-989c8a82fce8.mp3' },
    { title: 'Ocean\'s Serenade', artist: 'Artist 5', src: 'https://r2.erweima.ai/suno/4a0b4d68-3a15-4892-949a-0680004431ee.mp3' },
    { title: 'Forest Reverie', artist: 'Artist 6', src: 'https://r2.erweima.ai/suno/b138c9c6-8e26-4c7e-b38d-b08da784a31c.mp3' },
    { title: 'Forest Reverie 2', artist: 'Artist 7', src: 'https://r2.erweima.ai/suno/d1b4e605-390c-4189-b4c9-66a4d840acdb.mp3' },
    { title: 'Zen Solitude', artist: 'Artist 8', src: 'https://r2.erweima.ai/suno/70b07df9-42ac-49e8-bf84-6bca96a50b5f.mp3' },
    { title: 'Zen Solitude 2', artist: 'Artist 9', src: 'https://r2.erweima.ai/suno/cb5222dc-a495-40b8-a293-5d63bcf726e5.mp3' }
  ];
  let playSongs=completePlaylist;
  let currentSongIndex = 0;

  const handleOpenModal = (e) => {
    e.preventDefault();
    console.log('Link clicked');
    setIsOpen(true);
  };
/*
  const loadSong = (song) => {
    player.current.src = song.src;
    player.current.load();
    $('h2.font-bold').text(song.title);
    updatePlaylistUI();
    player.current.play();
    playlist.push(song);
    };
*/
const loadSong = (song) => {
    player.current.src = song.src;
    player.current.load();
    $('h2.font-bold').text(song.title);
    playlist.push(song);
    updatePlaylistUI();
    if (playPermission) { // 只有在获得播放许可的情况下才播放音频
    player.current.play();
    
  } else {
    console.error('No play permission granted.');
  }
};

  const updatePlaylistUI = () => {
    const playlistEl = $('#playlist');
    playlistEl.empty();
    playlist.forEach((song, index) => {
      const isCurrentSong = index === currentSongIndex;
      const li = $('<li>')
        .addClass('mb-2 cursor-pointer')
        .click(() => {
          currentSongIndex = index;
          loadSong(song);
        })
        .toggleClass('text-gray-400', !isCurrentSong)
        .toggleClass('text-white', isCurrentSong)
        .text(`${song.title} - ${song.artist}`);
      playlistEl.append(li);
    });
  };
  useEffect(() => {


    const requestPlayPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setPlayPermission(true);
      } catch (err) {
        console.error('Failed to get play permission:', err);
      }
    };

    requestPlayPermission();
   /* if (typeof window !== 'undefined') {
      window.addEventListener('message', function(event) {
        // 我们可以通过 event.data 来访问消息内容
        if (event.data === '生成完毕') {
          console.log('收到消息: 生成完毕');
         
          let newSongIndex = (currentSongIndex + 1) % completePlaylist.length;
          setPlaylist([completePlaylist[newSongIndex]]);
          loadSong(completePlaylist[newSongIndex]);
          if (player.current.paused) {
            player.current.play();
            showMessage('Play/Resume music');
          } else {
            player.current.pause();
            showMessage('Pause music');
          }


          currentSongIndex = newSongIndex;
          console.log("current music index:"+currentSongIndex);
          // 在这里添加你的响应代码
        }
      });
    }*/
    if (typeof window !== 'undefined') {
      window.addEventListener('message', function(event) {
        if (event.data === '生成完毕') {
          console.log('收到消息: 生成完毕');
          fire(0.25, {
            spread: 26,
            startVelocity: 55,
          });
          fire(0.2, {
            spread: 60,
          });
          fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
          });
          fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
          });
          fire(0.1, {
            spread: 120,
            startVelocity: 45,
          });
          const img = document.createElement('img');
          img.src = '/mint.jpg';
          img.alt = 'Mint';
          img.width = 140;  // 设置宽度为 40px
          img.height = 140; // 设置高度为 40px
          img.className = 'bg-white p-4 rounded mb-2 shadow hover-card text-black';
          img.onmouseover = () => showNFTInfo(img);
          img.onmouseout = () => hideNFTInfo(img);
      
          const container = document.getElementById('nft-container');
          container.appendChild(img);
          if (playSongs.length > 0) {
            const newSong = playSongs.pop();
            setPlaylist((prevPlaylist) => [...prevPlaylist, newSong]);
            loadSong(newSong);
          } else {
            console.log('No more songs to play.');
          }

          if (player.current.paused) {
            player.current.play();
            showMessage('Play/Resume music');
          } else {
            player.current.pause();
            showMessage('Pause music');
          }
        }
      });
    }

    player.current = document.createElement('audio');
    player.current.loop = false;
    function showMessage(text) {
      $('#message .message-text').text(text);
      $('#message').removeClass('hidden');
    }

    function hideMessage() {
      $('#message').addClass('hidden');
    }
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };
    var count = 200;
var defaults = {
  origin: { y: 0.7 }
};
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }


    $(document).ready(function () {
      $('#menuBtn').click(function () {
        $('#menu').toggleClass('hidden md:flex');
      });

      $('#playBtn, #playBtn2').click(function () {
        if (playlist.length > 0) {
          if (player.current.paused) {
            player.current.play();
            showMessage('Play/Resume music');
          } else {
            player.current.pause();
            showMessage('Pause music');
          }
          //player.current.play();
        } else {
          console.log('No song in the playlist.');
        }
      });

      $('.control-btn').click(function () {
        if (playlist.length > 0) {
          const action = $(this).data('action');
          switch (action) {
         
            case 'prev':
              currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
              loadSong(playlist[currentSongIndex]);
              break;
            case 'next':
              currentSongIndex = (currentSongIndex + 1) % playlist.length;
              loadSong(playlist[currentSongIndex]);
              break;
            case 'loop':
              player.current.loop = !player.current.loop;
              showMessage(player.current.loop ? 'Enable loop playback' : 'Disable loop playback');
              break;
            case 'play':
              if (player.current.paused) {
                player.current.play();
                showMessage('Play/Resume music');
              } else {
                player.current.pause();
                showMessage('Pause music');
              }
              break;
            case 'stop':
              player.current.pause();
              player.current.currentTime = 0;
              showMessage('Stop playing music');
              break;
          }
       
        } else {
          console.log('No song in the playlist.');
        }
        
      });

      $('#closeMessage').click(function () {
        $('#message').addClass('hidden');
      });
    });
  }, [playlist]);

  return (
    <div className="bg-black text-white">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button id="menuBtn" className="mr-4 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Sui Hypnotic Health</h1>
        </div>
        <nav id="menu" className="hidden md:flex space-x-4">

        <div className="inline-block">
  <button 
    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    onClick={handleOpenModal}
  >
    AI音乐市场
  </button>
  </div>
        <div className="inline-block">
        <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => setShowIframe(true)}
      >
        心情管理
      </button>

      {showIframe && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded shadow-lg w-800 h-600 relative">
      <iframe src="/tongji" width="800" height="600"></iframe>
      <button
        className="absolute top-0 right-0 m-2 bg-red-500 text-white rounded-full p-2"
        onClick={() => setShowIframe(false)}
      >
        关闭
      </button>
    </div>
  </div>
)}
        </div>
   <div className="inline-block">
  <button 
    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    onClick={handleOpenModal}
  >
    定制AI音乐
  </button>
  {isOpen && <CustomModal open={isOpen} onClose={() => setIsOpen(false)} />}
</div>
<ConnectButton style={{ width: '80%' }}>Login</ConnectButton> </nav>
        <button id="playBtn" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Play</button>
      </header>

      <main className="flex items-center justify-center h-[calc(100vh-64px)] bg-image" style={{ backgroundImage: "url('background.png')" }}>
        <div className="flex-1">
          <div className="flex justify-center">
            <div className="flex-1/3">
              <div className="relative z-4 p-8 bg-black bg-opacity-50 rounded-lg text-center h-full">
                <h2 className="text-4xl font-bold mb-4">Hypnotic Music</h2>
                <button id="playBtn2" className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play
                </button>
                <div className="mt-8 flex justify-center space-x-4">
                  <button className="control-btn bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300" data-action="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="control-btn bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300" data-action="play">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="control-btn bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300" data-action="next">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="control-btn bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300" data-action="loop">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
              </button>
              <button className="control-btn bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300" data-action="stop">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        </svg>
              </button>
                </div>
                <div id="playlist" className="mt-8 text-left text-gray-400">
                  {/* 播放列表将在此处生成 */}
                </div>
              </div>
            </div>
          </div>
        </div>

    <div className="ml-auto flex-2">
      <div class="relative z-10 p-8 bg-black bg-opacity-50 rounded-lg h-full">
           <h3 className="text-2xl font-bold mb-4">健康徽章NFT</h3>

        <div id="nft-container">
          <div className="bg-white p-4 rounded mb-2 shadow hover-card text-black" onMouseOver={() => showNFTInfo(this)} onMouseOut={() => hideNFTInfo(this)}>健康NFT列表</div>
        </div>
      </div>
    </div>
      </main>

      <footer className="p-4 text-center text-gray-500">
        &copy; 2023 Sui Hypnotic Health. All rights reserved.
      </footer>

      <div id="message" className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg hidden">
        <span id="messageText"></span>
        <button id="closeMessage" className="ml-2 text-gray-500 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
