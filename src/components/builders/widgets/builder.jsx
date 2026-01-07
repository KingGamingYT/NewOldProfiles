import { useState, useEffect } from 'react';
import { locale } from '@common/locale';
import { RestAPI, Dispatcher, Endpoints } from '@modules/common';
import { ApplicationStore, useStateFromStores } from '@modules/stores'; 
import { BoardBuilder } from '@components/builders/tabs/common/infoSections';

function getWidgetIntl(widget) {
    let header;
    if (widget.type.includes("favorite_games")) header = locale.Strings.FAVORITE_GAME();
    else if (widget.type.includes("played_games")) header = locale.Strings.GAMES_I_LIKE();
    else if (widget.type.includes("want_to_play_games")) header = locale.Strings.WANT_TO_PLAY();
    else if (widget.type.includes("current_games")) header = locale.Strings.GAMES_IN_ROTATION();

    return header;
}

export function WidgetBuilder({ widget }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const gameIds = Array.isArray(widget.games) ? widget.games.map(game => game.applicationId) : [];
    const games = useStateFromStores([ApplicationStore], () => gameIds.map(id => ApplicationStore.getApplication(id)));
    const header = getWidgetIntl(widget);

    useEffect(() => {
        (async () => {
            if (isLoaded) return;
            const urlSearch = new URLSearchParams(gameIds.map(x => ["application_ids", x])).toString();
            const applicationPublic = await RestAPI.get({ url: Endpoints.ANM.APPLICATIONS_PUBLIC, query: urlSearch });

            const supplementalData = await RestAPI.get({ url: Endpoints.ANM.APPLICATIONS_GAMES_SUPPLEMENTAL, query: urlSearch });

            Dispatcher.dispatch({
                type: "APPLICATIONS_FETCH_SUCCESS",
                applications: applicationPublic.body,
                unknownApplicationIds: []
            })

            Dispatcher.dispatch({
                type: "DETECTABLE_GAME_SUPPLEMENTAL_FETCH_SUCCESS",
                applicationIds: gameIds,
                supplementalGameData: supplementalData.body.supplemental_game_data
            })

            setIsLoaded(true);
        })()
    }, [gameIds]);

    return <BoardBuilder widget={widget} header={header} games={games} />
}