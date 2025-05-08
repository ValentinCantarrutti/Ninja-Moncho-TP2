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
      this.load.image("sky", "./public/assets/Cielo.webp");
    }
  
    create() {
      this.sky = this.add.image(250, 165, "sky");
      this.sky.setScale(7);
  
      const titleText = this.isVictory ? "Victoria" : "Derrota";
      const subtitle = this.isVictory
        ? "Recolectaste 2 de cada figura y superaste los 100 puntos."
        : "Vuelve a intentarlo.";
  
        if (this.isVictory) {
            this.victoryText = this.add.text(662, 512, titleText, {
              fontSize: "128px",
              fill: "#000",
            });
            this.subtitleText = this.add.text(450, 622, subtitle, {
              fontSize: "32px",
              fill: "#000",
            });
          } else {
            this.victoryText = this.add.text(662, 512, titleText, {
              fontSize: "128px",
              fill: "#000",
            });
            this.subtitleText = this.add.text(725, 622, subtitle, {
              fontSize: "32px",
              fill: "#000",
            });
          }
  
      const countItems = (type) =>
        this.itemsCollected.filter((item) => item === type).length;
  
      this.add.text(450, 750, `Triangulos: ${countItems("triangle")}`, {
        fontSize: "32px",
        fill: "#000",
      });
  
      this.add.text(850, 750, `Diamantes: ${countItems("diamond")}`, {
        fontSize: "32px",
        fill: "#000",
      });
  
      this.add.text(1250, 750, `Cuadrados: ${countItems("square")}`, {
        fontSize: "32px",
        fill: "#000",
      });
  
      this.add.text(824, 825, `Puntuación: ${this.puntuationvar}`, {
        fontSize: "32px",
        fill: "#000",
      });
    
      this.add.text(824, 900, `Reinicie con R`, {
        fontSize: "32px",
        fill: "#000",
      });

      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
  
    update() {
      if (this.rKey.isDown) {
        this.scene.start("hello-world");
      }
    }
  }