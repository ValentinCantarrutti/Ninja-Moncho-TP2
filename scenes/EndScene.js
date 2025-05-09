export default class EndScene extends Phaser.Scene {
    constructor() {
      super("end-scene");
    }
  
    init(data) {
      this.isVictory = data.isVictory;
      this.itemsCollected = data.itemsCollected || [];
      this.puntuationvar = data.puntuationvar || 0;
    }
  
    preload() {
      this.load.image("sky", "./public/assets/Cielo2.png");
      this.load.image("skyderrota", "./public/assets/Cieloperder.png")
    }
  
    create() {
      const worldWidth = 2020;
      const worldHeight = 1400;
  
      
      const fondoKey = this.isVictory ? "sky" : "skyderrota";
      this.sky = this.add.image(0, 0, fondoKey).setOrigin(0);
      this.sky.setDisplaySize(worldWidth, worldHeight);

      const titleText = this.isVictory ? "Victoria" : "Derrota";
      const subtitle = this.isVictory
        ? "Recolectaste 2 de cada figura y superaste los 100 puntos."
        : "Vuelve a intentarlo.";
  
        if (this.isVictory) {
            this.victoryText = this.add.text(662, 512, titleText, {
              fontSize: "128px",
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 6,
            });
            this.subtitleText = this.add.text(450, 622, subtitle, {
              fontSize: "32px",
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 4,
            });
          } else {
            this.victoryText = this.add.text(662, 512, titleText, {
              fontSize: "128px",
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 6,
            });
            this.subtitleText = this.add.text(725, 622, subtitle, {
              fontSize: "32px",
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 4,
            });
          }
  
      const countItems = (type) =>
        this.itemsCollected.filter((item) => item === type).length;
  
      this.add.text(450, 750, `Triangulos: ${countItems("triangle")}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });
  
      this.add.text(850, 750, `Diamantes: ${countItems("diamond")}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });
  
      this.add.text(1250, 750, `Cuadrados: ${countItems("square")}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });
  
      this.add.text(824, 825, `Puntuación: ${this.puntuationvar}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });
    
      this.add.text(824, 900, `Reinicie con R`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });

      this.add.text(750, 975, `Vuelve al menu con ESC`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      });


      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
  
    update() {
      if (this.rKey.isDown) {
        this.scene.start("hello-world");  
      }
  
      if (this.escKey.isDown) {
        this.scene.start("menu-scene");  
      }
    }
  }