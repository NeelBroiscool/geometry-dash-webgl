/**
 * Input Management
 */

const InputManager = (() => {
  function init() {
    document.addEventListener('keydown', (event) => {
      if (
        event.code === 'Space' ||
        event.code === 'ArrowUp' ||
        event.code === 'KeyW'
      ) {
        event.preventDefault();
        Player.jump();
      }
    });

    document.addEventListener('pointerdown', () => {
      Player.jump();
    });
  }

  return {
    init
  };
})();
