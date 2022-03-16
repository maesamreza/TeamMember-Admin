import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  agents: null,
  agent: null,
  salePersons: null,
  notif:[]
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  RESETPASSWORD: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      message
    };
  },
  VERIFYPASSWORD: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      message
    };
  },
  GETALLAGENTS: (state, action) => {
    const { message, agents } = action.payload;
    return {
      ...state,
      message,
      agents
    };
  },
  GETAGENTDETAIL: (state, action) => {
    const { message, agent } = action.payload;
    return {
      ...state,
      message,
      agent
    };
  },
  GETALLSELLMAN: (state, action) => {
    const { message, salePersons } = action.payload;
    return {
      ...state,
      message,
      salePersons
    };
  },
  GETALLNOTIF: (state, action) => {
    const { message, notif } = action.payload;
    return {
      ...state,
      message,
      notif
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  resetpassword: () => Promise.resolve(),
  verifypassword: () => Promise.resolve(),
  getallagent: () => Promise.resolve(),
  getagentdetail: () => Promise.resolve(),
  getallsaleman: () => Promise.resolve(),
  getallnoti: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const AgentID = localStorage.getItem('AgentViewID')
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          getallagent();
          getallsaleman(AgentID);
          getallnoti();
          getagentdetail(AgentID);
          const response = await axios.get('/api/user');
          const  user  = response.data;
          
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/admin/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;
    getallagent();
    console.log(user, accessToken)
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };
  const resetpassword = async (email) => {

    const response = await axios.post(`api/forgetpassword/admin`, { email });
    const { message } = response.data;
    dispatch({
      type: 'RESETPASSWORD',
      payload: {
        message,
      },
    });
  }
  const verifypassword = async (email, token, password, passwordconfirmation) => {
    const response = await axios.post(`api/reset/password/admin`, { email, token, password, passwordconfirmation });
    const { message, error } = response.data;
    dispatch({
      type: 'VERIFYPASSWORD',
      payload: {
        message,
        error
      },
    });
  }

  const getallagent = async () => {
    const response = await axios.get(`api/data/agents`);
    const { message, agents } = response.data;
    dispatch({
      type: 'GETALLAGENTS',
      payload: {
        message,
        agents,
      },
    });
  }
  const getagentdetail = async (ID) => {
    console.log(ID)
    const response = await axios.get(`api/get/agent/details/${ID}`);
    const { message, agent } = response.data;
    dispatch({
      type: 'GETAGENTDETAIL',
      payload: {
        message,
        agent,
      },
    });
  }
  const getallsaleman = async (ID) => {
    const response = await axios.get(`api/data/sellers/${ID}`);
    const { message, salePersons } = response.data;
    dispatch({
      type: 'GETALLSELLMAN',
      payload: {
        message,
        salePersons,
      },
    });
  }
  const getallnoti = async () => {
    const response = await axios.get(`api/admin/all/notification`);
    const { message, notif } = response.data;
    dispatch({
      type: 'GETALLNOTIF',
      payload: {
        message,
        notif,
      },
    });
  }






  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetpassword,
        verifypassword,
        getallagent,
        getagentdetail,
        getallsaleman,
        getallnoti
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
