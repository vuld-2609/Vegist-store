import {
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  GET_INFO_FAIL,
  GET_INFO_SUCCESS,
  GET_LIST_USER_FAIL,
  GET_LIST_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  EDIT_USER_BY_ADMIN_FAIL,
  EDIT_USER_BY_ADMIN_SUCCESS,
} from '../constants';

const initialStore = {
  userList: [],
  user: {},
  userDataEdited: {},
  infoUser: {},
  listUser: {},
  userEdit: {},
};

export default function accountReducer(state = initialStore, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        userList: [action.payload],
      };
    case CREATE_ACCOUNT_FAIL: {
      return state;
    }
    case GET_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    }
    case GET_USER_ACCOUNT_FAIL: {
      return state;
    }
    case GET_INFO_SUCCESS: {
      return {
        ...state,
        infoUser: {
          ...action.payload,
        },
      };
    }
    case GET_INFO_FAIL: {
      return state;
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        userDataEdited: {
          ...action.payload,
        },
      };
    }

    case EDIT_PROFILE_FAIL: {
      return state;
    }
    case GET_LIST_USER_SUCCESS: {
      return {
        ...state,
        listUser: { ...action.payload },
      };
    }
    case GET_LIST_USER_FAIL: {
      return state;
    }
    case DELETE_USER_SUCCESS: {
      const data = state.listUser.users.filter((item) => item.id !== action.payload);
      return { ...state, listUser: { users: data, total: state.listUser.total - 1 } };
    }
    case DELETE_USER_FAIL: {
      return state;
    }
    case EDIT_USER_BY_ADMIN_SUCCESS: {
      const listUser = JSON.parse(JSON.stringify(state.listUser));
      const index = state.listUser.users.findIndex((item) => item.id === action.payload.id);
      listUser.users[index] = action.payload;
      return {
        ...state,
        listUser,
      };
    }
    case EDIT_USER_BY_ADMIN_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}
