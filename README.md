# Neon Dash - WebGL Game

A Geometry Dash-inspired game built with JavaScript and WebGL.

## Features

- **WebGL Rendering**: High-performance 2D graphics using WebGL
- **Modular Architecture**: Cleanly separated concerns with multiple JS modules
- **Inline CSS**: All styles embedded for easy deployment
- **Separate Game Window**: Launches in a dedicated browser window
- **Score Tracking**: Persistent high score using localStorage
- **Responsive Controls**: Keyboard (Space/Arrow Up/W) and mouse/touch support

## File Structure

```
.
├── index.html          # Launcher page
├── popup.html          # Game window
├── js/
│   ├── config.js       # Configuration and game state
│   ├── shader.js       # WebGL shader program
│   ├── renderer.js     # WebGL rendering engine
│   ├── physics.js      # Physics and collision detection
│   ├── obstacle.js     # Obstacle management
│   ├── player.js       # Player controls
│   ├── input.js        # Input handling
│   └── game.js         # Main game loop
└── README.md           # This file
```

## How to Run

### Option 1: Local Web Server

```bash
python3 -m http.server 8000
# Then open http://localhost:8000/index.html
```

### Option 2: Node.js Server

```bash
npm install -g http-server
http-server
# Then open http://localhost:8080/index.html
```

### Option 3: VS Code Live Server

Use the Live Server extension and right-click `index.html` → "Open with Live Server"

## Gameplay

- **Jump**: Press SPACE, Arrow Up, W, or click/tap
- **Objective**: Avoid obstacles and accumulate the highest score
- **Restart**: After game over, press SPACE or click to restart
- **Score**: +1 point for each obstacle successfully passed

## Customization

Edit `js/config.js` to modify:

- Game speed and difficulty
- Jump height and gravity
- Obstacle spawn rates and sizes
- Colors and visual appearance

## Technologies Used

- **WebGL**: Low-level graphics API for rendering
- **Vanilla JavaScript**: No external dependencies
- **HTML5 Canvas**: Drawing surface for WebGL
- **localStorage**: Persistent score storage

## Browser Support

- Chrome/Chromium 9+
- Firefox 4+
- Safari 5.1+
- Edge 12+

(Any modern browser with WebGL support)

## License

MIT License - Feel free to modify and distribute!
