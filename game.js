var game = {

    width: 640,
    height: 360,
    ctx: undefined,
    platform: undefined,
    ball: undefined,
    rows: 4,
    cols: 8,
    blocks: [],

    sprites:{
        background: undefined,
        platform: undefined,
        ball: undefined,
        block: undefined
    },

    init: function () {
        var canvas = document.getElementById("mycanvas");
        this.ctx = canvas.getContext("2d");
    },

    load: function () {
        for ( var key in this.sprites ) {
            this.sprites[key] = new Image();
            this.sprites[key].src = "images/" + key + ".png";
        }
    },

    create: function() {
        for ( var col = 0; col < this.cols; col++ ) {
            this.blocks.push({
                x: (64 + 4) * col,
                y: 0,
                width: 64,
                height: 32
            });
        }
    },

    start: function () {
        this.init();
        this.load();
        this.create();
        this.run();
    },

    render: function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);

        this.ctx.drawImage(this.sprites.ball,
            this.ball.width * this.ball.frame, 0,   // начало фрейма
            this.ball.width, this.ball.height,      // размер вырезки
            this.ball.x, this.ball.y,               // координаты
            this.ball.width, this.ball.height);     // размеры изображения

        this.blocks.forEach(function (element) {
            this.ctx.drawImage(this.sprites.block, element.x, element.y);
        }, this);
    },

    run: function() {
        this.render();
        window.requestAnimationFrame(function () {
            game.run();
        });
    }

};

game.platform = {
    x: 300,
    y: 300
};

game.ball = {
    width: 22,
    height: 22,
    frame: 0,
    x: 340,
    y: 278
};

window.addEventListener("load", function () {
    game.start();
});
