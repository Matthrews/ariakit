---
path: /docs/rover
---

# Rover

`Rover` is an abstract component that implements the [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex) method to manage focus between items (rovers).

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started).

## Usage

```jsx
import { useRoverState, Rover } from "reakit/Rover";
import { Group } from "reakit/Group";
import { Button } from "reakit/Button";

function Example() {
  const roving = useRoverState();
  return (
    <Group>
      <Rover as={Button} {...roving}>
        Button 1
      </Rover>
      <Rover as={Button} {...roving} disabled>
        Button 2
      </Rover>
      <Rover as={Button} {...roving} disabled focusable>
        Button 3
      </Rover>
      <Rover as={Button} {...roving}>
        Button 4
      </Rover>
      <Rover as={Button} {...roving}>
        Button 5
      </Rover>
    </Group>
  );
}
```

## Accessibility

- `Rover` has `tabindex` set to `0` if it's the current element. Otherwise `tabindex` is set to `-1`.
- Pressing <kbd>↑</kbd> moves focus to the previous `Rover` if `orientation` is `vertical` or not defined.
- Pressing <kbd>↓</kbd> moves focus to the next `Rover` if `orientation` is `vertical` or not defined.
- Pressing <kbd>→</kbd> moves focus to the next `Rover` if `orientation` is `horizontal` or not defined.
- Pressing <kbd>←</kbd> moves focus to the previous `Rover` if `orientation` is `horizontal` or not defined.
- Pressing <kbd>Home<kbd> or <kbd>PageUp</kbd> moves focus to the first `Rover`.
- Pressing <kbd>End<kbd> or <kbd>PageDown</kbd> moves focus to the last `Rover`.

Learn more in [Accessibility](/docs/accessibility).

## Composition

- `Rover` uses [Tabbable](/docs/tabbable), and is used by [MenuItem](/docs/menu), [Radio](/docs/radio), [Tab](/docs/tab) and [ToolbarItem](/docs/toolbar).

Learn more in [Composition](/docs/composition#props-hooks).

## Props

<!-- Automatically generated -->

### `useRoverState`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>orientation</code>&nbsp;</strong> | <code title="&#34;horizontal&#34; &#124; &#34;vertical&#34; &#124; undefined">&#34;horizontal&#34;&nbsp;&#124;&nbsp;&#34;vertical&#34;&nbsp;&#124;...</code> | Defines the orientation of the rover list. |
| <strong><code>currentId</code>&nbsp;</strong> | <code>string&nbsp;&#124;&nbsp;null</code> | The current focused element ID. |
| <strong><code>loop</code>&nbsp;</strong> | <code>boolean</code> | If enabled:<br>  - Jumps to the first item when moving next from the last item.<br>  - Jumps to the last item when moving previous from the first item. |

### `Rover`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>disabled</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | Same as the HTML attribute. |
| <strong><code>focusable</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | When an element is `disabled`, it may still be `focusable`. It works similarly to `readOnly` on form elements. In this case, only `aria-disabled` will be set. |
| <strong><code>orientation</code>&nbsp;</strong> | <code title="&#34;horizontal&#34; &#124; &#34;vertical&#34; &#124; undefined">&#34;horizontal&#34;&nbsp;&#124;&nbsp;&#34;vertical&#34;&nbsp;&#124;...</code> | Defines the orientation of the rover list. |
| <strong><code>currentId</code>&nbsp;</strong> | <code>string&nbsp;&#124;&nbsp;null</code> | The current focused element ID. |
| <strong><code>stops</code>&nbsp;</strong> | <code>Stop[]</code> | A list of element refs and IDs of the roving items. |
| <strong><code>register</code>&nbsp;</strong> | <code title="(id: string, ref: RefObject&#60;HTMLElement&#62;) =&#62; void">(id:&nbsp;string,&nbsp;ref:&nbsp;RefObject...</code> | Registers the element ID and ref in the roving tab index list. |
| <strong><code>unregister</code>&nbsp;</strong> | <code>(id:&nbsp;string)&nbsp;=&#62;&nbsp;void</code> | Unregisters the roving item. |
| <strong><code>move</code>&nbsp;</strong> | <code>(id:&nbsp;string&nbsp;&#124;&nbsp;null)&nbsp;=&#62;&nbsp;void</code> | Moves focus to a given element ID. |
| <strong><code>next</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Moves focus to the next element. |
| <strong><code>previous</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Moves focus to the previous element. |
| <strong><code>first</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Moves focus to the first element. |
| <strong><code>last</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Moves focus to the last element. |
| <strong><code>stopId</code>&nbsp;</strong> | <code>string&nbsp;&#124;&nbsp;undefined</code> | Element ID. |