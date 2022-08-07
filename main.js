const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const wrapper = $('.wrapper')
const thumbnail = $('.thumbnail')
const title = $('h2.thumbnail__title')
const thumbnailImg = $('.thumbnail__img')
const audio = $('#audio')
const togglePlayBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const PLAYER_STORAGE_KEY = "Mon's Beat"

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: 'Talking to the moon - Rap version',
            path: './assets/songs/Talking_to_the_moon_rap_ver.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chiều nay không có mưa bay',
            path: './assets/songs/Chieu_nay_khong_co_mua_bay.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Diễm Xưa - Guitar Solo',
            path: './assets/songs/Diem_xua_guitar_solo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Có khi nào rời xa - Guitar Solo',
            path: './assets/songs/Co_khi_nao_roi_xa_guitar_solo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Ngày mai sẽ khác',
            path: './assets/songs/Ngay_mai_se_khac.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chiều nay không có mưa bay',
            path: './assets/songs/Chieu_nay_khong_co_mua_bay.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Talking to the moon - Rap version',
            path: './assets/songs/Talking_to_the_moon_rap_ver.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chiều nay không có mưa bay',
            path: './assets/songs/Chieu_nay_khong_co_mua_bay.mp3',
            thumb: './assets/image/thumb.jpg'
        }
    ],

    /* Set the localStorage config for buttons: Repeat button, Random button */
    setConfig(key,value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                    <div class="thumb" style="background-image: url('${song.thumb}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                    </div>
                </div>
            `
        })

        playlist.innerHTML = htmls.join('')
    },

    /* Define a property 'currentSong' for "this", here is object "app" */
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    /* Handle all DOM Events here */
    handleEvents() {
        const _this = this

        // Thumbnail rotate animation
        const thumbnailWidth = thumbnail.offsetWidth
        const thumbnailImgAnimate =  thumbnailImg.animate([
            { transform: 'rotate(360deg)'}
        ],
            {
                duration: 20000,
                iterations: Infinity
            }
        )
        thumbnailImgAnimate.pause()

        // Zoom in/out thumbnail on scroll
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newTop = thumbnailWidth - scrollTop

            thumbnail.style.width = newTop > 0 ? newTop + 'px' : 0
            thumbnail.style.opacity = newTop / thumbnailWidth
        }

        // Toggle Play/Pause button when click
        togglePlayBtn.onclick = function() {
            if (_this.isPlaying) { 
                audio.pause()
            } else {
                audio.play()
            }
        }

        // When the song is playing
        audio.onplay = function() {
            _this.isPlaying = true
            wrapper.classList.add('playing')
            thumbnailImgAnimate.play()
        }

        // When the song pauses
        audio.onpause = function() {
            _this.isPlaying = false
            wrapper.classList.remove('playing')
            thumbnailImgAnimate.pause()
        }

        // When the song's progress changes
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                progress.value = progressPercent
            }
        }

        // When drag the progress bar
        progress.onchange = function(e) {
            const playedTime = audio.duration / 100 * e.target.value
            audio.currentTime = playedTime
        }

        // When click Next button
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSongIntoView()
        }

        // When click Prev button
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSongIntoView()
        }

        // When click Random song button
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // When click Repeat song button
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Handle different logics when audio ends
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            }
            else if (_this.isRandom) {
                _this.randomSong()
            }
            else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSongIntoView()
        }

        // When click on a particular song in the playlist
        playlist.onclick = function(event) {
            // Find in the playlist the closest element with class 'song' 
            // but does not have class 'active'
            const songElement = event.target.closest('.song:not(.active)')

            // If found --> set the 'data-index' attribute to currentIndex
            // and play the selected song
            if (songElement) {
                _this.currentIndex = Number(songElement.getAttribute('data-index'))
                _this.loadCurrentSong()
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
        }
    },

    /* Load the localStorage config when the app is launched */
    loadConfig() {
        this.isRepeat = this.config.isRepeat
        this.isRandom = this.config.isRandom
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    },

    /* Load the current song */
    loadCurrentSong() {
        title.textContent = this.currentSong.name
        thumbnailImg.style.backgroundImage = `url('${this.currentSong.thumb}')`
        audio.src = this.currentSong.path
    },

    /* Forward to the next song when click button Next */
    nextSong() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    /* Backward to the previous song when click button Prev */
    prevSong() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    /* Play random one song from the list */
    randomSong() {
        let randomIndex

        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
        } while (randomIndex === this.currentIndex)
        this.currentIndex = randomIndex
        this.loadCurrentSong()
    },

    /* Scroll the active song (the song that is playing) into user's view */
    scrollActiveSongIntoView() {
        let blockConfig
        
        // If the current song's index is 0 (the first song)
        // --> define vertical alignment as 'end'
        if (this.currentIndex === 0) {
            blockConfig = 'end'
        } 
        // Else --> define vertical alignment as 'center'
        else {
            blockConfig = 'center'
        }

        // Config scrollIntoView attribute of the current song
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: blockConfig
            })
        }, 300)
    },

    /* We only need to call this method via object "app" to run the web app */
    start() {
        // Load localStorage config
        this.loadConfig()

        // Define property 'currentSong' for object "app"
        this.defineProperties()

        // Call function to handle all DOM Events
        this.handleEvents()

        // Load the current song
        this.loadCurrentSong()

        // Render the song playlist
        this.render()
    }
}

app.start()
