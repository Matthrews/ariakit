---
path: /docs/dialog
redirect_from:
  - /components/overlay
  - /components/overlay/overlaycontainer
  - /components/overlay/overlayhide
  - /components/overlay/overlayshow
  - /components/overlay/overlaytoggle
  - /components/backdrop
---

# Dialog (Modal)

`Dialog` follows the [WAI-ARIA Dialog (Modal) Pattern](https://www.w3.org/TR/wai-aria-practices/#dialog_modal). It's rendered within a [Portal](/docs/portal) by default, but it also has a [non-modal state](#non-modal-dialogs), which doesn't use portals.

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started).

## Usage

```jsx
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

function Example() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog aria-label="Welcome" {...dialog}>
        Welcome to Reakit!
      </Dialog>
    </>
  );
}
```

### Backdrop

```jsx
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from "reakit/Dialog";

function Example() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <DialogBackdrop {...dialog} />
      <Dialog aria-label="Welcome" {...dialog}>
        Welcome to Reakit!
      </Dialog>
    </>
  );
}
```

### Non-modal dialogs

There's still no consensus on how non-modal dialogs should behave. Some discussions like [w3c/aria-practices#599](https://github.com/w3c/aria-practices/issues/599) and [this deleted section about non-modal dialogs](https://rawgit.com/w3c/aria-practices/master/aria-practices-DeletedSectionsArchive.html#dialog_nonmodal) indicate that it's pretty much a dialog that provides a keyboard mechanism to move focus outside it while leaving it open.

Reakit doesn't strictly follow that. When `Dialog` has `modal` set to `false`:

- It doesn't render within a Portal.
- Focus is not trapped within the dialog.
- Body scroll isn't disabled.

There's a few use cases for these conditions, like [Popover](/docs/popover) and [Menu](/docs/menu).

```jsx
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

function Example() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <Dialog
        aria-label="Welcome"
        modal={false}
        style={{ position: "static", transform: "none" }}
        {...dialog}
      >
        Focus is not trapped within me.
      </Dialog>
    </>
  );
}
```

If desirable, a non-modal dialog can also be rendered within a [Portal](/docs/portal). The `hideOnClickOutside` prop can be set to `false` so clicking and focusing outside doesn't close it.

```jsx
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Button } from "reakit/Button";
import { Portal } from "reakit/Portal";

function Example() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Open chat</DialogDisclosure>
      <Portal>
        <Dialog
          aria-label="Welcome"
          modal={false}
          hideOnClickOutside={false}
          style={{
            transform: "none",
            top: "auto",
            left: "auto",
            bottom: 0,
            right: 16,
            width: 200,
            height: 300
          }}
          {...dialog}
        >
          <Button onClick={dialog.hide}>Close chat</Button>
        </Dialog>
      </Portal>
    </>
  );
}
```

### Nested dialogs

Reakit supports multiple nested modal dialogs and non-modal dialogs. <kbd>ESC</kbd> closes only the currently focused one. If the closed dialog has other open dialogs within, they will all be closed.

```jsx
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Button } from "reakit/Button";

function Example(props) {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>
        {props.modal === false ? "Open non-modal dialog" : "Open dialog"}
      </DialogDisclosure>
      <Dialog aria-label="Test" {...dialog} {...props}>
        {props.modal === false ? (
          <>
            Tab me.
            <Button onClick={dialog.hide}>Close non-modal dialog</Button>
          </>
        ) : (
          <>
            Press <kbd>ESC</kbd> to close me.
            <Example modal={false} />
          </>
        )}
      </Dialog>
    </>
  );
}
```

### Alert dialogs

