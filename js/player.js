/**
 * Player Management
 */

const Player = (() => {
  function jump() {
    if (GameState.gameOver) {
      GameManager.resetGame();
      return;
    }

    if (GameState.player.onGround) {
      GameState.player.vy = -GameState.jumpVelocity;
      GameState.player.onGround = false;
    }
  }

  function reset() {
    GameState.player.y = GameState.height - GameState.groundHeight - GameState.player.h;
    GameState.player.vy = 0;
    GameState.player.onGround = true;
  }

  return {
    jump,
    reset
  };
})();
