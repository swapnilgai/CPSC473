function ToDo(data) {
    this.description = ko.observable(data.description);
    this.tags = ko.observableArray(data.tags);
}

var Tabs = function (name, selected) {
    this.name = name;
    this.isSelected = ko.computed(function () {
        return this === selected();
    }, this);
};

function ToDoModel() {
    var self = this;

    self.selectedTab = ko.observable();

    self.tabs = ko.observableArray([
        new Tabs('Newest', self.selectedTab),
        new Tabs('Oldest', self.selectedTab),
        new Tabs('Tags', self.selectedTab),
        new Tabs('Add', self.selectedTab)
    ]);
    
    //inialize to the first tab
    self.selectedTab(self.tabs()[0]);

    self.todos = ko.observableArray([]);
    self.newTodo_description = ko.observable("");
    self.newTodo_tags = ko.observable("");
    self.tagsTabObjects = ko.observable([]);

    function formatData() {
        var tags = [];

        self.todos().forEach(function (toDo) {
            toDo.tags().forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        var tagObjects = tags.map(function (tag) {
            var toDosWithTag = [];

            self.todos().forEach(function (toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    toDosWithTag.push(toDo.description);
                }
            });

            return { "name": tag, "toDos": toDosWithTag };
        });
        self.tagsTabObjects(tagObjects);
    }




    $.getJSON("/todos.json", function (allData) {
        var mapTodos = $.map(allData, function (item) { return new ToDo(item); });
        self.todos(mapTodos);
        formatData();
    });

    self.addToDo = function () {
        var description = self.newTodo_description,
            tags = self.newTodo_tags,
            split_tags = tags().split(','),
            newToDo = { "description": description, "tags": split_tags };

        if (description() !== "" && tags() !== "") {
            $.post("/todos", newToDo, function (result) {
                var mapTodos = $.map(result, function (item) { return new ToDo(item); });
                self.todos(mapTodos);
                formatData();
            });
        }

        self.newTodo_description("");
        self.newTodo_tags("");
    };
}

ko.applyBindings(new ToDoModel());