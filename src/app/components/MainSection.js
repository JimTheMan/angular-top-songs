var visibilityFilters = require('../constants/VisibilityFilters');

module.exports = {
  template: require('./MainSection.html'),
  controller: MainSection,
  bindings: {
    todos: '=',
    filter: '<'
  }
};

/** @ngInject */
function MainSection(todoService, $log, Spotify) {
  var vm = this;
  this.todoService = todoService;
  this.selectedFilter = visibilityFilters[this.filter];
  this.fuck = "hello";

  this.init = function () {
    $log.log('main component initializing!');

    Spotify.search('Nirvana', 'track').then(function (data) {
      $log.log(data);
      $log.log('todos: ' + data.tracks.items);

      vm.todos = data.tracks.items;
      vm.fuck = data.tracks.items[0].name;
      // $scope.$apply();
      // MainSection.setTodos(data.tracks.items);
    });
  };

  this.completeReducer = function (count, todo) {
    return todo.completed ? count + 1 : count;
  };

  this.init();
  $log.log('wtf4');
}

MainSection.prototype = {

  setTodos: function (e) {
    this.todos = e;
  },

  handleClearCompleted: function () {
    this.todos = this.todoService.clearCompleted(this.todos);
  },

  handleCompleteAll: function () {
    this.todos = this.todoService.completeAll(this.todos);
  },

  handleShow: function (filter) {
    this.filter = filter;
    this.selectedFilter = visibilityFilters[filter];
  },

  handleChange: function (id) {
    this.todos = this.todoService.completeTodo(id, this.todos);
  },

  handleSave: function (e) {
    if (e.text.length === 0) {
      this.todos = this.todoService.deleteTodo(e.id, this.todos);
    } else {
      this.todos = this.todoService.editTodo(e.id, e.text, this.todos);
    }
  },

  handleDestroy: function (e) {
    this.todos = this.todoService.deleteTodo(e, this.todos);
  }
};
