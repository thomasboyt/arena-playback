define([], function() {

  /*

  this._properties = {
    "color": {
      "content": "purple",
      "bindings": [
        {
          "element": <dom element node>,
          "type": "content" // (or class...),
          "transform" function(value) {return transformedValue}
        },
        ...
      ]
    },
    ...
  }
  
  */

  var DomBindable = function(properties) {
    this._properties = {};

    for (name in properties) {
      this.set(name, properties[name]);
    }
  }

  DomBindable.prototype.get = function(key) {
    return this._properties[key].content;
  }

  DomBindable.prototype.set = function(key, value) {
    if (!this._properties[key]) {
      this._properties[key] = {
        content: value,
        bindings: []
      }
    }
    else {
      var oldContent = this._properties[key].content;
      this._properties[key].content = value;
      this._domUpdateAll(this._properties[key], oldContent);
    }
  }

  DomBindable.prototype.bind = function(propName, selector, options) {
    var elements;
    var newBindings = []

    // selector can be a dom node, a nodeList, a jQuery selector result, or a selector string
    if (typeof selector === 'object') {
      if (selector.jquery) {
        elements = selector.get();
      }
      else {
        if (!selector.length) 
          elements = [selector];
        else
          elements = selector;
      }
    }
    else {
      elements = document.querySelectorAll(selector);
    }

    for (var i=0; i<elements.length; i++) {
      var binding = {
        element: elements[i],
        type: 'content',
        transform: function(value) {
          return value;
        }
      }

      for (key in options) {
        binding[key] = options[key];
      }

      newBindings.push(binding);
      this._properties[propName].bindings.push(binding);
    }

    newBindings.forEach(function(binding) {
      this._updateBinding(this._properties[propName], binding);
    }.bind(this))
  }

  DomBindable.prototype._updateBinding = function(property, binding, prevContent) {
    var content = binding.transform(property.content);
    var oldContent = binding.transform(prevContent);   // todo - cache this elsewhere?
    if (binding.type === 'content') {
      binding.element.innerHTML = content;
    }
    else if (binding.type === 'class') {
      binding.element.classList.remove(oldContent);
      binding.element.classList.add(content);
    }
  }

  DomBindable.prototype._domUpdateAll = function(property, prevContent) {
    property.bindings.forEach(function(binding) {
      this._updateBinding(property, binding, prevContent);
    }.bind(this));
  }

  return DomBindable;
});