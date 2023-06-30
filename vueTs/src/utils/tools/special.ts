/**
 * @function 网页特效
 * @returns 
 */
// 取消当前所有特效
export const cancelSpecial = () => { 
    if(window.onclick){
        window.onclick = null;
        
    }
    if(window.onmousedown){
        window.onmousemove = null;
        window.onmouseup = null;
        window.onmousedown = null;
    }
    if(document.onmousemove){
        document.onmousemove = null;
        window.onresize = null;
    }
}
// 爱心特效
const _loveSpecial = (e:any, t:any, a?:any) => {
    function r() {
        for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[
                e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x +
            "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e]
            .scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }

    function n() {
        var f = "function" == typeof e.onclick && e.onclick as any;
        e.onclick = function (e) {
            o(e)
        }
    }

    function o(e) {
        var a = t.createElement("div");
        a.className = "heart", s.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: c()
        }), t.body.appendChild(a)
    }

    function i(e) {
        var a = t.createElement("style") as any ;
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }

    function c() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math
            .random()) + ")"
    }
    var s:any = [];
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e
        .mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }, i(
            ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
        ), n(), r()
}
export const getLoveSpecial = () => {
    console.log(window, '12314')
    cancelSpecial();
    _loveSpecial(window, document);
}
const fireworksMousedown = (e?:any, pushBalls?:any, randBetween?:any, longPress?:any, longPressed?:any) => {
    pushBalls(randBetween(10, 20), e.clientX, e.clientY);
    document.body.classList.add("is-pressed");
    longPress = setTimeout(function () {
        document.body.classList.add("is-longpress");
        longPressed = true;
    }, 500);
}
// 波纹特效
function clickEffect() {
    let balls:any = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        // window.addEventListener("mousedown", (e)=>{
            
        // }, false)
        window.onmousedown = (e) => {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function () {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }
        // window.addEventListener("mouseup", function (e) {
            
        // }, false);
        window.onmouseup = (e) => {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }
        // window.addEventListener("mousemove", function (e) {
            
        // }, false);
        window.onmousemove = (e) => {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }


    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        x:number
        y:number
        angle:number
        vx:number
        vy:number
        r:number
        color:number|string
        multiplier:number
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b:any = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b:any = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}

export const getFireworks = () => {
    // window.addEventListener("mousedown",()=>{
    //     console.log('取消了')
    // })
    cancelSpecial();
    clickEffect();
}

// 拖尾特效

function fairyDustCursor() {
 
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798", "#409EFF", "f2f0e6"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: width / 2 };
    var particles:any = [];

    function init() {
        bindEvents();
        loop();
    }

    // Bind events that are needed
    function bindEvents() {
        document.onmousemove = onMouseMove
        window.onresize = onWindowResize;
        // document.addEventListener('mousemove', onMouseMove);
        // window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {

        // Updated
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // Remove dead particles
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }

    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    /**
     * Particles
     */

    function Particle(this:any) {

        this.character = "*";
        this.lifeSpan = 120; //ms
        this.initialStyles = {
            "position": "fixed",
            "display": "inline-block",
            "top": "0px",
            "left": "0px",
            "pointerEvents": "none",
            "touch-action": "none",
            "z-index": "10000000",
            "fontSize": "25px",
            "will-change": "transform"
        };

        // Init, and set properties
        this.init = function (x, y, color) {

            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = { x: x + 10, y: y + 10 };
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();
            
            document.body.appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
            this.element.parentNode.removeChild(this.element);
        }

    }

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    if (!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)) init();
}

export const getFairyDustCursor = () => {
    cancelSpecial();
    fairyDustCursor();
}

