// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  init() {
    // init variables
  }

  preload() {
    this.load.image("sky", "./public/assets/Cielo.webp");
    this.load.image("backgroundmenu", "./public/assets/FondoMenu.jpg");
    this.load.image("platform", "./public/assets/platform.png");
    this.load.image("ninjamoncho", "./public/assets/Ninja.png");
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("square", "./public/assets/square.png");
  }

  create() {
    this.sky = this.add.image(250, 165, "sky");
    this.sky.setScale(7);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(120, 1420, "platform").setScale(12).refreshBody();

    this.player = this.physics.add.sprite(958, 1025, "ninjamoncho");
    this.player.setScale(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.triangles = this.physics.add.group();
    this.diamonds = this.physics.add.group();
    this.square = this.physics.add.group();

    this.physics.add.collider(this.triangles, this.platforms);
    this.physics.add.collider(this.diamonds, this.platforms);
    this.physics.add.collider(this.square, this.platforms);


    this.physics.add.overlap(this.player, this.triangles, this.collectriangle , null, this);

    this.physics.add.collider(this.player, this.triangles, this.collectriangle , null, this);

    this.physics.add.overlap(this.player, this.diamonds, this.collectdiamonds , null, this);

    this.physics.add.collider(this.player, this.diamonds, this.collectdiamonds , null, this);

    this.physics.add.overlap(this.player, this.square, this.collectsquare , null, this);

    this.physics.add.collider(this.player, this.square, this.collectsquare , null, this);

    this.time.addEvent({
      delay: 4000,
      callback: this.createTriangle,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 6500,
      callback: this.createDiamonds,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 8500,
      callback: this.createSquare,
      callbackScope: this,
      loop: true
    });

    this.trianglesvar = 0;
    this.diamondsvar = 0;
    this.squaresvar = 0;

    this.gameOver = false;

    this.trianglestext = this.add.text(32, 32, `Triangulos: ${this.trianglesvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.diamondstext = this.add.text(32, 64, `Diamantes: ${this.diamondsvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.squarestext = this.add.text(32, 96, `Cuadrados: ${this.squaresvar}`, {
      fontSize: "32px",
      fill: "#000",
    });
  }

  createTriangle() {
    const x = Phaser.Math.Between(0, 2120);
    const triangle = this.triangles.create(x, 0, "triangle");
    triangle.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    triangle.setCollideWorldBounds(true);
  }

  createDiamonds() {
    const xd = Phaser.Math.Between(0, 2120);
    const diamond = this.diamonds.create(xd, 0, "diamond");
    diamond.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    diamond.setCollideWorldBounds(true);
  }

  createSquare() {
    const xs = Phaser.Math.Between(0, 2120);
    const squares = this.square.create(xs, 0, "square");
    squares.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    squares.setCollideWorldBounds(true);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-420);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(420);
    } else {
      this.player.setVelocityX(0);
    }

    if (
      this.trianglesvar >= 2 &&
      this.diamondsvar >= 2 &&
      this.squaresvar >= 2 &&
      !this.gameOver
    ) {
      this.Victoria();
    }
  }

  collectriangle(player, triangle) {
    triangle.disableBody(true, true);

    this.trianglesvar += 1;
    this.trianglestext.setText(`Triangulos: ${this.trianglesvar}`);
    }

  collectdiamonds(player, diamond) {
      diamond.disableBody(true, true);
  
      this.diamondsvar += 1;
      this.diamondstext.setText(`Diamantes: ${this.diamondsvar}`);
      }

  collectsquare(player, square) {
        square.disableBody(true, true);
    
        this.squaresvar += 1;
        this.squarestext.setText(`Cuadrados: ${this.squaresvar}`);
        }

  Victoria() {
    this.physics.pause();

    this.gameOver = true;

    this.victoriatexto = this.add.text(662, 512, `Victoria`, {
      fontSize: "128px",
      fill: "#000",
    });

    this.victoriatexto = this.add.text(684, 622, `Recolectaste 2 de cada figura.`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.time.removeAllEvents();

    this.trianglestext.visible = false;
    this.diamondstext.visible = false;
    this.squarestext.visible = false;

    this.trianglestext = this.add.text(450, 750, `Triangulos: ${this.trianglesvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.diamondstext = this.add.text(850, 750, `Diamantes: ${this.diamondsvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.squarestext = this.add.text(1250, 750, `Cuadrados: ${this.squaresvar}`, {
      fontSize: "32px",
      fill: "#000",
    });
  }
  }

  


