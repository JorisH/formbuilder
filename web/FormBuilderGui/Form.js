function Form(options) {
    var settings = $.extend({
        name : '',
        type : '',
        children : []
    }, options);

    return {
        getName: function() {
            return settings.name;
        },
        getType: function() {
            return settings.type;
        },
        children: settings.children,
        render: function() {
            return '';
        }
    };
}