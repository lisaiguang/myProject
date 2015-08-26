/**
 * Created by lenovo on 2015/8/26.
 */
requirejs.config({
    baseUrl: 'modules',
    paths: {
        app: '../app'
    }
});
requirejs(['app/main']);
