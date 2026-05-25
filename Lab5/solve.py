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