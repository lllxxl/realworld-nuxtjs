import { request } from '@/plugins/request'

export const listArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    data
  })
}

export const listFeedArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    // headers: {
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU0MTAzLCJ1c2VybmFtZSI6InhpeWlheGlhIiwiZXhwIjoxNjIyNDI0NzkyfQ.IShe65OPk7zqhpDDVkkAf4Ygc9nI0BOKz1vKWOpZwSc`
    // },
    data
  })
}

export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const cancelFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

export const createArticle = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}

export const updateArticle = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}`,
    data
  })
}
