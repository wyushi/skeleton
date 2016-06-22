function notFound(name, code) {
  var error =  new Error(`User, ${name}, is not found.`);
  error.type = 'user';
  error.code = code || 500;
  return error;
}

function assertExist(user, name, code) {
  if (!user) {
    name = name || (user && user.email);
    throw notFound(name, code);
  }
}

export { assertExist };
