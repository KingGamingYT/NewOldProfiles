import { Scroller } from './common/scroller';
import { WidgetBuilder } from '../widgets/builder';

export function BoardTab({ displayProfile }) {
    const widgets = displayProfile.widgets;

    if (!widgets.length) return;
    return (
        <Scroller type="INFO">
            {[
                widgets.map(widget => <WidgetBuilder widget={widget} />)
            ]}
        </Scroller>
    )
}