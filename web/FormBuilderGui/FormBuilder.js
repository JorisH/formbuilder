(function($){
    $.fn.formBuilder = function(options) {
        var container = this;
        var settings = $.extend({
            fieldTypes: ['TextType', 'SelectType'],
            container: container
        }, options);


        var builder = new FormBuilder(settings);
        builder.build();

        return builder;
    };

    function FormBuilder(options) {
        var formTypeFactory = new FormTypeFactory();
        var formFieldFactory = new FormFieldFactory();
        var mainForm = new Form();

        var builder = {
            addForm: function(form){
                mainForm.getChildren().push(form);
                this.buildForm();
            },
            config: [],
            buildConfig: function() {
                var tmp = $('<div>');
                $(this.config).each(function(key, formType) {
                    formType.clickHandler = function() {
                        var formField = formFieldFactory.getByType(formType.type);
                        builder.addForm(formField);
                    }
                    tmp.append(formType.render());
                });

                options.container.find('#config-container').append(tmp);
            },
            buildForm: function (){

                options.container
                    .find('#form-container')
                    .empty()
                    .append(mainForm.render())
                ;

                //@TODO we need to find a way to register click handlers to all nested childs...
                //var tmp = $('<div>');
                //
                //$(mainForm.getChildren()).each(function(key, form) {
                //    form.clickHandler(function(){console.log('jeej');});
                //    tmp.append(form.render());
                //});
                //
                //return tmp;
            },
            addField: function(name) {
                var type = formTypeFactory.getByName(name);
                this.config.push(type);
            },
            build: function() {
                this.buildConfig();
                this.buildForm();
            },
            getJson: function(){
                console.log(mainForm);
                return JSON.stringify(mainForm);
            }
        };

        $(options.fieldTypes).each(function(key, type){
            builder.addField(type);
        });

        return builder;
    }
})(jQuery);