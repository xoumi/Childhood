const state = {
  reverse: false,
  content: [
    { title: 'The List'},
    { title: 'The Sublist'}
  ]
};

const getters = {
  content: (state) => state.content,
  reverse: (state) => state.reverse
}

const actions = {
  setReverse(context) {
    context.commit('setReverse');
  }
};

const mutations = {
  setReverse(state) { state.reverse = !state.reverse }
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};
