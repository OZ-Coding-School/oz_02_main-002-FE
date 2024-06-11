import { useEffect, useState } from 'react';

export default function useSwipeDirection() {
  let calendar: HTMLDivElement | null = null;
  const [direction, setDirection] = useState('');
  let initialX: number | null = null;

  if (typeof document !== 'undefined') {
    calendar = document.querySelector('#calendar');
  }

  function initTouch(e: TouchEvent) {
    initialX = e.changedTouches[0].pageX;
  }

  function initClick(e: MouseEvent) {
    initialX = e.pageX;
  }

  function swipeTouchDirection(e: TouchEvent) {
    if (initialX !== null) {
      const currentX = e.changedTouches[0].pageX;

      const diffX = initialX - currentX;
      initialX = null;

      if (diffX < -20) {
        setDirection('right');
      } else if (diffX > 20) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }

  function swipeMouseDirection(e: MouseEvent) {
    if (initialX !== null) {
      const currentX = e.pageX;

      let diffX = initialX - currentX;
      initialX = null;

      if (diffX < -20) {
        setDirection('right');
      } else if (diffX > 20) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }

  useEffect(() => {
    calendar?.addEventListener('touchstart', initTouch);
    calendar?.addEventListener('touchend', swipeTouchDirection);
    calendar?.addEventListener('mousedown', initClick);
    calendar?.addEventListener('mouseup', swipeMouseDirection);
    return () => {
      calendar?.removeEventListener('touchstart', initTouch);
      calendar?.removeEventListener('touchend', swipeTouchDirection);
      calendar?.removeEventListener('mousedown', initClick);
      calendar?.removeEventListener('mouseup', swipeMouseDirection);
    };
  }, [initTouch, swipeTouchDirection, initClick, swipeMouseDirection]);

  return { direction, setDirection };
}
