const div = dom.create('<div>1111</div>')
console.log(div)
dom.after(test, div)

dom.attr(test, 'title', 'Hi, I am Frank')
const title = dom.attr(test, 'title')
console.log(`title: ${title}`)
dom.text(test, '你好，这是新的内容')
dom.text(test)
dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))
const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]//要获取第0个，因为其是一个数组，如果不获取第0个就会得不到这个div
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])
const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
console.log(dom.index(s2))