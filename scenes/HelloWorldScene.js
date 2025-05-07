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
    this.platforms.create(120, 550, "platform").setScale(1.5).refreshBody();
    this.platforms.create(1862, 550, "platform").setScale(1.5).refreshBody();
    this.platforms.create(980, 920, "platform").setScale(1.5).refreshBody();

    this.player = this.physics.add.sprite(958, 1025, "ninjamoncho");
    this.player.setScale(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.triangles = this.physics.add.group();
    this.diamonds = this.physics.add.group();
    this.square = this.physics.add.group();



    this.physics.add.overlap(this.player, this.triangles, this.collectriangle , null, this);

    this.physics.add.collider(this.player, this.triangles, this.collectriangle , null, this);

    this.physics.add.overlap(this.player, this.diamonds, this.collectdiamonds , null, this);

    this.physics.add.collider(this.player, this.diamonds, this.collectdiamonds , null, this);

    this.physics.add.overlap(this.player, this.square, this.collectsquare , null, this);

    this.physics.add.collider(this.player, this.square, this.collectsquare , null, this);

    this.time.addEvent({
      delay: 500, 
      callback: this.createRandomItem,
      callbackScope: this,
      loop: true
    });

    this.itemsCollected = [];
    this.puntuationvar = 0;

    this.gameOver = false;

    this.trianglestext = this.add.text(32, 32, `Triangulos: ${this.countItems("triangle")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.diamondstext = this.add.text(32, 64, `Diamantes: ${this.countItems("diamond")}`, {
      fontSize: "32px",
      fill: "#000",
    });
    
    this.squarestext = this.add.text(32, 96, `Cuadrados: ${this.countItems("square")}`, {
      fontSize: "32px",
      fill: "#000",
    });


    this.timer = this.time.addEvent({ delay: 31000, callback: () => this.Derrota(this.player, null) });

    this.timerText = this.add.text(1780, 32, "Tiempo: 31", {
      fontSize: "32px",
      fill: "#000",
    });

    this.puntuationtext = this.add.text(32, 128, `Puntos: ${this.puntuationvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.physics.add.collider(this.triangles, this.platforms, (triangle, platform) => {
      triangle.points -= 5;
      triangle.touchCount = 1;
      if (triangle.points <= 0) {
      triangle.destroy();  
      this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);}
    });

    this.physics.add.collider(this.diamonds, this.platforms, (diamond, platform) => {
      diamond.points -= 5;
      diamond.touchCount = 1;
      if (diamond.points <= 0) {
      diamond.destroy(); 
      this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);}
    });

    this.physics.add.collider(this.square, this.platforms, (square, platform) => {
      square.points -= 5;
      square.touchCount = 1;
      if (square.points <= 0) {
      square.destroy(); 
      this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);}
    });

    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
  }

  createTriangle() {
    const x = Phaser.Math.Between(0, 2120);
    const triangle = this.triangles.create(x, 0, "triangle");
    triangle.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    triangle.setCollideWorldBounds(true);
    triangle.touchCount = 0;
    triangle.points = 10;
  }

  createDiamonds() {
    const xd = Phaser.Math.Between(0, 2120);
    const diamond = this.diamonds.create(xd, 0, "diamond");
    diamond.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    diamond.setCollideWorldBounds(true);
    diamond.touchCount = 0;
    diamond.points = 15;
  }

  createSquare() {
    const xs = Phaser.Math.Between(0, 2120);
    const squares = this.square.create(xs, 0, "square");
    squares.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    squares.setCollideWorldBounds(true);
    squares.touchCount = 0;
    squares.points = 20;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-420);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(420);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-520);
    }

    if (!this.gameOver) {
      this.checkVictoryCondition();
    }

    if (this.timer) {
      const remaining = Math.max(0, Math.floor(this.timer.getRemainingSeconds()));
      this.timerText.setText(`Tiempo: ${remaining} `);
    }



    if (this.rKey.isDown) {
      this.scene.restart();
    }

  }

  collectriangle(player, triangle) {
  if (triangle.active) {
    this.puntuationvar += triangle.points;
    triangle.disableBody(true, true);
    this.itemsCollected.push("triangle");
    this.timer.elapsed -= 2000;
    this.trianglestext.setText(`Triangulos: ${this.countItems("triangle")}`);
    this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);
    this.checkVictoryCondition();
  }
    }
    

  collectdiamonds(player, diamond) {
    if (diamond.active) {
      this.puntuationvar += diamond.points;
      diamond.disableBody(true, true);
      this.itemsCollected.push("diamond");
      this.timer.elapsed -= 2000;
      this.diamondstext.setText(`Diamantes: ${this.countItems("diamond")}`);
      this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);
      this.checkVictoryCondition();
    }
      }



  collectsquare(player, square) {
    if (square.active) {
      this.puntuationvar += square.points;
      square.disableBody(true, true);
      this.itemsCollected.push("square");
      this.timer.elapsed -= 2000;
      this.squarestext.setText(`Cuadrados: ${this.countItems("square")}`);
      this.puntuationtext.setText(`Puntos: ${this.puntuationvar}`);
      this.checkVictoryCondition();
    }
      }

  createRandomItem() {
    const itemType = Phaser.Math.Between(0, 2); 
    const x = Phaser.Math.Between(0, 2120);
  
    if (itemType === 0) {
      const triangle = this.triangles.create(x, 0, "triangle");
      triangle.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      triangle.setCollideWorldBounds(true);
      triangle.touchCount = 0;
      triangle.points = 10;
    } else if (itemType === 1) {
      const diamond = this.diamonds.create(x, 0, "diamond");
      diamond.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      diamond.setCollideWorldBounds(true);
      diamond.touchCount = 0;
      diamond.points = 15;
    } else {
      const square = this.square.create(x, 0, "square");
      square.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      square.setCollideWorldBounds(true);
      square.touchCount = 0;
      square.points = 20;
    }
  }

  countItems(type) {
    return this.itemsCollected.filter(item => item === type).length;
  }

  checkVictoryCondition() {
    const triangleCount = this.countItems("triangle");
    const diamondCount = this.countItems("diamond");
    const squareCount = this.countItems("square");
  
    if (
      triangleCount >= 2 &&
      diamondCount >= 2 &&
      squareCount >= 2 &&
      this.puntuationvar >= 100 &&
      !this.gameOver
    ) {
      this.Victoria();
    }
  }

  Victoria() {
    this.physics.pause();

    this.gameOver = true;

    this.victoriatexto = this.add.text(662, 512, `Victoria`, {
      fontSize: "128px",
      fill: "#000",
    });

    this.victoriatexto = this.add.text(450, 622, `Recolectaste 2 de cada figura y superaste los 100 puntos.`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.time.removeAllEvents();

    this.trianglestext.visible = false;
    this.diamondstext.visible = false;
    this.squarestext.visible = false;
    this.timerText.visible = false;
    this.puntuationtext.visible = false;


    this.trianglestext = this.add.text(450, 750, `Triangulos: ${this.countItems("triangle")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.diamondstext = this.add.text(850, 750, `Diamantes: ${this.countItems("diamond")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.squarestext = this.add.text(1250, 750, `Cuadrados: ${this.countItems("square")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.puntuationtext = this.add.text(824, 825, `Puntuación: ${this.puntuationvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.restart = this.add.text(824, 900, `Reinicie con R`, {
      fontSize: "32px",
      fill: "#000",
    });
  }

  Derrota() {
    this.physics.pause();

    this.gameOver = true;

    this.victoriatexto = this.add.text(662, 512, `Derrota`, {
      fontSize: "128px",
      fill: "#000",
    });

    this.victoriatexto = this.add.text(720, 622, `Vuelve a intentarlo.`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.time.removeAllEvents();

    this.trianglestext.visible = false;
    this.diamondstext.visible = false;
    this.squarestext.visible = false;
    this.timerText.visible = false;
    this.puntuationtext.visible= false;


    this.trianglestext = this.add.text(450, 750, `Triangulos: ${this.countItems("triangle")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.diamondstext = this.add.text(850, 750, `Diamantes: ${this.countItems("diamond")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.squarestext = this.add.text(1250, 750, `Cuadrados: ${this.countItems("square")}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.puntuationtext = this.add.text(824, 825, `Puntuación: ${this.puntuationvar}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.restart = this.add.text(824, 900, `Reinicie con R`, {
      fontSize: "32px",
      fill: "#000",
    });
  }

}

  


