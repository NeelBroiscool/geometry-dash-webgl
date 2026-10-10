/**
 * Game Configuration and State
 */

const Config = {
  // Canvas
  WIDTH: 960,
  HEIGHT: 540,
  GROUND_HEIGHT: 88,

  // Physics
  GRAVITY: 1700,
  JUMP_VELOCITY: 640,
  SPEED: 360,

  // Gameplay
  OBSTACLE_SPAWN_BASE: 1.1,
  OBSTACLE_SPAWN_VARIANCE: 0.9,
  OBSTACLE_MIN_WIDTH: 24,
  OBSTACLE_WIDTH_VARIANCE: 18,
  OBSTACLE_MIN_HEIGHT: 26,
  OBSTACLE_HEIGHT_VARIANCE: 70,

  // Player
  PLAYER_START_X: 120,
  PLAYER_WIDTH: 30,
  PLAYER_HEIGHT: 30,

  // Colors
  COLORS: {
    BG_DARK: [0.04, 0.08, 0.16, 1.0],
    GROUND: [0.12, 0.16, 0.24, 1.0],
    GROUND_STRIPE: [1.0, 0.75, 0.15, 0.95],
    PILLAR: [0.11, 0.15, 0.22, 1.0],
    PILLAR_GLOW: [0.20, 0.82, 1.0, 0.25],
    PLAYER: [0.35, 0.92, 1.0, 1.0],
    PLAYER_EYE: [0.08, 0.15, 0.25, 1.0],
    OBSTACLE: [1.0, 0.85, 0.2, 1.0],
    OBSTACLE_SPIKE: [1.0, 0.4, 0.2, 1.0]
  }
};

const GameState = {
  width: Config.WIDTH,
  height: Config.HEIGHT,
  groundHeight: Config.GROUND_HEIGHT,
  gravity: Config.GRAVITY,
  jumpVelocity: Config.JUMP_VELOCITY,
  speed: Config.SPEED,

  player: {
    x: Config.PLAYER_START_X,
    y: 0,
    w: Config.PLAYER_WIDTH,
    h: Config.PLAYER_HEIGHT,
    vy: 0,
    onGround: true
  },

  obstacles: [],
  obstacleTimer: Config.OBSTACLE_SPAWN_BASE,
  score: 0,
  best: Number(localStorage.getItem('neonDashBest') || 0),
  gameOver: false,
  started: false,
  lastTime: 0,
  bgScroll: 0
};
