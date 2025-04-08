deleted_anime = [25, 26, 38, 48]



with open("Characters.csv", "r") as file, open("CharactersRevised.csv", "w") as out:
    _ = file.readline()
    out.write(_)

    # Delete anime then characters
    for line in file:
        tokens = line.strip().split(",")
        anime = int(tokens[3])

        # Sip deleted_anime
        if anime in deleted_anime:
            continue

        # Update id
        if 24 < anime <= 37:
            anime -= 2
        elif 39 <= anime <= 47:
            anime -= 3
        elif anime == 49:
            anime -= 4

        out.write(f"{tokens[0]},{tokens[1]},{tokens[2]}, {anime}\n")

