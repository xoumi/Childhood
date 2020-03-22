const state = {
  searchQuery: '',
  isSearching: false,
  activeView: ''
};

const getters = {
  getCategory: (state) => {
    state.searchQuery.match(/"[^"]*"?|\w+/g)
  }
}

const actions = {
  setSearchQuery(context, view) {
    context.commit('setActiveView', view);
  },
  setIsSearching(context, bool) {
    context.commit('setIsSearching', bool);
  }
};

const mutations = {
  setSearching(state, status ) { state.isSearching = status },
  setQuery(state, text) { state.searchQuery = text },
  setActiveView(state, view) { state.activeView = view },
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};
