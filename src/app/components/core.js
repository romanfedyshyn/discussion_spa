(function() {
    'use strict';

    // Announce our app 
    var empeekApp = angular.module('empeekApp', [])

    // Announce our controller. (little sh*t code, but it's my expirience level) must fix that in the future
    .controller('addNewItem', function($scope) {
        // Get values from localStorage or create their
        // 'id' value for identification our items and comments
        $scope.savedId = localStorage.getItem('id');
        // 'savedComments' value for save all of our comments
        $scope.savedComments = localStorage.getItem('comments');
        // 'savedItems' value for save all of our items
        $scope.savedItems = localStorage.getItem('items');
        // IF the items are empty at our localStorage, we create empty array for use it in future
        $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.savedItems) : [];
        // IF the comments are empty at our localStorage, we create empty array for use it in the future
        $scope.comments = (localStorage.getItem('comments') !== null) ? JSON.parse($scope.savedComments) : [];
        // IF the 'id' are empty at our localStorage, we create her for use it in the future
        $scope.id = (localStorage.getItem('id') !== null && localStorage.getItem('items') !== []) ? JSON.parse($scope.savedId) : 0;
        // Create empty array, what we used for save our choose commens. What belong to the item with the same id's
        $scope.commentsShow = [];
        $scope.thisId;

        $scope.addItem = function() {
                // When create new item we add a id for her
                $scope.id = +(localStorage.getItem('id'));
                // push new Item into our item array
                $scope.items.push({ text: $scope.itemText, count: 0, id: $scope.id += 1 });
                // set our id into localStorage. for normal adding for future items, after reload page too.
                localStorage.setItem('id', JSON.stringify(this.id));
                // delete a text from input
                $scope.itemText = "";
                // set our not empty array into localStorage 
                localStorage.setItem('items', JSON.stringify($scope.items));
            };
            // Function for delete item
        $scope.deleteItem = function() {
            // delete item from item array
            $scope.items.splice(this.$index, 1);
            // set new item array into localStorage
            localStorage.setItem('items', JSON.stringify($scope.items));
            // Remove comments wich belong for this item
            $scope.showComments = [];
            localStorage.setItem('showComments', JSON.stringify($scope.showComments));

// if our items array are empty, we must remove comments array and id value must be zero
            if ($scope.items.length == 0) {
// remove comments array
                $scope.comments = [];
                localStorage.setItem('comments', JSON.stringify($scope.comments));
// 'id' value equel 0
                $scope.id = 0;
                localStorage.setItem('id', JSON.stringify($scope.id));
// it's for wright display into comments block-header
                $scope.thisId = "";
            }
        };

        // Function for add logic when we choose item
        $scope.selectItem = function(item) {
            // Awarding selected item id  for value for use it into our comments
            $scope.thisId = this.item.id;
            // choose comments wich belong for this item
            $scope.showComments = $scope.comments.filter(function(comment) {
                return comment.id === $scope.thisId;
            });
            // create a choose array from all of comments
            if ($scope.showComments.length > 0) {
                localStorage.setItem('showComments', JSON.stringify($scope.showComments));
            }
            localStorage.getItem('showComments');
            // function for adding new comment
            $scope.addComment = function() {
                // count of our comments for each item
                item.count += 1;
                // rewrite localStorage items value with new value of count
                localStorage.setItem('items', JSON.stringify($scope.items));
                // push new comment into our comments array
                $scope.comments.push({ text: $scope.commentText, id: $scope.thisId });
                // rewrite localStorage comments value with new value
                localStorage.setItem('comments', JSON.stringify($scope.comments));
                // clear our comment input
                $scope.commentText = "";
                // choose comments wich belong for this item
                $scope.showComments = $scope.comments.filter(function(comment) {
                        return comment.id === $scope.thisId;
                    });
                    // create a choose array from all of comments
                if ($scope.showComments.length > 0) {
                    localStorage.setItem('showComments', JSON.stringify($scope.showComments));
                }
            };
        };
    });
})();
