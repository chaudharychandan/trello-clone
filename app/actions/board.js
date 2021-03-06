import axios from 'axios';
import {
  FETCH_BOARDS,
  ADD_BOARD,
  DELETE_BOARD
} from './types';

import { DOMAIN } from '../config';

const url = `${DOMAIN}/api/v1/boards`;

export const fetchBoards = () => async dispatch => {
  const { data } = await axios.get(url);

  dispatch({
    type: FETCH_BOARDS, payload: data
  });
};

export const fetchBoard = (id) => async dispatch => {
  const { data } = await axios.get(`${url}/${id}`);

  dispatch({
    type: FETCH_BOARDS, payload: [data]
  });
};

export const addBoard = (board) => async dispatch => {
  const { data } = await axios({
    method: 'post',
    url,
    data: board
  });

  dispatch({
    type: ADD_BOARD,
    payload: data
  });
};

export const deleteBoard = ({ _id }) => async dispatch => {
  const { data } = await axios.delete(`${url}/${_id}`);

  dispatch({
    type: DELETE_BOARD,
    payload: data
  });
};
