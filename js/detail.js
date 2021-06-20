window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var img = big.querySelector('img');
    // 鼠标经过显示隐藏
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    // mask跟随鼠标移动，将鼠标在盒子内的坐标给盒子
    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft;//所有父级都没有定位，可获取到它距离页面边距的坐标
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 阻止黄色遮罩盒子溢出

        var maskMax = this.offsetWidth - mask.offsetWidth; //遮罩层最大移动距离
        //因为是正方形maskMaxX=maskMaxY
        if (maskX < 0) {
            maskX = 0;
        }
        else if (maskX > maskMax) {
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        }
        else if (maskY > maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图移动距离=遮罩层移动距离*大图最大移动距离/遮罩层最大移动距离
        // 大图移动和鼠标移动方向相反
        img.style.left = maskX * ((big.offsetWidth - img.offsetWidth) / maskMax) + 'px';
        img.style.top = maskY * ((big.offsetWidth - img.offsetWidth) / maskMax) + 'px';
    });

})