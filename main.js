import HelloWorldScene from "./scenes/HelloWorldScene.js";
import EndScene from "./scenes/EndScene.js";
import MenuScene from "./scenes/MenuScene.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 2000,
  height: 1324,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 250 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [MenuScene, HelloWorldScene, EndScene],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
