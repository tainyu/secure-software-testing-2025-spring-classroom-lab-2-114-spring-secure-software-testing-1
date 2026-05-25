from sudoku import is_valid_number, is_valid_row, is_valid_column, is_valid_block

def test_valid_number():
    assert is_valid_number(5) == True
    
def test_invalid_number():
    assert is_valid_number(15) == False

def test_zero_is_invalid():
    assert is_valid_number(0) == False

def test_valid_row():
    row = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    assert is_valid_row(row) == True

def test_invalid_row():
    row = [1, 2, 3, 4, 5, 5, 7, 8, 9]
    assert is_valid_row(row) == False

def test_valid_column():
    board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ]
    assert is_valid_column(board, 0) == True

def test_invalid_column():
    board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 3, 4, 5, 6, 7, 8, 9, 2],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ]
    assert is_valid_column(board, 0) == False

def test_valid_block():
    board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ]
    assert is_valid_block(board, 0, 0) == True

def test_invalid_block():
    board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 6, 7, 8, 9, 2, 3, 4],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ]
    assert is_valid_block(board, 0, 0) == False