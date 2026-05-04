# FUNCTIONAL SPECIFICATION: LRU Cache

## 1. Overview
This document specifies the behavior of a Least Recently Used (LRU) cache system.
The cache maintains a fixed capacity and evicts the least recently used item when full.

---

## 2. Data Structures

### Cache
- capacity: int
- cache: map[Key]*Node
- head: *Node (Most Recently Used)
- tail: *Node (Least Recently Used)

### Node
- key: Key
- value: Value
- prev: *Node
- next: *Node

---

## 3. API Signatures

```go
func New(capacity int) *Cache
func (c *Cache) Get(key Key) (Value, bool)
func (c *Cache) Put(key Key, value Value)
func (c *Cache) Remove(key Key) bool
func (c *Cache) Len() int

---

## 4. Pre-conditions
capacity > 0
key must be valid (non-nil if pointer type)
cache must be initialized before use

---

## 5. Post-conditions
Get(key)
If key exists:
return (value, true)
move node to head (MRU)
If key does not exist:
return (nil, false)
Put(key, value)
If key exists:
update value
move node to head
If key does not exist:
insert new node at head
If capacity exceeded:
remove tail node (LRU)
Remove(key)
If key exists:
remove node
return true
Else:
return false
Len()
Returns number of elements in cache

---

## 6. Invariants
size <= capacity
head is always most recently used
tail is always least recently used
all nodes are doubly linked

---

## 7. Hoare Logic
Put Operation
{ size < capacity }
Put(k, v)
{ size <= capacity AND k ∈ cache }

Eviction Case
{ size == capacity }
Put(k, v)
{ LRU item removed AND size == capacity }

Get Operation
{ k ∈ cache }
Get(k)
{ returns value AND k becomes MRU }

---

## 8. Edge Cases
capacity = 1
repeated Put on same key
removing non-existent key
getting non-existent key
