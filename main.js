const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const thumbnail = $('.thumbnail')
const title = $('h2.thumbnail__title')
const thumbnailImg = $('.thumbnail__img')
const audio = $('#audio')
const togglePlayBtn = $('.btn-toggle-play')
const progress = $('#progress')
const volume = $('.volume-bar')
const volumeValue = $('#volume-value')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const overlayBg = $('.overlay')
const overlayMsg = $('.overlay__msg')
const overlayInput = $('#overlay-confirm')
const hideOverlayBtn = $('.btn-confirm')

const PLAYER_STORAGE_KEY = "Mon's Beat"

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isHiddenOverlay: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || { "isHiddenOverlay":false },

    songs: [
        {
            name: 'Ai chung tình được mãi',
            path: './assets/songs/Ai_chung_tinh_duoc_mai.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Ai là người thương em - Rap version',
            path: './assets/songs/Ai_la_nguoi_thuong_em_rap_version.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Ai rồi cũng khác',
            path: './assets/songs/Ai_roi_cung_khac.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Ánh nắng của anh',
            path: './assets/songs/Anh_nang_cua_anh_guitar.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'As long as you love me - Duet with Bieber',
            path: './assets/songs/As_long_as_you_love_me_duet.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Cánh hồng phai',
            path: './assets/songs/Canh_hong_phai.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chân tình',
            path: './assets/songs/Chan_tinh.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chiều nay không có mưa bay',
            path: './assets/songs/Chieu_nay_khong_co_mua_bay.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chuyện của mùa đông',
            path: './assets/songs/Chuyen_cua_mua_dong.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Chuyện tình người trinh nữ tên Thi',
            path: './assets/songs/Chuyen_tinh_nguoi_trinh_nu_ten_thi.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Có khi nào rời xa - Guitar Solo',
            path: './assets/songs/Co_khi_nao_roi_xa_guitar_solo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Công chúa bong bóng',
            path: './assets/songs/Cong_chua_bong_bong.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Crying over you - Rap only',
            path: './assets/songs/Crying_over_you_only_rap.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Diễm xưa',
            path: './assets/songs/Diem_xua.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Diễm xưa - Guitar Solo',
            path: './assets/songs/Diem_xua_guitar_solo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Đúng người đúng thời điểm',
            path: './assets/songs/Dung_nguoi_dung_thoi_diem.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Đừng quên tên anh',
            path: './assets/songs/Dung_quen_ten_anh.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Em dạo này',
            path: './assets/songs/Em_dao_nay.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Gặp nhưng không ở lại',
            path: './assets/songs/Gap_nhung_khong_o_lai.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Giấc mơ chỉ là giấc mơ',
            path: './assets/songs/Giac_mo_chi_la_giac_mo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Gió vẫn hát',
            path: './assets/songs/Gio_van_hat.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Gió vẫn hát - Guitar',
            path: './assets/songs/Gio_van_hat_guitar.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Giữa mây ngàn',
            path: './assets/songs/Giua_may_ngan.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Katy Katy',
            path: './assets/songs/Katy_katy.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Khi cô đơn em nhớ ai',
            path: './assets/songs/Khi_co_don_em_nho_ai.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Khi người lớn cô đơn',
            path: './assets/songs/Khi_nguoi_lon_co_don.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Không quan tâm - Short',
            path: './assets/songs/Khong_quan_tam_short.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Lạ lùng',
            path: './assets/songs/La_lung.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Mashup Phan Mạnh Quỳnh',
            path: './assets/songs/Mashup_Phan_Manh_Quynh.mp3.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Melancholy',
            path: './assets/songs/Melancholy.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Một thời đã xa',
            path: './assets/songs/Mot_thoi_da_xa.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nếu em đi',
            path: './assets/songs/Neu_em_di.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nếu như',
            path: './assets/songs/Neu_nhu.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Ngày mai sẽ khác',
            path: './assets/songs/Ngay_mai_se_khac.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Người ta nói',
            path: './assets/songs/Nguoi_ta_noi.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nhạc chế Trung thu',
            path: './assets/songs/Nhac_che_trung_thu.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nhỏ ơi',
            path: './assets/songs/Nho_oi.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nơi này có anh',
            path: './assets/songs/Noi_nay_co_anh.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Nửa vầng trăng - Không Beat',
            path: './assets/songs/Nua_vang_trang_nobeat.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Phai dấu cuộc tình',
            path: './assets/songs/Phai_dau_cuoc_tinh.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Phố không em',
            path: './assets/songs/Pho_khong_em.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Real love',
            path: './assets/songs/Real_love.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Talking to the moon - Rap version',
            path: './assets/songs/Talking_to_the_moon_rap_ver.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Thất tình',
            path: './assets/songs/La_lung.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Thương lắm mình ơi - Không Beat',
            path: './assets/songs/Thuong_lam_minh_oi_nobeat.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tình đơn côi',
            path: './assets/songs/Tinh_don_coi.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tình em là đại dương - Không Beat',
            path: './assets/songs/Tinh_em_la_dai_duong_nobeat.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tình thôi xót xa',
            path: './assets/songs/Tinh_thoi_xot_xa.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tình yêu mang theo',
            path: './assets/songs/Tinh_yeu_mang_theo.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Từ chối nhẹ nhàng thôi',
            path: './assets/songs/Tu_choi_nhe_nhang_thoi.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tự tâm - Short',
            path: './assets/songs/Tu_tam_short.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tuổi đá buồn',
            path: './assets/songs/Tuoi_da_buon.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'Tuyết rơi mùa hè',
            path: './assets/songs/Tuyet_roi_mua_he.mp3',
            thumb: './assets/image/thumb.jpg'
        },
        {
            name: 'You and only You - Nhạc Thái',
            path: './assets/songs/You_and_only_you.mp3',
            thumb: './assets/image/thumb.jpg'
        },
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
            container.classList.add('playing')
            thumbnailImgAnimate.play()
        }

        // When the song pauses
        audio.onpause = function() {
            _this.isPlaying = false
            container.classList.remove('playing')
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
        
        // When drag the volume bar
        volume.onchange = function(e) {
            audio.volume = e.target.value / 100
            volumeValue.innerHTML = e.target.value
            volumeValue.style.display = 'block'

            setTimeout(function() {
                volumeValue.style.display = 'none'
            },1000)
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
                _this.scrollActiveSongIntoView()
            }
        }

        // When click Hide Overlay Message button
        hideOverlayBtn.onclick = function() {
            const isChecked = overlayInput.checked

            if (isChecked) {
                _this.isHiddenOverlay = !_this.isHiddenOverlay
                _this.setConfig('isHiddenOverlay', _this.isHiddenOverlay)
                overlayBg.classList.add('hide-overlay')
            } else {
                _this.isHiddenOverlay = false
                overlayBg.classList.add('hide-overlay')
            }
        }
    },

    /* Load the localStorage config when the app is launched */
    loadConfig() {
        this.isRepeat = this.config.isRepeat
        this.isRandom = this.config.isRandom
        this.isHiddenOverlay = this.config.isHiddenOverlay
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
        overlayBg.classList.toggle('hide-overlay', this.isHiddenOverlay)
        //console.log('Load config this.isHiddenOverlay: ', this.isHiddenOverlay)
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
