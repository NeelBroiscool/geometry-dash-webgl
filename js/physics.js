/**
 * Physics Engine
 */

const Physics = (() => {
  function updatePlayer(dt) {
    GameState.player.vy += GameState.gravity * dt;
    GameState.player.y += GameState.player.vy * dt;

    const groundY = GameState.height - GameState.groundHeight - GameState.player.h;
    if (GameState.player.y >= groundY) {
      GameState.player.y = groundY;
      GameState.player.vy = 0;
      GameState.player.onGround = true;
    } else {
      GameState.player.onGround = false;
    }
  }

  function getPlayerRect() {
    return {
      x: GameState.player.x,
      y: GameState.player.y,
      w: GameState.player.w,
      h: GameState.player.h
    };
  }

  function rectsOverlap(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function checkCollisions() {
    const playerRect = getPlayerRect();

    for (const obs of GameState.obstacles) {
      if (rectsOverlap(playerRect, obs)) {
        return true; // Collision detected
      }
    }

    return false; // No collision
  }

  return {
    updatePlayer,
    getPlayerRect,
    checkCollisions
  };
})();
