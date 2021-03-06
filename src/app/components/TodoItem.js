module.exports = {
  template: require('./TodoItem.html'),
  controller: TodoItem,
  bindings: {
    todo: '<',
    onDestroy: '&',
    onChange: '&',
    onSave: '&'
    onShow: '&'
  }
};

function TodoItem() {
  this.editing = false;
}

TodoItem.prototype = {
  handleDoubleClick: function () {
    this.editing = true;
  },

  handleSave: function (text) {
    this.onSave({
      todo: {
        text: text,
        id: this.todo.id
      }
    });
    this.editing = false;
  },

  handleDestroy: function (id) {
    this.onDestroy({id: id});
  },

  showRow: function (n) {
   this.onShow({
     n:n
   });
  }
};
