export const NAVIGATE = 'NAVIGATE';
export function navigateAction(link, state) {
    var action = {
        type: NAVIGATE,
        link: link,
        state: state
    };
    /** TODO: Possible an anti-pattern, check async actions how-to*/
    oe_navigate_to(action.link, action.state);
    return action;
}
