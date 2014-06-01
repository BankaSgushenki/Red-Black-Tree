
    var Node = function(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.count = 0;
    }

    Node.prototype.append = function(data) {
        var node = new Node(data);
        var count = 1;
        if (this.value == null) {this.value = node.value; return;}

        var currentNode = this;
        while (true) {
            if (Number(node.value) > Number(currentNode.value)) {
                if (currentNode.right == null) {
                    node.count = count;
                    currentNode.right = node; 
                    return;
                }
                else currentNode = currentNode.right;
            }
            else {
                if (currentNode.left == null) {
                    currentNode.left = node;
                    node.count = count;
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
        if (this.right) { this.showTree.call(this.right, position + offset, offset);}
        if (this.left) {  this.showTree.call(this.left, position - offset, offset);}
    }

    printNode = function(node, position) {
        var newNode = document.createElement("div");
        newNode.innerText = node.value;
        newNode.style.top = node.count*40 + "px";
        newNode.style.left = position + "px";
        if  (node.count%2 == 0) { newNode.style.background = "black";  newNode.style.color = "white";}
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
        myTree.showTree(700, 320);
    }

    //--------------------------------------------------------------------------//

    var myTree = new Node();

