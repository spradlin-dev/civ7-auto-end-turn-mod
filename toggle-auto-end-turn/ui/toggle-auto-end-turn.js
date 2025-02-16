
import { InputEngineEvent } from '/core/ui/input/input-support.js';
import ContextManager from "/core/ui/context-manager/context-manager.js";
import { DisplayQueueManager } from '/core/ui/context-manager/display-queue-manager.js';

// troubleshooting attempt
console.log('AET loading!');

function handleInput(input) {
    console.log('AET handling input', input.detail.status, input.detail.name)

    // just do something (show pause menu)
    if (ContextManager.canOpenPauseMenu()) {
        if (!ContextManager.getTarget("screen-pause-menu")) {
            //Only push pause menu if not already open
            DisplayQueueManager.suspend();
            ContextManager.push("screen-pause-menu", { singleton: true, createMouseGuard: true });
            return false;
        } else {
            return true;
        }
    }
}

window.addEventListener('engine-input', handleInput);

// Original attempt below this line
class HotkeyManagerSingleton {
    constructor() {
        console.log('AETHotkeyManager Running!!!!');
    };

    /**
     * Singleton accessor
     */
    static getInstance() {
        console.log('making instance!  AETHotkeyManager');
        if (!HotkeyManagerSingleton.Instance) {
            HotkeyManagerSingleton.Instance = new HotkeyManagerSingleton();
        }
        return HotkeyManagerSingleton.Instance;
    }

    /**
     * Handles touch inputs
     * @param {InputEngineEvent} inputEvent An input event
     * @returns true if the input is still "live" and not yet cancelled.
     * @implements InputEngineEvent
     */
    handleInput(inputEvent) {
        const status = inputEvent.detail.status;
        if (status == InputActionStatuses.FINISH) {

            console.log('AETHotkeyManager handleInput!!!!', inputEvent.detail.name);

            const name = inputEvent.detail.name;
            switch (name) {
                case "md-toggle-auto-end-turn":
                    this.toggleAutoEndTurn();
                    return false;
            }
        }

        return true;
    }

    /**
     * Hotkey manager doesn't handle navigation input events
     */
    toggleAutoEndTurn() {
        Configuration.getUser().setIsAutoEndTurn(!Configuration.getUser().isAutoEndTurn);
    }

    /**
     * Hotkey manager doesn't handle navigation input events
     */
    handleNavigation() {
        return true; // It means the input is still "live" and not yet cancelled
    }
}

const AETHotkeyManager = HotkeyManagerSingleton.getInstance();

ContextManager.registerEngineInputHandler(AETHotkeyManager);

console.log('AET loaded context manager thing!', AETHotkeyManager);

