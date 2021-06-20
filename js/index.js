window.addEventListener('load', function () {
    var arrow_left = this.document.querySelector('.arrow_left');
    var arrow_right = this.document.querySelector('.arrow_right');
    var foucs = this.document.querySelector('.foucs');
    foucs.addEventListener('mouseover', function () {
        arrow_left.style.display = 'block';
        arrow_right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    foucs.addEventListener('mouseout', function () {
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'none';
        timer = setInterval(function () {
            arrow_right.click();
        }, 2000);
    });
    var foucs_ul = foucs.querySelector('ul');
    var foucs_ol = foucs.querySelector('ol');

    var imgWidth = foucs.offsetWidth;
    for (let i = 0; i < foucs_ul.children.length; i++) {
        var li = this.document.createElement('li');
        var a = this.document.createElement('a');
        if (i == 0) {
            a.className = 'current';
        }
        a.href = 'javascript:;';
        // 生成a的自定义属性
        a.setAttribute('data-index', i);
        a.addEventListener('click', function () {
            for (let i = 0; i < foucs_ol.children.length; i++) {
                foucs_ol.children[i].children[0].className = '';
            }
            this.className = 'current';
            // 当点了某个小a，就要把这个a的索引号给num/circle，使点小圆圈和点箭头变化同步变化
            num = circle = this.dataset.index;

            // 点击小圆圈，移动图片片，即ul移动
            console.log(-imgWidth * this.dataset.index);
            animate(foucs_ul, -imgWidth * this.dataset.index);
        });
        li.appendChild(a);
        foucs_ol.appendChild(li);
    }
    var num = 0;
    var circle = 0;// 控制小圆圈播放
    var flag = true; // 节流阀开关，当上衣动画结束，再点击才执行
    //无缝滚动，
    //将ul中的第一个li复制，一份到最后，当播放最后一张，再点击下一张时，先让left = 0，再移动到第二张

    // 克隆第一个，写在生成小圆圈的后面，不影响小圆圈个数
    var fist = foucs_ul.children[0].cloneNode(true);
    foucs_ul.appendChild(fist);


    arrow_left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {// 当前第一张，点击显示最后一张
                num = foucs_ul.children.length - 1;
                foucs_ul.style.left = -num * imgWidth + 'px';
            }
            num--;

            animate(foucs_ul, -num * imgWidth, function () {
                // 回调函数，打开节流阀
                flag = true;
            });
            circle--;
            // circle是第一张点左箭头,circl调到最后一张图片
            circle = circle < 0 ? foucs_ol.children.length - 1 : circle;
            circleChange();
        }
    });
    arrow_right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == foucs_ul.children.length - 1) {// 当前最后张，点击显示第一张
                num = 0;
                foucs_ul.style.left = 0;
            }
            num++;

            animate(foucs_ul, -num * imgWidth, function () {
                // 回调函数，打开节流阀
                flag = true;
            });// ul图片左移
            circle++;
            // circle是最后一张点右箭头,circl调到第一张图片
            if (circle == foucs_ol.children.length) {
                circle = 0;
            }
            circleChange();
        }

    });
    function circleChange() {
        for (let i = 0; i < foucs_ol.children.length; i++) {

            if (i == circle) {
                foucs_ol.children[i].children[0].className = 'current';
                continue;
            }

            foucs_ol.children[i].children[0].className = '';
        }
    }
    //自动轮播
    var timer = this.setInterval(function () {
        arrow_right.click();// 手动调用事件
    }, 2000);

});



$(function () {
    toggleTool();
    var flag = true;
    $(window).scroll(function () {
        toggleTool();
        // 页面滚动到对应区域，电梯导航模块相应变化
        if (flag) {// 节流阀、互斥锁
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }

    })
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recom").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(".fixedtool li").click(function () {
        flag = false;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass(); //就一个类名可以不用指定
    })
})