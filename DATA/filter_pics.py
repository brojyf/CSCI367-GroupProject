import csv
import os
import shutil


def move_img():
    count = 0
    csv_file = 'sorted.csv'

    block_list = ["Fullmetal Alchemist",
                  "Hetalia: Axis Powers",
                  "Kaguya-sama: Love Is War",
                  "Re:Zero − Starting Life in Another World"
                  ]

    # Open csv
    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:

            anime_name = row['anime_name']
            character = row['character_name']

            if anime_name in block_list:
                continue

            # Original pic path
            src_path = os.path.join('raw_images', anime_name, f'{character}.png')
            # New dir
            dest_dir = os.path.join('images', anime_name)
            # Full path for new pic
            dest_path = os.path.join(dest_dir, f'{character}.png')

            # Check dir
            os.makedirs(dest_dir, exist_ok=True)

            try:
                shutil.copy(src_path, dest_path)
                # print(f"Success: {src_path}")
            except FileNotFoundError:
                count += 1
                print(f"Cannot find: {src_path}")
            except Exception as e:
                count += 1
                print(f"Error when copying{e}")

    print(f"\nError time: {count}")

def merge_table():

    # Get anime dict
    anime_dict = {}
    with open("A.csv", "r") as file:
        _ = file.readline()
        for line in file:
            tokens = line.strip().split(',')
            anime_dict[tokens[0]] = tokens[1]
    print(anime_dict)

    # Create temp file
    with open("C.csv", "r") as file, open("TempCharacters.csv", "w") as out:
        _ = file.readline()
        out.write('character_name,anime_name\n')
        for line in file:
            tokens = line.strip().split(',')
            anime_name = anime_dict[tokens[3]]

            out.write(f"{tokens[1]},{anime_name}\n")


def sort():

    input_csv = 'TempCharacters.csv'
    output_csv = 'sorted.csv'

    with open(input_csv, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = list(reader)
    sorted_data = sorted(data, key=lambda row: str(row['anime_name']))

    fieldnames = reader.fieldnames

    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted_data)

    print(f"Sorted file save to: {output_csv}")


if __name__ == '__main__':
    try:
        shutil.rmtree('images')
    except:
        pass

    merge_table()
    sort()
    move_img()

    try:
        os.remove('sorted.csv')
    except:
        pass
    try:
        os.remove('TempCharacters.csv')
    except:
        pass


    """
        Character Drop:
        
        | Psycho 100/Shigeo "Mob" Kageyama.png
        | My Hero Academia/Toshinori Yagi "All Might".png
        | One Piece/Monkey D. Luffy.png
        | Pokémon/Charizard (Lizardon).png
        | The Promised Neverland/Isabella.png
        | The Promised Neverland/James Ratri.png
        | Toilet-bound Hanako-kun/Hanako.png
        | Tokyo Revengers/Ken "Draken" Ryuguji.png
        Tokyo Revengers/Manjirou "Mikey" Sano.png
        
    """
    # block_list = ["Fullmetal Alchemist",
    #                   "Hetalia: Axis Powers",
    #                   "Kaguya-sama: Love Is War",
    #                   "Re:Zero − Starting Life in Another World"
    #                   ]
