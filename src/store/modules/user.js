import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken, setLocalAdminName, getLocalAdminName, setLocalAdminId, getLocalAdminId } from '@/utils/auth';

const user = {
  state: {
    locked: '',          // 用户是否被锁定
    adminUserId: '',     // 用户id
    token: getToken(),   // 用户token
    name: '',            // 用户名称
    menuList: [],        // 权限菜单集合
    loginFlag: false,    // 是否获取过用户权限信息
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_MENUS: (state, menuList) => {
      state.menuList = menuList
    },
    SET_LOGIN_FLAG: (state, flag) => {
      state.loginFlag = flag;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      console.log('commit.....', commit);
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(data => {
          // 保存用户名
          setLocalAdminName(data.realname);
          // 保存登录id
          setLocalAdminId(data.adminUserId);

          // 在本地中存放token
          setToken(data.token);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(getLocalAdminId()).then(data => {
          // 保存用户的菜单权限
          commit('SET_MENUS', data);
          // 保存用户名字
          commit('SET_NAME', getLocalAdminName());
          // 在store中存放token
          commit('SET_TOKEN', getToken());
          // 是否获取过用户权限信息
          commit('SET_LOGIN_FLAG', true);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENUS', [])
          commit('SET_LOGIN_FLAG', false);
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
}

export default user
