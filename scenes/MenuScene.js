export default class MenuScene extends Phaser.Scene {
    constructor() {
      super("menu-scene");
    }
  
    preload() {

      this.load.image("backgroundmenu", "./public/assets/FondoMenu.jpg");
    }
  
    create() {
      this.add.image(0, 0, "backgroundmenu").setOrigin(0).setDisplaySize(2020, 1400);
      

      this.add.text(535, 400, "NINJA MONCHO", { 
        fontSize: "128px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4, });
      this.add.text(505, 550, "Presiona ENTER para jugar", { 
        fontSize: "64px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4, });
  
      
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
          this.scene.start("hello-world");
        }
      }
  }