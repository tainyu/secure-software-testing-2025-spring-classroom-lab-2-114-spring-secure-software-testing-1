import unittest
from Calc import Calculator


class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = Calculator()

    def test_add(self):
        self.assertEqual(self.calc.add(2, 3), 5)

    def test_subtract(self):
        self.assertEqual(self.calc.subtract(7, 4), 3)

    def test_subtract_negative_result(self):
        self.assertEqual(self.calc.subtract(3, 5), -2)

    def test_multiply(self):
        self.assertEqual(self.calc.multiply(4, 6), 24)

    def test_multiply_by_zero(self):
        self.assertEqual(self.calc.multiply(9, 0), 0)

    def test_divide_returns_float(self):
        self.assertEqual(self.calc.divide(7, 2), 3.5)

    def test_divide_exact_result(self):
        self.assertEqual(self.calc.divide(8, 4), 2.0)

    def test_divide_by_zero_raises_value_error(self):
        with self.assertRaises(ValueError):
            self.calc.divide(5, 0)


if __name__ == '__main__':
    unittest.main(verbosity=2)
