const scrollContainer = document.getElementById('scroll-container');
const canContainer = document.getElementById('can-container');
const cokeModel = document.getElementById('coke-model');

let currentScroll = 0;
let targetScroll = 0;

scrollContainer.addEventListener('scroll', () => {
  targetScroll = scrollContainer.scrollTop;
});

function animate() {
  currentScroll += (targetScroll - currentScroll) * 0.08;

  const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

  if (maxScroll > 0) {
    const scrollFraction = currentScroll / maxScroll;

    /* POSITION: Right → Left */
    const leftPosition = 75 - (50 * scrollFraction);
    canContainer.style.left = `${leftPosition}%`;

    /* TILT + SCALE */
    const tilt = Math.sin(scrollFraction * Math.PI) * 15;
    const scale = 1 + Math.sin(scrollFraction * Math.PI) * 0.1;

    canContainer.style.transform =
      `translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`;

    /* 3D ROTATION */
    const rotation = scrollFraction * 360;
    cokeModel.setAttribute(
      'camera-orbit',
      `${rotation}deg 90deg 1.5m`
    );
  }

  requestAnimationFrame(animate);
}

animate();
