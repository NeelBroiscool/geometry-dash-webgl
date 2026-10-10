/**
 * WebGL Renderer
 */

const Renderer = (() => {
  let gl = null;
  let program = null;
  let positionLocation = null;
  let resolutionLocation = null;
  let colorLocation = null;
  let quadBuffer = null;

  function init(canvas) {
    gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) {
      alert('WebGL is required to run this game.');
      throw new Error('WebGL not supported');
    }

    program = ShaderProgram.create(gl);
    gl.useProgram(program);

    positionLocation = gl.getAttribLocation(program, 'aPosition');
    resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    colorLocation = gl.getUniformLocation(program, 'uColor');

    quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    resizeCanvas(canvas);
  }

  function resizeCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = GameState.width * ratio;
    canvas.height = GameState.height * ratio;
    canvas.style.width = `${GameState.width}px`;
    canvas.style.height = `${GameState.height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
  }

  function drawRect(x, y, w, h, color) {
    const x1 = x;
    const y1 = y;
    const x2 = x + w;
    const y2 = y + h;

    const verts = new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x2, y2
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function drawBackground() {
    // Sky
    drawRect(0, 0, GameState.width, GameState.height, Config.COLORS.BG_DARK);

    // Far neon columns (parallax effect)
    for (let i = 0; i < 18; i++) {
      const x = ((i * 120 - GameState.bgScroll * 0.25) % (GameState.width + 140)) - 120;
      const pillarW = 36 + (i % 3) * 12;
      const pillarH = 120 + (i % 5) * 18;
      const y = GameState.height - GameState.groundHeight - pillarH;

      drawRect(x, y, pillarW, pillarH, Config.COLORS.PILLAR);
      drawRect(x + 8, y + 10, 8, pillarH - 18, Config.COLORS.PILLAR_GLOW);
    }

    // Floor base
    drawRect(
      0,
      GameState.height - GameState.groundHeight,
      GameState.width,
      GameState.groundHeight,
      Config.COLORS.GROUND
    );

    // Ground stripe pattern (scrolling)
    for (let x = -40; x < GameState.width + 80; x += 36) {
      const offset = ((x + GameState.bgScroll * 1.6) % 72) - 36;
      drawRect(offset, GameState.height - 30, 22, 12, Config.COLORS.GROUND_STRIPE);
    }
  }

  function drawPlayer() {
    const p = Physics.getPlayerRect();
    drawRect(p.x, p.y, p.w, p.h, Config.COLORS.PLAYER);
    // Eyes
    drawRect(p.x + 7, p.y + 8, 8, 8, Config.COLORS.PLAYER_EYE);
  }

  function drawObstacles() {
    for (const obs of GameState.obstacles) {
      drawRect(obs.x, obs.y, obs.w, obs.h, Config.COLORS.OBSTACLE);

      // Spike detail on top
      const spikeCount = Math.floor(obs.w / 10);
      for (let i = 0; i < spikeCount; i++) {
        const sx = obs.x + (i * obs.w) / spikeCount + 4;
        drawRect(sx, obs.y - 4, 2, 4, Config.COLORS.OBSTACLE_SPIKE);
      }
    }
  }

  function render() {
    drawBackground();
    drawObstacles();
    drawPlayer();
  }

  return {
    init,
    resizeCanvas,
    render
  };
})();
