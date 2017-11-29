/* global , Vue  */
const GAMETIME = 50
var app = new Vue({ // eslint-disable-line
    el: '#app',
    data() {
        return {
            imgArr: [],
            successArr: [],
            playing: false,
            time: GAMETIME,
            timer: '',
            touched: false,
            touchedIndex: 10,
            showToast: false,
            message: ''
        }
    },
    mounted() {
        this._createCanvas('../static/images/' + this.random(1, 5) + '.jpg')
    },
    methods: {
        startGame() {
            this.playing = true
            let time = 3
            var startTimer = setInterval(() => {
                if (time == 0) {
                    this._clock()
                    this.shuffle()
                    this.showToast = false
                    clearInterval(startTimer)
                } else {
                    this.showToast = true
                    this.message = `游戏将在${time}秒后开始`
                }
                time--
            }, 1 * 1000)
        },
        gameOver(type) {
            clearInterval(this.timer)
            console.log('game over' + type)
        },
        random(start, end) {
            console.log(start, end)
            return Math.floor(Math.random() * (end - start + 1)) + start
        },
        // 打乱图片
        shuffle() {
            this.imgArr.sort(function () {
                return Math.random() - Math.random()
            })
            // 势必要全部打散，不然游戏就太简单了
            if (this.diffNum() != this.imgArr.length) {
                this.shuffle()
            }
        },
        // 返回打散后数组和原来数组有多少个不一样
        diffNum() {
            let num = 0
            for (var i = 0; i < this.imgArr.length; i++) {
                if (this.imgArr[i].index != this.successArr[i].index) {
                    num++
                }
            }
            return num
        },
        // 处理点击事件
        handdleTouch(index) {
            if (this.touched) {
                if (this.touchedIndex != index) {
                    this.moveImg(index)
                }
                this.touchedIndex = 10
                this.touched = false

                if (this.isWin()) {
                    this.gameOver('win')
                }
            } else {
                this.touched = true
                this.touchedIndex = index
            }
        },
        moveImg(index) {
            var a = this.imgArr[this.touchedIndex]
            this.imgArr[this.touchedIndex] = this.imgArr[index]
            this.imgArr[index] = a
        },
        isWin() {
            return JSON.stringify(this.imgArr) == JSON.stringify(this.successArr)
        },
        _showToast(msg) {
            this.showToast = true
            this.message = msg
            setTimeout(() => {
                this.showToast = false
                this.message = ''
            }, 2000)
        },
        // 计时器
        _clock() {
            this.timer = setInterval(() => {
                if (this.time > 0) {
                    this.time = this._fillZero(--this.time)
                    this.$refs.progress.style.width = (this.time / GAMETIME) * 100 + '%'
                } else {
                    this.gameOver('timeout')
                }
            }, 1 * 1000)
        },
        _fillZero(num) {
            return num > 9 ? num : '0' + num
        },
        // 创建canvas
        _createCanvas(url, row, column) {
            row = row || 3
            column = column || 3
            this.row = row // 切割成多少行
            this.column = column // 切割成多少列
            this.imgWidth = 0 // 切割图片的宽
            this.imgHeight = 0 // 切割图片的高

            this.canvas = document.getElementById('canvas')
            this.canvas.height = this.canvas.width
            this.context = this.canvas.getContext('2d')
            this._creatImg(url)
        },
        // 创建图片
        _creatImg(url) {
            let image = new Image() // eslint-disable-line
            let that = this
            image.src = url

            image.onload = function () {
                that.imgWidth = image.width / that.column
                that.imgHeight = image.height / that.row
                that._renderImg(image)
            }
        },
        // //canvas绘制图片
        _renderImg(image) {
            var index = 0 // eslint-disable-line
            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.column; j++) {
                    this.context.drawImage(image, this.imgWidth * j, this.imgHeight * i, this.imgWidth, this.imgHeight, 0, 0, 300, 300)
                    this.imgArr.push({
                        index: ++index,
                        src: this.canvas.toDataURL('image/jpeg')
                    })
                }
            }
            this.successArr = JSON.parse(JSON.stringify(this.imgArr))
        }
    }
})