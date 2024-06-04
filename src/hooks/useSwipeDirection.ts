import { useEffect, useState } from 'react';

const useSwipeDirection = () => {
  let calender: HTMLDivElement | null = null;
  const [direction, setDirection] = useState('');
  let initialX: number | null = null;

  if (typeof document !== 'undefined') {
    calender = document.querySelector('#calender');
  }

  function initTouch(e: TouchEvent) {
    initialX = e.changedTouches[0].pageX;
    console.log('initialX', initialX);
  }

  function initClick(e: MouseEvent) {
    initialX = e.pageX;
    console.log('initialX', initialX);
  }

  function swipeTouchDirection(e: TouchEvent) {
    if (initialX !== null) {
      const currentX = e.changedTouches[0].pageX;
      console.log('currentX', currentX);

      const diffX = initialX - currentX;
      console.log(diffX);
      initialX = null;

      if (diffX < 0) {
        setDirection('right');
      } else if (diffX > 0) {
        setDirection('left');
      }
    }
  }

  function swipeMouseDirection(e: MouseEvent) {
    if (initialX !== null) {
      const currentX = e.pageX;
      console.log('currentX', currentX);

      let diffX = initialX - currentX;
      console.log(diffX);
      initialX = null;

      if (diffX < 0) {
        setDirection('right');
      } else if (diffX > 0) {
        setDirection('left');
      }
    }
  }

  useEffect(() => {
    calender?.addEventListener('touchstart', initTouch);
    calender?.addEventListener('touchend', swipeTouchDirection);
    calender?.addEventListener('mousedown', initClick);
    calender?.addEventListener('mouseup', swipeMouseDirection);
    return () => {
      calender?.removeEventListener('touchstart', initTouch);
      calender?.removeEventListener('touchend', swipeTouchDirection);
      calender?.removeEventListener('mousedown', initClick);
      calender?.removeEventListener('mouseup', swipeMouseDirection);
    };
  }, [initTouch, swipeTouchDirection, initClick, swipeMouseDirection]);

  return direction;
};

export default useSwipeDirection;
