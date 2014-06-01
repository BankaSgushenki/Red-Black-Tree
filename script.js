
    var Node = function(value, count) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.count = count;
        this.color = count%2;
    }

    Node.prototype.append = function(data) {
        var count = 1;
        if (this.value == null) {this.value = data; this.count = 0; this.color = 0; return;}

        var currentNode = this;
        while (true) {
            if (Number(data) > Number(currentNode.value)) {
                if (currentNode.right == null) {
                    currentNode.right = new Node(data, count);
                    return;
                }
                else currentNode = currentNode.right;
            }
            else {
                if (currentNode.left == null) {
                    currentNode.left = new Node(data, count);
                    return;
                }
                else currentNode = currentNode.left;
            }
            count ++;
        }
    }

    Node.prototype.showTree = function(position, offset) {
        printNode(this,position);
        offset = offset/2;
        if (this.right) this.showTree.call(this.right, position + offset, offset);
        if (this.left)  this.showTree.call(this.left, position - offset, offset);
    }

    printNode = function(node, position) {
        var newNode = document.createElement("div");
        newNode.innerText = node.value;
        newNode.style.top = node.count*40 + "px";
        newNode.style.left = position + "px";
        if  (node.color == 0) { newNode.style.background = "black";  newNode.style.color = "white";}
        else newNode.style.background = "red";
        var container = document.querySelector(".tree");
        container.appendChild(newNode);
    }

    clearWindow = function() {
        var container = document.querySelector(".tree");
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
    }

    function addNode() {
        var value = document.querySelector('input[type = "text"]').value;
        myTree.append(value);
        clearWindow();
        if (myTree.timeToBalance())  myTree.balanceLeft();
        myTree.showTree(700, 640);
    }

    Node.prototype.timeToBalance = function() {
        var currentNode = this;
        var leftDepth = 1;
        var rightDepth = 1;
        while(currentNode.right) {
            currentNode = currentNode.right;
            rightDepth++;
        }
        currentNode = this;
        while(currentNode.left) {
            currentNode = currentNode.left;
            leftDepth++;
        }
        if(rightDepth/leftDepth>=2) return true;
    }

     Node.prototype.balanceLeft = function() {
        console.log("It's time to balance...");
        var currentNode = this;
        var temp = currentNode.left;
        if (currentNode.right.left) currentNode.left = currentNode.right.left;
        else currentNode.left = new Node(currentNode.value, 0);
        currentNode.left.left = temp;
        currentNode = this;
        currentNode.value = currentNode.right.value;
        currentNode.right = currentNode.right.right;
        this.update(0);
    }

      Node.prototype.update = function(count) {
        if( count != 0) {
            this.color = count%2;
            this.count = count;
        }
        count ++;
        if (this.right) this.update.call(this.right, count);
        if (this.left)  this.update.call(this.left, count);
    }
    //--------------------------------------------------------------------------//

    var myTree = new Node();