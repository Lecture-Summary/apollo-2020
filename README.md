## GraphQL로 영화 웹 앱 만들기
[GraphQL로 영화 웹 앱 만들기](https://nomadcoders.co/react-graphql-for-beginners)

## 📝 Table of Contents
- [Apollo Client](#1)
- [Reference](#reference)


## Apollo Client
Apollo Client는 GraphQL을 사용하여 로컬 및 원격 데이터를 모두 관리할 수 있는 JavaScript용 포괄적인 상태 관리 라이브러리입니다. 이를 사용하여 UI를 자동으로 업데이트하면서 애플리케이션 데이터를 가져오고, 캐시하고, 수정합니다.

```js
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

export default client
```

- uri: GraphQL 서버의 URL을 지정합니다.
- cache: 캐시는 쿼리 결과를 가져온 후 Apollo 클라이언트가 쿼리 결과를 캐시하는 데 사용하는 InMemoryCache의 인스턴스입니다.

## ApolloProvider
ApolloProvider 구성 요소를 사용하여 Apollo Client를 React에 연결합니다. React의 Context.Provider와 유사하게 ApolloProvider는 React 앱을 래핑하고 Apollo Client를 컨텍스트에 배치하여 구성 요소 트리의 모든 위치에서 액세스할 수 있도록 합니다.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import client from './client'
import { ApolloProvider } from '@apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
```

## useQuery
ApolloProvider가 연결된 후 useQuery로 데이터 요청을 시작할 수 있습니다. useQuery는 GraphQL 데이터를 UI와 공유하는 React hook입니다.
```js
import { gql, useQuery } from '@apollo/client'

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES)
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Could not fetch :(</h1>
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
      <h1>Tweets</h1>
      {data.allTweets.map((tweet) => (
        <li key={tweet.id}>
          {tweet.text}/by: {tweet.author.fullName}
        </li>
      ))}
    </ul>
  )
}
```


## <a name="reference"></a>Reference

https://nomadcoders.co/react-graphql-for-beginners

https://www.apollographql.com/docs/react/