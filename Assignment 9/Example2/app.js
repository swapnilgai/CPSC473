function AddComments(comment) {
    this.comment = comment;
}

function CommentListModel() {
    this.comments = ko.observableArray([
        new AddComments("This is the first comment!"),
        new AddComments("This is the second comment!")
    ]);
    this.newComment = ko.observable();

    this.addCommentFromInputBox = function () {
        if (this.newComment()!=="" && this.newComment()!== undefined){
            this.comments.push(new AddComments(this.newComment()));
            this.newComment("");
        }

    };

    ko.bindingHandlers.enterKey = {
        init: function (element, valueAccessor, allBindings, data, context) {
            var wrapper = function (data, event) {
                if (event.keyCode === 13) {
                    valueAccessor().call(this, data, event);
                }
            };
            ko.applyBindingsToNode(element, { event: { keyup: wrapper } }, context);
        }
    };
    
}

ko.applyBindings(new CommentListModel());