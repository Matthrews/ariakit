import * as React from "react";
import { useLiveRef } from "../../__utils/useLiveRef";
import { isFocusTrap } from "./useFocusTrap";

export function useEventListenerOutside<T extends keyof DocumentEventMap>(
  targetRef: React.RefObject<HTMLElement>,
  disclosureRef: React.RefObject<HTMLElement>,
  nestedDialogs: Array<React.RefObject<HTMLElement>>,
  event: T,
  listener?: (e: DocumentEventMap[T]) => void,
  shouldListen?: boolean
) {
  const listenerRef = useLiveRef(listener);

  React.useEffect(() => {
    if (!shouldListen) return undefined;

    const handleEvent = (e: MouseEvent) => {
      if (!listenerRef.current) return;

      const element = targetRef.current;
      const disclosure = disclosureRef.current;
      const target = e.target as Element;

      // Click inside
      if (!element || element.contains(target)) return;

      // Click on disclosure
      if (disclosure && disclosure.contains(target)) return;

      // Click inside a nested dialog or focus trap
      if (
        isFocusTrap(target) ||
        nestedDialogs.find(dialog =>
          Boolean(dialog.current && dialog.current.contains(target))
        )
      ) {
        return;
      }

      listenerRef.current(e);
    };

    document.addEventListener(event, handleEvent, true);

    return () => {
      document.removeEventListener(event, handleEvent, true);
    };
  }, [targetRef, event, shouldListen, nestedDialogs]);
}