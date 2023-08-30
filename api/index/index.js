import request from '../request';


export function memorandumAdd(data) {
  return request({
    url: `/memorandum_add`,
    method: 'post',
    data: data,
  })
}


export function memorandumGetAll() {
  return request({
    url: `/memorandum_getAll`,
    method: 'get',
  })
}

