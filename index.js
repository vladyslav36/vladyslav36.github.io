var fox = {
    foxDream: 'https://media.giphy.com/media/uH86GcRl2VQdi/source.gif',
    foxRun: 'https://sunveter.ru/uploads/posts/2017-05/1493843677_fox18.gif',
    x: 0,
    y: 0,
    cosX: 0,
    cosY: 0,
    step: 10
};
var kol = [];
var xMax = window.innerWidth - 120, yMax = window.innerHeight - 120;
fox.x = 10;
fox.y = yMax - 30;
showFox(fox, kol);
window.onclick = function (ev) {
    if (ev.clientX > xMax || ev.clientY > yMax) return;
    createCol(ev.clientX, ev.clientY, fox.x, fox.y);
    showFox(fox, kol)
};
setInterval(() => showFox(fox, kol), 100);

function createCol(x, y, xFox, yFox) {
    var elImg = document.createElement('img');
    document.body.appendChild(elImg);
    elImg.src = 'http://tainam.net/wp-content/uploads/2018/02/Smile-big-1.gif';
    elImg.className = 'kolElem';
    kol.push({x: x, y: y, l: findLen(x, y, xFox, yFox), elem: elImg});
    showElem(x, y, elImg)
}

function showElem(x, y, elem) {
    elem.style.left = x + 'px';
    elem.style.top = y + 'px'
}

function findLen(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

function showFox(fox, kol) {
    if (!kol[0]) {
        foxElem.src = fox.foxDream;
        showElem(fox.x, fox.y, foxElem);
        return
    } else {
        if (foxElem.src !== fox.foxRun) {
            foxElem.src = fox.foxRun
        }
    }
    if (kol[0].l < fox.step) {
        deleteKol(kol);
        return
    }
    kol.sort((a, b) => (a.l > b.l) ? 1 : -1);
    fox.cosX = (kol[0].x - fox.x) / kol[0].l;
    fox.cosY = (kol[0].y - fox.y) / kol[0].l;
    fox.x += Math.round(fox.step * fox.cosX);
    fox.y += Math.round(fox.step * fox.cosY);
    kol.forEach(a => {
        a.l = findLen(a.x, a.y, fox.x, fox.y);
        a.cosX = (a.x - fox.x) / a.l;
        a.cosY = (a.y - fox.y) / a.l
    });
    goKol(fox, kol);
    foxElem.style.transform = fox.cosX > 0 ? ('rotateY(180deg)') : ('rotateY(0deg)');
    showElem(fox.x, fox.y, foxElem)

}

function deleteKol(kol) {
    document.body.removeChild(kol[0].elem);
    kol.shift()
}

function goKol(fox, kol) {
    kol.forEach((a, i, arr) => {
        a.step = (a.l < 50) ? 8 : (a.l < 100) ? 6 : (a.l < 200) ? 3 : (a.l < 300) ? 2 :
            (a.l < 400) ? 1 : (a.l < 500) ? 0.5 : 0;
        a.x += a.step * a.cosX;
        a.y += a.step * a.cosY;
        if (a.x < 0 || a.x > xMax || a.y < 0 || a.y > yMax) {
            a.elem.style.transition = 'all 1s';
            a.elem.style.opacity = '0';
            setTimeout(() => document.body.removeChild(a.elem), 1000);
            console.log(a);
            arr.splice(i, 1)
        }
        showElem(a.x, a.y, a.elem)
    })
}

