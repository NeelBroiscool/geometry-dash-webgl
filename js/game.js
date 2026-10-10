/**
 * Main Game Logic
 */

const GameManager = (() => {
  const canvas = document.getElementById('gameCanvas');
  const scoreEl = document.getElementById('score');
  const bestScoreEl = document.getElementById('bestScore');
  const gameOverEl = document.getElementById('gameOver');

  function resetGame() {
    GameState.obstacles = [];
    GameState.score = 0;
    GameState.obstacleTimer = Config.OBSTACLE_SPAWN_BASE;
    GameState.gameOver = false;
    GameState.started = true;
    GameState.bgScroll = 0;
    Player.reset();
    updateHUD();
  }

  function endGame() {
    GameState.gameOver = true;
    GameState.best = Math.max(GameState.best, GameState.score);
    localStorage.setItem('neonDashBest', String(GameState.best));
    updateHUD();
  }

  function updateHUD() {
    scoreEl.textContent = String(GameState.score);
    bestScoreEl.textContent = String(GameState.best);
    gameOverEl.hidden = !GameState.gameOver;
  }

  function update(dt) {
    if (!GameState.gameOver) {
      // Update background scroll
      GameState.bgScroll += GameState.speed * dt;

      // Update physics
      Physics.updatePlayer(dt);

      // Update obstacles
      ObstacleManager.update(dt);

      // Check collisions
      if (Physics.checkCollisions()) {
        endGame();
      }

      updateHUD();
    }
  }

  function frame(timestamp) {
    const dt = Math.min((timestamp - GameState.lastTime) / 1000 || 0.016, 0.033);
    GameState.lastTime = timestamp;

    update(dt);
    Renderer.render();

    requestAnimationFrame(frame);
  }

  function init() {
    Renderer.init(canvas);
    InputManager.init();

    window.addEventListener('resize', () => {
      Renderer.resizeCanvas(canvas);
    });

    resetGame();
    bestScoreEl.textContent = String(GameState.best);
    requestAnimationFrame(frame);
  }

  return {
    init,
    resetGame,
    endGame
  };
})();

// Start the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', GameManager.init);
} else {
  GameManager.init();
}
