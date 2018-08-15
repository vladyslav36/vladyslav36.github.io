var foxDream='https://media.giphy.com/media/uH86GcRl2VQdi/source.gif'
var foxRun='https://sunveter.ru/uploads/posts/2017-05/1493843677_fox18.gif'
var xMax=window.innerWidth, yMax=window.innerHeight
var arrWayX=[],arrWayY=[]
var step=7
var x0=5
var y0=yMax-150
document.body.style.backgroundColor='#264d00'
var elem3=document.createElement('img')
elem3.src=foxDream
elem3.style.width='120px'
elem3.style.position='fixed'
elem3.style.top=y0+'px'
elem3.style.left=x0+'px'
document.body.appendChild(elem3)
var clearTimer=setInterval(putMan,100)
window.onclick=function(ev){
        if (ev.clientX>xMax-120||ev.clientY>yMax-120) return
        elem3.src=foxRun
        var elem=document.createElement('img')
        document.body.appendChild(elem)
        elem.src='http://tainam.net/wp-content/uploads/2018/02/Smile-big-1.gif'
        elem.style.position='fixed'
        elem.style.width='50px'
        arrWayX.push(ev.clientX)
        arrWayY.push(ev.clientY)
        elem.id='point'
        elem.style.left=ev.clientX+'px'
        elem.style.top=ev.clientY+'px'
}
function putMan(){
    var deltaX=arrWayX[0]-x0, deltaY=arrWayY[0]-y0
    if (!deltaX&&!deltaY) return
    var l=Math.round(Math.sqrt(deltaX*deltaX+deltaY*deltaY))
    var cosX=deltaX/l,cosY=deltaY/l
    var stepX=Math.round(step*cosX), stepY=Math.round(step*cosY)
    if (stepX<0)elem3.style.transform='rotateY(0deg)'
    else elem3.style.transform='rotateY(180deg)'
    if (l<=step){
        arrWayX.shift()
        arrWayY.shift()
        var el2=document.getElementById('point')
        document.body.removeChild(el2)
        if (typeof(arrWayX[0])==='undefined') elem3.src=foxDream
       else elem3.src=foxRun
    }
    x0+=stepX
    y0+=stepY
    elem3.style.top=y0+'px'
    elem3.style.left=x0+'px'
}
