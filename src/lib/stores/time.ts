import { readable } from 'svelte/store';

export const currentTime = readable(new Date(), (set) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const tick = () => {
    set(new Date());
    const msToNextSecond = 1000 - new Date().getMilliseconds();
    timeoutId = setTimeout(tick, msToNextSecond);
  };

  tick();

  return () => clearTimeout(timeoutId);
});