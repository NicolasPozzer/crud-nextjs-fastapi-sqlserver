/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://myapp.com/roles';

  // Verificar si el usuario tiene roles asignados desde Auth0
  const assignedRoles = event.authorization?.roles;

  if (assignedRoles && assignedRoles.length > 0) {
    // Añadir los roles asignados al ID token y Access token
    api.idToken.setCustomClaim(namespace, assignedRoles);
    api.accessToken.setCustomClaim(namespace, assignedRoles);
  }
};


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
