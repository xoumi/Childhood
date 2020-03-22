const state = {
  activeView: '',
  expandView: '',
  views: ['coding', 'design', 'finance', 'ventures']
};

const getters = {
  activeView: (state) => state.activeView,
  views: (state) => state.views
}

const actions = {
  setActiveView(context, view) {
    context.commit('setActiveView', view);
  },
  setExpandView(context, view) {
    context.commit('setExpandView', view);
  }
};

const mutations = {
  setActiveView(state, view) { state.activeView = view },
  setExpandView(state, view) { state.expandView = view }
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};
