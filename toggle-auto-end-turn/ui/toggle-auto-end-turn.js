
function handleInput(event) {
    if (event.detail.name === 'md-toggle-auto-end-turn' && event.detail.status === InputActionStatuses.FINISH) {
        console.log(`AET: toggle-auto-end-turn: Toggling Auto End Turn from ${Configuration.getUser().isAutoEndTurn} to ${!Configuration.getUser().isAutoEndTurn}`);
        Configuration.getUser().setValue('AutoEndTurn', Configuration.getUser().isAutoEndTurn ? 0 : 1);
        return false;
    }
    return true;
}

window.addEventListener('engine-input', handleInput);


