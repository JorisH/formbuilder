function FormFieldFactory()
{
    var map = {
        TextType: new TextField(),
        SelectType: new SelectField()
    };

    return {
        getByType: function(type) {
            if(map[type] === undefined) {
                throw new Error('Could not find field for type ' + type);
            }

            return map[type];
        }
    }
}

function Form(options) {
    var settings = $.extend({
        name: 'New form',
        type: 'form',
        children : []
    }, options);

    return {
        name : settings.name,
        type : settings.type,
        children : [],
        getChildren: function() {
            return this.children;
        },
        render: function() {
            //Loop all children and render them
            if(this.getChildren().length > 0) {
                var tmp = $('<div>');
                jQuery(this.getChildren()).each(function(key, child) {
                    tmp.append(child.render());
                });

                return tmp;
            }
        }
    };
}

function TextField () {
    var $_this =  new Form({
        name: 'new_tex_field',
        type: 'text'
    });

    $_this.render = function() {
        return jQuery('<div><label>' + $_this.name + '</label><input type="text"></div>');
    };

    return $_this;
}

function SelectField () {
    var $_this = new Form({
        name: 'new_select_field',
        type: 'choice'
    });

    $_this.render = function() {
        return jQuery('<div><label>' + $_this.name + '<select></select></div>');
    };

    return $_this;
}