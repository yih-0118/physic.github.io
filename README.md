# physic.github.io
斜拋實驗模擬
# Part 1. 不考慮空氣阻力
## 初始物理量
* 重力加速度$(g)$
* 初速度 ($v_0$)
* 投擲角度 ($\theta$)
* 起始位置 ($x_0$, $y_0$)

## 公式
1. 水平方向速度： $v_x$$_0$$=v_0$ $\cos\theta$
2. 垂直方向速度： $v_y$$_0$$=v_0$ $\sin\theta$
3. 飛行時間： $\frac{2  vy_0}{g}$ $=$ $\frac{2  v_0\sin\theta}{g}$ $,$ $\frac{2 \cdot vy_0 + \sqrt{4 \cdot vy_0^2 + 8 \cdot g \cdot y_0}}{2 \cdot g}$ (導好久...)
4. 水平位置隨時間的變化：$\Delta x$$=$$x_0+v_x$$_0$$\times$$t$
5. 鉛直位置隨時間的變化：
 * 當投擲角度介於0~90度時：$\Delta y$$=$$y_0$ $+v_y$$_0 \times t$$-$ $\cfrac{1}{2}$$gt^2$
 * 當投擲角度介於0~-90度時：$\Delta y$$=$$y_0$ $+v_y$$_0 \times t$$+$ $\cfrac{1}{2}$$gt^2$