A dialog can be turned into an alert dialog by just setting its `role` prop to `alertdialog`. See [WAI-ARIA Alert and Message Dialogs Pattern](https://www.w3.org/TR/wai-aria-practices/#alertdialog).

<!-- eslint-disable no-alert -->

```jsx
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Button } from "reakit/Button";

function Example() {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>Discard</DialogDisclosure>
      <Dialog role="alertdialog" aria-label="Confirm discard" {...dialog}>
        <p>Are you sure you want to discard it?</p>
        <div style={{ display: "grid", gridGap: 16, gridAutoFlow: "column" }}>
          <Button onClick={dialog.hide}>Cancel</Button>
          <Button
            onClick={() => {
              alert("Discarded");
              dialog.hide();
            }}
          >
            Discard
          </Button>
        </div>
      </Dialog>
    </>
  );
}
```

## Accessibility

- `Dialog` has role `dialog`.
- `Dialog` has `aria-modal` set to `true` unless the `modal` prop is set to `false`.
- When `Dialog` opens, focus moves to an element inside the dialog.
- Focus is trapped within the modal `Dialog`.
- <kbd>ESC</kbd> closes `Dialog` unless `hideOnEsc` is set to `false`.
- Clicking outside the `Dialog` closes it unless `hideOnClickOutside` is set to `false`.
- Focusing outside the non-modal `Dialog` closes it unless `hideOnClickOutside` is set to `false`.
- When `Dialog` closes, focus returns to its disclosure unless the closing action has been triggered by a click/focus on a tabbable element outside the `Dialog`. In this case, `Dialog` closes and this element remains with focus.
- `DialogDisclosure` extends the accessibility features of [HiddenDisclosure](/docs/hidden#accessibility).

Learn more in [Accessibility](/docs/accessibility).

## Composition

- `Dialog` uses [Hidden](/docs/hidden), and is used by [Popover](/docs/popover) and its derivatives.
- `DialogDisclosure` uses [HiddenDisclosure](/docs/hidden), and is used by [PopoverDisclosure](/docs/popover) and its derivatives.
- `DialogBackdrop` uses [Hidden](/docs/hidden), and is used by [PopoverBackdrop](/docs/popover) and its derivatives.

Learn more in [Composition](/docs/composition#props-hooks).

## Props

<!-- Automatically generated -->

### `useDialogState`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>visible</code>&nbsp;</strong> | <code>boolean</code> | Whether it's visible or not. |

### `Dialog`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>visible</code>&nbsp;</strong> | <code>boolean</code> | Whether it's visible or not. |
| <strong><code>hide</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Changes the `visible` state to `false` |
| <strong><code>modal</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | Toggles Dialog's `modal` state.<br>  - Non-modal: `preventBodyScroll` doesn't work and focus is free.<br>  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within the dialog and the dialog is rendered within a `Portal` by default. |
| <strong><code>hideOnEsc</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | When enabled, user can hide the dialog by pressing `Escape`. |
| <strong><code>hideOnClickOutside</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | When enabled, user can hide the dialog by clicking outside it. |
| <strong><code>preventBodyScroll</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | When enabled, user can't scroll on body when the dialog is visible. This option doesn't work if the dialog isn't modal. |
| <strong><code>unstable_initialFocusRef</code>&nbsp;⚠️</strong> | <code title="RefObject&#60;HTMLElement&#62; &#124; undefined">RefObject&#60;HTMLElement&#62;&nbsp;&#124;&nbsp;un...</code> | The element that will be focused when the dialog shows. When not set, the first tabbable element within the dialog will be used. `autoFocusOnShow` disables it. |
| <strong><code>unstable_finalFocusRef</code>&nbsp;⚠️</strong> | <code title="RefObject&#60;HTMLElement&#62; &#124; undefined">RefObject&#60;HTMLElement&#62;&nbsp;&#124;&nbsp;un...</code> | The element that will be focused when the dialog hides. When not set, the disclosure component will be used. `autoFocusOnHide` disables it. |
| <strong><code>unstable_portal</code>&nbsp;⚠️</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | Whether or not the dialog should be rendered within `Portal`. It's `true` by default if `modal` is `true`. |

### `DialogBackdrop`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>visible</code>&nbsp;</strong> | <code>boolean</code> | Whether it's visible or not. |

### `DialogDisclosure`

| Name | Type | Description |
|------|------|-------------|
| <strong><code>disabled</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | Same as the HTML attribute. |
| <strong><code>focusable</code>&nbsp;</strong> | <code>boolean&nbsp;&#124;&nbsp;undefined</code> | When an element is `disabled`, it may still be `focusable`. It works similarly to `readOnly` on form elements. In this case, only `aria-disabled` will be set. |
| <strong><code>visible</code>&nbsp;</strong> | <code>boolean</code> | Whether it's visible or not. |
| <strong><code>toggle</code>&nbsp;</strong> | <code>()&nbsp;=&#62;&nbsp;void</code> | Toggles the `visible` state |