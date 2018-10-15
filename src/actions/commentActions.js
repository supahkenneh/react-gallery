import { GET_COMMENTS, POST_COMMENT } from './index';
import axios from 'axios';

const PATH = '/api'

export const getComments = id => {
  return dispatch => {
    return axios.get(`${PATH}/photos/${id}/comments`)
      .then(response => {
        dispatch({
          type: GET_COMMENTS,
          payload: response.data
        })
      })
  }
}

export const addComment = (id, data) => {
  return dispatch => {
    return axios.post(`${PATH}/photos/${id}/comments`, data)
      .then(response => {
        dispatch({
          type: POST_COMMENT,
          payload: response.data
        })
      })
  }
}