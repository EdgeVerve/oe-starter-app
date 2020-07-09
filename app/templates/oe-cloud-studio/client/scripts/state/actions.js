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

export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export function updateUserInfo(userInfo){
    var action = {
        type: UPDATE_USERINFO,
        userInfo: userInfo
    };
    return action;
}