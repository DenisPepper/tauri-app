const MAX_ENEMY_COUNT = 100;
const MIN_ENEMY_COUNT = 20;
const enemyCountInput = document.querySelector('.enemy-count-input');
localStorage.setItem('enemyCount', MIN_ENEMY_COUNT);

if (enemyCountInput) {
  enemyCountInput.addEventListener('change', () => {
    if (enemyCountInput.value > MAX_ENEMY_COUNT) {
      enemyCountInput.value = MAX_ENEMY_COUNT;
    } else if (enemyCountInput.value < MIN_ENEMY_COUNT) {
      enemyCountInput.value = MIN_ENEMY_COUNT;
    }
    localStorage.setItem('enemyCount', enemyCountInput.value);
  });
}
