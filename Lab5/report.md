Lab 5: Symbolic Execution with Angr
Student ID: 513558004
Name: 李明燦
Course: Secure Software Testing
GitHub Repository
https://github.com/secure-software-testing-2025-spring/secure-software-testing-2025-spring-classroom-lab-5-114-spring-secure-software-testing-1
1. Assignment Objective
The objective of this lab is to use symbolic execution with the angr framework to analyze a crackme binary and automatically recover the hidden FLAG.

In this lab, the binary accepts a 16-byte password as a command-line argument. By using symbolic execution, we can explore execution paths symbolically instead of manually testing inputs. angr and the SMT solver are then used to derive a concrete input that satisfies all path constraints and reaches the success path.
2. Environment
OS: Windows 11
Python Version: Python 3.10.11
Framework: angr 9.2.213
Solver: Z3 Solver
IDE: Visual Studio Code
3. Symbolic Execution Overview
Symbolic execution is a program analysis technique where program inputs are treated as symbolic variables instead of concrete values.

Instead of executing the program with a fixed input, symbolic execution explores multiple execution paths simultaneously. At each branch instruction, path constraints are collected and passed to an SMT solver such as Z3.

The solver computes concrete inputs that satisfy all constraints and drive execution toward the target path.

In this lab, angr is used to symbolically execute the crackme binary and recover the valid password and FLAG automatically.
4. Implementation
The implementation uses angr and claripy to create symbolic variables and explore the binary execution paths automatically.

The binary is loaded using angr.Project(). A symbolic 16-byte password is created using claripy.BVS(). The symbolic password is then passed into argv[1] using entry_state().

Constraints are added to ensure all password bytes are printable ASCII characters. The Simulation Manager explores execution paths symbolically using simgr.explore().

The success condition is defined as the output containing 'FLAG{', while paths printing 'Wrong' are avoided.

Finally, the solver extracts a concrete password and the program output is parsed to obtain the FLAG.
5. Recovered Password
angr_15_4w350m3!
6. Recovered FLAG
FLAG{symbolic_execution_master}
7. Conclusion
In this lab, symbolic execution was successfully applied using angr to analyze a crackme binary.

By creating symbolic inputs and exploring execution paths automatically, angr and the Z3 SMT solver were able to derive the correct password and recover the hidden FLAG without manual reverse engineering.

This lab demonstrates how symbolic execution can systematically solve path constraints and automate binary analysis tasks.
solve.py
#!/usr/bin/env python3

import angr
import claripy

BINARY = "./crackme"
PASSWORD_LEN = 16


def main():
    project = angr.Project(BINARY, auto_load_libs=False)

    password = claripy.BVS("password", PASSWORD_LEN * 8)

    state = project.factory.entry_state(
        args=[BINARY, password]
    )

    # Restrict password to printable ASCII characters
    for i in range(PASSWORD_LEN):
        byte = password.get_byte(i)
        state.solver.add(byte >= 0x20)
        state.solver.add(byte <= 0x7e)

    simgr = project.factory.simulation_manager(state)

    simgr.explore(
        find=lambda s: b"FLAG{" in s.posix.dumps(1),
        avoid=lambda s: b"Wrong" in s.posix.dumps(1)
    )

    if simgr.found:
        found_state = simgr.found[0]
        solution = found_state.solver.eval(password, cast_to=bytes)
        output = found_state.posix.dumps(1)

        print("[+] Password:", solution.decode(errors="ignore"))
        print("[+] Output:")
        print(output.decode(errors="ignore"))

        with open("answer.txt", "w", encoding="utf-8") as f:
            for token in output.decode(errors="ignore").split():
                if token.startswith("FLAG{"):
                    f.write(token.strip() + "\n")
                    print("[+] Written to answer.txt:", token.strip())
                    break
    else:
        print("[-] No solution found")


if __name__ == "__main__":
    main()

