import { request } from '@/plugins/request'

export const listTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}