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
