+function ($) {
    'use strict';
    log("TEST");
    // ALERT CLASS DEFINITION
    // ======================

    var dismissSelector = '[data-dismiss="alert"]';
    var Alert = element => $(element).on('click', dismissSelector, this.close);

    Alert.TRANSITION_DURATION = 150;
    /**
     * Defines the functionality of the closing icon of the alert message (if existing).
     * @param element
     */
    Alert.prototype.close = element => {
        var $this = $(this);
        var selector = $this.attr('data-target');

        if (!selector) {
            selector = $this.attr('href');
        }

        var $parent = $(selector);

        if (element) {
            element.preventDefault();
        }

        if (!$parent.length) {
            $parent = $this.closest('.sc-alert')
        }

        $parent.trigger(element = $.Event('close.bs.alert'));

        if (element.isDefaultPrevented()) return;

        $parent.removeClass('in');

        var removeElement = () =>
            $parent.detach().trigger('closed.bs.alert').remove();

        return $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one('bsTransitionEnd', removeElement)
                .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    };


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each = () => {
            var $this = $(this);
            var data = $this.data('bs.alert');

            if (!data) {
                $this.data('bs.alert', (data = new Alert(this)));
            }
            if (typeof option == 'string') {
                data[option].call($this)
            }
        }
    }

    var oldAlert = $.prototype.alert;

    $.prototype.alert = Plugin;
    $.prototype.alert.Constructor = Alert;
    $.prototype.alert.noConflict = () => {
        $.prototype.alert = oldAlert;
        return this
    };


    // ALERT DATA-API
    // ==============
    $(document).on('click.bs.alert.data-api', dismissSelector, Alert.prototype.close);

}(jQuery);
