import { mergeProps } from "../utils/mergeProps";
import { unstable_createComponent } from "../utils/createComponent";
import { unstable_useOptions } from "../system/useOptions";
import { unstable_useProps } from "../system/useProps";
import { BoxOptions, BoxProps, useBox } from "../Box/Box";
import { Keys } from "../__utils/types";
import { useMenuState, MenuStateReturn } from "./MenuState";

export type MenuGroupOptions = BoxOptions;

export type MenuGroupProps = BoxProps;

export function useMenuGroup(
  options: MenuGroupOptions,
  htmlProps: MenuGroupProps = {}
) {
  options = unstable_useOptions("MenuGroup", options, htmlProps);
  htmlProps = mergeProps({ role: "group" } as typeof htmlProps, htmlProps);
  htmlProps = unstable_useProps("MenuGroup", options, htmlProps);
  htmlProps = useBox(options, htmlProps);
  return htmlProps;
}

const keys: Keys<MenuStateReturn & MenuGroupOptions> = [
  ...useBox.__keys,
  ...useMenuState.__keys
];

useMenuGroup.__keys = keys;

export const MenuGroup = unstable_createComponent({
  as: "div",
  useHook: useMenuGroup
});