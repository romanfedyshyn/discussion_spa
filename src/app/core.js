(function() {
    'use strict';

    // Announce our app 
    var empeekApp = angular.module('empeekApp', [])

    // Announce our controller. (little sh*t code, but it's my expirience level) must fix that in the future
    .controller('addNewItem', function($scope) {
        // Get values from localStorage or create their
        // 'id' 'showComments' 'savedItems'
        $scope.savedId = localStorage.getItem('id');
        $scope.savedComments = localStorage.getItem('comments');
        $scope.savedItems = localStorage.getItem('items');
        // IF the items are empty at our localStorage, create empty array or equel to zero for use it in future
        $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.savedItems) : [];
        $scope.comments = (localStorage.getItem('comments') !== null) ? JSON.parse($scope.savedComments) : [];
        $scope.id = (localStorage.getItem('id') !== null && localStorage.getItem('items') !== []) ? JSON.parse($scope.savedId) : 0;
        $scope.commentsShow = [];
        $scope.thisId = "";

        $scope.addItem = function() {
            // add a id for new item
            $scope.id = +(localStorage.getItem('id'));
            // push new Item into items array
            $scope.items.push({ text: $scope.itemText, count: 0, id: $scope.id += 1 });
            localStorage.setItem('id', JSON.stringify(this.id));

            $scope.itemText = "";
            // set array into localStorage 
            localStorage.setItem('items', JSON.stringify($scope.items));
        };
        // delete item
        $scope.deleteItem = function() {
            // delete item from item array
            $scope.items.splice(this.$index, 1);
            localStorage.setItem('items', JSON.stringify($scope.items));
            // Remove comments wich belong for this item
            $scope.showComments = [];
            localStorage.setItem('showComments', JSON.stringify($scope.showComments));

            // if items array are empty, than remove comments array and id value must be zero
            if ($scope.items.length === 0) {
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
        //  add style for selected item
        $scope.addClass = function() {
            $('body').on('click', 'li.item', function() {
                $("ul li").removeClass('selected');
                $(this).addClass('selected');
            });
        };

        // add logic when we choose item
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



            // adding new comment
            $scope.addComment = function() {

                item.count += 1;
                // rewrite localStorage items value with new value of count
                localStorage.setItem('items', JSON.stringify($scope.items));
                $scope.comments.push({ text: $scope.commentText, id: $scope.thisId });
                // rewrite localStorage comments value with new value
                localStorage.setItem('comments', JSON.stringify($scope.comments));
                // clear comment input
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
