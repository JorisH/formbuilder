(function($){
    $.fn.formBuilder = function(options) {
        var container = this;
        var settings = $.extend({
            fieldTypes: ['text', 'choice'],
            container: container
        }, options);

        var builder = new FormBuilder(settings);
        builder.build();
        var formFieldEditor = new FormEditor(builder);

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
                $(builder).trigger('form-added', form);
            },
            config: [],
            buildConfig: function() {
                var tmp = $('<div>');
                $(this.config).each(function(key, formType) {
                    formType.clickHandler = function() {
                        var form = formFieldFactory.getByType(formType.name);
                        builder.addForm(form);
                    }
                    tmp.append(formType.render());
                    tmp.append('<br/>');
                });

                options.container.find('#config-container').append(tmp);

            },
            buildForm: function (){

                $.post(
                    options.url,
                    {data: this.getJson()},
                    function(formHtml) {
                        $(options.container).find("#form-container").html(formHtml);
                    }
                )

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
                return JSON.stringify(mainForm);
            },
            findForm: function(name) {
                return mainForm.find(name);
            }
        };

        $(options.fieldTypes).each(function(key, type){
            builder.addField(type);
        });

        return builder;
    }

    function FormEditor(builder)
    {
        var form;
        var formType;
        var formTypeFactory = new FormTypeFactory();
        var formFieldFactory = new FormFieldFactory();

        var editor = {
            editForm: function(formToEdit) {
                form = builder.findForm(formToEdit.name);
                formType = formTypeFactory.getByName(form.type);

                this.buildEditor();
            },
            buildEditor: function() {
                $.each(formType.editableProperties, function(index, property) {
                    var formField = formFieldFactory.getByType(property.type);
                    formField.name = property.name;
                    formField.value = form[property.name];

                    $('#editor-container').append(formField.render().html());
                })
            }
        };

        $(builder).on('form-added', function(event, form){
            editor.editForm(form);
        });

        return editor;
    }
})(jQuery);