import express from 'express';
import graphqlHTTP from 'express-graphql';
import { connect } from './redis_cache';
import { baseSchema, root } from './schemas';

connect();

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: baseSchema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
