const state = {
  bookmarks: [
    {
      id: 0,
      title: 'Ricing Resources',
      link: 'https://rizonrice.github.io/resources'
    },
    {
      id: 1,
      title: 'Basics of Unix Philosophy',
      link: 'https://homepage.cs.uri.edu/~thenry/resources/unix_art/ch01s06.html'
    },
    {
      id: 2,
      title: 'z3bra\'s Blog',
      link: 'http://z3bra.org'
    },
    {
      id: 3,
      title: 'Venam\'s Blog',
      link: 'https://venam.nixers.net/blog/'
    },
    {
      id: 4,
      title: 'Matrix | Decentralized Open Network',
      link: 'https://matrix.org/'
    },
    {
      id: 5,
      title: 'Learn Vimscript the hard way',
      link: 'http://learnvimscriptthehardway.stevelosh.com/'
    },
    {
      id: 6,
      title: 'Practical mini projects to be solved in any language',
      link: 'https://github.com/karan/projects'
    },
    {
      id: 7,
      title: 'Introduction to A*',
      link: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html'
    },
  ],
  activeRow: 0
};

const getters = {
}

const actions = {
  setReverse(context) {
    context.commit('setReverse');
  }
};

const mutations = {
  setReverse(state) { state.reverse = !state.reverse },
  setActiveRow(state, direction) {
    let row = state.activeRow;
    let length = state.bookmarks.length - 1;
    if (direction == 'up')
      state.activeRow = row > 0 ? row - 1 : length;
    else if (direction == 'down')
      state.activeRow = row < length ? row + 1 : 0;
    else state.activeRow = direction;
  }
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};
