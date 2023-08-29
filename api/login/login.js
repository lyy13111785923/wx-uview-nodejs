import request from '../request';


export function validateLogin(params) {
  return request({
    url: `/validate_login`,
    method: 'get',
    params: params
  })
}
