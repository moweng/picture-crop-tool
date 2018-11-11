# picture-crop-tool
裁剪图片，支持原形，矩形和椭圆形

### 组件使用
 1、安装插件 

 ```
npm install picture-crop-tool --save-dev
```

 2、在组件中引入
 ```
const type = 'circle';
 const params = {
     source: 'https://store-g1.seewo.com/5f8b9588e2360fe0ecab8fd65576ebe253bb5677e4c5ea0e41d49d57b1604c94',
     radius: 100,
     centerX: 200,
     centerY: 200,
     width: 400,
     height: 400,
     onCutDone: (url) => {
       console.log('url:', url);
     }
   };

 new PictureCut(type, params).startToCut();
```



### 参数说明

参数名    | 描述    |   是否必须 |  备注
-------- | ------ |  -------- |  -----
source	 |【String 】 图片路径 |	是	|
type	|【string】裁剪类型	|是	|circle, ellipse, rect
options	|【Object】裁剪的参数|是

options的值

参数名    | 描述    |   是否必须 |  备注
-------- | ------ |  -------- |  -----
width	 |【String 】 图片路径 | 否 | 裁剪宽
height	|【string】裁剪类型	|否	|裁剪高
left	|【Number】裁剪的起始点x坐标的位置| 否 | 裁剪类型为矩形
top	|Number】裁剪的起始点x坐标的位置| 否 | 裁剪类型为矩形
centerX	|【Number】中心点位置|是
centerY	|【Number】中心的位置|是
radiusX	|【Number】椭圆x轴径长|是
radiusY	|【Number】椭圆y轴径长|是
radius	|【Number】圆形半径|是

