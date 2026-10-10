/**
 * Obstacle Management
 */

const ObstacleManager = (() => {
  function spawn() {
    const w = Config.OBSTACLE_MIN_WIDTH + Math.random() * Config.OBSTACLE_WIDTH_VARIANCE;
    const h = Config.OBSTACLE_MIN_HEIGHT + Math.random() * Config.OBSTACLE_HEIGHT_VARIANCE;
    const x = GameState.width + 40;
    const y = GameState.height - GameState.groundHeight - h;

    GameState.obstacles.push({
      x,
      y,
      w,
      h,
      passed: false,
      color: Config.COLORS.OBSTACLE
    });
  }

  function update(dt) {
    GameState.obstacleTimer -= dt;

    if (GameState.obstacleTimer <= 0) {
      spawn();
      GameState.obstacleTimer = Config.OBSTACLE_SPAWN_BASE + Math.random() * Config.OBSTACLE_SPAWN_VARIANCE;
    }

    // Move obstacles
    for (let i = GameState.obstacles.length - 1; i >= 0; i--) {
      const obs = GameState.obstacles[i];
      obs.x -= GameState.speed * dt;

      // Check if passed
      if (!obs.passed && obs.x + obs.w < GameState.player.x) {
        obs.passed = true;
        GameState.score += 1;
      }

      // Remove off-screen obstacles
      if (obs.x + obs.w < -10) {
        GameState.obstacles.splice(i, 1);
      }
    }
  }

  return {
    update,
    spawn
  };
})();
