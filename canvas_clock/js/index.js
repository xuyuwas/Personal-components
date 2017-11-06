let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let canWidth = ctx.canvas.width;
let canHeight = ctx.canvas.height;
let r = canWidth/2;
let remNum = canWidth/200;
console.log(r);
function drawBackground(){
    ctx.save();
    ctx.translate(r,r+50);
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.lineWidth = 10*remNum;
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
    ctx.stroke();
    ctx.font = 20*remNum + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let hourList = [3,4,5,6,7,8,9,10,11,12,1,2]
    hourList.forEach(function(index,i){
        let rad = 2 * Math.PI / 12 * i;
        let x = Math.cos(rad) * (r - 30*remNum);
        let y = Math.sin(rad) * (r - 30*remNum);
        ctx.fillText(index,x,y);
    })
    for(let i = 0; i < 60 ;i++){
        ctx.beginPath();
        let rad = 2 * Math.PI / 60 * i;
        let x = Math.cos(rad) * (r - 18*remNum);
        let y = Math.sin(rad) * (r - 18*remNum);
        if(i % 5 === 0){
            ctx.fillStyle = "#000";
        }else{
            ctx.fillStyle = "#ccc";
        }
        ctx.arc(x,y,2*remNum,0,2*Math.PI,false);
        ctx.fill();
    }
}
function drawHours(hours,minutes) {
    ctx.save();
    ctx.beginPath();
    let rad = 2 * Math.PI / 12 * hours + 2 * Math.PI / 12 / 60 * minutes;
    ctx.rotate(rad);
    ctx.lineWidth = 6*remNum;
    ctx.lineCap = "round";
    ctx.moveTo(0,10*remNum);
    ctx.lineTo(0,-r/2*remNum);
    ctx.stroke();
    ctx.restore();
}
function drawMinutes(minutes) {
    ctx.save();
    ctx.beginPath();
    let rad = 2 * Math.PI / 60 * minutes;
    ctx.rotate(rad);
    ctx.lineWidth = 4*remNum;
    ctx.lineCap = "round";
    ctx.moveTo(0,10*remNum);
    ctx.lineTo(0,-r + 25*remNum);
    ctx.stroke();
    ctx.restore();
}
function drawSeconds(seconds) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#F12D08";
    let rad = 2 * Math.PI / 60 * seconds;
    ctx.rotate(rad);
    ctx.moveTo(-2,12*remNum);
    ctx.lineTo(2,12*remNum);
    ctx.lineTo(1,-r+18*remNum);
    ctx.lineTo(-1,-r+18*remNum);
    ctx.fill();
    ctx.restore();
}
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0,0,3*remNum,0,2*Math.PI,false);
    ctx.fill();
}
function drawDate() {
    ctx.beginPath();
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();
    ctx.fillStyle = "#333";
    ctx.font = 12 * remNum + 'px';
    ctx.fillText(y+'年'+m+'月'+d+'日',0,-r-20);
}
function draw() {
    ctx.clearRect(0,0,canWidth,canHeight);
    let n = new Date();
    let h = n.getHours();
    let m = n.getMinutes();
    let s = n.getSeconds();
    drawBackground();
    drawHours(h,m);
    drawMinutes(m);
    drawSeconds(s);
    drawDot();
    drawDate();
    ctx.restore();
}
draw();
setInterval(draw,1000);