# adaptive-react-image
项目中的图片很多是由用户上传的图片，在移动端显示时，由于图片体积过大，导致了下载图片时间过长;
图片加载慢时，图片加载完成之后页面显示存在跳动的情况，用户体验不佳；

### 组件功能

1、根据设备加载不同尺寸大小的图片
2、图片加载过程根据图片大小显示图片占位符，优化体验

### 备注
组件优化主要是针对上传至七牛的图片

### 组件使用
1、安装插件 npm install adaptive-react-image --save-dev
2、<ImageLoaderV2 images={['https://store-g1.seewo.com/5b6b402c4d1c14dc687fc8aaf5d0be063d4ed80f6b1ec7076d56671864c8e4ed14887662375567']} />


### 参数说明

参数名    | 描述    |   是否必须 |  备注
-------- | ------ |  -------- |  -----
images	 |【String / Array】 图片路径 |	是	|
width	|【Number】图片在视觉稿的宽度	|否	|默认按屏幕宽度大小加载
height	|【Number】图片在视觉稿的高度|	否	
adapt	|【boolean】图片尺寸是否适配设备屏幕	|否	|默认 为 true
quality|	【Number】 图片质量|	否	
format	|【String】图片格式|	否	
fallback |【string】格式不支持时的替补方案| 否
urlFormatter	|【Funciton】修改生成图片url的函数	| 否	
errorImage	| 图片加载失败时的替换图片	| 否	
