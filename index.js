var foxDream='https://media.giphy.com/media/uH86GcRl2VQdi/source.gif'       
var foxRun='https://sunveter.ru/uploads/posts/2017-05/1493843677_fox18.gif'
var xMax=window.innerWidth-120, yMax=window.innerHeight-120
var arrColob=[]
var fox={}
fox.x0=5
fox.y0=yMax-30
fox.step=10
//var id=0
var stepColob=2
document.body.style.backgroundColor='#264d00'
fox.elem=document.createElement('img')
fox.elem.src=foxDream       
fox.elem.style.width='120px'       
fox.elem.style.position='fixed'
fox.elem.style.top=fox.y0+'px'
fox.elem.style.left=fox.x0+'px'
document.body.appendChild(fox.elem)
var clearTimer=setInterval(foxWay,100)
window.onclick=function(ev){
        if (ev.clientX>xMax||ev.clientY>yMax) return
        fox.elem.src=foxRun        
        createColobok(ev.clientX,ev.clientY)        
}
function createColobok(x,y){
     var elem=document.createElement('img')
        document.body.appendChild(elem)
        elem.src='http://tainam.net/wp-content/uploads/2018/02/Smile-big-1.gif'
        elem.style.position='fixed'
        elem.style.width='50px'
        elem.style.left=x+'px'
        elem.style.top=y+'px'
        arrColob.push({X:x,Y:y,elem:elem})       
}
function foxWay(){
    arrColob.forEach(function(x,ind,arr){
        if (x.X>xMax||x.X<0||x.Y>yMax||x.Y<0){
            arr.splice(ind,1)
            x.elem.style.transition='all 1s'
            x.elem.style.opacity='0'    
            setTimeout(removeElem,1000)
            function removeElem(){                
                document.body.removeChild(x.elem)
            }
        }
    })       
    if (typeof(arrColob[0])==='undefined') {
            fox.elem.src=foxDream
            return}
    arrColob.forEach(function(x,ind,arr){        
        var arrLen=getLen(x.X,x.Y,fox.x0,fox.y0)
        x.len=arrLen[0];x.cosX=arrLen[1];x.cosY=arrLen[2]
        posColob(x)        
        if (arr[0].len>x.len){
            arr.push(x);arr[ind]=arr[0];arr[0]=arr.pop()
        }       
    })
    var arrLen=getLen(arrColob[0].X,arrColob[0].Y,fox.x0,fox.y0)
    var l=arrLen[0],cosX=arrLen[1],cosY=arrLen[2]   
    var stepX=Math.round(fox.step*cosX), stepY=Math.round(fox.step*cosY)
    if (stepX<0)fox.elem.style.transform='rotateY(0deg)'
    else fox.elem.style.transform='rotateY(180deg)'
    if (l<=fox.step){                
         document.body.removeChild(arrColob[0].elem)   
         arrColob.shift()           
    }
    fox.x0+=stepX
    fox.y0+=stepY
    fox.elem.style.top=fox.y0+'px'
    fox.elem.style.left=fox.x0+'px'    
}
function getLen(x1,y1,x0,y0){
    var deltaX=x1-x0
    var deltaY=y1-y0             
    var  l=Math.round(Math.sqrt(deltaX*deltaX+deltaY*deltaY))               
    var cosX=deltaX/l,cosY=deltaY/l
    return [l,cosX,cosY]
}
function posColob(x){
    var stepX=Math.round(stepColob*x.cosX), stepY=Math.round(stepColob*x.cosY)   
        x.X+=stepX
        x.Y+=stepY
        x.elem.style.top=x.Y+'px'
        x.elem.style.left=x.X+'px'    
}
