class Cenainicial extends Phaser.Scene {
    constructor() {
        super({ key: "Cenainicial" });
    }

    preload() {
        this.load.image("Cena1", "assets/imagens/fundocenaini.png");

        this.load.image("bonecodir0", "assets/personagens/bonecodir0.png"); 
        this.load.image("bonecodir1", "assets/personagens/bonecodir1.png");
        this.load.image("bonecodir2", "assets/personagens/bonecodir2.png");
        this.load.image("bonecodir3", "assets/personagens/bonecodir3.png");
        this.load.image("bonecodir4", "assets/personagens/bonecodir4.png");
        this.load.image("bonecodir5", "assets/personagens/bonecodir5.png");
        this.load.image("bonecodir6", "assets/personagens/bonecodir6.png");

        this.load.image("bonecobax0", "assets/personagens/bonecobax0.png"); 
        this.load.image("bonecobax1", "assets/personagens/bonecobax1.png");
        this.load.image("bonecobax2", "assets/personagens/bonecobax2.png");
        this.load.image("bonecobax3", "assets/personagens/bonecobax3.png");
        this.load.image("bonecobax4", "assets/personagens/bonecobax4.png");
        this.load.image("bonecobax5", "assets/personagens/bonecobax5.png");
        this.load.image("bonecobax6", "assets/personagens/bonecobax6.png");

        this.load.image("bonecocim0", "assets/personagens/bonecocim0.png"); 
        this.load.image("bonecocim1", "assets/personagens/bonecocim1.png");
        this.load.image("bonecocim2", "assets/personagens/bonecocim2.png");
        this.load.image("bonecocim3", "assets/personagens/bonecocim3.png");
        this.load.image("bonecocim4", "assets/personagens/bonecocim4.png");
        this.load.image("bonecocim5", "assets/personagens/bonecocim5.png");
        this.load.image("bonecocim6", "assets/personagens/bonecocim6.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setZoom(1.5);  

        const background = this.add.image(0, 0, "Cena1")
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width * 1.5, this.cameras.main.height * 1.5);

        this.player = this.add.sprite(centerX, centerY, "bonecobax0")
            .setOrigin(0.5)
            .setScale(1.7);

        // Adiciona um quadrado vermelho no centro do mapa
        this.cube = this.add.rectangle(850, 450, 30, 30, 0xff0000);

        // Faz o quadrado vermelho piscar a cada 500ms
        this.time.addEvent({
            delay: 300,
            callback: () => {
                this.cube.setVisible(!this.cube.visible);
            },
            loop: true
        });

        this.anims.create({
            key: 'walk-right',
            frames: [
                { key: 'bonecodir1' }, { key: 'bonecodir2' }, { key: 'bonecodir3' },
                { key: 'bonecodir4' }, { key: 'bonecodir5' }, { key: 'bonecodir6' }
            ],
            frameRate: 10, repeat: -1
        });

        this.anims.create({
            key: 'walk-left',
            frames: [
                { key: 'bonecodir1' }, { key: 'bonecodir2' }, { key: 'bonecodir3' },
                { key: 'bonecodir4' }, { key: 'bonecodir5' }, { key: 'bonecodir6' }
            ],
            frameRate: 10, repeat: -1
        });

        this.anims.create({
            key: 'walk-down',
            frames: [
                { key: 'bonecobax1' }, { key: 'bonecobax2' }, { key: 'bonecobax3' },
                { key: 'bonecobax4' }, { key: 'bonecobax5' }, { key: 'bonecobax6' }
            ],
            frameRate: 10, repeat: -1
        });

        this.anims.create({
            key: 'walk-up',
            frames: [
                { key: 'bonecocim1' }, { key: 'bonecocim2' }, { key: 'bonecocim3' },
                { key: 'bonecocim4' }, { key: 'bonecocim5' }, { key: 'bonecocim6' }
            ],
            frameRate: 10, repeat: -1
        });

        this.anims.create({ key: 'idle-down', frames: [{ key: 'bonecobax0' }], frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'idle-up', frames: [{ key: 'bonecocim0' }], frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'idle-side', frames: [{ key: 'bonecodir0' }], frameRate: 10, repeat: -1 });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 270;
        this.lastDirection = "down";

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    }

    update() {
        let moving = false;
    
        const minX = this.player.width / 2;
        const maxX = this.cameras.main.worldView.width * 2 - this.player.width / 2;
        const minY = this.player.height / 2;
        const maxY = this.cameras.main.worldView.height * 2 - this.player.height / 2;
    
        if (this.cursors.left.isDown && this.player.x > minX) {
            this.player.x -= this.speed * this.game.loop.delta / 1000;
            this.player.setFlipX(true);
            this.player.play('walk-left', true);
            this.lastDirection = "side";
            moving = true;
        } else if (this.cursors.right.isDown && this.player.x < maxX) {
            this.player.x += this.speed * this.game.loop.delta / 1000;
            this.player.setFlipX(false);
            this.player.play('walk-right', true);
            this.lastDirection = "side";
            moving = true;
        }
    
        if (this.cursors.down.isDown && this.player.y < maxY) {
            this.player.y += this.speed * this.game.loop.delta / 1000;
            this.player.play('walk-down', true);
            this.lastDirection = "down";
            moving = true;
        } else if (this.cursors.up.isDown && this.player.y > minY) {
            this.player.y -= this.speed * this.game.loop.delta / 1000;
            this.player.play('walk-up', true);
            this.lastDirection = "up";
            moving = true;
        }
    
        if (!moving) {
            if (this.lastDirection === "down") {
                this.player.play('idle-down', true);
            } else if (this.lastDirection === "up") {
                this.player.play('idle-up', true);
            } else {
                this.player.play('idle-side', true);
            }
        }
    
        // Verifica se o player tocou no quadrado vermelho
        if (
            this.player.x < this.cube.x + this.cube.width / 2 &&
            this.player.x > this.cube.x - this.cube.width / 2 &&
            this.player.y < this.cube.y + this.cube.height / 2 &&
            this.player.y > this.cube.y - this.cube.height / 2
        ) {
            this.scene.start("CenaEscola"); // Troca para CenaEscola
        }
    }
}

window.Cenainicial = Cenainicial;
