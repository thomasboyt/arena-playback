define([], function() {

  /*

  this._properties = {
    "color": {
      "content": "purple",
      "bindings": [
        {
          "element": <dom element node>
          "type": "content" // (or class...)
        },
        ...
      ]
    },
    ...
  }
  
  */

  var DomBindable = function(properties) {
    this._properties = {};

    this.get = function(key) {
      return this._properties[key].content;
    }

    this.set = function(key, value) {
      if (!this._properties[key]) {
        this._properties[key] = {
          content: value,
          bindings: []
        }
      }
      else {
        var oldContent = this._properties[key].content;
        this._properties[key].content = value;
        this._domUpdate(this._properties[key], oldContent);
      }
    }

    for (name in properties) {
      this.set(name, properties[name]);
    }

    this.bindPropertyTo = function(propName, selector, type) {
      var el = document.querySelector(selector);
      this._properties[propName].bindings.push({
        element: el,
        type: type || 'content'
      });
      this._domUpdate(this._properties[propName]);
    }

    this._domUpdate = function(property, oldContent) {
      property.bindings.forEach(function(binding) {
        if (binding.type === 'content') {
          binding.element.innerHTML = property.content;
        }
        else if (binding.type === 'class') {
          binding.element.classList.remove(oldContent);
          binding.element.classList.add(property.content);
        }
      });
    }
  }

  return DomBindable;
});