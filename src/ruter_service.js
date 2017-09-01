import rq from 'request-promise';

export function apiGetLines() {
  const url = 'http://reisapi.ruter.no/Line/GetLines';
  return rq({
    url,
    json: true,
    headers: {
      'User-Agent': 'Request-Promise',
    },
  })
    .catch((err) => {
      console.log(err);
    });
}
