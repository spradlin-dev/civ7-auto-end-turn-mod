import { Audio } from '/core/ui/audio-base/audio-support.js';

console.log('AET: Loaded toggle-auto-end-turn mod.');

function handleInput(event) {
    if (event.detail.name === 'md-toggle-auto-end-turn' && event.detail.status === InputActionStatuses.FINISH) {
        console.log(`AET: toggle-auto-end-turn: Toggling Auto End Turn from ${Configuration.getUser().isAutoEndTurn} to ${!Configuration.getUser().isAutoEndTurn}`);
        Configuration.getUser().setValue('AutoEndTurn', Configuration.getUser().isAutoEndTurn ? 0 : 1);
        Audio.playSound("data-audio-choose-civ-activate", "new-civ-select");
        return false;
    }
}

window.addEventListener('engine-input', handleInput);


