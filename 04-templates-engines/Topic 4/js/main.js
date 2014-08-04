// Configurations

requirejs.config({
	
	baseUrl: 'js',

    paths: {

    	// Path for libs
    	jquery: 'libs/jquery-ui-1.11.0.custom/external/jquery/jquery',
        jqueryui: 'libs/jquery-ui-1.11.0.custom/jquery-ui.min',
    	underscore: 'libs/underscore',
    	handlebars: 'libs/handlebars-v1.3.0',
        dust: 'libs/dust/dist/dust-full',

    	// Path for modules
        templates: 'modules/templates',
    	testingHandlebars: 'modules/testingHandlebars',
        testingUnderscore: 'modules/testingUnderscore',
        testingDust: 'modules/testingDust'
    },

    shim: {
    	jquery: {
    		exports: '$'
    	},
        jqueryui: {
            deps: ['jquery']
        },
    	underscore: {
    		exports: '_'
    	},
    	handlebars: {
            exports: 'Handlebars'
        },
        dust: {
            exports: 'dust'
        }

    }

});

// Now we will load our base module.
require(['templates']);

