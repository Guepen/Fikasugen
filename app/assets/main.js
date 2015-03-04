/**
 * Created by Tobias on 2015-03-04.
 */

require.config({
    'format': 'application/json'
});

require([
        'app'
    ],
    function(){
        angular.bootstrap(document, ['fikasugen'])
    }
);
