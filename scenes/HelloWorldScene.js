// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/Cielo.webp");
    this.load.image("backgroundmenu", "./public/assets/FondoMenu.jpg");
    this.load.image("platform", "./public/assets/platform.png");
    this.load.image("ninjamoncho", "./public/assets/Ninja.png");
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("square", "./public/assets/square.png");
  }

  create() {
    // create game objects
    this.add.image(250, 165, "sky");

    
    const ninjavariable = this.physics.add.image(40, 10, "ninjamoncho");
    ninjavariable.setScale(0.1);
    ninjavariable.setVelocity(100, 200);
    ninjavariable.setBounce(1, 1);
    ninjavariable.setCollideWorldBounds(true);

    // emmit particles from logo
  //  const emitter = this.add.particles(0, 0, "triangle", {
 //     speed: 100,
    //  scale: { start: 1, end: 0 },
  //    blendMode: "ADD",
    //});

    emitter.startFollow(ninjavariable);
  }

  update() {
    // update game objects
  }
}