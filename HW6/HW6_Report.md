Homework 6: Logic Coverage of Thermostat
Predicate

The predicate tested in this homework is:

(curTemp < targetTemp - thresholdDiff) &&
(timeSinceLastRun >= minLag)

Define:

A = (curTemp < targetTemp - thresholdDiff)
B = (timeSinceLastRun >= minLag)
P = A && B

Predicate Coverage (PC)

Predicate Coverage requires the predicate to evaluate to both TRUE and FALSE.

Test Case	A	B	Predicate Result
T1	True	True	True
T2	False	True	False

PC is satisfied because the predicate evaluates to both TRUE and FALSE.

Clause Coverage (CC)

Clause Coverage requires every clause to evaluate to both TRUE and FALSE.

Test Case	A	B
T1	True	True
T2	False	True
T3	True	False
T4	False	False

CC is satisfied because:

Clause A evaluates to both TRUE and FALSE.
Clause B evaluates to both TRUE and FALSE.
Correlated Active Clause Coverage (CACC)

CACC requires each clause to independently affect the predicate outcome.

Major Clause A
Test Case	A	B	Predicate
T1	True	True	True
T2	False	True	False

B remains fixed while A changes the predicate result.

Major Clause B
Test Case	A	B	Predicate
T1	True	True	True
T3	True	False	False

A remains fixed while B changes the predicate result.

Therefore, CACC is satisfied.

Test Execution Result

All test cases passed successfully.

T1 PASS
T2 PASS
T3 PASS
T4 PASS

Conclusion

This homework successfully designed test cases for:

Predicate Coverage (PC)
Clause Coverage (CC)
Correlated Active Clause Coverage (CACC)

All logical coverage requirements were satisfied for the Thermostat class.