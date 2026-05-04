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
