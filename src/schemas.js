import { buildSchema } from 'graphql';
import { getLines } from './redis_cache';

export const baseSchema = buildSchema(`
  type Query {
    hello: String,
    imba: String,
    Lines: [Line],
    Line(id: Int): Line
  }

  type Line {
    ID: Int,
    Name: String,
    LineColour: String,
    Stops: [Stop]
  }

  type Stop {
    Name: String,
    ID: Int
  }
`);

export const root = {
  hello: () => 'Hello world!',
  imba: () => 'You are imba',
  Lines: () => getLines(),
  Line: async (args) => {
    console.log(args);
    const lines = await getLines();
    return lines.find(line => line.ID === args.id);
  },
};
