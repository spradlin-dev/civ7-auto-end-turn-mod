import * as ekm from "/core/ui/options/editors/editor-keyboard-mapping.js";

try {
  const hasLibRegisterKeybindingMod = Modding.getInstalledMods().some(mod => mod.id === 'lib-register-keybinding');

  if (hasLibRegisterKeybindingMod && typeof ekm.registerKey !== 'undefined') {
    ekm.registerKey('md-toggle-auto-end-turn');
    console.log('AET: Registered key-binding in options menu.');
  } else {
    console.error('AET: Could not register key-binding in options menu.  Did you remember to include the lib-register-keybinding mod?');
  }
} catch (e) {
  console.error(e);
}
