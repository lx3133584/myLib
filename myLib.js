window.$ = (function() {
    //将获得的DOM转化成Lib对象
    function Lib(els) {
        for (var i = 0; i < els.length; i++) {
            this[i] = els[i];
        }
        this.length = els.length;
    };
    //获取DOM元素，实例化Lib
    var dom = function(selector) {
        var els;
        if (typeof selector === "string") {
            els = document.querySelectorAll(selector);
        }
        else if (selector.length) {
            els = selector;
        }
        else {
            els = [selector];
        }
        return new Lib(els);
    };
    //遍历Lib对象，接收一个回调函数，返回函数组成的数组
    Lib.prototype.map = function(callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i))//使用call使this指向每一个对象
        }
        return results;
    }
    //遍历Lib对象的方法
    Lib.prototype.forEach = function(callback) {
        this.map(callback);
        return this;
    }
    //获取、设置元素text的方法
    Lib.prototype.text = function(text) {
        if (typeof text === "undefined") {
            return this.map(function(e) {
                return e.textContent;
            }).join("");
        }
        else {
            this.map(function(e) {
                e.textContent = text;
            })
        }
        return this;
    }
    //指定Lib对象中特定索引的元素
    Lib.prototype.eq = function(index) {
        index = parseInt(index) || 0;
        return dom(this[index]);//this[index]是一个节点，用dom()再包装成Lib对象
    }
    //添加class的方法
    Lib.prototype.addClass = function(myClass) {
        this.map(function(e) {
            var myNewClass;
            if (e.getAttribute("class")) {
            var oldClass = e.getAttribute("class").split(" ");
            var newClass = myClass.split(" ");
           //去重
            var classList = oldClass.concat(newClass);
            var newList = [];
            var json = {};
            for (var i = 0; i < classList.length; i++) {
                if (!json[classList[i]]) {
                    newList.push(classList[i]);
                    json[classList[i]] = 1;
                }
            }
            myNewClass = newList.join(" ");
            }
            else {
                myNewClass = myClass;
            }
            e.setAttribute("class",myNewClass);
        })
        return this;
    }
    //删除class的方法
    Lib.prototype.removeClass = function(myClass) {
        this.map(function(e) {
            if (myClass) {
                var myNewClass;
                var oldClass = e.getAttribute("class").split(" ");
                var removeClass = myClass.split(" ");
                var newList = [];
                var json = {};
                for (var j = 0; j < removeClass.length; j++) {
                    json[removeClass[j]] = 1;
                }
                for (var i = 0; i < oldClass.length; i++) {
                    if (!json[oldClass[i]]) {
                        newList.push(oldClass[i]);
                    }
                }
                myNewClass = newList.join(" ");
                if (myNewClass === "") {
                    e.removeAttribute("class");
                }
                else {
                    e.setAttribute("class",myNewClass);
                }   
            }
            else {
                e.removeAttribute("class")
            }
            
        })
        return this;
    }
    //绑定事件的方法
    Lib.prototype.on = function (type, fn, boolean) {
        this.map(function(e) {
            e.addEventListener(type, fn, boolean)
        })
        return this;
    }
    //解除绑定事件的方法
    Lib.prototype.off = function (type, fn, boolean) {
        this.map(function(e) {
            e.removeEventListener(type, fn, boolean)
        })
        return this;
    }

    return dom;
})(); 
