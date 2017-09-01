import { createClient } from 'then-redis';
import { apiGetLines } from './ruter_service';

const client = createClient();

export function connect() {
  client.on('error', (err) => {
    console.log(`Error ${err}`);
  });
}

export function getLines() {
  return client.get('lines')
    .then((data) => {
      if (!data) {
        return apiGetLines().then((res) => {
          client.set('lines', JSON.stringify(res));
          return res;
        });
      }
      console.log('cached', data);
      return JSON.parse(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
