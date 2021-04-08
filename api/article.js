import { request } from '@/plugins/request'

export const listArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const listFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
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

export const addComments = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
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
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}
