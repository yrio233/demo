class AcGameMenu{
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-content">
        <div class="ac-game-menu-content-item ac-game-menu-content-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="ac-game-menu-content-item ac-game-menu-content-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="ac-game-menu-content-item ac-game-menu-content-item-settings">
            设置
        </div>
    </div>
</div>
        `);
        this.root.$ac_game.append(this.$menu);

        this.$single_mode = this.$menu.find(".ac-game-menu-content-item-single-mode");
        this.$multi_mode = this.$menu.find('.ac-game-menu-content-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-content-item-settings');

        this.start();

    }

    start() {   //绑定监听函数，设置初值等
       this.add_listening_events();
    }

    add_listening_events() {
        let that = this;
        this.$single_mode.click(function(){
            that.hide();
            that.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log('single');
            console.log('multi');
        });
        this.$settings.click(function(){
            console.log('settings');
        });

    }

    show() {  //显示menu界面
        this.$menu.show();

    }

    hide() {
        this.$menu.hide();
    }

}
let AC_GAME_OBJECTS = [];

class AcGameObject {   //游戏引擎,基类
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;
        this.timedelta = 0;
    }

    start() {  //只会在第一帧执行一次
    }

    update() { //每一帧都会执行一次
    }

    on_destroy() {  //被销毁之前执行一次
    }

    destroy() {  //删除该物体
        this.on_destroy();

        for(let i=0; i<AC_GAME_OBJECTS.length; i++) {
            if(AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i,1);  //从i开始删除一个
                break;
            }
        }
    }

}

let last_timestamp;

let AC_GAME_ANIMATION = function(timestamp) {  //timestamp时间戳，在这个时刻调用一次函数
    for(let i=0; i<AC_GAME_OBJECTS.length; i++) {
        let obj = AC_GAME_OBJECTS[i];
        if(!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION); //在下一时刻调用一次里面的函数，并传入一个时间戳timestamp


class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
        console.log(this.ctx.canvas.width);

    }
    start(){
    }

    update(){
       this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(20,20,0)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

       // this.hide();
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);

        this.start();
    }
    start() {

    }
    show() {  //打开playground界面
        this.$playground.show();
    }
    hide() {  //关闭playground界面
        this.$playground.hide();
    }
}
export class AcGame {
    constructor(id){
        this.id = id;
        this.$ac_game = $('#' + id);
        //this.$ac_game;
//        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);


        this.start();
    }

    start() {
    }
}
