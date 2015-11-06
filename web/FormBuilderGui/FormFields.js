function FormFieldFactory()
{
    var map = {
        text: new TextField(),
        choice: new SelectField()
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
        value: '',
        getChildren: function() {
            return this.children;
        },
        find: function(name) {
            if(this.name === name) {return this;}
            for(i=0; i < this.children.length; i++) {
                if(this.children[i].find(name)){return this.children[i];}
            }

            return false;
        }
    };
}

function TextField () {
    var $_this =  new Form({
        name: 'new_text_field',
        type: 'text',
    });

    $_this.render = function() {
        return jQuery('<div><label>' + $_this.name + '</label><input type="text" value="' + $_this.value + '"></div>');
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