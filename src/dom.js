window.dom = {
    create(string) {
        const container = document.createElement('template')//template是一个新出的元素，可以包容任何东西
        container.innerHTML = string.trim()//trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。
        return container.content.firstChild//template里面只能这样获取子元素
    },
    after(node, node2) {
        console.log(node.nextSibling)//sibling是兄弟节点
        node.parentNode.insertBefore(node2, node.nextSibling)
    },

    before(node, node2) {
        node.parentNode.innerBefore(node2, node)
    },
    append() {
        parent.appendChild(node)
    },//加一个儿子
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)//把parent插到node前面,再把node变成parent的儿子 
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const { childNodes } = node
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild//大儿子已经死了，现在是剩下的里面的大儿子也就是二儿子
        }
        return array
    },
    attr(node, name, value) {//重载，根据参数不同写不同代码
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        }
        else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配，先检测有无此属性,再根据能否使用分别写代码
        if (arguments.length === 2) {
            if ('innerText' in node) { node.innerHTML = string }//ie
            else { node.textContent = string }
        }//chrome可使用
        else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerHTML
            }//ie
            else { return node.textContent }
        }//chrome可使用
    },//这样改如果div中有p标签等就会也被删掉改掉}

    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }

    },
    style(node, name, value) {
        if (arguments.length === 3) { // eg:dom.style(div, 'color', 'red')
            node.style[name] = value
        }
        else if (arguments.length === 2) {
            if (typeof name === 'string') {// eg:dom.style(div, 'color')
                return node.style[name]
            }
            else if (name instanceof Object) {// dom.style(div, {color: 'red'})
                let object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }

        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        },
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {//scope是范围,在哪里找
        return (scope || document).querySelectorAll(selector)//如果有给定范围就在范围找，否则再全局找
    },
    parent(node) {
        return node.parent
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)//原来不是数组是伪数组，要先变成数组
            .filter(n => n !== node)//过滤
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//如果x存在且x是文本，nodeType可以再mdn上面查
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {//如果x存在且x是文本，nodeType可以再mdn上面查
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
