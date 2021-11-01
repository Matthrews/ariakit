import { useCallback, useEffect, useMemo } from "react";
import { useControlledState, useLiveRef } from "ariakit-utils/hooks";
import { useStorePublisher } from "ariakit-utils/store";
import { SetState } from "ariakit-utils/types";
import {
  CollectionState,
  useCollectionState,
} from "../collection/collection-state";
import {
  CompositeState,
  CompositeStateProps,
  useCompositeState,
} from "../composite/composite-state";

type Item = CompositeState["items"][number] & {
  dimmed?: boolean;
  panelId?: string | null;
};

type Panel = CollectionState["items"][number] & {
  id: string;
  tabId?: string | null;
};

/**
 * Provides state for the `Tab` components.
 * @example
 * ```jsx
 * const tab = useTabState();
 * <TabList state={tab}>
 *   <Tab>Tab 1</Tab>
 *   <Tab>Tab 2</Tab>
 * </TabList>
 * <TabPanel state={tab}>Panel 1</TabPanel>
 * <TabPanel state={tab}>Panel 2</TabPanel>
 * ```
 */
export function useTabState({
  orientation = "horizontal",
  focusLoop = true,
  ...props
}: TabStateProps = {}): TabState {
  const [visibleId, setVisibleId] = useControlledState(
    props.defaultVisibleId,
    props.visibleId,
    props.setVisibleId
  );
  const composite = useCompositeState({ orientation, focusLoop, ...props });
  const panels = useCollectionState<Panel>();
  const activeIdRef = useLiveRef(composite.activeId);

  // Keep activeId in sync with visibleId.
  useEffect(() => {
    if (visibleId === activeIdRef.current) return;
    composite.setActiveId(visibleId);
  }, [visibleId, composite.setActiveId]);

  // Automatically set visibleId if it's undefined.
  useEffect(() => {
    if (visibleId !== undefined) return;
    // First, we try to set visibleId based on the current active tab.
    const activeId = activeIdRef.current;
    const activeTab = composite.items.find((item) => item.id === activeId);
    if (activeTab && !activeTab.dimmed) {
      setVisibleId(activeId);
    }
    // If there's no active tab or the active tab is dimmed, we get the first
    // enabled tab instead.
    else {
      const firstEnabledTab = composite.items.find((item) => !item.dimmed);
      setVisibleId(firstEnabledTab?.id);
    }
  }, [visibleId, composite.items, setVisibleId]);

  // Keep tabs panelIds in sync with the current panels.
  useEffect(() => {
    // Initially, panels will be empty, so we wait until they are populated.
    if (!panels.items.length) return;
    composite.setItems((prevTabs) => {
      const hasOrphanTabs = prevTabs.some((tab) => !tab.panelId);
      // If all tabs have a panelId, we don't need to do anything.
      if (!hasOrphanTabs) return prevTabs;
      return prevTabs.map((tab, i) => {
        // If the tab has a panelId, we don't need to do anything.
        if (tab.panelId) return tab;
        // If there's already a panel with tabId pointing to this tab, use it.
        let panel = panels.items.find((item) => item.tabId === tab.id);
        // Otherwise, get the panel based on the index.
        panel = panel || panels.items[i];
        return { ...tab, panelId: panel?.id };
      });
    });
  }, [panels.items, composite.setItems]);

  // Keep panels tabIds in sync with the current tabs.
  useEffect(() => {
    if (!composite.items.length) return;
    panels.setItems((prevPanels) => {
      const hasOrphanPanels = prevPanels.some((panel) => !panel.tabId);
      if (!hasOrphanPanels) return prevPanels;
      return prevPanels.map((panel, i) => {
        if (panel.tabId) return panel;
        let tab = composite.items.find((item) => item.panelId === panel.id);
        tab = tab || composite.items[i];
        return { ...panel, tabId: tab?.id };
      });
    });
  }, [composite.items, panels.setItems]);

  const show: TabState["show"] = useCallback(
    (id) => {
      composite.move(id);
      setVisibleId(id);
    },
    [composite.move, setVisibleId]
  );

  const state = useMemo(
    () => ({
      ...composite,
      visibleId,
      setVisibleId,
      show,
      panels,
    }),
    [composite, visibleId, setVisibleId, show, panels]
  );

  return useStorePublisher(state);
}

export type TabState = CompositeState<Item> & {
  /**
   * The id of the tab whose panel is currently visible.
   */
  visibleId: TabState["activeId"];
  /**
   * Sets `visibleId`.
   */
  setVisibleId: SetState<TabState["visibleId"]>;
  /**
   * Shows the tab panel for the tab with the given id.
   */
  show: TabState["move"];
  /**
   * A collection state containing the tab panels.
   */
  panels: CollectionState<Panel>;
};

export type TabStateProps = CompositeStateProps<Item> &
  Partial<Pick<TabState, "visibleId" | "setVisibleId">> & {
    /**
     * The id of the tab whose panel should be initially visible.
     * @example
     * ```jsx
     * const tab = useTabState({ defaultVisibleId: "tab-1" });
     * <TabList state={tab}>
     *   <Tab id="tab-1">Tab 1</Tab>
     * </TabList>
     * <TabPanel state={tab}>Panel 1</TabPanel>
     * ```
     */
    defaultVisibleId?: TabState["visibleId"];
  };