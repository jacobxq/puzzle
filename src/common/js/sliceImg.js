/*
* return Promise imgArr[{index: 0, src="data:xx"}]
 */
class SliceImg {
  constructor(row = 3, column = 3) {
    this.row = row; // 切割成多少行
    this.column = column; // 切割成多少列
    this.imgWidth = 0; // 切割图片的宽
    this.imgHeight = 0; // 切割图片的高

    this.canvas = document.createElement('canvas');
    this.canvas.height = this.canvas.width;
    this.context = this.canvas.getContext('2d');

    this.imgArr = [];
  }

  // 创建图片
  creatImg(url) {
    let image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    let self = this;
    image.src = url;
    

    return new Promise((resolve, reject) => {
      image.onload = function () {
        self.imgWidth = image.width / self.column;
        self.imgHeight = image.height / self.row;
        self.renderImg(image);
        resolve(self.imgArr);
      };
    })
  }

  //canvas绘制图片
  renderImg(image) {
    var index = 0;
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {
        this.context.drawImage(image, this.imgWidth * j, this.imgHeight * i, this.imgWidth, this.imgHeight, 0, 0, this.imgWidth, this.imgHeight);
        this.imgArr.push({
          index: i,
          src: this.canvas.toDataURL('image/jpeg')
        });
        index++;
      }
    }
  }
}

export function getImgChip (url, x, y) {
  return new SliceImg();
}

// img.creatImg('img/1.jpg').then((imgData) => {
//     var imgLikeArr = document.querySelectorAll('img');
//     imgLikeArr.forEach((item, index) => {
//         item.src = imgData[index].src
//     })
// })