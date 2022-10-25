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
