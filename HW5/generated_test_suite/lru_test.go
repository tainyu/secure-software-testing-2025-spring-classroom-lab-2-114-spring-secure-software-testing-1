package generated_test_suite

import (
	"testing"
	"HW5/reimplemented_code"
)

func TestPutAndGet(t *testing.T) {
	cache := reimplemented_code.New(2)

	cache.Put(1, 1)
	cache.Put(2, 2)

	if v, ok := cache.Get(1); !ok || v != 1 {
		t.Errorf("Expected key 1 to return value 1")
	}
}

func TestEviction(t *testing.T) {
	cache := reimplemented_code.New(2)

	cache.Put(1, 1)
	cache.Put(2, 2)
	cache.Put(3, 3) // evict 1

	if _, ok := cache.Get(1); ok {
		t.Errorf("Expected key 1 to be evicted")
	}
}

func TestUpdate(t *testing.T) {
	cache := reimplemented_code.New(2)

	cache.Put(1, 1)
	cache.Put(1, 10)

	if v, _ := cache.Get(1); v != 10 {
		t.Errorf("Expected updated value 10")
	}
}

func TestRemove(t *testing.T) {
	cache := reimplemented_code.New(2)

	cache.Put(1, 1)
	cache.Remove(1)

	if _, ok := cache.Get(1); ok {
		t.Errorf("Expected key 1 to be removed")
	}
}