## HTML & Javascript 雛形
### HTML
#### **輸入值：**
* 重力加速度$(g)$
```xml
<div>
        <label for="Gravity">Gravity :</label>
        <input type="number" id="Gravity" step="9.8" min="0">
      </div>
<div>
```
* 初速度 ($v_0$)
```xml
<div>
      <label for="initial-velocity">Initial Velocity:   <select id="velocity-unit">
        <option value="m/s"> m/s</option>
        <option value="km/h"> km/h</option>
        <option value="mph"> mph</option></label>//便於切換單位
      <input type="number" id="initial-velocity" step="0.1" min="0">
</div>
```
* 投擲角度 ($\theta$)
```xml
<div>
      <label for="launch-angle">Launch Angle (deg):</label>
      <input type="number" id="launch-angle" step="1" min="0" max="360">
</div>
```
* 起始位置 ($x_0$, $y_0$)
```xml
<div>
      <label for="initial-position">Initial Position (x0):</label>
      <input type="number" id="initial-position" step="0.1" min="0">
</div>
<div>
      <label for="initial-height">Initial Height (y0):</label>
      <input type="number" id="initial-height" step="0.1" min="0">
</div>
```
#### 目前效果：
![](https://hackmd.io/_uploads/HJwYueVfT.png)
---

### Javacript
* 尋找元素值 (getElementById)，與背景計算設定
```javascript
document.getElementById('plot-button').addEventListener('click', function() {
      var v0 = parseFloat(document.getElementById('initial-velocity').value);
      const gravity = parseFloat(document.getElementById('Gravity').value);//因為重力所以用const
      var pi = 3.14159265359;//問就是js內建是用rad
...等等等等～
```
* deg轉rad
```javascript
var ?? = ?? * Math.cos(theta * pi / 180.0);~~~
...等等等等～

```
* 帶入物理公式～～～
* 推入每個時間點～～～
## plotly.js
* 我覺得很像 python的matplotlib as plt？？
* 推入資料
```javascript
var x_data = [];
var y_data = [];
x_data.push(x);
y_data.push(y);
    //帶入導完後的物理公式。要push對東西
    //其實中間省略一大堆ㄡ
```

#### 目前效果：
![](https://hackmd.io/_uploads/BJNTEbNGT.png)

## CSS美化後
![](https://hackmd.io/_uploads/HJbNIWNG6.png)

## Poltly.js vs Python Matplotlib
參數值：
* initial_velocity = 50
* velocity_unit = 'm/s'
* launch_angle = 39
* gravity = 9.8
* initial_position = 20
* initial_height = 10

**1. Plotly.js**
![](https://hackmd.io/_uploads/rJvzObNf6.png)
**2. Python Matplotlib**
![](https://hackmd.io/_uploads/BJq7uZ4fT.png)

# Part 2. 考慮空氣阻力，但不探究物體旋轉
## 初始物理量
* 重力加速度$(g)$
* 初速度 ($v_0$)
* 投擲角度 ($\theta$)
* 起始位置 ($x_0$, $y_0$)
* 質量 $(kg)$
* 受阻面積 $(m^2)$
* 空氣密度 $(\frac{kg}{m^3})$
* 阻力係數 $(C_d,C_x)$ 

## 公式
1. 水平方向速度： $v_x$$_0$$=v_0$ $\cos\theta$
2. 垂直方向速度： $v_y$$_0$$=v_0$ $\sin\theta$
3. 飛行時間： $\frac{2  vy_0}{g}$ $=$ $\frac{2  v_0\sin\theta}{g}$ $,$ $\frac{2 \cdot vy_0 + \sqrt{4 \cdot vy_0^2 + 8 \cdot g \cdot y_0}}{2 \cdot g}$ 
4. 水平位置隨時間的變化：$\Delta x$$=$$x_0+v_x$$_0$$\times$$t$
5. 鉛直位置隨時間的變化：
 * 當投擲角度介於0~90度時：$\Delta y$$=$$y_0$ $+v_y$$_0 \times t$$-$ $\cfrac{1}{2}$$gt^2$
 * 當投擲角度介於0~-90度時：$\Delta y$$=$$y_0$ $+v_y$$_0 \times t$$+$ $\cfrac{1}{2}$$gt^2$

6. 阻力公式：$F_D=$$\frac{1}{2}$$pv^2C_dA$
* $p:$ 空氣密度($\frac{kg}{m^3}$)
* $A:$ 接觸面積($m^2$)
* $C_d:$ 阻力係數
7. 水平方向阻力：$Fx = \frac{F_D  v_x0}{\sqrt{vx0^2 + vy0^2}}$
8. 垂直方向阻力：$Fy = \frac{F_D  v_y0}{\sqrt{vx0^2 + vy0^2}}$
9. 水平方向阻力加速度：$a_x=$$\frac{F_x}{m}$$=$$\frac{\frac{F_D  v_x0}{\sqrt{vx0^2 + vy0^2}}}{m}$
10. 垂直方向阻力加速度：$a_y=$$\frac{F_y}{m}-g$ $=$$\frac{\frac{F_D  v_y0}{\sqrt{vx0^2 + vy0^2}}}{m}-g$

## HTML & Javascript 雛形
### HTML
#### **輸入值：**
* 重力加速度$(g)$
```xml
<div>
        <label for="Gravity">Gravity :</label>
        <input type="number" id="Gravity" step="9.8" min="0">
      </div>
<div>
```
* 初速度 ($v_0$)
```xml
<div>
      <label for="initial-velocity">Initial Velocity:   <select id="velocity-unit">
        <option value="m/s"> m/s</option>
        <option value="km/h"> km/h</option>
        <option value="mph"> mph</option></label>//便於切換單位
      <input type="number" id="initial-velocity" step="0.1" min="0">
</div>
```
* 投擲角度 ($\theta$)
```xml
<div>
      <label for="launch-angle">Launch Angle (deg):</label>
      <input type="number" id="launch-angle" step="1" min="0" max="360">
</div>
```
* 起始位置 ($x_0$, $y_0$)
```xml
<div>
      <label for="initial-position">Initial Position (x0):</label>
      <input type="number" id="initial-position" step="0.1" min="0">
</div>
<div>
      <label for="initial-height">Initial Height (y0):</label>
      <input type="number" id="initial-height" step="0.1" min="0">
</div>
```
* 質量 $(kg)$
```xml
<div>
  <label for="mass">Object Mass (kg):</label>
  <input type="number" id="mass" step="0.1" min="0">
</div>
```
* 受阻面積 $(m^2)$
```xml
<div>
  <label for="cross-sectional-area">Contact area (m^2):</label>
  <input type="number" id="cross-sectional-area" step="0.01" min="0">
</div>
```
* 空氣密度 $(\frac{kg}{m^3})$
```xml
<div>
  <label for="air-density">Air Density (kg/m^3):</label>
  <input type="number" id="air-density" step="0.001" min="0">
</div>
```
* 阻力係數 $(C_d,C_x)$ 
```xml
<div>
  <label for="drag-coefficient">Drag Coefficient (Cd):</label>
  <input type="number" id="drag-coefficient" step="0.01" min="0">
</div>
```
#### 目前效果：
![](https://hackmd.io/_uploads/SJxpQoNMa.png)
### Javacript
* 尋找元素值 (getElementById)，與背景計算設定
```javascript
document.getElementById('plot-button').addEventListener('click', function() {
      var v0 = parseFloat(document.getElementById('initial-velocity').value);
      const gravity = parseFloat(document.getElementById('Gravity').value);//因為重力所以用const
      var pi = 3.14159265359;//問就是js內建是用rad
...等等等等～
```
* deg轉rad
```javascript
var ?? = ?? * Math.cos(theta * pi / 180.0);~~~
...等等等等～
```
* 帶入更多物理公式～～～
* 推入每個時間點～～～

`其他都跟上面的一樣`~~~~
