# adaptive-react-image

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
