import { Tooltip } from '@modules/common';

export const TooltipBuilder = ({ note, position, children }) => {
    return (
        <Tooltip text={note} position={position || "top"}>
            {props => {
                children.props = {
                    ...props,
                    ...children.props
                };
                return children;
            }}
        </Tooltip>
    )
}