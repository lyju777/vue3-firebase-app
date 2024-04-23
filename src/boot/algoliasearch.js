import { boot } from 'quasar/wrappers';
import InstantSearch from 'vue-instantsearch/vue3/es';

export default boot(async ({ app }) => {
  app.use(InstantSearch);
});
