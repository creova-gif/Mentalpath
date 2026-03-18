import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function SuccessAnimation({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A7C6F', '#6B9D8F', '#8FB5A9', '#F5F1E8']
      });
    }
  }, [trigger]);

  return null;
}

export function fireSuccessConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#4A7C6F', '#6B9D8F', '#8FB5A9', '#F5F1E8']
  });
}

export function fireCheckmarkAnimation() {
  // Smaller, more subtle success feedback
  confetti({
    particleCount: 30,
    spread: 40,
    origin: { y: 0.6 },
    colors: ['#4A7C6F', '#6B9D8F'],
    ticks: 50
  });
}
