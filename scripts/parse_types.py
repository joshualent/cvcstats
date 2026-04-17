array_str = "["

with open("./scripts/type.txt") as file:
    for line in file:
        trimmed_line = line.strip()
        parsed_line = trimmed_line.split('?')[0]
        if ('/' not in parsed_line):
            array_str += f"'{parsed_line}',"
array_str += "]"
print(array_str)
