# Apollo 2020

Movie app built with React, Apollo and GraphQL

```
yarn add styled-components react-router-dom apollo-boost @apollo/react-hooks graphql
```

client : apollo-boost는 GraphQL Yoga처럼 이미 모든걸 다 설정해 둔 package이다.

## Apollo Client Setting

```js
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://movieql.now.sh/",
});

export default client;
```

apollo.js 파일

uri에 graphql 서버의 주소를 입력한다.

```js
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

index.js 파일

ApolloProvider로 App을 감싸준다.

ApolloProvider의 client 속성으로는 export한 client를 넣어준다.

## Query in js

```js
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) {
    return "loading...";
  }
  if (data && data.movies) {
    return data.movies.map((movie) => <h1 key={movie.id}>{movie.id}</h1>);
  }
};
```

먼저 apollo-boost 라이브러리에서 gql을 import 한다.

gql은 query문을 만들 때 사용된다.

완성된 query문은 @apollo/react-hooks 라이브러리의 useQuery를 사용하여 실행할 수 있다.

loading은 true, false 값

error는 error log

data는 query문으로 받은 데이터를 가져온다.

## React

a href는 react app을 죽게 만드므로 react-router-dom의 Link를 사용한다

```js
import { Link } from "react-router-dom";

export default ({ id }) => (
  <div>
    <Link to={`/${id}`}>{id}</Link>
  </div>
);
```

## React apollo 특징

Cache를 가지고 있다.

React apollo가 데이터를 얻으면 그것을 저장해준다.

그래서 같은 페이지를 가면 loading을 하지않고 cache를 준다. 즉 request를 다시 보내지 않는다.
