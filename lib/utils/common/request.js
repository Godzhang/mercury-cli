const request = require("request-promise-native");

exports.request = (uri) => {
  const reOpts = {
    method: "GET",
    timeout: 30000,
    resolveWithFullResponse: true,
    json: true,
    uri,
  };
  return request(reOpts);
};
