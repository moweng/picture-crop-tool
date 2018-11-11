class PictureCut {
  constructor(type, options) {
    this.type = type;
    this.options = options;
  }

  initCanvas(id, width, height) {
    this._crop_canvas = document.createElement('canvas');
    this._crop_canvas.width = width;
    this._crop_canvas.height = height;
    this.ctx = this._crop_canvas.getContext('2d');
    // 添加在网页上调试
    this._crop_canvas.style = 'border: 1px solid red;';
    document.body.appendChild(this._crop_canvas);
  }

  //裁剪椭圆
  ellipseOne(ctx, x, y, a, b) {
    const step = a > b ? 1 / a : 1 / b;
    ctx.beginPath();
    ctx.moveTo(x + a, y);
    for (let i = 0; i < 2 * Math.PI; i += step) {
      ctx.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    ctx.closePath();
    ctx.clip();
  }


  circleOne(ctx, x, y, radius) {
    ctx.beginPath();
    console.log('x:', x);
    console.log('y:', y);
    console.log('radius:', radius);
    ctx.arc(x, y , radius, 0, 2 * Math.P); //画出圆
    ctx.closePath();
    ctx.clip(); //裁剪上面的圆形
  }

  cutToEllipse() {
    const centerX = this.options.centerX;
    const centerY = this.options.centerY;
    const radiusX = this.options.radiusX;
    const radiusY = this.options.radiusY;
    console.log('radiusX:', radiusX);
    console.log('radiusY', radiusY);
    const originWidth = this.options.originWidth;
    const originHeight = this.options.originHeight;

    const widthRatio = originHeight ? this.image.width / originWidth : 1;
    const heightRatio = originHeight ? this.image.height / originHeight : 1;
    const left = (centerX - radiusX) * widthRatio;
    const top = (centerY - radiusY) * heightRatio;
    const width = radiusX * 2 * widthRatio;
    const height = radiusY * 2 * heightRatio;
    this.ellipseOne(this.ctx, this._crop_canvas.width / 2, this._crop_canvas.height / 2, this._crop_canvas.width / 2, this._crop_canvas.height / 2);
    return this.toCanvas(this.ctx, left, top, width, height, 0, 0, this._crop_canvas.width, this._crop_canvas.height);
  }


  cutToRectTangle() {
    const originWidth = this.options.originWidth;
    const originHeight = this.options.originHeight;
    const widthRatio = originHeight ? this.image.width / originWidth : 1;
    const heightRatio = originHeight ? this.image.height / originHeight : 1;
    const left = this.options.left * widthRatio;
    const top = this.options.top * heightRatio;
    const width = this.options.width * widthRatio;
    const height = this.options.height * heightRatio;
    return this.toCanvas(this.ctx, left, top, width, height, 0, 0, this._crop_canvas.width, this._crop_canvas.height);
  }

  toCanvas(ctx, imageLeft, imageTop, imageWidth, imageHeight, canvasLeft = 0, canvasTop = 0, canvasWidth, canvasHeight) {
    ctx.drawImage(
      this.image,
      imageLeft,
      imageTop,
      imageWidth,
      imageHeight,
      canvasLeft,
      canvasTop,
      canvasWidth,
      canvasHeight,
    );
    const url = this._crop_canvas.toDataURL();

    if (this.options.onCutDone) {
      this.options.onCutDone(url);
    }
    return this._crop_canvas.toDataURL();
  }

  cutToCirCle() {
    const centerX = this.options.centerX;
    const centerY = this.options.centerY;
    const radius = this.options.radius;

    const originWidth = this.options.originWidth;
    const originHeight = this.options.originHeight;

    const widthRatio = originHeight ? this.image.width / originWidth : 1;
    const heightRatio = originHeight ? this.image.height / originHeight : 1;
    const left = (centerX - radius) * widthRatio;
    const top = (centerY - radius) * heightRatio;
    const width = radius * 2 * widthRatio;
    const height = radius * 2 * heightRatio;
    this.circleOne(this.ctx, this._crop_canvas.width / 2, this._crop_canvas.height / 2, this._crop_canvas.width / 2);
    return this.toCanvas(this.ctx, left, top, width, height, 0, 0, this._crop_canvas.width, this._crop_canvas.height);
  }

  startToCut() {
    this.image = new Image();
    this.image.setAttribute('crossOrigin', 'anonymous');
    this.image.src = this.options.source;
    const vm = this;

    this.image.onload = function() {
      console.log('this.imageWidth:', vm.image.width);
      vm.initCanvas('myCanvas', vm.image.width, vm.image.height);
      switch (vm.type) {
        case 'ellipse':
          return vm.cutToEllipe();
        case 'rect':
          return vm.cutToRectTangle();
        case 'circle':
          return vm.cutToCirCle();
        default:
          return '';
      }
    };
  }
}


export default PictureCut;

