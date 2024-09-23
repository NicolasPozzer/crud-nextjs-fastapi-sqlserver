/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://myapp.com/roles';

  // Agregar rol automáticamente si no tiene roles en app_metadata
  const roles = event.user.app_metadata?.roles || [];
  
  if (roles.length === 0) {
    // Asigna rol de "user" por defecto
    const updatedRoles = ["user"];
    
    // Actualiza app_metadata
    api.user.setAppMetadata("roles", updatedRoles);

    // Agrega roles a los tokens
    api.idToken.setCustomClaim(namespace, updatedRoles);
    api.accessToken.setCustomClaim(namespace, updatedRoles);
  } else {
    // Si el usuario ya tiene roles, agrégalo al token
    api.idToken.setCustomClaim(namespace, roles);
    api.accessToken.setCustomClaim(namespace, roles);
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
