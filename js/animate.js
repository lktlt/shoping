function animate(obj, target, callback) {
    clearInterval(obj.timer);// 给不同元素指定不同定时器
    // 移动到位不再移动
    if (obj.offsetLeft == target) {
        return;
    }
    move(obj, target);
    obj.timer = setInterval(move, 15);
    function move() {
        if (obj.offsetLeft == target) {  // 获取使用offset
            clearInterval(obj.timer);
            // if (callback) { // 回调函数，写到定时器结束为止
            //     callback();
            // }
            callback && callback();// 短路运算的原因
        }
        var moveStep = (target - obj.offsetLeft) / 30;
        // 往前走，往后走
        moveStep = moveStep > 0 ? Math.ceil(moveStep) : Math.floor(moveStep);

        obj.style.left = obj.offsetLeft + moveStep + 'px';
    }

}