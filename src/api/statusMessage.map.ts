export const statusMessage: Map<number, string> = new Map([
  [200, 'OK'],
  [201, 'Created'],
  [202, 'Accepted'],
  [204, 'No Content'],
  [206, 'Partial Content'],
  [300, 'Multiple Choices'],
  [301, 'Moved Permanently'],
  [302, 'Found'],
  [304, 'Not Modified'],
  [307, 'Temporary Redirect'],
  [400, 'Bad request'],
  [401, 'Unauthorized'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method not allowed'],
  [406, 'Not Acceptable'],
  [408, 'Request Timeout'],
  [409, 'Conflict'],
  [410, 'Gone'],
  [412, 'Precondition Failed'],
  [413, 'Payload Too Large'],
  [414, 'URI Too Long'],
  [415, 'Unsupported Media Type'],
  [416, 'Range Not Satisfiable'],
  [429, 'Too Many Requests'],
  [500, 'Internal server error'],
  [501, 'Not Implemented'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
  [505, 'HTTP Version Not Supported']
])
