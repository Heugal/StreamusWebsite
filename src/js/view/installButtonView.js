﻿define(function () {
    'use function';

    var InstallButtonView = Backbone.View.extend({
        el: $('#installButton'),

        events: {
            'click': 'install'
        },
        
        webstoreUrl: 'https://chrome.google.com/webstore/detail/jbnkffmindojffecdhbbmekbmkkfpmjd',

        initialize: function () {

            var browserIsNotChrome = navigator.userAgent.toLowerCase().indexOf('chrome') === -1;

            if (browserIsNotChrome) {
                this.$el.attr('disabled', true).text('Google Chrome required');
            }

            //  http://stackoverflow.com/questions/17129261/detect-mobile-browser-with-javascript-detectmobilebrowsers-returns-false-for-m
            if (window.mobileCheck || screen.width < 768) {
                this.$el.attr('disabled', true).text('Desktop computer required');
            }
        },

        install: function () {

            if (!this.$el.attr('disabled')) {

                this.$el.attr('disabled', true).text('Installing...');

                var self = this;
                chrome.webstore.install(this.webstoreUrl, function () {
                    self.$el.text('Installed!');
                }, function (error) {
                    //  TODO: It would be nice to know more about where this error message came from / what others could occur.
                    if (error == 'User cancelled install') {
                        self.$el.attr('disabled', false).text('Install extension now');
                    } else {
                        self.$el.text('An error was encountered.');
                        console.error(error);
                    }

                });

            }

        }
    });
    
    return InstallButtonView;
});