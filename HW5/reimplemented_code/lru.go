package reimplemented_code

type Node struct {
	key   int
	value int
	prev  *Node
	next  *Node
}

type Cache struct {
	capacity int
	cache    map[int]*Node
	head     *Node
	tail     *Node
}

func New(capacity int) *Cache {
	return &Cache{
		capacity: capacity,
		cache:    make(map[int]*Node),
	}
}

func (c *Cache) Get(key int) (int, bool) {
	if node, ok := c.cache[key]; ok {
		c.moveToHead(node)
		return node.value, true
	}
	return 0, false
}

func (c *Cache) Put(key int, value int) {
	if node, ok := c.cache[key]; ok {
		node.value = value
		c.moveToHead(node)
		return
	}

	node := &Node{key: key, value: value}
	c.cache[key] = node
	c.addToHead(node)

	if len(c.cache) > c.capacity {
		c.removeTail()
	}
}

func (c *Cache) Remove(key int) bool {
	if node, ok := c.cache[key]; ok {
		c.removeNode(node)
		delete(c.cache, key)
		return true
	}
	return false
}

func (c *Cache) Len() int {
	return len(c.cache)
}

func (c *Cache) moveToHead(node *Node) {
	c.removeNode(node)
	c.addToHead(node)
}

func (c *Cache) addToHead(node *Node) {
	node.prev = nil
	node.next = c.head

	if c.head != nil {
		c.head.prev = node
	}
	c.head = node

	if c.tail == nil {
		c.tail = node
	}
}

func (c *Cache) removeNode(node *Node) {
	if node.prev != nil {
		node.prev.next = node.next
	} else {
		c.head = node.next
	}

	if node.next != nil {
		node.next.prev = node.prev
	} else {
		c.tail = node.prev
	}
}

func (c *Cache) removeTail() {
	if c.tail != nil {
		delete(c.cache, c.tail.key)
		c.removeNode(c.tail)
	}
}
