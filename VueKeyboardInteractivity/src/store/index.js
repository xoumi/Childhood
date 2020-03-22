import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import bookmarks from './bookmarks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    root, bookmarks
  }
});
