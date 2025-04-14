genre_dict = {}
with open("G.csv","r") as infile:
    _ = infile.readline()

    for line in infile:
        tokens = line.strip().split(',')
        genre_dict[int(tokens[0])] = tokens[1]

anime_dict = {}
with open("A.csv","r") as infile:
    _ = infile.readline()

    for line in infile:
        tokens = line.strip().split(',')
        aid = int(tokens[0])
        gid = int(tokens[2])
        anime_dict[aid] = gid

# Check characters
check = [ 0 for _ in range(12)]
missing_dict = {}
temp_list = []
with open("C.csv", 'r') as infile:
    _ = infile.readline()

    cur = "ENFJ"
    for line in infile:
        tokens = line.strip().split(',')
        id = int(tokens[0])
        m = tokens[2]
        aid = int(tokens[3])

        if id == 339:
            print(f"|{m}|")
            print(f"|{cur}|")
        # new mbti, calc old one
        if m != cur:
            temp_list = []
            for idx, item in enumerate(check):
                if item == 0:
                    missing_genre = genre_dict[idx]
                    temp_list.append(missing_genre)
            missing_dict[cur] = temp_list
            check = [ 0 for _ in range(12)]
            cur = m
            genre = int(anime_dict[aid])
            check[genre] = 1
        else:
            genre = int(anime_dict[aid])
            check[genre] = 1
            if id == 339:
                print("+" * 20)

temp_list = []
for idx, item in enumerate(check):
    if item == 0:
        missing_genre = genre_dict[idx]
        temp_list.append(missing_genre)
missing_dict[cur] = temp_list

print("Missing Dict:")
for key, values in missing_dict.items():
    print(key, values)

print("-"*10)
print()


# Check raw data
count = 0
with open("raw_data.csv","r") as infile, open("temptemp.csv", 'w') as out:
    _ = infile.readline()

    for line in infile:
        # anime_name,anime_genre,character_name,character_mbti_type,
        tokens = line.strip().split(',')
        m = tokens[4]
        genre = tokens[2]
        

        if m == "INFP" or m == "XXXX":
            continue
        if genre in ['Comedy','Isekai','Ghibli']:
            continue
        
        anime = tokens[1]
        
        target_list = missing_dict[m]

        if genre in target_list:
            out.write(f"{count},{tokens[3]},{m},{anime}\n")
            target_list.remove(genre)
            count += 1
        
for key, values in missing_dict.items():
    print(key, values)
print(count)
            


