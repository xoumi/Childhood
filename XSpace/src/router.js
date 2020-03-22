import Landing from "./views/Landing.vue";
import Thoughts from "./views/Thoughts.vue";
import Thought from "./components/Thought.vue";

export default [
  { path: "/", component: Landing },
  { path: "/thoughts", component: Thoughts },
  { path: "/thoughts/:id", component: Thought }
];
