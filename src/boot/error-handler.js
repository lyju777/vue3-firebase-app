import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';
import { getErrorMessage } from 'src/utils/firebase/error-message';

export default boot(async ({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    console.log('### app.confing.errorHandler ###');
    console.log('err:', err);
    console.log('instance:', instance);
    console.log('info:', info);
    Notify.create(getErrorMessage(err.code));
  };
});
