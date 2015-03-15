/**
 * @fileOverview Shared Worker to periodically kill "default guest" sessions.  The reason
 * we are adding this is that for some unknown reason, while using 4D mobile, a whole bunch of
 * default guest sessions will show up on 4D server and take up 4D mobile licenses.
 * @author Welsh Harris
 * @created 03/15/2015
 */

var RUN_EVERY_X_SECONDS = 60;

//login as marvin
loginByPassword("marvin", "marvin");

function dropDefaultGuests() {
    var sessions;

    sessions = getUserSessions();
    for (var i = 0; i < sessions.length; ++i) {
        if (sessions[i].user.name === "default guest") {
            sessions[i].forceExpire();
        }
    }
}

setInterval(dropDefaultGuests, RUN_EVERY_X_SECONDS * 1000);