const fsErrors = {
  EPERM: 'Operation not permitted',
  ENOENT: 'No such file or directory',
  EACCES: 'Permission denied',
  EEXIST: 'File exists',
  ENOTDIR: 'Not a directory',
  EISDIR: 'Is a directory',
  EROFS: 'Read-only file system',
  ENAMETOOLONG: 'File name too long',
  ENOTEMPTY: 'Directory not empty',
  ESTRPIPE: 'Streams pipe error',
};
/*
const networkErrors = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  410: 'Gone',
  414: 'URI Too Long',
  423: 'Locked',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  499: 'Client Closed Request',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  509: 'Bandwidth Limit Exceeded',
  511: 'Network Authentication Required',
  520: 'Unknown Error',
  521: 'Web Server Is Down',
  522: 'Connection Timed Out',
  523: 'Origin Is Unreachable',
};
*/
export default (err) => {
  if (err.path) {
    return `Error: ${err.code}: ${fsErrors[err.code]}, ${err.syscall} '${err.path}'`;
  }
  return `Error: ${err.response.status}: ${err.response.statusText}, '${err.response.config.url}'`;
};
