/* ========================================
   Music Player JavaScript - 純JavaScript功能設計
   ======================================== */

/**
 * 音樂播放器類別
 * 負責播放器的所有邏輯功能
 */
class MusicPlayer {
    /**
     * 構造函數 - 初始化播放器
     */
    constructor() {
        // DOM元素
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.fastForwardBtn = document.getElementById('fastForwardBtn');
        this.rewindBtn = document.getElementById('rewindBtn');
        this.playlistSelect = document.getElementById('playlistSelect');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.progressBar = document.getElementById('progressBar');
        this.progressBarContainer = document.getElementById('progressBarContainer');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.durationDisplay = document.getElementById('duration');
        this.songTitleDisplay = document.getElementById('songTitle');
        this.statusDisplay = document.getElementById('status');
        this.playerContainer = document.querySelector('.player-container');

        // 播放列表數據
        this.playlist = [
            {
                id: 1,
                title: 'Happy Day',
                src: 'music/happy-day.mp3',
                duration: '3:45'
            },
            {
                id: 2,
                title: 'Summer Vibes',
                src: 'music/summer-vibes.mp3',
                duration: '4:12'
            },
            {
                id: 3,
                title: 'Night Dream',
                src: 'music/night-dream.mp3',
                duration: '3:28'
            },
            {
                id: 4,
                title: 'Ocean Wave',
                src: 'music/ocean-wave.mp3',
                duration: '4:05'
            },
            {
                id: 5,
                title: 'Mountain Echo',
                src: 'music/mountain-echo.mp3',
                duration: '3:52'
            }
        ];

        // 播放器狀態
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.skipAmount = 10; // 快轉/倒轉秒數
        this.defaultVolume = 70;

        // 初始化播放器
        this.initializePlayer();
    }

    /**
     * 初始化播放器
     */
    initializePlayer() {
        this.setupPlaylist();
        this.attachEventListeners();
        this.setVolume(this.defaultVolume);
        this.updateDisplay();
        this.loadTrack(0);
    }

