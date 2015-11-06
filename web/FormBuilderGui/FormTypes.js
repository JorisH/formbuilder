function FormTypeFactory()
{
    var map = {
        text: new TextType(),
        choice: new SelectType()
    };

    return {
        getByName: function(name) {
            if(map[name] === undefined) {
                throw new Error('Could not find config type for name ' + name);
            }

            return map[name];
        }
    }
}

function Type(options)
{
    var settings = jQuery.extend({
        icon: '',
        name: '',
        type: '',
        editableProperties: function(){
            return jQuery.extend([{name: 'name', type: 'text'}], options.editableProperties);
        }
    }, options);

    return {
        icon: settings.icon,
        name: settings.name,
        type: settings.type,
        render: function() {
            return jQuery('<span>')
                    .addClass('config-field-type')
                    .append('<img src="' + this.icon + '">' + this.name)
                    .on('click', this.clickHandler)
            ;
        },
        clickHandler: function(){},
        editableProperties: settings.editableProperties()
    };
}

function TextType() {
    return new Type({
        icon: '/images/formgenerator/textfield.png',
        name: 'text',
    });
}

function SelectType() {
    return new Type({
        icon: '/images/formgenerator/dropdown.png',
        name: 'choice',
    });
}