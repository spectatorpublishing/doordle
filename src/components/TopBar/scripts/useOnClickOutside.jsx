import {useEffect} from 'react';

/* 
  This hook allows you to detect clicks outside of a specified element. 
  In the example below we use it to close a modal when any element outside of the modal is clicked. 
  By abstracting this logic out into a hook we can easily use it across all
  of our components that need this kind of functionality (dropdown menus, tooltips, etc).
*/

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler]
  );
}