    /**
     * 設置播放列表下拉選單
     */
    setupPlaylist() {
        this.playlistSelect.innerHTML = '';
        this.playlist.forEach((track, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${index + 1}. ${track.title}`;
            this.playlistSelect.appendChild(option);
        });
    }

    /**
     * 綁定事件監聽器
     */
    attachEventListeners() {
        // 按鈕事件
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.fastForwardBtn.addEventListener('click', () => this.fastForward());
        this.rewindBtn.addEventListener('click', () => this.rewind());

        // 選擇曲目事件
        this.playlistSelect.addEventListener('change', (e) => {
            this.loadTrack(parseInt(e.target.value));
        });

        // 音量滑桿事件
        this.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });

        // 進度條事件
        this.progressBarContainer.addEventListener('click', (e) => {
            this.seekTo(e);
        });

        // 音頻事件
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('loadedmetadata', () => this.updateDisplay());

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * 載入指定軌道
     * @param {number} index - 軌道索引
     */
    loadTrack(index) {
        if (index < 0) {
            this.currentTrackIndex = this.playlist.length - 1;
        } else if (index >= this.playlist.length) {
            this.currentTrackIndex = 0;
        } else {
            this.currentTrackIndex = index;
        }

        const track = this.playlist[this.currentTrackIndex];
        this.audio.src = track.src;
        this.playlistSelect.value = this.currentTrackIndex;
        this.updateDisplay();
        this.updateStatus('已載入');
    }

    /**
     * 播放
     */
    play() {
        if (!this.audio.src) {
            this.loadTrack(this.currentTrackIndex);
        }
        this.audio.play().catch(error => {
            console.error('播放錯誤:', error);
            this.updateStatus('播放失敗');
        });
        this.playerContainer.classList.add('playing');
    }

    /**
     * 暫停
     */
    pause() {
        this.audio.pause();
        this.playerContainer.classList.remove('playing');
    }

    /**
     * 停止
     */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.playerContainer.classList.remove('playing');
        this.updateProgress();
        this.updateStatus('已停止');
    }

    /**
     * 上一首
     */
    previousTrack() {
        this.loadTrack(this.currentTrackIndex - 1);
        if (this.isPlaying) {
            this.play();
        }
    }

    /**
     * 下一首
     */
    nextTrack() {
        this.loadTrack(this.currentTrackIndex + 1);
        if (this.isPlaying) {
            this.play();
        }
    }

    /**
     * 快轉指定秒數
     */
    fastForward() {
        const newTime = Math.min(
            this.audio.currentTime + this.skipAmount,
            this.audio.duration
        );
        this.audio.currentTime = newTime;
        this.updateStatus(`快轉 +${this.skipAmount}秒`);
    }

    /**
     * 倒轉指定秒數
     */
    rewind() {
        const newTime = Math.max(
            this.audio.currentTime - this.skipAmount,
            0
        );
        this.audio.currentTime = newTime;
        this.updateStatus(`倒轉 -${this.skipAmount}秒`);
    }

    /**
     * 設置音量
     * @param {number} value - 音量值 (0-100)
     */
    setVolume(value) {
        const volumePercent = Math.max(0, Math.min(100, value));
        this.audio.volume = volumePercent / 100;
        this.volumeSlider.value = volumePercent;
        this.volumeValue.textContent = volumePercent + '%';
    }

    /**
     * 搜尋指定時間
     * @param {Event} e - 點擊事件
     */
    seekTo(e) {
        if (!this.audio.duration) return;

        const rect = this.progressBarContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
        this.updateProgress();
    }

    /**
     * 更新進度條
     */
    updateProgress() {
        if (this.audio.duration) {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.style.width = percent + '%';
        }
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
    }

    /**
     * 更新顯示信息
     */
    updateDisplay() {
        const track = this.playlist[this.currentTrackIndex];
        this.songTitleDisplay.textContent = track.title;
        this.durationDisplay.textContent = track.duration;

        // 嘗試從音頻元素獲取實際時長
        if (this.audio.duration) {
            this.durationDisplay.textContent = this.formatTime(this.audio.duration);
        }

        this.updateProgress();
    }

    /**
     * 更新狀態文本
     * @param {string} status - 狀態文本
     */
    updateStatus(status) {
        this.statusDisplay.textContent = status;
        // 3秒後恢復為標準狀態
        setTimeout(() => {
            if (!this.isPlaying) {
                this.statusDisplay.textContent = '已停止';
            }
        }, 3000);
    }

    /**
     * 播放時的回調
     */
    onPlay() {
        this.isPlaying = true;
        this.updateStatus('正在播放');
    }

    /**
     * 暫停時的回調
     */
    onPause() {
        this.isPlaying = false;
        if (this.audio.currentTime < this.audio.duration) {
            this.updateStatus('已暫停');
        }
    }

    /**
     * 格式化時間
     * @param {number} seconds - 秒數
     * @returns {string} 格式化的時間字符串
     */
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) {
            return '0:00';
        }

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    /**
     * 處理鍵盤快捷鍵
     * @param {KeyboardEvent} e - 鍵盤事件
     */
    handleKeyboard(e) {
        if (e.target === document.body) {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.isPlaying ? this.pause() : this.play();
                    break;
                case 'ArrowRight':
                    this.fastForward();
                    break;
                case 'ArrowLeft':
                    this.rewind();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.setVolume(parseInt(this.volumeSlider.value) + 5);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setVolume(parseInt(this.volumeSlider.value) - 5);
                    break;
            }
        }
    }
}

/**
 * 初始化播放器 - 頁面加載完成後
 */
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();

    // 將播放器實例暴露到全局作用域（用於調試）
    window.musicPlayer = player;

    console.log('🎵 音樂播放器已初始化');
    console.log('快捷鍵: Space(播放/暫停), ←(倒轉), →(快轉), ↑↓(音量)');
});
