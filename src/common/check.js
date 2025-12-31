export function activityCheck({ activities }) {
    let pass = {
        playing: 0,
        xbox: 0,
        playstation: 0,
        streaming: 0,
        listening: 0,
        spotify: 0,
        watching: 0,
        competing: 0,
        custom: 0
    };
    for (let i = 0; i < activities.length; i++) {
        if (!activities[i]) {
            return;
        }
        if (activities[i].type == 4) {
            pass.custom = 1;
        }
        if (activities[i].type == 0) {
            pass.playing = 1;
        }
        if (activities[i]?.platform?.includes("xbox")) {
            pass.xbox = 1;
        }
        if (activities[i]?.platform?.includes("playstation") || activities[i]?.platform?.includes("ps5")) {
            pass.playstation = 1;
        }
        if (activities[i].type == 1) {
            pass.streaming = 1;
        }
        if (activities[i].type == 2) {
            pass.listening = 1;
        }
        if (activities[i].name.includes("Spotify")) {
            pass.spotify = 1;
        }
        if (activities[i].type == 3) {
            pass.watching = 1;
        }
        if (activities[i].type == 5) {
            pass.competing = 1;
        }
    }
    return pass;
}